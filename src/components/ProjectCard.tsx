import { Project } from '../data/projects'
import ArrowLink from './ui/ArrowLink'
import Tag from './ui/Tag'

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const wide = project.featured || project.fullWidth

  return (
    <article
      className={`reveal p-8 lg:p-12 bg-bg relative transition-colors duration-200 hover:bg-bg2 ${
        wide ? 'lg:col-span-2' : ''
      }`}
    >
      <p className="font-mono text-2xs tracking-tag uppercase text-muted mb-6">{project.num}</p>
      <h3 className="font-display text-h3 font-medium text-text mb-3 whitespace-pre-line">
        {project.title}
      </h3>
      <p className="font-display italic text-base text-muted mb-5">{project.subtitle}</p>
      <p className="text-sm text-text/75 mb-7 max-w-2xl">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-7">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <ArrowLink href={project.link}>{project.linkText}</ArrowLink>
    </article>
  )
}

export default ProjectCard
