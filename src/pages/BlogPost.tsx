import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { getPostBySlug } from '../lib/blog'
import Container from '../components/ui/Container'
import ArrowLink from '../components/ui/ArrowLink'

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <article className="relative z-[1] min-h-screen pt-32 lg:pt-40 pb-20">
        <Container>
          <div className="text-center">
            <h1 className="font-display text-h1 font-medium text-text mb-6">
              Post not found
            </h1>
            <ArrowLink to="/blogs" direction="back" tone="muted">
              Back to Blog
            </ArrowLink>
          </div>
        </Container>
      </article>
    )
  }

  return (
    <article className="relative z-[1] min-h-screen pt-32 lg:pt-40 pb-20 lg:pb-32">
      <Container>
        <div className="mb-12">
          <ArrowLink to="/blogs" direction="back" tone="muted">
            Back to Blog
          </ArrowLink>
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
      </Container>
    </article>
  )
}

export default BlogPost
