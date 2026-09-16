import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/person'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Harshit Singh',
    template: '%s · Harshit Singh',
  },
  description: SITE_DESCRIPTION,
  // Search engine ownership verification. Paste tokens and uncomment.
  // Google Search Console: https://search.google.com/search-console
  // Bing Webmaster Tools: https://www.bing.com/webmasters
  // verification: {
  //   google: 'PASTE_GOOGLE_SEARCH_CONSOLE_TOKEN_HERE',
  //   other: { 'msvalidate.01': 'PASTE_BING_WEBMASTER_TOKEN_HERE' },
  // },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Harshit Singh',
    title: 'Harshit Singh',
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harshit Singh',
    description: SITE_DESCRIPTION,
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
