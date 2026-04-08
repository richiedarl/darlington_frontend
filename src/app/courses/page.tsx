import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Courses | Darlington Okorie',
  description: 'Learn full-stack development with courses by Darlington Okorie.',
}

export const revalidate = 3600 // ISR: revalidate every hour

interface Course {
  id: number
  title: string
  slug: string
  description: string
  price: number
  currency: string
  level: string
  duration: string
  thumbnail: string | null
  lessons_count: number
  is_free: boolean
  purchase_url: string
}

async function getCourses(): Promise<Course[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    
    // If API URL is not configured, return empty array (shows "coming soon")
    if (!apiUrl) {
      console.warn('NEXT_PUBLIC_API_URL is not configured. Add it to .env.local')
      return []
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000) // Reduced to 5 seconds

    const res = await fetch(`${apiUrl}/api/courses?status=published`, {
      signal: controller.signal,
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Accept': 'application/json',
      }
    })
    
    clearTimeout(timeout)
    
    if (!res.ok) {
      console.error(`API responded with status: ${res.status}`)
      return []
    }
    
    const data = await res.json()
    return data.data ?? data ?? []
  } catch (error) {
    console.error('Failed to fetch courses:', error instanceof Error ? error.message : error)
    // Return empty array instead of throwing to prevent build failure
    return []
  }
}

const levelColor: Record<string, string> = {
  beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
  intermediate: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  advanced: 'bg-red-500/10 text-red-500 border-red-500/20',
}

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <main className="pt-24 pb-16 min-h-screen bg-white dark:bg-brand-black transition-colors duration-300">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest border border-primary/30 px-3 py-1 rounded-full bg-primary/5">
            Learn With Me
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-brand-black dark:text-white mt-4 mb-4">
            Courses & <span className="bg-gradient-to-r from-primary to-brand-dark bg-clip-text text-transparent">Training</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Practical, project-based courses designed to take you from concept to production-ready code.
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-brand-black dark:text-white mb-2">Courses coming soon</h3>
            <p className="text-gray-500 dark:text-gray-400">I'm working on some great content. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id}
                className="group rounded-2xl overflow-hidden
                           bg-white/70 dark:bg-white/5 backdrop-blur-sm
                           border border-white/50 dark:border-primary/10
                           shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]
                           hover:shadow-[0_8px_40px_rgba(11,217,167,0.15)]
                           hover:-translate-y-1.5 transition-all duration-300 flex flex-col">

                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-brand-dark/20 relative overflow-hidden">
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30">🎓</div>
                  )}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {course.is_free && (
                    <div className="absolute top-3 right-3 bg-primary text-brand-dark text-xs font-bold px-2.5 py-1 rounded-full
                                    shadow-[0_0_10px_rgba(11,217,167,0.4)]">
                      FREE
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium capitalize ${levelColor[course.level] ?? 'bg-primary/10 text-primary border-primary/20'}`}>
                      {course.level}
                    </span>
                    <span className="text-xs text-gray-400">{course.duration}</span>
                    <span className="text-xs text-gray-400">· {course.lessons_count} lessons</span>
                  </div>

                  <h2 className="text-lg font-bold font-montserrat text-brand-black dark:text-white mb-2
                                 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {course.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-primary font-montserrat">
                      {course.is_free ? 'Free' : `${course.currency} ${Number(course.price).toLocaleString()}`}
                    </span>
                    <a
                      href={course.purchase_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary !px-5 !py-2 text-sm"
                    >
                      Enroll Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}