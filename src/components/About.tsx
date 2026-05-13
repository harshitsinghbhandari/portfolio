import Section from './ui/Section'
import SectionHeader from './ui/SectionHeader'

const About = () => {
  return (
    <Section id="about">
      <SectionHeader number="01" title="About" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Photo */}
        <div className="relative aspect-[3/4] max-w-[280px] mx-auto lg:max-w-[360px] lg:ml-auto lg:order-2 reveal">
          <div className="w-full h-full rounded-sm border border-white/10 overflow-hidden relative bg-bg2">
            <img
              src="/hsb.jpg"
              alt="Harshit Singh"
              width={400}
              height={533}
              loading="lazy"
              className="w-full h-full object-cover grayscale-[15%]"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        </div>

        {/* Text content */}
        <div className="reveal lg:order-1">
          <p className="font-display text-[clamp(18px,2vw,22px)] leading-[1.6] text-text mb-8">
            A curious mind at IIT Bombay, building at the intersection of systems, intelligence, and ideas. I move fast from concept to deployment. Currently contributing to Composio's Agent Orchestrator, an open source agentic coding platform with 5,300+ GitHub stars.
          </p>
          <p className="text-sm text-muted">
            Currently in my 2nd year, graduating 2028 &middot; Open to internships in software engineering, ML, and fintech.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mt-12">
            {[
              { value: '3', label: 'Projects Built' },
              { value: '2028', label: 'Class of' },
              { value: 'Endless', label: 'Ideas Brewing' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="stat p-5 border border-white/10 rounded-sm bg-white/[0.015] transition-colors duration-200 hover:border-white/20"
              >
                <div className="font-display text-2xl font-medium text-text">{stat.value}</div>
                <div className="font-mono text-2xs tracking-tag uppercase text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default About
