import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { feedAlternates } from '@/lib/person'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://theharshitsingh.com'),
  title: {
    default: 'Harshit Singh: Systems, Agents, Local-first AI',
    template: '%s · Harshit Singh',
  },
  description:
    'Harshit Singh (Harshit Singh Bhandari) builds systems, agents, and local-first AI: Agent Orchestrator, Donna, Aegis. IEOR undergrad at IIT Bombay.',
  alternates: { types: feedAlternates },
  // Search engine ownership verification. Paste tokens and uncomment.
  // Google Search Console: https://search.google.com/search-console
  // Bing Webmaster Tools: https://www.bing.com/webmasters
  // verification: {
  //   google: 'PASTE_GOOGLE_SEARCH_CONSOLE_TOKEN_HERE',
  //   other: { 'msvalidate.01': 'PASTE_BING_WEBMASTER_TOKEN_HERE' },
  // },
  openGraph: {
    type: 'website',
    url: 'https://theharshitsingh.com',
    siteName: 'Harshit Singh',
    title: 'Harshit Singh: Systems, Agents, Local-first AI',
    description: 'Harshit Singh (Harshit Singh Bhandari): systems, agents, and local-first AI. IIT Bombay.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harshit Singh: Systems, Agents, Local-first AI',
    description: 'Harshit Singh (Harshit Singh Bhandari): systems, agents, and local-first AI. IIT Bombay.',
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} dark`}>
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
      </body>
    </html>
  )
}
