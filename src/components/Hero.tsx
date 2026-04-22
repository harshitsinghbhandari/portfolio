const Hero = () => {
  return (
    <section
      id="hero"
      className="relative z-[1] min-h-screen flex flex-col justify-center px-6 md:px-10 lg:px-[60px] max-w-content mx-auto overflow-hidden"
    >
      <p className="text-xs tracking-label uppercase text-purple-light mb-6 opacity-0 animate-fadeUp" style={{ animationDelay: '0.3s' }}>
        IIT Bombay &middot; 2nd Year
      </p>

      <h1 className="font-syne text-[clamp(48px,10vw,140px)] font-extrabold leading-[0.92] tracking-[-3px] mb-2">
        <span className="block text-cream opacity-0 animate-fadeUp" style={{ animationDelay: '0.5s' }}>
          Harshit
        </span>
        <span className="block gradient-text-primary opacity-0 animate-fadeUp" style={{ animationDelay: '0.5s' }}>
          Singh
        </span>
      </h1>

      <p className="font-serif italic text-[clamp(18px,2.5vw,30px)] text-muted mt-8 opacity-0 animate-fadeUp" style={{ animationDelay: '0.7s' }}>
        Engineer. Builder. Curious mind.
      </p>

      <div className="flex flex-wrap items-center gap-3 md:gap-8 mt-5 opacity-0 animate-fadeUp" style={{ animationDelay: '0.9s' }}>
        <span className="text-xs tracking-[1px] text-muted">AI Agents</span>
        <div className="hidden md:block w-10 h-px bg-purple/20" />
        <span className="text-xs tracking-[1px] text-muted">&middot;</span>
        <span className="text-xs tracking-[1px] text-muted">Full-Stack Development</span>
        <div className="hidden md:block w-10 h-px bg-purple/20" />
        <span className="text-xs tracking-[1px] text-muted md:hidden">&middot;</span>
        <span className="text-xs tracking-[1px] text-muted">Systems &amp; AI</span>
      </div>

      <div className="flex gap-5 mt-12 md:mt-[52px] opacity-0 animate-fadeUp" style={{ animationDelay: '1.1s' }}>
        <a
          href="#projects"
          className="relative px-6 md:px-8 py-3 md:py-[14px] bg-gradient-to-br from-purple to-purple-light text-cream no-underline text-xs tracking-tag uppercase rounded-[2px] transition-all duration-300 overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <span className="absolute inset-0 bg-gradient-to-br from-purple-light to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative z-[1]">View Work</span>
        </a>
        <a
          href="#contact"
          className="px-6 md:px-8 py-3 md:py-[14px] border border-purple/20 text-muted no-underline text-xs tracking-tag uppercase rounded-[2px] transition-all duration-300 hover:border-purple-light hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          Get in Touch
        </a>
      </div>

      <div className="absolute bottom-10 left-6 md:left-10 lg:left-[60px] flex items-center gap-4 opacity-0 animate-fadeUp" style={{ animationDelay: '1.4s' }}>
        <div className="w-[60px] h-px bg-gradient-to-r from-purple to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-[-100%] w-full h-full bg-cream animate-scrollAnim" />
        </div>
        <span className="text-2xs tracking-[3px] uppercase text-muted">Scroll</span>
      </div>

      {/* Floating Badge — smaller on tablet, hidden only on very small screens */}
      <div className="absolute right-6 md:right-10 lg:right-20 top-1/2 -translate-y-1/2 w-28 h-28 lg:w-40 lg:h-40 opacity-0 animate-fadeIn max-sm:hidden" style={{ animationDelay: '1.5s' }}>
        <div className="w-full h-full rounded-full border border-purple/20 flex items-center justify-center relative animate-rotateSlow">
          <div className="absolute inset-[-1px] rounded-full bg-gradient-to-r from-transparent via-transparent to-purple opacity-70 -z-[1]" />
          <div className="text-center" style={{ animation: 'rotateSlow 20s linear infinite reverse' }}>
            <div className="font-syne text-xl lg:text-2xl font-extrabold gradient-text">#1142</div>
            <div className="text-2xs tracking-tag uppercase text-muted">All India Rank</div>
            <div className="text-2xs tracking-[1px] text-purple-light mt-0.5">JEE Advanced</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
