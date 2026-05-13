import Section from './ui/Section'
import SectionHeader from './ui/SectionHeader'

const skills = [
  'React', 'TypeScript', 'Node.js', 'Express', 'Python', 'PostgreSQL',
  'NumPy', 'Pandas', 'JavaScript', 'Auth Systems', 'Keycloak', 'C++',
  'C', 'FastAPI', 'Flask', 'JWT / HMAC', 'SciPy', 'Vite',
  'LLMs', 'Agent Systems', 'Google ADK', 'Gemini API', 'Claude API',
  'Docker', 'Cloud Run', 'GitHub Actions',
]

const Skills = () => {
  return (
    <Section id="skills">
      <SectionHeader number="02" title="Stack" />

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
    </Section>
  )
}

export default Skills
