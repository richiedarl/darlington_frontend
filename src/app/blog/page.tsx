import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Darlington Okorie',
  description: 'Articles, tutorials, and insights on full-stack development by Darlington Okorie.',
}

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  category: string
  published_at: string
  read_time: number
  cover_image: string | null
}

async function getPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?status=published`, {
      next: { revalidate: 60 }, // ISR — revalidate every 60s
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.data ?? data
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="pt-24 pb-16 min-h-screen bg-white dark:bg-brand-black transition-colors duration-300">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest border border-primary/30 px-3 py-1 rounded-full bg-primary/5">
            The Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-brand-black dark:text-white mt-4 mb-4">
            Thoughts & <span className="bg-gradient-to-r from-primary to-brand-dark bg-clip-text text-transparent">Tutorials</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Deep dives into software engineering, frameworks, and lessons from real-world projects.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-brand-black dark:text-white mb-2">No posts yet</h3>
            <p className="text-gray-500 dark:text-gray-400">Check back soon — articles are on the way.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}
                className="group rounded-2xl overflow-hidden
                           bg-white/70 dark:bg-white/5 backdrop-blur-sm
                           border border-white/50 dark:border-primary/10
                           shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]
                           hover:shadow-[0_8px_40px_rgba(11,217,167,0.15)]
                           hover:-translate-y-1.5 transition-all duration-300 block">

                {/* Cover image */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-brand-dark/20 relative overflow-hidden">
                  {post.cover_image ? (
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">📄</div>
                  )}
                  {/* Top shimmer on hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-lg font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{post.read_time} min read</span>
                  </div>
                  <h2 className="text-lg font-bold font-montserrat text-brand-black dark:text-white mb-2
                                 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="text-primary text-sm font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
