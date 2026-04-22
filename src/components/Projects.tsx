import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

const Projects = () => {
  return (
    <section id="projects" className="relative z-[1] py-16 lg:py-[120px] px-6 md:px-10 lg:px-[60px] max-w-content mx-auto">
      <div className="flex items-baseline gap-6 mb-12 lg:mb-16 reveal">
        <span className="text-xs tracking-[3px] text-purple-light">03</span>
        <h2 className="font-syne text-[clamp(40px,5vw,72px)] font-extrabold tracking-[-2px] leading-[1]">
          Work
        </h2>
        <div className="flex-1 h-px bg-purple/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0.5">
        {projects.map((project) => (
          <ProjectCard key={project.num} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
