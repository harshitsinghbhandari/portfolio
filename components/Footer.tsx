export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="px-6 py-8 md:px-10">
      <p className="font-mono text-2xs text-subtle">
        Created by Harshit Singh. © {year}.
      </p>
    </footer>
  )
}
