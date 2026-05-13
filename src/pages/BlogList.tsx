import { Link } from 'react-router-dom'
import { getAllPosts } from '../lib/blog'
import Section from '../components/ui/Section'
import SectionHeader from '../components/ui/SectionHeader'
import Tag from '../components/ui/Tag'

const BlogList = () => {
  const posts = getAllPosts()

  return (
    <Section variant="pageTop" className="min-h-screen">
      <SectionHeader title="Blog" as="h1" />

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
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </Section>
  )
}

export default BlogList
