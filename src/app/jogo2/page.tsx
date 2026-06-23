'use client'

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion'
import { NavBar } from '@/components/NavBar'
import { ScoreBar } from '@/components/ScoreBar'
import { FeedbackOverlay } from '@/components/FeedbackOverlay'
import { GameOverScreen } from '@/components/GameOverScreen'
import { AccessibilityFAB } from '@/components/AccessibilityFAB'
import { useGameStore } from '@/store/gameStore'
import { useSound } from '@/hooks/useSound'
import { shuffle, cn } from '@/lib/utils'
import { jogo2Cards, type Jogo2Card } from '@/data/jogo2'

const POINTS = 5

// ─── Draggable card (handles its own animation) ───────────────────────────

interface CardHandle {
  swipeLeft: () => Promise<void>
  swipeRight: () => Promise<void>
}

const DraggableNewsCard = forwardRef<
  CardHandle,
  {
    card: Jogo2Card
    onSwipeLeft: () => void
    onSwipeRight: () => void
    disabled: boolean
  }
>(function DraggableNewsCard({ card, onSwipeLeft, onSwipeRight, disabled }, ref) {
  const controls = useAnimation()
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-300, 300], [-22, 22])
  const leftOpacity = useTransform(x, [-90, -45, 0], [1, 0.5, 0])
  const rightOpacity = useTransform(x, [0, 45, 90], [0, 0.5, 1])

  // Enter animation on every mount (new key = new card)
  useEffect(() => {
    x.set(0)
    controls.start({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.35, ease: 'easeOut' },
    })
  }, [controls, x])

  const swipeLeft = useCallback(async () => {
    await controls.start({
      x: -800,
      opacity: 0,
      rotate: -28,
      transition: { duration: 0.35, ease: 'easeIn' },
    })
    onSwipeLeft()
  }, [controls, onSwipeLeft])

  const swipeRight = useCallback(async () => {
    await controls.start({
      x: 800,
      opacity: 0,
      rotate: 28,
      transition: { duration: 0.35, ease: 'easeIn' },
    })
    onSwipeRight()
  }, [controls, onSwipeRight])

  useImperativeHandle(ref, () => ({ swipeLeft, swipeRight }), [swipeLeft, swipeRight])

  const handleDragEnd = useCallback(
    async (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      if (disabled) return
      const isLeft = info.offset.x < -80 || info.velocity.x < -400
      const isRight = info.offset.x > 80 || info.velocity.x > 400

      if (isLeft) {
        await swipeLeft()
      } else if (isRight) {
        await swipeRight()
      } else {
        await controls.start({
          x: 0,
          rotate: 0,
          transition: { type: 'spring', stiffness: 500, damping: 35 },
        })
      }
    },
    [disabled, swipeLeft, swipeRight, controls]
  )

  return (
    <div className="relative">
      {/* FALSA indicator */}
      <motion.div
        style={{ opacity: leftOpacity }}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
        aria-hidden="true"
      >
        <div className="bg-red-600 text-white font-black text-xl px-4 py-2.5 rounded-xl -rotate-12 border-[3px] border-white shadow-xl">
          ← FALSA
        </div>
      </motion.div>

      {/* REAL indicator */}
      <motion.div
        style={{ opacity: rightOpacity }}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
        aria-hidden="true"
      >
        <div className="bg-green-600 text-white font-black text-xl px-4 py-2.5 rounded-xl rotate-12 border-[3px] border-white shadow-xl">
          REAL →
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        drag={disabled ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        style={{ x, rotate }}
        animate={controls}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        onDragEnd={handleDragEnd}
        className="game-card overflow-hidden cursor-grab active:cursor-grabbing select-none"
      >
        {/* News image — full card, no text below */}
        <div className="w-full aspect-[17/12] bg-gray-100 overflow-hidden">
          <img
            src={`/images/${card.imageId}.svg`}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
      </motion.div>
    </div>
  )
})

// ─── Page ─────────────────────────────────────────────────────────────────

export default function Jogo2Page() {
  const { addScore } = useGameStore()
  const { playCorrect, playWrong } = useSound()

  const [cards] = useState(() => shuffle(jogo2Cards))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answering, setAnswering] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [results, setResults] = useState<('correct' | 'wrong')[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const cardRef = useRef<CardHandle>(null)

  const card = cards[currentIndex]
  const isLastCard = currentIndex + 1 >= cards.length

  // Called when the card animation fully completes (after swipe or button)
  const onCardGone = useCallback(
    (isLeft: boolean) => {
      const correct = isLeft === card.isFake
      setIsCorrect(correct)
      if (correct) {
        playCorrect()
        addScore(POINTS, 'jogo2')
        setScore((s) => s + POINTS)
        setResults((r) => [...r, 'correct'])
      } else {
        playWrong()
        setResults((r) => [...r, 'wrong'])
      }
      setShowFeedback(true)
    },
    [card, playCorrect, playWrong, addScore]
  )

  const handleButtonLeft = useCallback(() => {
    if (answering) return
    setAnswering(true)
    cardRef.current?.swipeLeft()
  }, [answering])

  const handleButtonRight = useCallback(() => {
    if (answering) return
    setAnswering(true)
    cardRef.current?.swipeRight()
  }, [answering])

  const handleNext = useCallback(() => {
    setShowFeedback(false)
    setAnswering(false)
    if (isLastCard) {
      setGameOver(true)
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }, [isLastCard])

  const handleRestart = useCallback(() => {
    setCurrentIndex(0)
    setAnswering(false)
    setShowFeedback(false)
    setIsCorrect(false)
    setResults([])
    setScore(0)
    setGameOver(false)
  }, [])

  if (gameOver) {
    return (
      <GameOverScreen
        score={score}
        maxScore={cards.length * POINTS}
        totalRounds={cards.length}
        correctAnswers={results.filter((r) => r === 'correct').length}
        gameName="Deslize a Notícia"
        onRestart={handleRestart}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar title="📰 Deslize a Notícia" />

      <main className="flex-1 px-4 py-5 max-w-lg mx-auto w-full flex flex-col gap-5 pb-28">
        <ScoreBar
          current={currentIndex + 1}
          total={cards.length}
          score={score}
          label="Card"
        />

        {/* Swipe legend */}
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2 text-red-600 font-bold text-game-base">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-sm">←</div>
            <span>FALSA</span>
          </div>
          <p className="text-gray-500 text-xs text-center max-w-[140px] leading-tight">
            Arraste ou toque nos botões abaixo
          </p>
          <div className="flex items-center gap-2 text-green-600 font-bold text-game-base">
            <span>REAL</span>
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm">→</div>
          </div>
        </div>

        {/* Stack background cards */}
        <div className="relative">
          {currentIndex + 2 < cards.length && (
            <div className="absolute inset-x-0 top-2 mx-4 bottom-0 rounded-3xl bg-gray-200 -z-10" />
          )}
          {currentIndex + 1 < cards.length && (
            <div className="absolute inset-x-0 top-1 mx-2 bottom-0 rounded-3xl bg-gray-300 -z-10" />
          )}

          <DraggableNewsCard
            key={currentIndex}
            ref={cardRef}
            card={card}
            disabled={answering}
            onSwipeLeft={() => onCardGone(true)}
            onSwipeRight={() => onCardGone(false)}
          />
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button
            onClick={handleButtonLeft}
            disabled={answering}
            className={cn(
              'btn-danger flex-col h-20 text-game-lg font-black gap-1 rounded-2xl',
              'disabled:opacity-40 disabled:cursor-not-allowed'
            )}
            aria-label="Notícia FALSA — deslize para a esquerda"
          >
            <span className="text-2xl leading-none" aria-hidden="true">←</span>
            <span>FALSA</span>
          </button>
          <button
            onClick={handleButtonRight}
            disabled={answering}
            className={cn(
              'btn-success flex-col h-20 text-game-lg font-black gap-1 rounded-2xl',
              'disabled:opacity-40 disabled:cursor-not-allowed'
            )}
            aria-label="Notícia REAL — deslize para a direita"
          >
            <span className="text-2xl leading-none" aria-hidden="true">→</span>
            <span>REAL</span>
          </button>
        </div>
      </main>

      <FeedbackOverlay
        isOpen={showFeedback}
        isCorrect={isCorrect}
        title={
          isCorrect
            ? card.isFake
              ? 'Correto! Esta era uma FAKE NEWS!'
              : 'Correto! Esta é uma notícia REAL!'
            : card.isFake
            ? 'Era uma FAKE NEWS! Fique atento!'
            : 'Esta era uma notícia REAL!'
        }
        explanation={card.explanation}
        redFlags={card.redFlags}
        pointsEarned={isCorrect ? POINTS : 0}
        onNext={handleNext}
        nextLabel="Próxima Notícia"
        isLastRound={isLastCard}
      />

      <AccessibilityFAB />
    </div>
  )
}
