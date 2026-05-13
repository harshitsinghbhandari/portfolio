import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const sectionLinks = [
  { name: 'About', hash: '#about' },
  { name: 'Work', hash: '#projects' },
  { name: 'Stack', hash: '#skills' },
  { name: 'Contact', hash: '#contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  const linkClass = (active: boolean) =>
    `font-mono text-2xs tracking-tag uppercase no-underline transition-colors duration-200 ${
      active ? 'text-text' : 'text-muted hover:text-text'
    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm`

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-xl transition-colors duration-300 ${
        scrolled ? 'bg-bg/70 border-b border-white/[0.06]' : 'border-b border-transparent'
      }`}
    >
      <nav className="flex justify-between items-center px-6 md:px-10 lg:px-[60px] py-5 max-w-content mx-auto" aria-label="Main navigation">
        {isHome ? (
          <a href="#hero" className="font-display font-medium text-lg tracking-tight text-text no-underline">
            HS
          </a>
        ) : (
          <Link to="/" className="font-display font-medium text-lg tracking-tight text-text no-underline">
            HS
          </Link>
        )}

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 list-none">
          {sectionLinks.map((link) => (
            <li key={link.name}>
              <a href={isHome ? link.hash : `/${link.hash}`} className={linkClass(false)}>
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <Link to="/blogs" className={linkClass(location.pathname.startsWith('/blogs'))}>
              Blog
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`block w-5 h-px bg-text transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
          <span className={`block w-5 h-px bg-text transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-text transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-80 border-t border-white/[0.06]' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-6 px-6 py-8 list-none">
          {sectionLinks.map((link) => (
            <li key={link.name}>
              <a
                href={isHome ? link.hash : `/${link.hash}`}
                onClick={handleLinkClick}
                className={linkClass(false).replace('text-2xs', 'text-sm')}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/blogs"
              onClick={handleLinkClick}
              className={linkClass(location.pathname.startsWith('/blogs')).replace('text-2xs', 'text-sm')}
            >
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
