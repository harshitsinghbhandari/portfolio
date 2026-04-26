import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'

const SectionDivider = () => (
  <div className="w-full px-6 md:px-10 lg:px-[60px] max-w-content mx-auto">
    <div className="h-px bg-gradient-to-r from-transparent via-purple/20 to-transparent" />
  </div>
)

const Home = () => {
  return (
    <>
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Contact />
    </>
  )
}

export default Home
