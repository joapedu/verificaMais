'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { NavBar } from '@/components/NavBar'
import { ScoreBar } from '@/components/ScoreBar'
import { ChatBubble } from '@/components/ChatBubble'
import { FeedbackOverlay } from '@/components/FeedbackOverlay'
import { GameOverScreen } from '@/components/GameOverScreen'
import { AccessibilityFAB } from '@/components/AccessibilityFAB'
import { useGameStore } from '@/store/gameStore'
import { useSound } from '@/hooks/useSound'
import { shuffle, cn } from '@/lib/utils'
import { jogo1Rounds } from '@/data/jogo1'

const POINTS = 10

export default function Jogo1Page() {
  const { addScore } = useGameStore()
  const { playCorrect, playWrong } = useSound()

  const [rounds] = useState(() => shuffle(jogo1Rounds))
  const [sideMap] = useState<Array<['scam' | 'legit', 'scam' | 'legit']>>(
    () => rounds.map(() => (Math.random() > 0.5 ? ['scam', 'legit'] : ['legit', 'scam']))
  )

  const [currentRound, setCurrentRound] = useState(0)
  const [selected, setSelected] = useState<'left' | 'right' | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [results, setResults] = useState<('correct' | 'wrong')[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const round = rounds[currentRound]
  const [leftType, rightType] = sideMap[currentRound]
  const leftScenario = leftType === 'scam' ? round.scam : round.legit
  const rightScenario = rightType === 'scam' ? round.scam : round.legit
  const correctSide: 'left' | 'right' = leftType === 'scam' ? 'left' : 'right'
  const isCorrect = selected !== null && selected === correctSide

  const handleSelect = useCallback(
    (side: 'left' | 'right') => {
      if (selected) return
      setSelected(side)
      const correct = side === correctSide
      setTimeout(() => {
        if (correct) {
          playCorrect()
          addScore(POINTS, 'jogo1')
          setScore((s) => s + POINTS)
          setResults((r) => [...r, 'correct'])
        } else {
          playWrong()
          setResults((r) => [...r, 'wrong'])
        }
        setShowFeedback(true)
      }, 350)
    },
    [selected, correctSide, playCorrect, playWrong, addScore]
  )

  const handleNext = useCallback(() => {
    setShowFeedback(false)
    setSelected(null)
    if (currentRound + 1 >= rounds.length) {
      setGameOver(true)
    } else {
      setCurrentRound((r) => r + 1)
    }
  }, [currentRound, rounds.length])

  const handleRestart = useCallback(() => {
    setCurrentRound(0)
    setSelected(null)
    setShowFeedback(false)
    setResults([])
    setScore(0)
    setGameOver(false)
  }, [])

  if (gameOver) {
    return (
      <GameOverScreen
        score={score}
        maxScore={rounds.length * POINTS}
        totalRounds={rounds.length}
        correctAnswers={results.filter((r) => r === 'correct').length}
        gameName="Escolha o Golpe"
        onRestart={handleRestart}
      />
    )
  }

  const sides = ['left', 'right'] as const

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar title="🎯 Escolha o Golpe" />

      <main className="flex-1 px-4 py-5 max-w-2xl mx-auto w-full flex flex-col gap-5">
        <ScoreBar
          current={currentRound + 1}
          total={rounds.length}
          score={score}
          label="Rodada"
        />

        {/* Instruction */}
        <div className="text-center">
          <p className="text-gray-800 font-bold text-game-lg">
            Qual das mensagens abaixo é uma tentativa de golpe?
          </p>
          <p className="text-gray-500 text-game-sm mt-1">
            Leia com calma e toque no botão da conversa suspeita
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sides.map((side, si) => {
            const scenario = side === 'left' ? leftScenario : rightScenario
            const isSideCorrect = side === correctSide
            const isSideSelected = selected === side
            const isSideWrong = selected !== null && selected === side && !isSideCorrect
            const revealRedFlags = selected !== null && isSideCorrect

            return (
              <motion.div
                key={side}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: si * 0.1 }}
                className="flex flex-col gap-3"
              >
                <div
                  className={cn(
                    'game-card transition-all duration-300 overflow-hidden',
                    !selected && 'cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5',
                    isSideCorrect && selected && 'ring-4 ring-success-DEFAULT shadow-glow-success',
                    isSideWrong && 'ring-4 ring-danger-DEFAULT shadow-glow-danger animate-shake'
                  )}
                  onClick={() => !selected && handleSelect(side)}
                  role="button"
                  tabIndex={selected ? -1 : 0}
                  aria-label={`Conversa ${si + 1}: ${scenario.contactName}`}
                  onKeyDown={(e) => e.key === 'Enter' && !selected && handleSelect(side)}
                >
                  {/* Thumbnail */}
                  <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img
                      src={`/images/${scenario.imageId}.svg`}
                      alt=""
                      className="w-full h-full object-cover"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Chat */}
                  <ChatBubble
                    contactName={scenario.contactName}
                    contactEmoji={scenario.contactEmoji}
                    messages={scenario.messages}
                    showRedFlags={revealRedFlags}
                    className="rounded-t-none"
                  />
                </div>

                {/* Button / result */}
                {!selected ? (
                  <button
                    onClick={() => handleSelect(side)}
                    className="btn-primary w-full justify-center text-game-base"
                    aria-label={`Escolher conversa ${si + 1} como golpe`}
                  >
                    🎯 Este é o Golpe!
                  </button>
                ) : (
                  <div
                    className={cn(
                      'flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-game-base',
                      isSideCorrect
                        ? 'bg-success-light text-success-dark'
                        : 'bg-gray-100 text-gray-500'
                    )}
                    role="status"
                  >
                    {isSideCorrect ? '✅ Era este o golpe!' : '✓ Conversa legítima'}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </main>

      <FeedbackOverlay
        isOpen={showFeedback}
        isCorrect={isCorrect}
        title={isCorrect ? 'Você identificou o golpe!' : 'Não era esse o golpe...'}
        explanation={round.scam.explanation}
        redFlags={round.scam.redFlags}
        pointsEarned={isCorrect ? POINTS : 0}
        onNext={handleNext}
        isLastRound={currentRound + 1 >= rounds.length}
      />

      <AccessibilityFAB />
    </div>
  )
}
