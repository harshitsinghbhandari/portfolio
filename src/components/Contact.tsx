const Contact = () => {
  return (
    <section id="contact" className="relative z-[1] py-[120px] px-[60px] text-center">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(124,58,237,0.15)_0%,transparent_70%)] pointer-events-none" />

      <p className="reveal text-[10px] tracking-[4px] uppercase text-purple-light mb-6">
        Open to Internships · 2025
      </p>

      <h2 className="reveal font-syne text-[clamp(48px,8vw,96px)] font-extrabold tracking-[-3px] leading-[0.95] mb-10 relative">
        Let's build
        <br />
        <em className="not-italic gradient-text">something</em>
        <br />
        together.
      </h2>

      <p className="reveal font-serif italic text-xl text-muted mb-[52px] max-w-[480px] mx-auto">
        If you're working on something interesting — reach out. I move fast.
      </p>

      <a
        href="mailto:harshitsingh@iitb.ac.in"
        className="reveal inline-flex items-center gap-3 px-12 py-5 border border-purple/20 text-white no-underline text-sm tracking-[1px] rounded-[2px] bg-purple/5 transition-all duration-300 relative overflow-hidden hover:border-purple-light before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple/30 before:to-accent/20 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
      >
        <span className="relative z-[1]">✉ harshitsingh@iitb.ac.in</span>
      </a>

      <div className="reveal mt-20 pt-10 border-t border-purple/20 flex justify-between items-center text-[11px] tracking-[1px] text-muted max-[900px]:flex-col max-[900px]:gap-4 max-[900px]:text-center">
        <span>Harshit Singh Bhandari · IIT Bombay · 2028</span>
        <span>Designed &amp; coded with intent.</span>
        <a
          href="https://github.com/harshitsinghbhandari"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted no-underline transition-colors duration-300 hover:text-purple-light"
        >
          github.com/harshitsinghbhandari →
        </a>
      </div>
    </section>
  )
}

export default Contact
