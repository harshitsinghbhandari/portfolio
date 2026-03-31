const skills = [
  'React', 'TypeScript', 'Node.js', 'Express', 'Python', 'PostgreSQL',
  'NumPy', 'Pandas', 'JavaScript', 'Auth Systems', 'Keycloak', 'C++',
  'C', 'FastAPI', 'Flask', 'JWT / HMAC', 'SciPy', 'Vite',
  'LLMs', 'Agent Systems', 'Google ADK', 'Gemini API', 'Claude API',
  'Docker', 'Cloud Run', 'GitHub Actions',
]

const Skills = () => {
  return (
    <section id="skills" className="relative z-[1] py-[120px] px-[60px] overflow-hidden">
      <div className="flex items-baseline gap-6 mb-16 reveal">
        <span className="text-[11px] tracking-[3px] text-purple-light">02</span>
        <h2 className="font-syne text-[clamp(40px,5vw,72px)] font-extrabold tracking-[-2px] leading-[1]">
          Stack
        </h2>
        <div className="flex-1 h-px bg-purple/20" />
      </div>

      <div className="flex flex-wrap gap-3 reveal">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="skill-tag px-5 py-2.5 border border-purple/20 rounded-[2px] text-xs tracking-[1px] text-muted bg-purple/[0.04] transition-all duration-300 cursor-default relative overflow-hidden hover:border-purple-light hover:text-white hover:-translate-y-0.5 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-deep before:to-purple/20 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
            style={{ transitionDelay: `${idx * 0.03}s` }}
          >
            <span className="relative z-[1]">{skill}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
