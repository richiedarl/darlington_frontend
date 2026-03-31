'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

interface Service {
  icon: string
  title: string
  description: string
  link: string
}

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const services: Service[] = [
    { icon: '💼', title: 'Technical Consultation', description: 'Expert guidance for your software projects, architecture planning, and technology stack selection.', link: '/consultation' },
    { icon: '📅', title: 'Project Booking', description: 'Schedule your development projects with flexible timelines and dedicated support throughout.', link: '/booking' },
    { icon: '🎓', title: 'Personal Tutoring', description: 'One-on-one mentoring in full-stack development, modern frameworks, and backend engineering.', link: '/tutoring' },
    { icon: '🚀', title: 'Custom Web Development', description: 'End-to-end web applications with React, Next.js, Node.js, Laravel, and modern tech stacks.', link: '/contact' },
    { icon: '📱', title: 'Mobile App Development', description: 'Cross-platform mobile applications using React Native, Flutter, and native technologies.', link: '/contact' },
    { icon: '🔧', title: 'Tech Education & Training', description: 'Comprehensive training programs in JavaScript, Python, C#, and software engineering best practices.', link: '/tutoring' }
  ]

  return (
    <section id="services" className="py-24 relative bg-gray-50 dark:bg-brand-black transition-colors duration-300">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-brand-black dark:text-white">Services I Offer</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Comprehensive software development and education services tailored to your needs
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl border border-gray-200 dark:border-primary/20
                           bg-white dark:bg-brand-dark/60 shadow-md hover:shadow-xl
                           p-6 text-center hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold font-montserrat text-brand-black dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-5 text-sm leading-relaxed">
                  {service.description}
                </p>
                <Link
                  href={service.link}
                  className="text-primary font-semibold hover:text-brand-dark dark:hover:text-white
                             transition-colors inline-flex items-center gap-1 group/link text-sm"
                >
                  Learn More
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}