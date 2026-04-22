import { useEffect, useRef, useState } from 'react'

const isTouchDevice = () =>
  'ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ mx: 0, my: 0, tx: 0, ty: 0 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (isTouchDevice()) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    setEnabled(true)
    document.body.classList.add('custom-cursor-active')

    const cursor = cursorRef.current
    const trail = trailRef.current
    if (!cursor || !trail) return

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.mx = e.clientX
      posRef.current.my = e.clientY
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    const animateTrail = () => {
      const { mx, my, tx, ty } = posRef.current
      posRef.current.tx += (mx - tx) * 0.15
      posRef.current.ty += (my - ty) * 0.15
      trail.style.left = posRef.current.tx + 'px'
      trail.style.top = posRef.current.ty + 'px'
      requestAnimationFrame(animateTrail)
    }

    document.addEventListener('mousemove', handleMouseMove)
    const rafId = requestAnimationFrame(animateTrail)

    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .project-card, .skill-tag, .stat')

    const handleMouseEnter = () => {
      cursor.style.width = '20px'
      cursor.style.height = '20px'
      trail.style.width = '60px'
      trail.style.height = '60px'
      trail.style.borderColor = 'rgba(232,121,249,0.6)'
    }

    const handleMouseLeave = () => {
      cursor.style.width = '12px'
      cursor.style.height = '12px'
      trail.style.width = '36px'
      trail.style.height = '36px'
      trail.style.borderColor = 'rgba(168,85,247,0.5)'
    }

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.body.classList.remove('custom-cursor-active')
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={cursorRef}
        id="cursor"
        className="fixed w-3 h-3 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out mix-blend-screen"
        style={{ transitionProperty: 'transform, width, height, opacity' }}
        aria-hidden="true"
      />
      <div
        ref={trailRef}
        id="cursor-trail"
        className="fixed w-9 h-9 border border-purple-light/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out mix-blend-screen"
        aria-hidden="true"
      />
    </>
  )
}

export default CustomCursor
