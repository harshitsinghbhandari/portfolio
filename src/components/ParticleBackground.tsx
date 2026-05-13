import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  alpha: number
  reset: (w: number, h: number) => void
  update: (w: number, h: number) => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

const createParticle = (w: number, h: number): Particle => {
  const reset = (width: number, height: number) => {
    particle.x = Math.random() * width
    particle.y = Math.random() * height
    particle.size = Math.random() * 1.1 + 0.2
    particle.speedX = (Math.random() - 0.5) * 0.25
    particle.speedY = (Math.random() - 0.5) * 0.25
    particle.alpha = Math.random() * 0.35 + 0.08
  }

  const particle: Particle = {
    x: 0,
    y: 0,
    size: 0,
    speedX: 0,
    speedY: 0,
    alpha: 0,
    reset,
    update(width: number, height: number) {
      this.x += this.speedX
      this.y += this.speedY
      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset(width, height)
      }
    },
    draw(ctx: CanvasRenderingContext2D) {
      ctx.save()
      ctx.globalAlpha = this.alpha
      ctx.fillStyle = '#e8e6e3'
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    },
  }

  particle.reset(w, h)
  return particle
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = window.innerWidth
    let h = window.innerHeight
    canvas.width = w
    canvas.height = h

    const particleCount = w < 768 ? 20 : 60
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle(w, h))

    let rafId: number
    let paused = false

    const handleResize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        paused = true
        cancelAnimationFrame(rafId)
      } else {
        paused = false
        rafId = requestAnimationFrame(animate)
      }
    }

    const animate = () => {
      if (paused) return

      ctx.clearRect(0, 0, w, h)
      particlesRef.current.forEach((p) => {
        p.update(w, h)
        p.draw(ctx)
      })

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      className="fixed top-0 left-0 w-full h-full z-0 opacity-50 pointer-events-none"
      aria-hidden="true"
    />
  )
}

export default ParticleBackground
