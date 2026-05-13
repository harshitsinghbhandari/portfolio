import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { getPostBySlug } from '../lib/blog'

const BackLink = () => (
  <Link
    to="/blogs"
    className="inline-flex items-center gap-2 font-mono text-2xs tracking-tag uppercase text-muted no-underline transition-colors duration-200 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
  >
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
    Back to Blog
  </Link>
)

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <section className="relative z-[1] min-h-screen pt-32 lg:pt-40 pb-20 px-6 md:px-10 lg:px-[60px] max-w-content mx-auto text-center">
        <h1 className="font-display text-h1 font-medium text-text mb-6">
          Post not found
        </h1>
        <BackLink />
      </section>
    )
  }

  return (
    <article className="relative z-[1] min-h-screen pt-32 lg:pt-40 pb-20 lg:pb-32 px-6 md:px-10 lg:px-[60px] max-w-3xl mx-auto">
      <div className="mb-12">
        <BackLink />
      </div>

      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="font-mono text-2xs tracking-tag uppercase text-muted">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-2xs tracking-tag uppercase text-muted"
            >
              &middot; {tag}
            </span>
          ))}
        </div>
        <h1 className="font-display text-h1 font-medium text-text mb-5">
          {post.title}
        </h1>
        <p className="font-display italic text-xl text-muted">
          {post.description}
        </p>
        <div className="mt-10 h-px bg-white/10" />
      </header>

      <div className="blog-prose">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}

export default BlogPost
