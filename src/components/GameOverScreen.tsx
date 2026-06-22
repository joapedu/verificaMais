'use client'

import { motion } from 'framer-motion'
import { Trophy, RotateCcw, Home } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface GameOverScreenProps {
  score: number
  maxScore: number
  totalRounds: number
  correctAnswers: number
  gameName: string
  onRestart: () => void
}

function getMedal(pct: number) {
  if (pct >= 90) return { emoji: '🥇', label: 'Ouro', color: 'text-yellow-500' }
  if (pct >= 70) return { emoji: '🥈', label: 'Prata', color: 'text-gray-400' }
  if (pct >= 50) return { emoji: '🥉', label: 'Bronze', color: 'text-amber-600' }
  return { emoji: '📚', label: 'Continue praticando!', color: 'text-primary-600' }
}

function getMessage(pct: number): string {
  if (pct >= 90) return 'Incrível! Você é um especialista em detectar golpes!'
  if (pct >= 70) return 'Muito bem! Você está se protegendo cada vez melhor.'
  if (pct >= 50) return 'Bom esforço! Continue praticando para ficar mais seguro.'
  return 'Não desanime! Cada erro é um aprendizado. Tente novamente!'
}

export function GameOverScreen({
  score,
  maxScore,
  totalRounds,
  correctAnswers,
  gameName,
  onRestart,
}: GameOverScreenProps) {
  const pct = Math.round((correctAnswers / totalRounds) * 100)
  const medal = getMedal(pct)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 20 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600 px-4 py-8"
    >
      <div className="w-full max-w-md bg-white rounded-4xl shadow-2xl overflow-hidden">
        {/* Trophy header */}
        <div className="gradient-primary px-6 py-8 text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-7xl mb-2"
            aria-hidden="true"
          >
            {medal.emoji}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white font-black text-3xl"
          >
            Jogo Concluído!
          </motion.p>
          <p className="text-primary-200 text-base mt-1">{gameName}</p>
        </div>

        {/* Stats */}
        <div className="px-6 py-6 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-5xl font-black text-primary-700">{score} pts</p>
            <p className="text-gray-500 text-sm mt-1">de {maxScore} pontos possíveis</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="bg-success-light rounded-2xl px-4 py-3 text-center">
              <p className="font-black text-success-DEFAULT text-2xl">{correctAnswers}</p>
              <p className="text-success-dark text-xs font-semibold">Acertos</p>
            </div>
            <div className="bg-danger-light rounded-2xl px-4 py-3 text-center">
              <p className="font-black text-danger-DEFAULT text-2xl">{totalRounds - correctAnswers}</p>
              <p className="text-danger-dark text-xs font-semibold">Erros</p>
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Aproveitamento</span>
              <span className={cn('font-bold', medal.color)}>{pct}%</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                className={cn(
                  'h-full rounded-full',
                  pct >= 70 ? 'bg-success-DEFAULT' : pct >= 50 ? 'bg-warning-DEFAULT' : 'bg-danger-DEFAULT'
                )}
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center text-gray-700 font-semibold text-base bg-gray-50 rounded-2xl px-4 py-3"
          >
            {getMessage(pct)}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex flex-col gap-3 mt-2"
          >
            <button onClick={onRestart} className="btn-primary w-full justify-center">
              <RotateCcw size={22} /> Jogar Novamente
            </button>
            <Link href="/" className="btn-ghost w-full justify-center">
              <Home size={20} /> Voltar ao Início
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
