import { Link } from 'react-router-dom'
import { getAllPosts } from '../lib/blog'

const BlogList = () => {
  const posts = getAllPosts()

  return (
    <section className="relative z-[1] min-h-screen py-32 lg:py-40 px-6 md:px-10 lg:px-[60px] max-w-content mx-auto">
      <div className="flex items-baseline gap-6 mb-12 lg:mb-16 reveal">
        <span className="text-xs tracking-[3px] text-purple-light">05</span>
        <h2 className="font-syne text-[clamp(40px,5vw,72px)] font-extrabold tracking-[-2px] leading-[1]">
          Blog
        </h2>
        <div className="flex-1 h-px bg-purple/20" />
      </div>

      {posts.length === 0 ? (
        <p className="text-muted font-serif italic text-center py-20">No posts yet.</p>
      ) : (
        <div className="flex flex-col gap-0.5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blogs/${post.slug}`}
              className="group reveal block p-8 lg:p-12 border border-purple/20 bg-cream/[0.01] no-underline transition-all duration-300 hover:border-purple/50 hover:bg-purple/[0.03]"
            >
              <p className="text-2xs tracking-[3px] text-purple-light opacity-70 mb-4">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <h3 className="font-syne text-[clamp(22px,2.5vw,32px)] font-bold tracking-tight text-cream mb-3 leading-[1.15]">
                {post.title}
              </h3>
              <p className="font-serif italic text-base text-muted mb-5">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-2xs tracking-[1.5px] uppercase px-3 py-[5px] border border-purple/30 rounded-[1px] text-purple-light bg-purple/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 text-xs tracking-tag uppercase text-purple-light transition-all duration-300 group-hover:gap-4">
                Read
                <svg
                  className="w-[14px] h-[14px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default BlogList
