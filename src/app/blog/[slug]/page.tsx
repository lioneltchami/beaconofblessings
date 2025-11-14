import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react'
import { getBlogPost, getBlogPosts } from '@/data/blog-posts'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} - Beacon of Blessings Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          {/* Category */}
          <span className="inline-block px-4 py-1 bg-primary-100 text-primary-700 font-semibold rounded-full mb-4">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-6 text-gray-600 border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" aria-hidden="true" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" aria-hidden="true" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" aria-hidden="true" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/\n/g, '<br />'),
            }}
          />
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h2>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Join Us in Making a Difference
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Your support enables us to continue transforming lives through education and compassionate care.
          </p>
          <Link
            href="/donate"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-primary-50 transition-colors"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </article>
  )
}
