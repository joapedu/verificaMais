'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SwipeCardProps {
  children: React.ReactNode
  onSwipeLeft: () => void
  onSwipeRight: () => void
  threshold?: number
  className?: string
  disabled?: boolean
}

export function SwipeCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  threshold = 80,
  className,
  disabled = false,
}: SwipeCardProps) {
  const x = useMotionValue(0)
  const controls = useAnimation()
  const isDragging = useRef(false)

  const rotate = useTransform(x, [-200, 200], [-20, 20])
  const leftOpacity = useTransform(x, [-threshold, -threshold / 2, 0], [1, 0.6, 0])
  const rightOpacity = useTransform(x, [0, threshold / 2, threshold], [0, 0.6, 1])
  const cardScale = useTransform(x, [-200, 0, 200], [0.95, 1, 0.95])

  const handleDragEnd = async (_: unknown, info: { offset: { x: number } }) => {
    isDragging.current = false
    const offset = info.offset.x
    if (disabled) return

    if (offset < -threshold) {
      await controls.start({ x: -600, opacity: 0, transition: { duration: 0.3 } })
      onSwipeLeft()
    } else if (offset > threshold) {
      await controls.start({ x: 600, opacity: 0, transition: { duration: 0.3 } })
      onSwipeRight()
    } else {
      await controls.start({ x: 0, rotate: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } })
    }
  }

  return (
    <div className="relative select-none touch-none">
      {/* Left indicator — FALSA */}
      <motion.div
        style={{ opacity: leftOpacity }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="bg-danger-DEFAULT text-white font-black text-2xl px-5 py-3 rounded-2xl rotate-[-12deg] border-4 border-white shadow-xl">
          ← FALSA
        </div>
      </motion.div>

      {/* Right indicator — REAL */}
      <motion.div
        style={{ opacity: rightOpacity }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="bg-success-DEFAULT text-white font-black text-2xl px-5 py-3 rounded-2xl rotate-[12deg] border-4 border-white shadow-xl">
          REAL →
        </div>
      </motion.div>

      {/* Draggable card */}
      <motion.div
        drag={disabled ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        style={{ x, rotate, scale: cardScale }}
        animate={controls}
        onDragStart={() => { isDragging.current = true }}
        onDragEnd={handleDragEnd}
        className={cn('cursor-grab active:cursor-grabbing', className)}
        whileDrag={{ scale: 1.02 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
