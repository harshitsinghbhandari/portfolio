import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

const Projects = () => {
  return (
    <section id="projects" className="relative z-[1] py-20 lg:py-32 px-6 md:px-10 lg:px-[60px] max-w-content mx-auto">
      <div className="flex items-baseline gap-6 mb-12 lg:mb-16 reveal">
        <span className="font-mono text-2xs tracking-tag text-muted">03</span>
        <h2 className="font-display text-h2 font-medium text-text">
          Work
        </h2>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10">
        {projects.map((project) => (
          <ProjectCard key={project.num} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
