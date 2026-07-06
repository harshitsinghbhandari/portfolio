import { ImageResponse } from 'next/og'
import path from 'node:path'
import { getDocBySlug, getSlugs, formatDocDate } from '@/lib/content'

export const runtime = 'nodejs'
export const alt = 'Work by Harshit Singh'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const WORK_DIR = path.join(process.cwd(), 'content', 'work')

export function generateStaticParams() {
  return getSlugs(WORK_DIR).map((slug) => ({ slug }))
}

export default function OgImage({ params }: { params: { slug: string } }) {
  const doc = getDocBySlug(WORK_DIR, params.slug)
  const title = doc?.title ?? 'Work'
  const date = doc ? formatDocDate(doc.date) : ''
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: '#0a0a0b',
          color: '#ededef',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, color: '#8a8a93' }}>
          <div style={{ width: 14, height: 14, borderRadius: 9999, background: '#9d8cf0' }} />
          Harshit Singh · Work
        </div>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#8a8a93' }}>{date}</div>
      </div>
    ),
    { ...size },
  )
}
