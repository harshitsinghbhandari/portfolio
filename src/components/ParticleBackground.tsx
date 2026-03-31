import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  alpha: number
  color: string
  reset: (w: number, h: number) => void
  update: (w: number, h: number) => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

const createParticle = (w: number, h: number): Particle => {
  const reset = (width: number, height: number) => {
    particle.x = Math.random() * width
    particle.y = Math.random() * height
    particle.size = Math.random() * 1.5 + 0.3
    particle.speedX = (Math.random() - 0.5) * 0.4
    particle.speedY = (Math.random() - 0.5) * 0.4
    particle.alpha = Math.random() * 0.5 + 0.1
    const rand = Math.random()
    particle.color = rand > 0.6 ? '#a855f7' : rand > 0.5 ? '#e879f9' : '#7c3aed'
  }

  const particle: Particle = {
    x: 0,
    y: 0,
    size: 0,
    speedX: 0,
    speedY: 0,
    alpha: 0,
    color: '',
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
      ctx.fillStyle = this.color
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
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = window.innerWidth
    let h = window.innerHeight
    canvas.width = w
    canvas.height = h

    // Initialize particles
    particlesRef.current = Array.from({ length: 120 }, () => createParticle(w, h))
    mouseRef.current = { x: w / 2, y: h / 2 }

    const handleResize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const drawConnections = () => {
      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.save()
            ctx.globalAlpha = ((1 - dist / 120) * 0.08)
            ctx.strokeStyle = '#7c3aed'
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      // Nebula gradient following mouse
      const grad = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        400
      )
      grad.addColorStop(0, 'rgba(61,26,110,0.08)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // Secondary nebula
      const grad2 = ctx.createRadialGradient(w * 0.8, h * 0.2, 0, w * 0.8, h * 0.2, 500)
      grad2.addColorStop(0, 'rgba(124,58,237,0.05)')
      grad2.addColorStop(1, 'transparent')
      ctx.fillStyle = grad2
      ctx.fillRect(0, 0, w, h)

      drawConnections()
      particlesRef.current.forEach((p) => {
        p.update(w, h)
        p.draw(ctx)
      })

      requestAnimationFrame(animate)
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('mousemove', handleMouseMove)
    const rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      className="fixed top-0 left-0 w-full h-full z-0 opacity-70"
    />
  )
}

export default ParticleBackground
