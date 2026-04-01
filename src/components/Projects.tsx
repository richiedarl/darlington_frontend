'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface Project {
  title: string
  url: string
  description: string
  tags: string[]
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState<string>('featured')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const projects: Record<string, Project[]> = {
    featured: [
      {
        title: 'NetKings',
        url: 'https://netkings.ng',
        description: 'ISP management suite with live billing, API integrations, and real-time dashboards',
        tags: ['Laravel', 'API', 'Real-time', 'Dashboard']
      },
      {
        title: 'ToBest Healthcare',
        url: 'https://tobesthealthcaresolutions.co.uk',
        description: 'Healthcare system for patient records, appointments, and role-based access',
        tags: ['Laravel', 'Healthcare', 'Role-based', 'Security']
      },
      {
        title: 'Visionalive',
        url: 'https://visionalive.ng',
        description: 'High-end brand presence with custom CMS integration and e-commerce capabilities',
        tags: ['CMS', 'E-commerce', 'Performance']
      }
    ],
    webapps: [
      {
        title: 'The VI Hub',
        url: 'https://thevihub.com',
        description: 'Membership platform with custom features, payment integration, and user management',
        tags: ['Node.js', 'MongoDB', 'Payments', 'Membership']
      },
      {
        title: 'Constituency Project',
        url: 'https://constituencyproject.org',
        description: 'Full-stack web solution for organizational impact tracking and reporting',
        tags: ['React', 'Node.js', 'Analytics', 'Reporting']
      },
      {
        title: 'Tech Rookies',
        url: 'https://techrookies.com.ng',
        description: 'Educational portal with interactive learning management system',
        tags: ['Next.js', 'PostgreSQL', 'LMS', 'Education']
      }
    ],
    fullstack: [
      {
        title: 'DRMCF',
        url: 'https://drmcf.org',
        description: 'Non-profit donation platform optimized for performance and accessibility',
        tags: ['React', 'Node.js', 'Donation', 'Accessibility']
      },
      {
        title: 'SIRNG',
        url: 'https://sirng.org',
        description: 'Professional website with custom backend and content management',
        tags: ['Full-stack', 'CMS', 'Organization']
      },
      {
        title: 'Maelis',
        url: 'https://maelis.com',
        description: 'Custom business solution with integrated workflows and analytics',
        tags: ['Custom Development', 'Business', 'Analytics']
      }
    ]
  }

  const tabs = [
    { id: 'featured', label: 'Featured' },
    { id: 'webapps', label: 'Web Apps' },
    { id: 'fullstack', label: 'Full-Stack' }
  ]

  return (
    <section id="projects" className="py-24 relative bg-gray-50 dark:bg-[#171515] transition-colors duration-300 overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-brand-dark/5 dark:bg-brand-dark/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-4">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest border border-primary/30 px-3 py-1 rounded-full bg-primary/5">
              Portfolio
            </span>
          </div>
          <h2 className="section-title text-brand-black dark:text-white">Featured Projects</h2>

          {/* Tabs — glassmorphism pill */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-2xl p-1.5 gap-1
                            bg-white/60 dark:bg-white/5 backdrop-blur-md
                            border border-white/40 dark:border-primary/10
                            shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(11,217,167,0.05)]">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary text-brand-dark shadow-[0_0_15px_rgba(11,217,167,0.3)]'
                      : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects[activeTab].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden
                           bg-white/70 dark:bg-white/5 backdrop-blur-sm
                           border border-white/50 dark:border-primary/10
                           shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]
                           hover:shadow-[0_8px_40px_rgba(11,217,167,0.15)] dark:hover:shadow-[0_8px_40px_rgba(11,217,167,0.2)]
                           hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Top accent line — appears on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold font-montserrat text-brand-black dark:text-white mb-3
                                 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-lg
                                   border border-primary/20 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  {project.url !== '#' && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-semibold hover:text-brand-dark dark:hover:text-white
                                 transition-colors inline-flex items-center gap-1.5 text-sm group/link"
                    >
                      View Project
                      <svg
                        className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
