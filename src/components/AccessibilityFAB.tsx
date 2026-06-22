'use client'

import { useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import { Settings, ZoomIn, ZoomOut, Sun, Moon, X } from 'lucide-react'

export function AccessibilityFAB() {
  const [open, setOpen] = useState(false)
  const { fontScale, setFontScale, highContrast, toggleHighContrast } = useGameStore()

  const scales = [
    { value: 1, label: 'A', title: 'Fonte Normal' },
    { value: 1.2, label: 'A+', title: 'Fonte Grande' },
    { value: 1.45, label: 'A++', title: 'Fonte Muito Grande' },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-5 flex flex-col gap-4 min-w-[240px] animate-bounce-in">
          <p className="font-bold text-gray-700 text-base">Acessibilidade</p>

          {/* Font size */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Tamanho do texto</p>
            <div className="flex gap-2">
              {scales.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setFontScale(s.value)}
                  title={s.title}
                  aria-label={s.title}
                  className={`flex-1 min-h-[52px] rounded-xl font-bold transition-all duration-200 border-2 text-[${s.value * 14}px] ${
                    fontScale === s.value
                      ? 'bg-primary-700 text-white border-primary-700 shadow-glow-primary'
                      : 'bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* High contrast */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Modo de exibição</p>
            <button
              onClick={toggleHighContrast}
              aria-label={highContrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
              className={`w-full min-h-[52px] rounded-xl font-semibold flex items-center justify-center gap-2 border-2 transition-all duration-200 ${
                highContrast
                  ? 'bg-gray-900 text-white border-gray-700 hover:bg-black'
                  : 'bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200'
              }`}
            >
              {highContrast ? (
                <>
                  <Moon size={18} /> Alto Contraste Ativo
                </>
              ) : (
                <>
                  <Sun size={18} /> Ativar Alto Contraste
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fechar opções de acessibilidade' : 'Abrir opções de acessibilidade'}
        className="w-16 h-16 rounded-full bg-primary-700 hover:bg-primary-800 text-white shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
      >
        {open ? <X size={24} /> : <Settings size={24} />}
      </button>
    </div>
  )
}
