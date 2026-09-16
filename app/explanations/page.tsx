import type { Metadata } from 'next'

const spawningTitle = 'How Agent Orchestrator Spawns an AI Coding Agent'
const overviewTitle = 'How Agent Orchestrator Works: App & Agent Spawning Explained'

const videoLinkClass =
  'text-accent underline decoration-accent/35 underline-offset-[0.2em] transition-colors hover:text-text hover:decoration-text/45'

export const metadata: Metadata = {
  title: 'Explanations',
  alternates: { canonical: '/explanations' },
}

export default function ExplanationsPage() {
  return (
    <div className="container-page pb-24 pt-12 md:pt-16">
      <section>
        <h1 className="text-[50px] font-bold tracking-tight text-text md:text-[67px]">
          Explanations
        </h1>
        <article className="mt-10" aria-labelledby="video-spawning">
          <h2 id="video-spawning" className="text-[28px] font-semibold tracking-tight text-text sm:text-[34px]">
            <a
              href="https://www.youtube.com/watch?v=09TkoeR6qJQ"
              target="_blank"
              rel="noopener noreferrer"
              className={videoLinkClass}
            >
              {spawningTitle}
            </a>
          </h2>
          <div className="mt-6 aspect-video w-full overflow-hidden border border-border bg-surface">
            <iframe
              src="https://www.youtube.com/embed/09TkoeR6qJQ?si=GCGD89dFYXBl4g0_"
              title={spawningTitle}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </article>
        <article className="mt-16 md:mt-20" aria-labelledby="video-overview">
          <h2 id="video-overview" className="text-[28px] font-semibold tracking-tight text-text sm:text-[34px]">
            <a
              href="https://www.youtube.com/watch?v=kyIOfoNaPQ0"
              target="_blank"
              rel="noopener noreferrer"
              className={videoLinkClass}
            >
              {overviewTitle}
            </a>
          </h2>
          <div className="mt-6 aspect-video w-full overflow-hidden border border-border bg-surface">
            <iframe
              src="https://www.youtube.com/embed/kyIOfoNaPQ0?si=YZ9_lKA1_o0K26Ge"
              title={overviewTitle}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="mt-6 space-y-5 text-[21px] leading-[1.6] text-muted">
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
