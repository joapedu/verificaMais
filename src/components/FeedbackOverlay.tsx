'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ChevronRight, Home } from 'lucide-react'
import { RedFlagList } from './RedFlagBadge'
import { cn } from '@/lib/utils'

interface FeedbackOverlayProps {
  isOpen: boolean
  isCorrect: boolean
  title: string
  explanation: string
  redFlags?: string[]
  pointsEarned?: number
  onNext: () => void
  onHome?: () => void
  nextLabel?: string
  isLastRound?: boolean
}

export function FeedbackOverlay({
  isOpen,
  isCorrect,
  title,
  explanation,
  redFlags,
  pointsEarned = 0,
  onNext,
  onHome,
  nextLabel = 'Próxima Rodada',
  isLastRound = false,
}: FeedbackOverlayProps) {
  const [confetti, setConfetti] = useState<{ id: number; x: number; color: string; size: number; delay: number }[]>([])

  useEffect(() => {
    if (isOpen && isCorrect) {
      const pieces = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ['#16a34a', '#2563eb', '#f59e0b', '#ec4899', '#8b5cf6'][Math.floor(Math.random() * 5)],
        size: Math.random() * 8 + 6,
        delay: Math.random() * 0.8,
      }))
      setConfetti(pieces)
      const t = setTimeout(() => setConfetti([]), 3000)
      return () => clearTimeout(t)
    }
  }, [isOpen, isCorrect])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          aria-modal="true"
          role="dialog"
          aria-label={isCorrect ? 'Resposta correta' : 'Resposta incorreta'}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Confetti */}
          {confetti.map((p) => (
            <div
              key={p.id}
              className="confetti-piece pointer-events-none"
              style={{
                left: `${p.x}%`,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
                animationDuration: `${1.5 + Math.random()}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}

          {/* Panel */}
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={cn(
              'relative w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl overflow-hidden max-h-[92dvh] flex flex-col',
              isCorrect ? 'bg-white' : 'bg-white'
            )}
          >
            {/* Header band */}
            <div
              className={cn(
                'px-6 py-5 flex items-center gap-4',
                isCorrect ? 'gradient-success' : 'gradient-danger'
              )}
            >
              {isCorrect ? (
                <CheckCircle size={44} className="text-white flex-shrink-0" />
              ) : (
                <XCircle size={44} className="text-white flex-shrink-0" />
              )}
              <div>
                <p className="text-white font-black text-2xl leading-none">
                  {isCorrect ? 'CORRETO! 🎉' : 'OPS! Errado!'}
                </p>
                {pointsEarned > 0 && (
                  <p className="text-white/90 font-semibold text-lg mt-1">
                    +{pointsEarned} pontos ganhos!
                  </p>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
              <div>
                <p className="font-bold text-gray-800 text-base mb-1">{title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{explanation}</p>
              </div>

              {redFlags && redFlags.length > 0 && (
                <RedFlagList flags={redFlags} />
              )}
            </div>

            {/* Actions */}
            <div className="px-5 pb-6 pt-3 flex flex-col gap-3 border-t border-gray-100">
              <button
                onClick={onNext}
                className={cn(
                  'btn-primary w-full justify-center',
                  isCorrect ? 'bg-success-DEFAULT hover:bg-green-700' : 'bg-primary-700'
                )}
              >
                {isLastRound ? 'Ver Resultado Final' : nextLabel}
                <ChevronRight size={22} />
              </button>
              {onHome && (
                <button onClick={onHome} className="btn-ghost w-full justify-center">
                  <Home size={20} /> Voltar ao Início
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
