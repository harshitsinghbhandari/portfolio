import { useEffect } from 'react'
import CustomCursor from './components/CustomCursor'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
  useEffect(() => {
    // Initialize scroll reveal
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    reveals.forEach((r) => observer.observe(r))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative">
      <CustomCursor />
      <ParticleBackground />
      <Navbar />
      <Hero />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple/20 to-transparent mx-auto" style={{ width: 'calc(100% - 120px)', marginLeft: '60px' }} />
      <About />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple/20 to-transparent mx-auto" style={{ width: 'calc(100% - 120px)', marginLeft: '60px' }} />
      <Skills />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple/20 to-transparent mx-auto" style={{ width: 'calc(100% - 120px)', marginLeft: '60px' }} />
      <Projects />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple/20 to-transparent mx-auto" style={{ width: 'calc(100% - 120px)', marginLeft: '60px' }} />
      <Contact />
    </div>
  )
}

export default App
