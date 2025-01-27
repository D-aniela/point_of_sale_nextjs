import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js POS',
  description: 'A point of sale system built with Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className={`${outfit.className} bg-gray-200`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
