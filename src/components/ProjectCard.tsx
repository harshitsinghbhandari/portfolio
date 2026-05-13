import { Project } from '../data/projects'

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
          <span
            key={tag}
            className="font-mono text-2xs tracking-tag uppercase px-2.5 py-1 border border-white/10 rounded-sm text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-mono text-2xs tracking-tag uppercase text-text no-underline transition-all duration-200 hover:gap-3 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
      >
        {project.linkText}
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </article>
  )
}

export default ProjectCard
