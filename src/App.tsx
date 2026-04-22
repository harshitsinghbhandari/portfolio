import { useEffect } from 'react'
import CustomCursor from './components/CustomCursor'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

const SectionDivider = () => (
  <div className="w-full px-6 md:px-10 lg:px-[60px] max-w-content mx-auto">
    <div className="h-px bg-gradient-to-r from-transparent via-purple/20 to-transparent" />
  </div>
)

function App() {
  useEffect(() => {
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
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <CustomCursor />
      <ParticleBackground />
      <Navbar />
      <main id="main-content">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Contact />
      </main>
    </div>
  )
}

export default App
