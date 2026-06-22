'use client'

import { cn } from '@/lib/utils'
import type { ChatMessage } from '@/data/jogo1'

interface ChatBubbleProps {
  contactName: string
  contactEmoji: string
  messages: ChatMessage[]
  showRedFlags?: boolean
  className?: string
}

export function ChatBubble({
  contactName,
  contactEmoji,
  messages,
  showRedFlags = false,
  className,
}: ChatBubbleProps) {
  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* WhatsApp-style header */}
      <div className="flex items-center gap-3 bg-primary-800 text-white px-4 py-3 rounded-t-2xl">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl flex-shrink-0">
          {contactEmoji}
        </div>
        <div>
          <p className="font-bold text-sm leading-none">{contactName}</p>
          <p className="text-xs text-primary-200 mt-0.5">Online</p>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 bg-[#e5ddd5] px-3 py-4 flex flex-col gap-2 overflow-y-auto rounded-b-2xl min-h-[200px]">
        {messages.map((msg) => {
          const isHighlighted = showRedFlags && msg.isRedFlag
          return (
            <div
              key={msg.id}
              className={cn('flex', msg.isFromContact ? 'justify-start' : 'justify-end')}
            >
              <div
                className={cn(
                  'max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm',
                  msg.isFromContact
                    ? 'bg-white text-gray-800 rounded-tl-sm'
                    : 'bg-primary-600 text-white rounded-tr-sm',
                  isHighlighted &&
                    'ring-2 ring-danger-DEFAULT bg-danger-light text-danger-dark ring-offset-1'
                )}
                role={isHighlighted ? 'alert' : undefined}
              >
                {isHighlighted && (
                  <span className="inline-block text-danger-DEFAULT font-bold text-xs mb-1 block">
                    ⚠️ SINAL DE ALERTA
                  </span>
                )}
                {msg.text}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
