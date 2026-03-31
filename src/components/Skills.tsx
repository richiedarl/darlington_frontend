'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SkillCategory {
  name: string
  skills: string[]
  icon: string
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const skillCategories: SkillCategory[] = [
    { name: 'Frontend Development', icon: '🎨', skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5/CSS3', 'Tailwind CSS'] },
    { name: 'Backend Development', icon: '⚙️', skills: ['Node.js', 'Laravel', 'Python', 'PHP', 'REST APIs', 'GraphQL'] },
    { name: 'Database & Cloud', icon: '☁️', skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'AWS', 'Docker'] },
    { name: 'Programming Languages', icon: '💻', skills: ['JavaScript', 'TypeScript', 'Python', 'PHP', 'C#', 'Java'] },
    { name: 'Mobile Development', icon: '📱', skills: ['React Native', 'Flutter', 'Expo', 'iOS', 'Android'] },
    { name: 'Tools & Best Practices', icon: '🛠️', skills: ['Git', 'CI/CD', 'Jest', 'Performance Optimization', 'Security', 'Agile'] }
  ]

  return (
    <section id="skills" className="py-24 relative bg-white dark:bg-brand-black/80 transition-colors duration-300">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-brand-black dark:text-white">Technical Skills</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable, and performant applications
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl border border-gray-200 dark:border-primary/20
                           bg-white dark:bg-brand-dark/60 shadow-md hover:shadow-xl
                           p-6 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{category.icon}</span>
                  <h3 className="text-lg font-bold font-montserrat text-brand-black dark:text-white">
                    {category.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm
                                 font-medium border border-primary/20 hover:border-primary/50
                                 hover:bg-primary/20 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}