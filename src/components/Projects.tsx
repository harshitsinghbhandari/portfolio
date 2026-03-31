import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

const Projects = () => {
  return (
    <section id="projects" className="relative z-[1] py-[120px] px-[60px]">
      <div className="flex items-baseline gap-6 mb-16 reveal">
        <span className="text-[11px] tracking-[3px] text-purple-light">03</span>
        <h2 className="font-syne text-[clamp(40px,5vw,72px)] font-extrabold tracking-[-2px] leading-[1]">
          Work
        </h2>
        <div className="flex-1 h-px bg-purple/20" />
      </div>

      <div className="grid grid-cols-2 gap-0.5 max-[900px]:grid-cols-1">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} index={idx} />
        ))}
      </div>
    </section>
  )
}

export default Projects
