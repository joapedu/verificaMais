'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { useGameStore } from '@/store/gameStore'

interface NavBarProps {
  title?: string
  showBack?: boolean
  backHref?: string
  rightSlot?: React.ReactNode
}

export function NavBar({ title, showBack = true, backHref = '/', rightSlot }: NavBarProps) {
  const router = useRouter()
  const { totalScore } = useGameStore()

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left */}
        {showBack ? (
          <button
            onClick={() => (backHref ? router.push(backHref) : router.back())}
            aria-label="Voltar"
            className="touch-target rounded-2xl hover:bg-gray-100 transition-colors text-gray-700"
          >
            <ArrowLeft size={28} strokeWidth={2.5} />
          </button>
        ) : (
          <Link href="/" className="flex items-center gap-2 text-primary-800 font-black text-lg no-underline">
            <ShieldCheck size={28} className="text-primary-700" />
            <span className="hidden sm:block">VerificaMais</span>
          </Link>
        )}

        {/* Center */}
        {title && (
          <h1 className="flex-1 text-center font-bold text-gray-800 text-base leading-tight line-clamp-1">
            {title}
          </h1>
        )}

        {/* Right */}
        <div className="flex items-center gap-2 min-w-[60px] justify-end">
          {rightSlot || (
            <div className="text-right">
              <span className="text-xs text-gray-500 block leading-none">⭐ Total</span>
              <span className="font-black text-primary-700 text-base leading-tight">{totalScore} pts</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
