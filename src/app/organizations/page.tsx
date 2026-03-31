import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Organizations | Darlington Okorie',
  description: 'Organizations and companies Darlington Okorie has worked with.',
}

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

async function getOrganizations(): Promise<Organization[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organizations`, {
      next: { revalidate: 120 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.data ?? data
  } catch {
    return []
  }
}

export default async function OrganizationsPage() {
  const orgs = await getOrganizations()

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

        {orgs.length === 0 ? (
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
                    <img src={org.logo} alt={org.name} className="w-full h-full object-contain p-1" />
                  ) : (
                    <span className="text-2xl">🏢</span>
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
                  <p className="text-xs text-gray-400 mb-3">
                    {org.start_year} — {org.is_current ? 'Present' : org.end_year}
                    {org.type && ` · ${org.type}`}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {org.description}
                  </p>

                  {org.website && org.website !== '#' && (
                    <a href={org.website} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary text-xs font-medium mt-3 hover:opacity-80 transition-opacity">
                      Visit Website →
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
