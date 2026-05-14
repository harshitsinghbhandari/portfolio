import { getContributions } from '@/lib/github'

const USERNAME = 'harshitsinghbhandari'

const levelClass = [
  'bg-white/[0.04]',
  'bg-accent/25',
  'bg-accent/50',
  'bg-accent/75',
  'bg-accent',
] as const

export default async function ContributionsGraph() {
  const data = await getContributions(USERNAME)
  if (!data || data.weeks.length === 0) return null

  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="container-page">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label mb-3">04 · contributions</p>
            <h2 className="font-sans text-3xl font-semibold tracking-tight md:text-4xl">
              {data.total.toLocaleString()} contributions in the last year.
            </h2>
            <p className="mt-3 max-w-prose text-muted">
              Pulled live from{' '}
              <a
                href={`https://github.com/${USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent no-underline hover:underline underline-offset-4"
              >
                github.com/{USERNAME}
              </a>
              . Across open source, hackathons, and personal builds.
            </p>
          </div>
        </header>

        <div className="surface overflow-x-auto p-6 md:p-7">
          <div
            className="flex gap-[3px]"
            role="img"
            aria-label={`${data.total.toLocaleString()} GitHub contributions in the last year`}
          >
            {data.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day, dayIndex) => {
                  if (!day) {
                    return <div key={dayIndex} className="h-[11px] w-[11px]" />
                  }
                  return (
                    <div
                      key={day.date}
                      className={`h-[11px] w-[11px] rounded-[2px] ${
                        levelClass[day.level] ?? levelClass[0]
                      }`}
                      title={`${day.count} contribution${
                        day.count === 1 ? '' : 's'
                      } on ${day.date}`}
                    />
                  )
                })}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-end gap-2 font-mono text-2xs text-subtle">
            <span>less</span>
            {levelClass.map((c, i) => (
              <span
                key={i}
                className={`h-[11px] w-[11px] rounded-[2px] ${c}`}
                aria-hidden="true"
              />
            ))}
            <span>more</span>
          </div>
        </div>
      </div>
    </section>
  )
}
