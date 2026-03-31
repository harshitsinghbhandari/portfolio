import { useEffect, useState } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-[60px] py-6 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? 'border-b border-purple/20' : 'border-b border-transparent'
      }`}
    >
      <div className="font-syne font-extrabold text-lg tracking-tight gradient-text">
        HS
      </div>
      <ul className="flex gap-10 list-none">
        {[
          { name: 'About', href: '#about' },
          { name: 'Work', href: '#projects' },
          { name: 'Stack', href: '#skills' },
          { name: 'Contact', href: '#contact' },
        ].map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="text-xs tracking-[2px] uppercase text-muted no-underline transition-colors duration-300 relative hover:text-white after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
