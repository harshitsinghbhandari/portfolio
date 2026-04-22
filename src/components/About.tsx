const About = () => {
  return (
    <section id="about" className="relative z-[1] py-16 lg:py-[120px] px-6 md:px-10 lg:px-[60px] max-w-content mx-auto">
      <div className="flex items-baseline gap-6 mb-12 lg:mb-16 reveal">
        <span className="text-xs tracking-[3px] text-purple-light">01</span>
        <h2 className="font-syne text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-1.5px] leading-[1]">
          About
        </h2>
        <div className="flex-1 h-px bg-purple/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Photo — shown on mobile at top, positioned in grid on desktop */}
        <div className="relative aspect-[3/4] max-w-[280px] mx-auto lg:max-w-[400px] lg:ml-auto lg:order-2 reveal">
          <div className="w-full h-full rounded border border-purple/20 overflow-hidden relative bg-purple-deep">
            <img
              src="/hsb.jpg"
              alt="Harshit Singh"
              width={400}
              height={533}
              loading="lazy"
              className="w-full h-full object-cover grayscale-[20%] contrast-[1.1] mix-blend-luminosity"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const parent = e.currentTarget.parentElement
                if (parent) {
                  parent.style.background = 'linear-gradient(135deg, #1a0a2e, #3d1a6e)'
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple/30 to-transparent pointer-events-none" />
          </div>
          <div className="absolute bottom-[-20px] right-[-20px] w-[80%] h-[80%] border border-purple/20 rounded -z-[1]" />
          <div className="absolute top-[-10px] left-[-10px] w-10 h-10 border-l-2 border-t-2 border-purple" />
        </div>

        {/* Text content */}
        <div className="reveal lg:order-1">
          <p className="font-serif text-xl leading-[1.7] text-cream/70 mb-8">
            A curious mind at IIT Bombay, building at the intersection of systems, intelligence, and ideas. I move fast from concept to deployment. Currently contributing to Composio's Agent Orchestrator, an open source agentic coding platform with 5,300+ GitHub stars.
          </p>
          <p className="text-sm text-muted leading-[1.8]">
            Currently in my 2nd year, graduating 2028 &middot; Open to internships in software engineering, ML, and fintech.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-12">
            {[
              { value: '3', label: 'Projects Built' },
              { value: '2028', label: 'Class of' },
              { value: 'Endless', label: 'Ideas Brewing' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="stat p-4 lg:p-6 border border-purple/20 rounded bg-purple/5 transition-all duration-300 relative overflow-hidden hover:border-purple hover:bg-purple/10 hover:-translate-y-1 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-gradient-to-r before:from-purple before:to-transparent focus-within:ring-2 focus-within:ring-purple-light"
              >
                <div className="font-syne text-[28px] lg:text-[32px] font-extrabold gradient-text">{stat.value}</div>
                <div className="text-2xs tracking-tag uppercase text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
