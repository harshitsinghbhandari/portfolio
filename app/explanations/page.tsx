import type { Metadata } from 'next'

const videoTitle = 'How Agent Orchestrator Works: App & Agent Spawning Explained'

export const metadata: Metadata = {
  title: 'Explanations',
  alternates: { canonical: '/explanations' },
}

export default function ExplanationsPage() {
  return (
    <div className="container-page pb-24 pt-12 md:pt-16">
      <section>
        <h1 className="text-4xl font-bold tracking-tight text-text md:text-5xl">
          Explanations
        </h1>
        <article className="mt-10" aria-labelledby="video-title">
          <h2 id="video-title" className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
            <a
              href="https://www.youtube.com/watch?v=kyIOfoNaPQ0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-accent/35 underline-offset-[0.2em] transition-colors hover:text-text hover:decoration-text/45"
            >
              {videoTitle}
            </a>
          </h2>
          <div className="mt-6 aspect-video w-full overflow-hidden border border-border bg-surface">
            <iframe
              src="https://www.youtube.com/embed/kyIOfoNaPQ0?si=YZ9_lKA1_o0K26Ge"
              title={videoTitle}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="mt-6 space-y-5 text-[15px] leading-[1.7] text-muted">
            <p>
              I worked on Agent Orchestrator’s backend, and in this video I explain how the system works internally.
            </p>
            <p>
              I start with what Agent Orchestrator is, show the application in action, and then go deeper into one of its core mechanisms: how an orchestrator spawns and manages worker agents.
            </p>
            <div>
              <p>Covered in the video:</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>What Agent Orchestrator is</li>
                <li>A walkthrough of the application</li>
                <li>How agent spawning works</li>
              </ul>
            </div>
            <p>
              This is my first technical video, so if there’s a specific part of Agent Orchestrator you’d like me to explain next, let me know.
            </p>
          </div>
        </article>
      </section>
    </div>
  )
}
