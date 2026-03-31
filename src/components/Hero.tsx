const Hero = () => {
  return (
    <section
      id="hero"
      className="relative z-[1] min-h-screen flex flex-col justify-center px-[60px] overflow-hidden"
    >
      <p className="text-[11px] tracking-[4px] uppercase text-purple-light mb-6 opacity-0 animate-fadeUp" style={{ animationDelay: '0.3s' }}>
        IIT Bombay · 2nd Year 
      </p>

      <h1 className="font-syne text-[clamp(64px,10vw,140px)] font-extrabold leading-[0.92] tracking-[-3px] mb-2">
        <span className="block text-white opacity-0 animate-fadeUp" style={{ animationDelay: '0.5s' }}>
          Harshit
        </span>
        <span className="block gradient-text-primary opacity-0 animate-fadeUp" style={{ animationDelay: '0.5s' }}>
          Singh
        </span>
      </h1>

      <p className="font-serif italic text-[clamp(20px,2.5vw,30px)] text-muted mt-8 opacity-0 animate-fadeUp" style={{ animationDelay: '0.7s' }}>
        Engineer. Builder. Curious mind.
      </p>

      <div className="flex items-center gap-8 mt-5 opacity-0 animate-fadeUp" style={{ animationDelay: '0.9s' }}>
        <span className="text-xs tracking-[1px] text-muted">AI Agents</span>
        <div className="w-10 h-px bg-purple/20" />
        <span className="text-xs tracking-[1px] text-muted">Full-Stack Development</span>
        <div className="w-10 h-px bg-purple/20" />
        <span className="text-xs tracking-[1px] text-muted">Systems & AI</span>
      </div>

      <div className="flex gap-5 mt-[52px] opacity-0 animate-fadeUp" style={{ animationDelay: '1.1s' }}>
        <a
          href="#projects"
          className="relative px-8 py-[14px] bg-gradient-to-br from-purple to-purple-light text-white no-underline text-xs tracking-[2px] uppercase rounded-[2px] transition-all duration-300 overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-br from-purple-light to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative z-[1]">View Work</span>
        </a>
        <a
          href="#contact"
          className="px-8 py-[14px] border border-purple/20 text-muted no-underline text-xs tracking-[2px] uppercase rounded-[2px] transition-all duration-300 hover:border-purple-light hover:text-white"
        >
          Get in Touch
        </a>
      </div>

      <div className="absolute bottom-10 left-[60px] flex items-center gap-4 opacity-0 animate-fadeUp" style={{ animationDelay: '1.4s' }}>
        <div className="w-[60px] h-px bg-gradient-to-r from-purple to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-[-100%] w-full h-full bg-white animate-scrollAnim" />
        </div>
        <span className="text-[10px] tracking-[3px] uppercase text-muted">Scroll</span>
      </div>

      {/* Floating Badge */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 w-40 h-40 opacity-0 animate-fadeIn max-[900px]:hidden" style={{ animationDelay: '1.5s' }}>
        <div className="w-full h-full rounded-full border border-purple/20 flex items-center justify-center relative animate-rotateSlow">
          <div className="absolute inset-[-1px] rounded-full bg-gradient-to-r from-transparent via-transparent to-purple opacity-70 -z-[1]" />
          <div className="text-center" style={{ animation: 'rotateSlow 20s linear infinite reverse' }}>
            <div className="font-syne text-2xl font-extrabold gradient-text">#1142</div>
            <div className="text-[9px] tracking-[2px] uppercase text-muted">All India Rank</div>
            <div className="text-[9px] tracking-[1px] text-purple-light mt-0.5">JEE Advanced</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
