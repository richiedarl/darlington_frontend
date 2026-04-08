'use client'

import { useState, useEffect } from 'react'
import { Briefcase, Calendar, ExternalLink, Building2 } from 'lucide-react'

interface Organization {
  id: number
  name: string
  website: string
  description: string
  logo: string | null
  role: string
  type: string
  start_year: number
  end_year: number | null
  is_current: boolean
}

export default function OrganizationsPage() {
  const [orgs, setOrgs] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchOrganizations() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) {
          console.warn('API URL not configured')
          setOrgs([])
          setLoading(false)
          return
        }

        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 5000) // 5 second timeout

        const res = await fetch(`${apiUrl}/api/organizations`, {
          signal: controller.signal,
          next: { revalidate: 3600 }
        })
        
        clearTimeout(timeout)
        
        if (!res.ok) throw new Error('Failed to fetch')
        
        const data = await res.json()
        setOrgs(data.data ?? data ?? [])
      } catch (err) {
        console.error('Failed to fetch organizations:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchOrganizations()
  }, [])

  if (loading) {
    return (
      <main className="pt-24 pb-16 min-h-screen bg-white dark:bg-brand-black">
        <div className="container-custom text-center py-24">
          <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Loading organizations...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24 pb-16 min-h-screen bg-white dark:bg-brand-black transition-colors duration-300">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest border border-primary/30 px-3 py-1 rounded-full bg-primary/5">
            Collaborations
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-brand-black dark:text-white mt-4 mb-4">
            Organizations & <span className="bg-gradient-to-r from-primary to-brand-dark bg-clip-text text-transparent">Partners</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Companies and organizations I've had the privilege of building digital solutions for.
          </p>
        </div>

        {error || orgs.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold text-brand-black dark:text-white mb-2">Coming soon</h3>
            <p className="text-gray-500 dark:text-gray-400">Organization details will appear here shortly.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {orgs.map((org) => (
              <div key={org.id}
                className="group flex gap-5 rounded-2xl p-6
                           bg-white/70 dark:bg-white/5 backdrop-blur-sm
                           border border-white/50 dark:border-primary/10
                           shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]
                           hover:shadow-[0_8px_40px_rgba(11,217,167,0.12)]
                           hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">

                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Logo */}
                <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden
                                bg-gradient-to-br from-primary/20 to-brand-dark/20
                                flex items-center justify-center shadow-md">
                  {org.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={org.logo} alt={org.name} className="w-full h-full object-contain p-1" />
                  ) : (
                    <Building2 className="w-8 h-8 text-primary/60" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h2 className="text-lg font-bold font-montserrat text-brand-black dark:text-white
                                   group-hover:text-primary transition-colors truncate">
                      {org.name}
                    </h2>
                    {org.is_current && (
                      <span className="flex-shrink-0 text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-medium">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="text-primary text-sm font-medium mb-1">{org.role}</p>
                  <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {org.start_year} — {org.is_current ? 'Present' : org.end_year}
                    {org.type && ` · ${org.type}`}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {org.description}
                  </p>

                  {org.website && org.website !== '#' && (
                    <a href={org.website} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary text-xs font-medium mt-3 hover:opacity-80 transition-opacity">
                      Visit Website <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}