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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-xl transition-all duration-300 ${
        scrolled ? 'border-b border-purple/20' : 'border-b border-transparent'
      }`}
    >
      <nav className="flex justify-between items-center px-6 md:px-10 lg:px-[60px] py-6 max-w-content mx-auto" aria-label="Main navigation">
        {isHome ? (
          <a href="#hero" className="font-syne font-extrabold text-lg tracking-tight gradient-text">
            HS
          </a>
        ) : (
          <Link to="/" className="font-syne font-extrabold text-lg tracking-tight gradient-text no-underline">
            HS
          </Link>
        )}

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-10 list-none">
          {sectionLinks.map((link) => (
            <li key={link.name}>
              <a
                href={isHome ? link.hash : `/${link.hash}`}
                className="text-xs tracking-tag uppercase text-muted no-underline transition-colors duration-300 relative hover:text-cream focus-visible:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/blogs"
              className={`text-xs tracking-tag uppercase no-underline transition-colors duration-300 relative hover:text-cream focus-visible:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-accent after:transition-all after:duration-300 hover:after:w-full ${
                location.pathname.startsWith('/blogs') ? 'text-cream after:w-full' : 'text-muted'
              }`}
            >
              Blog
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light rounded-sm"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`block w-5 h-px bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
          <span className={`block w-5 h-px bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-80 border-t border-purple/20' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-6 px-6 py-8 list-none">
          {sectionLinks.map((link) => (
            <li key={link.name}>
              <a
                href={isHome ? link.hash : `/${link.hash}`}
                onClick={handleLinkClick}
                className="text-sm tracking-tag uppercase text-muted no-underline transition-colors duration-300 hover:text-cream focus-visible:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light rounded-sm"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/blogs"
              onClick={handleLinkClick}
              className={`text-sm tracking-tag uppercase no-underline transition-colors duration-300 hover:text-cream focus-visible:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light rounded-sm ${
                location.pathname.startsWith('/blogs') ? 'text-cream' : 'text-muted'
              }`}
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
