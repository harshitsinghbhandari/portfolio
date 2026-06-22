import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Harshit Singh: Systems, Agents, Local-first AI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0a0a0b',
          color: '#ededef',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28, color: '#8a8a93' }}>
          <div style={{ width: 14, height: 14, borderRadius: 9999, background: '#e63946' }} />
          theharshitsingh.com
        </div>
        <div style={{ display: 'flex', fontSize: 96, fontWeight: 700, marginTop: 24, letterSpacing: '-0.03em' }}>
          Harshit Singh
        </div>
        <div style={{ display: 'flex', fontSize: 40, marginTop: 16, color: '#8a8a93' }}>
          Systems, agents, and local-first AI
        </div>
        <div style={{ display: 'flex', fontSize: 28, marginTop: 40, color: '#8a8a93' }}>IIT Bombay</div>
      </div>
    ),
    { ...size },
  )
}
