import { useEffect, useRef } from 'react'
import { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      card.style.transform = `
        perspective(800px)
        rotateY(${x * 8}deg)
        rotateX(${-y * 8}deg)
        translateY(-4px)
      `

      // Update radial gradient position
      const pctX = ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%'
      const pctY = ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%'
      card.style.setProperty('--mx', pctX)
      card.style.setProperty('--my', pctY)
    }

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)'
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`project-card reveal p-12 border border-purple/20 bg-white/[0.01] relative overflow-hidden transition-all duration-[400ms] cursor-pointer transform-3d ${
        project.featured ? 'col-span-2 bg-gradient-to-br from-purple-mid/30 to-bg2/50 max-[900px]:col-span-1' : ''
      } ${
        project.fullWidth ? 'col-span-2 max-[900px]:col-span-1' : ''
      } hover:border-purple/50 before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(124,58,237,0.12)_0%,transparent_60%)] before:opacity-0 before:transition-opacity before:duration-400 before:pointer-events-none hover:before:opacity-100`}
      style={{
        transitionDelay: `${index * 0.08}s`,
        transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      <p className="text-[10px] tracking-[3px] text-purple-light mb-6 opacity-70">{project.num}</p>
      <h3 className={`font-syne ${project.featured ? 'text-[clamp(30px,4vw,50px)]' : 'text-[clamp(22px,2.5vw,32px)]'} font-bold tracking-[-0.5px] mb-3 leading-[1.15] whitespace-pre-line`}>
        {project.title}
      </h3>
      <p className="font-serif italic text-[15px] text-muted mb-5">{project.subtitle}</p>
      <p className="text-[13px] leading-[1.8] text-white/60 mb-7">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-7">
        {project.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-[10px] tracking-[1.5px] uppercase px-3 py-[5px] border border-purple/30 rounded-[1px] text-purple-light bg-purple/[0.06]"
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[11px] tracking-[2px] uppercase text-purple-light no-underline transition-all duration-300 hover:gap-4 hover:text-accent"
      >
        {project.linkText}
        <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  )
}

export default ProjectCard
