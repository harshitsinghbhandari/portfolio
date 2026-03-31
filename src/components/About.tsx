const About = () => {
  return (
    <section id="about" className="relative z-[1] py-[120px] px-[60px] grid grid-cols-2 gap-20 items-center max-[900px]:grid-cols-1">
      <div className="reveal">
        <p className="text-[10px] tracking-[4px] uppercase text-purple-light mb-6">About Me</p>
        <h2 className="font-syne text-[clamp(36px,4vw,56px)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-8">
          Exploring
          <br />
          everything
          <br />
          possible.
        </h2>
        <p className="font-serif text-xl leading-[1.7] text-white/70 mb-8">
          A curious mind at IIT Bombay, building at the intersection of systems, intelligence, and ideas. I move fast from concept to deployment. Currently contributing to Composio's Agent Orchestrator, an open source agentic coding platform with 5,300+ GitHub stars.
        </p>
        <p className="text-[13px] text-muted leading-[1.8]">
          Currently in my 2nd year, graduating 2028 · Open to internships in software engineering, ML, and fintech.
        </p>

        <div className="grid grid-cols-3 gap-6 mt-12 max-[900px]:grid-cols-2">
          {[
            { value: '3', label: 'Projects Built' },
            { value: '2028', label: 'Class of' },
            { value: '∞', label: 'Ideas Brewing' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="stat p-6 border border-purple/20 rounded bg-purple/5 transition-all duration-300 relative overflow-hidden hover:border-purple hover:bg-purple/10 hover:-translate-y-1 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-gradient-to-r before:from-purple before:to-transparent"
            >
              <div className="font-syne text-[32px] font-extrabold gradient-text">{stat.value}</div>
              <div className="text-[10px] tracking-[2px] uppercase text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo placeholder - hidden on mobile */}
      <div className="relative aspect-[3/4] max-w-[400px] ml-auto reveal max-[900px]:hidden">
        <div className="w-full h-full rounded border border-purple/20 overflow-hidden relative bg-purple-deep">
          <img
            src="/hsb.jpg"
            alt="Harshit Singh"
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
    </section>
  )
}

export default About
