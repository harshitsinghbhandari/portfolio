import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Newsreader } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://theharshitsingh.com'),
  title: {
    default: 'Harshit Singh: Systems, Agents, Local-first AI',
    template: '%s · Harshit Singh',
  },
  description:
    'Harshit Singh: building systems, agents, and local-first AI. IIT Bombay.',
  openGraph: {
    type: 'website',
    url: 'https://theharshitsingh.com',
    siteName: 'Harshit Singh',
    title: 'Harshit Singh: Systems, Agents, Local-first AI',
    description: 'Building systems, agents, and local-first AI. IIT Bombay.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harshit Singh: Systems, Agents, Local-first AI',
    description: 'Building systems, agents, and local-first AI.',
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${newsreader.variable} dark`}
    >
      <body className="min-h-dvh bg-bg text-text antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-1 focus:text-bg"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
