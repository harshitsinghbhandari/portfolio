const Hero = () => {
  return (
    <section
      id="hero"
      className="relative z-[1] min-h-screen flex flex-col justify-center px-6 md:px-10 lg:px-[60px] max-w-content mx-auto overflow-hidden"
    >
      <p className="font-mono text-xs tracking-label uppercase text-muted mb-8 opacity-0 animate-fadeUp" style={{ animationDelay: '0.2s' }}>
        IIT Bombay &middot; 2nd Year
      </p>

      <h1 className="font-display text-display font-medium text-text mb-6 opacity-0 animate-fadeUp" style={{ animationDelay: '0.4s' }}>
        Harshit Singh
      </h1>

      <p className="font-display italic text-[clamp(18px,2.2vw,26px)] text-muted opacity-0 animate-fadeUp" style={{ animationDelay: '0.6s' }}>
        Engineer. Builder. Curious mind.
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-10 opacity-0 animate-fadeUp" style={{ animationDelay: '0.8s' }}>
        <span className="font-mono text-2xs tracking-tag uppercase text-muted">AI Agents</span>
        <span className="text-muted/40" aria-hidden="true">/</span>
        <span className="font-mono text-2xs tracking-tag uppercase text-muted">Full-Stack</span>
        <span className="text-muted/40" aria-hidden="true">/</span>
        <span className="font-mono text-2xs tracking-tag uppercase text-muted">Systems &amp; AI</span>
      </div>

      <div className="flex gap-4 mt-12 opacity-0 animate-fadeUp" style={{ animationDelay: '1s' }}>
        <a
          href="#projects"
          className="px-6 py-3 bg-accent/90 text-bg no-underline font-mono text-2xs tracking-tag uppercase rounded-sm transition-colors duration-200 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          View Work
        </a>
        <a
          href="#contact"
          className="px-6 py-3 border border-white/15 text-text no-underline font-mono text-2xs tracking-tag uppercase rounded-sm transition-colors duration-200 hover:border-white/30 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          Get in Touch
        </a>
      </div>

      <div className="absolute bottom-10 left-6 md:left-10 lg:left-[60px] flex items-center gap-3 opacity-0 animate-fadeUp" style={{ animationDelay: '1.2s' }}>
        <div className="w-10 h-px bg-white/20" />
        <span className="font-mono text-2xs tracking-tag uppercase text-muted">Scroll</span>
      </div>
    </section>
  )
}

export default Hero
