'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GameScores {
  jogo1: number
  jogo2: number
  jogo3: number
}

interface GameState {
  scores: GameScores
  totalScore: number
  fontScale: number
  highContrast: boolean
  addScore: (points: number, game: keyof GameScores) => void
  setFontScale: (scale: number) => void
  toggleHighContrast: () => void
  resetAll: () => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      scores: { jogo1: 0, jogo2: 0, jogo3: 0 },
      totalScore: 0,
      fontScale: 1,
      highContrast: false,

      addScore: (points, game) =>
        set((state) => ({
          scores: { ...state.scores, [game]: state.scores[game] + points },
          totalScore: state.totalScore + points,
        })),

      setFontScale: (scale) => set({ fontScale: scale }),

      toggleHighContrast: () =>
        set((state) => ({ highContrast: !state.highContrast })),

      resetAll: () =>
        set({ scores: { jogo1: 0, jogo2: 0, jogo3: 0 }, totalScore: 0 }),
    }),
    { name: 'verifica-mais-v1' }
  )
)
