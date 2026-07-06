import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0b',
          color: '#c8443f',
          fontSize: 120,
          fontWeight: 700,
          fontFamily: 'sans-serif',
        }}
      >
        H
      </div>
    ),
    { ...size },
  )
}
