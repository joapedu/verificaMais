'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Lock, Search } from 'lucide-react'
import { NavBar } from '@/components/NavBar'
import { ScoreBar } from '@/components/ScoreBar'
import { FeedbackOverlay } from '@/components/FeedbackOverlay'
import { GameOverScreen } from '@/components/GameOverScreen'
import { AccessibilityFAB } from '@/components/AccessibilityFAB'
import { useGameStore } from '@/store/gameStore'
import { useSound } from '@/hooks/useSound'
import { shuffle, cn } from '@/lib/utils'
import { jogo3Rounds, type Jogo3Answer } from '@/data/jogo3'

const MAX_POINTS = 3
const ANSWER_LABELS: Record<Jogo3Answer, { label: string; emoji: string; color: string; bg: string }> = {
  golpe: { label: 'Golpe!', emoji: '🚨', color: 'text-danger-dark', bg: 'bg-danger-light border-danger-DEFAULT/30 hover:bg-red-100' },
  fakenews: { label: 'Fake News!', emoji: '📰', color: 'text-warning-dark', bg: 'bg-warning-light border-warning-DEFAULT/30 hover:bg-yellow-100' },
  verdadeiro: { label: 'Verdadeiro!', emoji: '✅', color: 'text-success-dark', bg: 'bg-success-light border-success-DEFAULT/30 hover:bg-green-100' },
}

export default function Jogo3Page() {
  const { addScore } = useGameStore()
  const { playCorrect, playWrong } = useSound()

  const [rounds] = useState(() => shuffle(jogo3Rounds))
  const [currentRound, setCurrentRound] = useState(0)
  const [cluesRevealed, setCluesRevealed] = useState(0)
  const [userAnswer, setUserAnswer] = useState<Jogo3Answer | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [results, setResults] = useState<('correct' | 'wrong')[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const round = rounds[currentRound]
  const pointsIfCorrect = MAX_POINTS - cluesRevealed
  const isCorrect = userAnswer !== null && userAnswer === round.correctAnswer
  const isLastRound = currentRound + 1 >= rounds.length

  const revealClue = useCallback(() => {
    setCluesRevealed((c) => Math.min(c + 1, 3))
  }, [])

  const handleAnswer = useCallback(
    (answer: Jogo3Answer) => {
      if (userAnswer) return
      setUserAnswer(answer)
      const correct = answer === round.correctAnswer
      const pts = correct ? Math.max(MAX_POINTS - cluesRevealed, 0) : 0
      setTimeout(() => {
        if (correct) {
          playCorrect()
          if (pts > 0) {
            addScore(pts, 'jogo3')
            setScore((s) => s + pts)
          }
          setResults((r) => [...r, 'correct'])
        } else {
          playWrong()
          setResults((r) => [...r, 'wrong'])
        }
        setShowFeedback(true)
      }, 300)
    },
    [userAnswer, round, cluesRevealed, playCorrect, playWrong, addScore]
  )

  const handleNext = useCallback(() => {
    setShowFeedback(false)
    setUserAnswer(null)
    setCluesRevealed(0)
    if (isLastRound) {
      setGameOver(true)
    } else {
      setCurrentRound((r) => r + 1)
    }
  }, [isLastRound])

  const handleRestart = useCallback(() => {
    setCurrentRound(0)
    setCluesRevealed(0)
    setUserAnswer(null)
    setShowFeedback(false)
    setResults([])
    setScore(0)
    setGameOver(false)
  }, [])

  if (gameOver) {
    return (
      <GameOverScreen
        score={score}
        maxScore={rounds.length * MAX_POINTS}
        totalRounds={rounds.length}
        correctAnswers={results.filter((r) => r === 'correct').length}
        gameName="Jogo das Pistas"
        onRestart={handleRestart}
      />
    )
  }

  const correctLabel = ANSWER_LABELS[round.correctAnswer]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar title="🔍 Jogo das Pistas" />

      <main className="flex-1 px-4 py-5 max-w-lg mx-auto w-full flex flex-col gap-5 pb-28">
        <ScoreBar
          current={currentRound + 1}
          total={rounds.length}
          score={score}
          label="Rodada"
        />

        {/* Points indicator */}
        <div className="flex items-center justify-between bg-primary-50 rounded-2xl px-4 py-3">
          <div>
            <p className="text-primary-800 font-bold text-game-base">
              ⭐ {pointsIfCorrect} ponto{pointsIfCorrect !== 1 ? 's' : ''} se acertar agora
            </p>
            <p className="text-primary-600 text-xs mt-0.5">
              Cada pista revelada reduz 1 ponto
            </p>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                  cluesRevealed >= n ? 'bg-warning-DEFAULT text-white' : 'bg-gray-200 text-gray-400'
                )}
                aria-label={`Pista ${n}: ${cluesRevealed >= n ? 'revelada' : 'não revelada'}`}
              >
                {n}
              </div>
            ))}
          </div>
        </div>

        {/* Main card */}
        <div className="game-card overflow-hidden">
          {/* Image */}
          <div className="w-full aspect-square bg-gray-100 overflow-hidden">
            <img
              src={`/images/${round.imageId}.svg`}
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          </div>

          <div className="p-5 flex flex-col gap-3">
            {/* Category chip */}
            <span className="inline-flex self-start items-center gap-1 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
              <Search size={12} aria-hidden="true" />
              {round.category}
            </span>

            {/* Title */}
            <h2 className="font-black text-gray-900 text-game-xl leading-snug">
              {round.title}
            </h2>

            {/* Clues revealed */}
            <div className="flex flex-col gap-2 mt-1" aria-live="polite" aria-label="Pistas reveladas">
              {Array.from({ length: 3 }, (_, i) => {
                const clue = round.clues[i]
                const isVisible = i < cluesRevealed
                return (
                  <AnimatePresence key={i} mode="wait">
                    {isVisible && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-primary-50 border border-primary-200 rounded-2xl px-4 py-3"
                      >
                        <p className="text-xs font-bold text-primary-600 mb-1">
                          Pista {i + 1}
                        </p>
                        <p className="text-gray-700 text-game-sm leading-snug">{clue.text}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )
              })}
            </div>

            {/* Reveal clue button */}
            {cluesRevealed < 3 && !userAnswer && (
              <button
                onClick={revealClue}
                className="btn-ghost w-full justify-center mt-1"
                aria-label={`Revelar pista ${cluesRevealed + 1}`}
              >
                <Eye size={20} aria-hidden="true" />
                Revelar Pista {cluesRevealed + 1}
                {cluesRevealed > 0 && (
                  <span className="text-xs text-gray-400 ml-1">(-1 ponto)</span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Answer buttons */}
        {!userAnswer && (
          <div className="flex flex-col gap-3">
            <p className="text-center font-bold text-gray-700 text-game-base">
              O que você acha que é este caso?
            </p>
            <div className="grid grid-cols-1 gap-3">
              {(Object.keys(ANSWER_LABELS) as Jogo3Answer[]).map((ans) => {
                const info = ANSWER_LABELS[ans]
                return (
                  <button
                    key={ans}
                    onClick={() => handleAnswer(ans)}
                    className={cn(
                      'touch-target w-full rounded-2xl px-5 border-2 font-bold text-game-lg flex items-center gap-3 transition-all duration-200 active:scale-95',
                      info.bg,
                      info.color
                    )}
                    aria-label={`Responder: ${info.label}`}
                  >
                    <span className="text-2xl" aria-hidden="true">{info.emoji}</span>
                    <span>{info.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Locked state while waiting feedback */}
        {userAnswer && !showFeedback && (
          <div className="flex items-center justify-center gap-2 py-4 text-gray-500">
            <Lock size={18} aria-hidden="true" />
            <span>Verificando resposta...</span>
          </div>
        )}
      </main>

      <FeedbackOverlay
        isOpen={showFeedback}
        isCorrect={isCorrect}
        title={
          isCorrect
            ? `Correto! Era um ${correctLabel.label} ${correctLabel.emoji}`
            : `Era um ${correctLabel.label} ${correctLabel.emoji}`
        }
        explanation={round.explanation}
        pointsEarned={isCorrect ? pointsIfCorrect : 0}
        onNext={handleNext}
        nextLabel="Próxima Rodada"
        isLastRound={isLastRound}
      />

      <AccessibilityFAB />
    </div>
  )
}
