import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import Section from './ui/Section'
import SectionHeader from './ui/SectionHeader'

const Projects = () => {
  return (
    <Section id="projects">
      <SectionHeader number="03" title="Work" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10">
        {projects.map((project) => (
          <ProjectCard key={project.num} project={project} />
        ))}
      </div>
    </Section>
  )
}

export default Projects
