export default function ExplanationsPage() {
  return (
    <div className="container-page pb-24 pt-12 md:pt-16">
      <section>
        <h1 className="text-4xl font-bold tracking-tight text-text md:text-5xl">
          Explanations
        </h1>
        <div className="mt-10 aspect-video w-full overflow-hidden border border-border bg-surface">
          <iframe
            src="https://www.youtube.com/embed/kyIOfoNaPQ0?si=YZ9_lKA1_o0K26Ge"
            title="YouTube video player"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  )
}
