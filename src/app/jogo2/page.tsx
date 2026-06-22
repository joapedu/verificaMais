'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Newspaper } from 'lucide-react'
import { NavBar } from '@/components/NavBar'
import { ScoreBar } from '@/components/ScoreBar'
import { SwipeCard } from '@/components/SwipeCard'
import { FeedbackOverlay } from '@/components/FeedbackOverlay'
import { GameOverScreen } from '@/components/GameOverScreen'
import { AccessibilityFAB } from '@/components/AccessibilityFAB'
import { RedFlagList } from '@/components/RedFlagBadge'
import { useGameStore } from '@/store/gameStore'
import { useSound } from '@/hooks/useSound'
import { shuffle, cn } from '@/lib/utils'
import { jogo2Cards } from '@/data/jogo2'

const POINTS = 5

export default function Jogo2Page() {
  const { addScore } = useGameStore()
  const { playCorrect, playWrong } = useSound()

  const [cards] = useState(() => shuffle(jogo2Cards))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [results, setResults] = useState<('correct' | 'wrong')[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [swiped, setSwiped] = useState(false)

  const card = cards[currentIndex]
  const isLastCard = currentIndex + 1 >= cards.length

  const handleAnswer = useCallback(
    (swipeLeft: boolean) => {
      if (swiped) return
      setSwiped(true)
      setDirection(swipeLeft ? 'left' : 'right')
      const correct = swipeLeft === card.isFake
      setTimeout(() => {
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
      }, 300)
    },
    [card, swiped, playCorrect, playWrong, addScore]
  )

  const handleNext = useCallback(() => {
    setShowFeedback(false)
    setSwiped(false)
    setDirection(null)
    if (isLastCard) {
      setGameOver(true)
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }, [isLastCard])

  const handleRestart = useCallback(() => {
    setCurrentIndex(0)
    setDirection(null)
    setShowFeedback(false)
    setResults([])
    setScore(0)
    setGameOver(false)
    setSwiped(false)
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

  const isCorrect =
    direction !== null && (direction === 'left') === card.isFake

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar title="📰 Deslize a Notícia" />

      <main className="flex-1 px-4 py-5 max-w-lg mx-auto w-full flex flex-col gap-5">
        <ScoreBar
          current={currentIndex + 1}
          total={cards.length}
          score={score}
          label="Card"
        />

        {/* Legend */}
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2 text-danger-DEFAULT font-bold text-game-base">
            <div className="w-8 h-8 rounded-full bg-danger-light flex items-center justify-center">←</div>
            <span>FALSA</span>
          </div>
          <p className="text-gray-500 text-sm text-center max-w-[160px] leading-tight">
            Arraste ou toque nos botões
          </p>
          <div className="flex items-center gap-2 text-success-DEFAULT font-bold text-game-base">
            <span>REAL</span>
            <div className="w-8 h-8 rounded-full bg-success-light flex items-center justify-center">→</div>
          </div>
        </div>

        {/* Card stack */}
        <div className="relative">
          {/* Background cards for stack effect */}
          {currentIndex + 2 < cards.length && (
            <div className="absolute inset-x-0 top-2 mx-4 h-full rounded-3xl bg-gray-200 -z-10" />
          )}
          {currentIndex + 1 < cards.length && (
            <div className="absolute inset-x-0 top-1 mx-2 h-full rounded-3xl bg-gray-300 -z-10" />
          )}

          <AnimatePresence mode="wait">
            <SwipeCard
              key={currentIndex}
              onSwipeLeft={() => handleAnswer(true)}
              onSwipeRight={() => handleAnswer(false)}
              disabled={swiped}
              className="game-card overflow-hidden"
            >
              {/* News image */}
              <div className="w-full aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={`/images/${card.imageId}.svg`}
                  alt=""
                  className="w-full h-full object-cover"
                  aria-hidden="true"
                />
              </div>

              {/* News content */}
              <div className="p-5 flex flex-col gap-3">
                {/* Category badge */}
                <span className="inline-flex self-start items-center gap-1 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1 rounded-full">
                  <Newspaper size={12} aria-hidden="true" />
                  {card.category}
                </span>

                {/* Headline */}
                <h2 className="font-black text-gray-900 text-game-xl leading-snug">
                  {card.headline}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-game-sm leading-relaxed line-clamp-3">
                  {card.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-3">
                  <span className="font-medium truncate max-w-[60%]">{card.source}</span>
                  <span>{card.publishDate}</span>
                </div>
              </div>
            </SwipeCard>
          </AnimatePresence>
        </div>

        {/* Action buttons (accessibility alternative to swipe) */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button
            onClick={() => !swiped && handleAnswer(true)}
            disabled={swiped}
            className={cn(
              'btn-danger flex-col h-20 text-game-lg font-black gap-1 disabled:opacity-50 disabled:cursor-not-allowed',
              'rounded-2xl'
            )}
            aria-label="Esta notícia é FALSA — deslize para a esquerda"
          >
            <span className="text-2xl">←</span>
            <span>FALSA</span>
          </button>
          <button
            onClick={() => !swiped && handleAnswer(false)}
            disabled={swiped}
            className={cn(
              'btn-success flex-col h-20 text-game-lg font-black gap-1 disabled:opacity-50 disabled:cursor-not-allowed',
              'rounded-2xl'
            )}
            aria-label="Esta notícia é REAL — deslize para a direita"
          >
            <span className="text-2xl">→</span>
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
              : 'Correto! Esta era uma notícia REAL!'
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
