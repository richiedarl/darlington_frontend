import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  published_at: string
  read_time: number
  cover_image: string | null
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.data ?? data
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} | Darlington Okorie`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <main className="pt-24 pb-16 min-h-screen bg-white dark:bg-brand-black transition-colors duration-300">
      <div className="container-custom max-w-3xl">

        <Link href="/blog" className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-8 hover:opacity-80 transition-opacity">
          ← Back to Blog
        </Link>

        {post.cover_image && (
          <div className="rounded-2xl overflow-hidden aspect-video mb-8 shadow-[0_8px_40px_rgba(11,217,167,0.1)]">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-lg font-medium">
            {post.category}
          </span>
          <span className="text-xs text-gray-400">{post.read_time} min read</span>
          <span className="text-xs text-gray-400">
            {new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-brand-black dark:text-white mb-8">
          {post.title}
        </h1>

        {/* Rendered HTML content from Laravel */}
        <article
          className="prose prose-lg dark:prose-invert max-w-none
                     prose-headings:font-montserrat prose-headings:text-brand-black dark:prose-headings:text-white
                     prose-p:text-gray-600 dark:prose-p:text-gray-300
                     prose-a:text-primary prose-a:no-underline hover:prose-a:opacity-80
                     prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:rounded
                     prose-pre:bg-brand-black dark:prose-pre:bg-black/50
                     prose-blockquote:border-l-primary prose-blockquote:text-gray-500"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </main>
  )
}
