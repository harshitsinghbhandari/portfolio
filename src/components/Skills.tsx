const skills = [
  'React', 'TypeScript', 'Node.js', 'Express', 'Python', 'PostgreSQL',
  'NumPy', 'Pandas', 'JavaScript', 'Auth Systems', 'Keycloak', 'C++',
  'C', 'FastAPI', 'Flask', 'JWT / HMAC', 'SciPy', 'Vite',
  'LLMs', 'Agent Systems', 'Google ADK', 'Gemini API', 'Claude API',
  'Docker', 'Cloud Run', 'GitHub Actions',
]

const Skills = () => {
  return (
    <section id="skills" className="relative z-[1] py-20 lg:py-32 px-6 md:px-10 lg:px-[60px] max-w-content mx-auto overflow-hidden">
      <div className="flex items-baseline gap-6 mb-12 lg:mb-16 reveal">
        <span className="font-mono text-2xs tracking-tag text-muted">02</span>
        <h2 className="font-display text-h2 font-medium text-text">
          Stack
        </h2>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <div className="flex flex-wrap gap-2 reveal">
        {skills.map((skill) => (
          <div
            key={skill}
            className="px-3 py-1.5 border border-white/10 rounded-sm font-mono text-xs text-muted transition-colors duration-200 cursor-default hover:border-white/25 hover:text-text"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
