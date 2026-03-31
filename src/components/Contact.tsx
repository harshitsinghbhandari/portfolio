const Contact = () => {
  return (
    <section id="contact" className="relative z-[1] py-[120px] px-[60px] text-center">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(124,58,237,0.15)_0%,transparent_70%)] pointer-events-none" />

      <p className="reveal text-[10px] tracking-[4px] uppercase text-purple-light mb-6">
        Open to Internships · 2026
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

      <div className="reveal mt-20 pt-10 border-t border-purple/20">
        <div className="flex justify-center items-center gap-6 mb-6">
          <a
            href="https://github.com/harshitsinghbhandari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted no-underline transition-colors duration-300 hover:text-purple-light flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
          <div className="w-px h-4 bg-purple/20" />
          <a
            href="https://linkedin.com/in/harshitsinghbhandari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted no-underline transition-colors duration-300 hover:text-purple-light flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
            </svg>
            LinkedIn
          </a>
        </div>
        <div className="flex justify-between items-center text-[11px] tracking-[1px] text-muted max-[900px]:flex-col max-[900px]:gap-4 max-[900px]:text-center">
          <span>Harshit Singh Bhandari · IIT Bombay · 2028</span>
          <span>Designed &amp; coded with intent.</span>
          <span>github.com/harshitsinghbhandari</span>
        </div>
      </div>
    </section>
  )
}

export default Contact
