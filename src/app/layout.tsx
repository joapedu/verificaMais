import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ClientProviders } from '@/components/ClientProviders'

export const metadata: Metadata = {
  title: 'VerificaMais — Aprenda a se proteger',
  description:
    'Sistema educativo de conscientização sobre golpes digitais e fake news, criado especialmente para a terceira idade.',
  keywords: ['fake news', 'golpes', 'idosos', 'conscientização', 'segurança digital'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1e3a8a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
