export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface Contributions {
  username: string
  total: number
  weeks: (ContributionDay | null)[][]
}

interface ApiResponse {
  total: Record<string, number>
  contributions: ContributionDay[]
}

function buildWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (days.length === 0) return []
  const weeks: (ContributionDay | null)[][] = []
  let currentWeek: (ContributionDay | null)[] = []

  // Pad the first week so day 0 lands on the right weekday row.
  const firstWeekday = new Date(days[0].date).getUTCDay()
  for (let i = 0; i < firstWeekday; i++) currentWeek.push(null)

  for (const day of days) {
    currentWeek.push(day)
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null)
    weeks.push(currentWeek)
  }

  return weeks
}

export async function getContributions(
  username: string
): Promise<Contributions | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 21600 } }, // 6h
    )
    if (!res.ok) return null
    const data = (await res.json()) as ApiResponse
    const days = data.contributions ?? []
    const total = Object.values(data.total ?? {}).reduce(
      (sum, n) => sum + (typeof n === 'number' ? n : 0),
      0,
    )
    return {
      username,
      total,
      weeks: buildWeeks(days),
    }
  } catch {
    return null
  }
}
