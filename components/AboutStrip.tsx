const stats = [
  { value: '6', label: 'Systems shipped' },
  { value: '4', label: 'Long-form posts' },
  { value: '2028', label: 'IIT-B · class of' },
]

export default function AboutStrip() {
  return (
    <section id="about" className="border-t border-border/60 py-20 md:py-28">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <p className="label mb-3">03 · about</p>
            <h2 className="font-sans text-3xl font-semibold tracking-tight md:text-4xl">
              A curious mind at IIT Bombay.
            </h2>
            <div className="mt-6 space-y-5 text-[15.5px] leading-[1.75] text-text/80">
              <p>
                Second-year IEOR student at IIT Bombay. I build small,
                local-first systems — voice assistants, screen-watchers,
                briefing pipelines — that compose into something larger than
                any single tool.
              </p>
              <p>
                I keep coming back to the same shape: capture → durable log →
                compile → consume. Donna, Study Buddy, Moodle, discord-archive
                — each is a layer in the same pipeline. Boring, composable,
                mine.
              </p>
              <p className="text-muted">
                Open to internships in software engineering, ML, and infra.
              </p>
            </div>
          </div>

          <div className="md:col-span-5">
            <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-1">
              {stats.map((s) => (
                <li
                  key={s.label}
                  className="bg-surface p-5 md:p-6"
                >
                  <p className="font-sans text-3xl font-semibold tracking-tight text-text md:text-4xl">
                    {s.value}
                  </p>
                  <p className="label mt-1">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
