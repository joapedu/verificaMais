'use client'

import { AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RedFlagBadgeProps {
  text: string
  index?: number
  className?: string
}

export function RedFlagBadge({ text, index, className }: RedFlagBadgeProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 bg-danger-light border border-danger-DEFAULT/20 rounded-2xl px-4 py-3',
        className
      )}
      style={{ animationDelay: `${(index ?? 0) * 100}ms` }}
    >
      <AlertTriangle
        size={20}
        className="text-danger-DEFAULT mt-0.5 flex-shrink-0"
        aria-hidden="true"
      />
      <p className="text-danger-dark font-medium text-sm leading-snug">{text}</p>
    </div>
  )
}

interface RedFlagListProps {
  flags: string[]
  title?: string
  className?: string
}

export function RedFlagList({ flags, title = '⚠️ Sinais de alerta encontrados:', className }: RedFlagListProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {title && (
        <p className="font-bold text-danger-dark text-base mb-1">{title}</p>
      )}
      {flags.map((flag, i) => (
        <RedFlagBadge key={i} text={flag} index={i} />
      ))}
    </div>
  )
}
