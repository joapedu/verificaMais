'use client'

import { useEffect } from 'react'
import { useGameStore } from '@/store/gameStore'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const { fontScale, highContrast } = useGameStore()

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', String(fontScale))
  }, [fontScale])

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('hc')
    } else {
      document.documentElement.classList.remove('hc')
    }
  }, [highContrast])

  return <>{children}</>
}
