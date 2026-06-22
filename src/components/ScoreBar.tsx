'use client'

import { cn } from '@/lib/utils'

interface ScoreBarProps {
  current: number
  total: number
  score: number
  label?: string
  className?: string
}

export function ScoreBar({ current, total, score, label = 'Rodada', className }: ScoreBarProps) {
  const pct = Math.round((current / total) * 100)

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-600">
          {label} {current} de {total}
        </span>
        <span className="text-sm font-bold text-primary-700">⭐ {score} pontos</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`${label} ${current} de ${total}`}
        />
      </div>
    </div>
  )
}

interface RoundBadgesProps {
  total: number
  current: number
  results: ('correct' | 'wrong' | 'pending')[]
  className?: string
}

export function RoundBadges({ total, current, results, className }: RoundBadgesProps) {
  return (
    <div className={cn('flex gap-1.5 flex-wrap justify-center', className)}>
      {Array.from({ length: total }, (_, i) => {
        const result = results[i]
        return (
          <div
            key={i}
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300',
              i < current && result === 'correct' && 'bg-success-DEFAULT text-white border-success-DEFAULT',
              i < current && result === 'wrong' && 'bg-danger-DEFAULT text-white border-danger-DEFAULT',
              i === current && 'bg-primary-700 text-white border-primary-700 scale-110',
              i > current && 'bg-gray-100 text-gray-400 border-gray-200'
            )}
            aria-label={`Rodada ${i + 1}: ${result === 'correct' ? 'acerto' : result === 'wrong' ? 'erro' : 'pendente'}`}
          >
            {i < current && result === 'correct' ? '✓' : i < current && result === 'wrong' ? '✗' : i + 1}
          </div>
        )
      })}
    </div>
  )
}
