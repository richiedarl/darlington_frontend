'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import {
  Code2,
  Globe2,
  GraduationCap,
  Users,
  Rocket,
  Briefcase,
  Award,
  Heart,
  ExternalLink,
} from 'lucide-react'

// ─────────────────────────────────────────────
// CONFIG — toggle between logo image and text
// ─────────────────────────────────────────────
const PROFILE_CONFIG = {
  // Set to true to show your photo, false to show the text/emoji fallback
  useImage: true,
  // Path to your profile photo inside /public
  imageSrc: '/images/view2.png',
  name: 'Darlington Okorie',
  title: 'Full-Stack Developer & Founder',
}

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const organizations = [
    { name: 'DevdarlMedia', role: 'Founder & Director', icon: Rocket, url: '#' },
    { name: 'Emerald Institute', role: 'Tech Partner', icon: GraduationCap, url: '#' },
    { name: 'Netkings', role: 'Tech Partner', icon: GraduationCap, url: 'https://netkings.ng' },
    { name: 'Vision Alive Foundation', role: 'CTO', icon: Heart, url: 'https://visionalive.ng' },
    { name: 'Vision Incubation Hub', role: 'Senior Developer', icon: Users, url: 'https://thevihub.com' },
    { name: 'Google Developer Group, Aba', role: 'Volunteer & Developer', icon: Users, url: 'https://ecconsults.com/' },
    { name: 'Citi Polytechnic, Abuja', role: 'Developer', icon: GraduationCap, url: 'https://citipolytechnic.edu.ng/' },
    { name: 'Ebenezer Chibundu Consults', role: 'Tech Lead', icon: Briefcase, url: 'https://coachace.org' },
    { name: 'Maelis', role: 'Chairman', icon: Code2, url: '#' },
    { name: 'Constituencyproject.org', role: 'Technical Advisor', icon: Globe2, url: 'https://constituencyproject.org' },
    { name: 'sirng.org', role: 'Full-Stack Developer', icon: Code2, url: 'https://sirng.org' },
  ]

  const stats = [
    { value: '5+', label: 'Years', icon: Award },
    { value: '50+', label: 'Projects', icon: Rocket },
    { value: '30+', label: 'Clients', icon: Users },
  ]

  const techStack = [
    { name: 'React', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' },
    { name: 'Next.js', color: 'bg-gray-500/10 text-gray-600 border-gray-500/20 dark:text-gray-400' },
    { name: 'Node.js', color: 'bg-green-500/10 text-green-600 border-green-500/20' },
    { name: 'Laravel', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
    { name: 'Python', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    { name: 'TypeScript', color: 'bg-blue-600/10 text-blue-600 border-blue-600/20' },
    { name: 'TailwindCSS', color: 'bg-sky-500/10 text-sky-500 border-sky-500/20' },
    { name: 'MongoDB', color: 'bg-green-600/10 text-green-600 border-green-600/20' },
    { name: 'PostgreSQL', color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' },
  ]

  return (
    <section id="about" className="py-24 relative bg-gray-50 dark:bg-[#171515] transition-colors duration-300 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-dark/5 dark:bg-brand-dark/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-16"
        >
          {/* ── Section Header ── */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest border border-primary/30 px-3 py-1 rounded-full bg-primary/5">
                About Me
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black dark:text-white font-montserrat mb-4">
              Crafting Digital{' '}
              <span className="bg-gradient-to-r from-primary to-brand-dark bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Full-stack developer passionate about building robust digital solutions and empowering developers through education.
            </p>
          </div>

          {/* ── Main Grid ── */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* ── LEFT: Profile Card ── */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md rounded-3xl border border-white/30 dark:border-primary/20
                              bg-white/40 dark:bg-white/5 backdrop-blur-xl
                              shadow-[0_8px_40px_rgba(11,217,167,0.15)] dark:shadow-[0_8px_40px_rgba(11,217,167,0.2)]
                              p-4 overflow-hidden">

                {/* Shimmer top line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

                {/* ── Photo or Text Avatar ── */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-brand-black dark:to-brand-dark">
                  {PROFILE_CONFIG.useImage ? (
                    // ── IMAGE MODE ──
                    <Image
                      src={PROFILE_CONFIG.imageSrc}
                      alt={PROFILE_CONFIG.name}
                      fill
                      className="object-cover object-top"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  ) : (
                    // ── TEXT / LOGO MODE ──
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                      {/* Logo circle — replace inner content with <img> if you have a logo */}
                      <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary to-brand-dark
                                      flex items-center justify-center
                                      shadow-[0_0_40px_rgba(11,217,167,0.35)]">
                        {/* Swap the span below with your logo <img> if desired */}
                        <span className="text-5xl font-black text-white font-montserrat">D</span>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-brand-black dark:text-white font-montserrat">
                          {PROFILE_CONFIG.name}
                        </p>
                        <p className="text-primary text-sm font-medium mt-1">{PROFILE_CONFIG.title}</p>
                      </div>
                    </div>
                  )}

                  {/* Bottom name overlay — always shown */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-black/80 to-transparent p-4 z-10">
                    <h3 className="text-lg font-bold text-white font-montserrat">{PROFILE_CONFIG.name}</h3>
                    <p className="text-primary text-sm font-medium">{PROFILE_CONFIG.title}</p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {stats.map((stat) => (
                    <div key={stat.label}
                      className="text-center py-3 rounded-xl bg-white/50 dark:bg-white/5
                                 border border-primary/10 hover:border-primary/30
                                 transition-all group cursor-default">
                      <stat.icon className="w-4 h-4 text-primary mx-auto mb-1 opacity-60 group-hover:opacity-100 transition-opacity" />
                      <div className="text-lg font-bold text-primary font-montserrat">{stat.value}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Founder badge */}
              <div className="absolute -top-3 -right-3 bg-primary text-brand-dark text-xs font-bold px-3 py-1.5 rounded-full
                              shadow-[0_0_15px_rgba(11,217,167,0.4)]">
                Founder, DevdarlMedia
              </div>
            </div>

            {/* ── RIGHT: Content Cards ── */}
            <div className="space-y-5">

              {/* Who I Am */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Code2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-black dark:text-white mb-2">Who I Am</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      I'm <strong className="text-primary">Darlington Okorie</strong> — a full-stack software developer
                      passionate about building robust digital solutions. As the{' '}
                      <strong className="text-primary">Founder and Director of DevdarlMedia</strong>, I lead a client
                      services and tutorials agency dedicated to delivering premium tech solutions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Expertise + Tech Stack */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-brand-black dark:text-white mb-2">My Expertise</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      From React & Next.js on the frontend to Node.js, Laravel, and Python on the backend — I engineer
                      fast, secure, and scalable applications that solve real-world problems.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech) => (
                        <span key={tech.name}
                          className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${tech.color}
                                      hover:scale-105 transition-transform cursor-default`}>
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Organizations */}
              <div className="card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-black dark:text-white">Organizations I've Worked With</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      Collaborations across education, tech, and non-profit sectors
                    </p>
                  </div>
                </div>

                {/* Org cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {organizations.map((org, idx) => (
                    <motion.div
                      key={org.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.05 * idx }}
                    >
                      {org.url && org.url !== '#' ? (
                        <a
                          href={org.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl group
                                     bg-gray-50 dark:bg-white/5
                                     border border-gray-200 dark:border-primary/10
                                     hover:border-primary/40 hover:bg-primary/5 dark:hover:bg-primary/5
                                     hover:shadow-[0_4px_16px_rgba(11,217,167,0.1)]
                                     transition-all duration-200"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0
                                          group-hover:bg-primary/20 transition-colors">
                            <org.icon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-brand-black dark:text-white truncate
                                          group-hover:text-primary transition-colors">
                              {org.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{org.role}</p>
                          </div>
                          <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-primary flex-shrink-0 transition-colors" />
                        </a>
                      ) : (
                        <div
                          className="flex items-center gap-3 p-3 rounded-xl group cursor-default
                                     bg-gray-50 dark:bg-white/5
                                     border border-gray-200 dark:border-primary/10
                                     hover:border-primary/30 hover:bg-primary/5 dark:hover:bg-primary/5
                                     transition-all duration-200"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0
                                          group-hover:bg-primary/20 transition-colors">
                            <org.icon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-brand-black dark:text-white truncate">
                              {org.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{org.role}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="card p-6 border-l-4 border-l-primary">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed text-sm">
                      "As the founder of <strong className="text-primary">DevdarlMedia</strong>, I'm committed to
                      bridging the gap between quality tech solutions and accessible tech education. Whether you need a
                      custom software solution or want to level up your coding skills, I've got you covered."
                    </p>
                    <p className="text-primary font-semibold mt-3 text-sm">— Darlington Okorie</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}