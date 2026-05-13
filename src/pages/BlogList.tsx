import { Link } from 'react-router-dom'
import { getAllPosts } from '../lib/blog'

const BlogList = () => {
  const posts = getAllPosts()

  return (
    <section className="relative z-[1] min-h-screen pt-32 lg:pt-40 pb-20 lg:pb-32 px-6 md:px-10 lg:px-[60px] max-w-content mx-auto">
      <div className="flex items-baseline gap-6 mb-12 lg:mb-16 reveal">
        <span className="font-mono text-2xs tracking-tag text-muted">Writing</span>
        <h1 className="font-display text-h1 font-medium text-text">
          Blog
        </h1>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {posts.length === 0 ? (
        <p className="font-display italic text-muted text-center py-20">No posts yet.</p>
      ) : (
        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blogs/${post.slug}`}
              className="group reveal block py-8 lg:py-10 no-underline transition-colors duration-200 hover:bg-white/[0.015]"
            >
              <p className="font-mono text-2xs tracking-tag uppercase text-muted mb-3">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <h2 className="font-display text-h2 font-medium text-text mb-3 transition-colors duration-200 group-hover:text-accent">
                {post.title}
              </h2>
              <p className="font-display italic text-lg text-muted mb-4 max-w-2xl">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-2xs tracking-tag uppercase px-2.5 py-1 border border-white/10 rounded-sm text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default BlogList
