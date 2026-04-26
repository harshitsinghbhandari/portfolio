import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { getPostBySlug } from '../lib/blog'

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <section className="relative z-[1] min-h-screen py-32 lg:py-40 px-6 md:px-10 lg:px-[60px] max-w-[720px] mx-auto text-center">
        <h1 className="font-syne text-[clamp(32px,5vw,56px)] font-extrabold tracking-[-2px] text-cream mb-6">
          Post not found
        </h1>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-xs tracking-tag uppercase text-purple-light no-underline transition-colors duration-300 hover:text-accent"
        >
          <svg
            className="w-[14px] h-[14px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>
      </section>
    )
  }

  return (
    <article className="relative z-[1] min-h-screen py-32 lg:py-40 px-6 md:px-10 lg:px-[60px] max-w-[720px] mx-auto">
      <Link
        to="/blogs"
        className="inline-flex items-center gap-2 text-xs tracking-tag uppercase text-purple-light no-underline transition-colors duration-300 hover:text-accent mb-12"
      >
        <svg
          className="w-[14px] h-[14px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </Link>

      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-2xs tracking-[3px] text-purple-light opacity-70">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-2xs tracking-[1.5px] uppercase text-muted"
            >
              &middot; {tag}
            </span>
          ))}
        </div>
        <h1 className="font-syne text-[clamp(32px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05] text-cream mb-4">
          {post.title}
        </h1>
        <p className="font-serif italic text-xl text-muted">
          {post.description}
        </p>
        <div className="mt-8 h-px bg-gradient-to-r from-purple/40 via-purple/20 to-transparent" />
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
