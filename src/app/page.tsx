'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShieldCheck, MessageSquare, Newspaper, Search, Trophy, RotateCcw, Star } from 'lucide-react'
import { useGameStore } from '@/store/gameStore'
import { AccessibilityFAB } from '@/components/AccessibilityFAB'

const games = [
  {
    id: 1,
    href: '/jogo1',
    title: 'Escolha o Golpe',
    description: 'Compare duas conversas de WhatsApp e identifique qual é uma tentativa de golpe.',
    Icon: MessageSquare,
    gradient: 'from-blue-600 to-primary-700',
    badge: '10 Rodadas',
    emoji: '🎯',
    scoreKey: 'jogo1' as const,
  },
  {
    id: 2,
    href: '/jogo2',
    title: 'Deslize a Notícia',
    description: 'Arraste para a esquerda se for fake news ou para a direita se for uma notícia real.',
    Icon: Newspaper,
    gradient: 'from-orange-500 to-amber-500',
    badge: '20 Cards',
    emoji: '📰',
    scoreKey: 'jogo2' as const,
  },
  {
    id: 3,
    href: '/jogo3',
    title: 'Jogo das Pistas',
    description: 'Descubra se é golpe, fake news ou verdade usando o menor número de pistas possível.',
    Icon: Search,
    gradient: 'from-green-500 to-success-DEFAULT',
    badge: '20 Rodadas',
    emoji: '🔍',
    scoreKey: 'jogo3' as const,
  },
]

export default function Home() {
  const { totalScore, scores, resetAll } = useGameStore()

  const handleReset = () => {
    if (window.confirm('Deseja zerar toda a sua pontuação? Esta ação não pode ser desfeita.')) {
      resetAll()
    }
  }

  return (
    <div className="min-h-screen gradient-hero flex flex-col pb-24">
      {/* Hero header */}
      <header className="pt-14 pb-8 px-5 text-center text-white">
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <ShieldCheck size={48} className="text-blue-300 animate-float" aria-hidden="true" />
          <h1 className="font-black text-game-4xl tracking-tight text-shadow">VerificaMais</h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-primary-200 text-game-lg max-w-xs mx-auto leading-snug"
        >
          Aprenda a se proteger de golpes digitais e notícias falsas
        </motion.p>

        {totalScore > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="mt-5 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-3"
          >
            <Trophy size={22} className="text-yellow-400" aria-hidden="true" />
            <span className="font-bold text-white text-game-base">
              {totalScore} pontos acumulados!
            </span>
          </motion.div>
        )}
      </header>

      {/* Instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="text-white/70 text-game-base text-center px-4 mb-5"
      >
        Escolha um jogo para começar:
      </motion.p>

      {/* Game cards */}
      <main className="flex-1 px-4 max-w-xl mx-auto w-full flex flex-col gap-4">
        {games.map((game, i) => {
          const gameScore = scores[game.scoreKey]
          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12, type: 'spring', damping: 18 }}
            >
              <Link href={game.href} className="block no-underline group">
                <div className="bg-white rounded-3xl shadow-card group-hover:shadow-card-hover transition-all duration-300 group-hover:-translate-y-1 active:scale-[0.98] overflow-hidden">
                  {/* Color strip */}
                  <div className={`h-2 bg-gradient-to-r ${game.gradient}`} />

                  <div className="p-5 flex gap-4 items-start">
                    {/* Icon circle */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}
                      aria-hidden="true"
                    >
                      <span className="text-3xl">{game.emoji}</span>
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1.5">
                        <h2 className="font-black text-gray-900 text-game-xl leading-none">
                          {game.title}
                        </h2>
                        <span className="text-xs font-semibold bg-gray-100 text-gray-600 rounded-full px-2.5 py-1 flex-shrink-0 mt-0.5">
                          {game.badge}
                        </span>
                      </div>
                      <p className="text-gray-600 text-game-sm leading-snug mb-4">
                        {game.description}
                      </p>

                      <div className="flex items-center justify-between">
                        {gameScore > 0 ? (
                          <span className="text-sm text-success-DEFAULT font-bold flex items-center gap-1">
                            <Star size={14} fill="currentColor" aria-hidden="true" />
                            {gameScore} pts ganhos
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">Ainda não jogado</span>
                        )}
                        <div
                          className={`bg-gradient-to-r ${game.gradient} text-white font-bold text-sm px-4 py-2 rounded-xl flex items-center gap-2`}
                        >
                          Jogar <game.Icon size={16} aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}

        {totalScore > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="text-center mt-4"
          >
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors py-2 px-4"
              aria-label="Zerar pontuação"
            >
              <RotateCcw size={14} aria-hidden="true" />
              Zerar pontuação
            </button>
          </motion.div>
        )}
      </main>

      <AccessibilityFAB />
    </div>
  )
}
