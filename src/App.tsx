import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal:not(.visible)')
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
  }, [pathname])

  return (
    <div className="relative">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollToTop />
      <ParticleBackground />
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
