'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
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
  Sparkles,
  Star,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Calendar,
  MapPin,
  HandHeart,
} from 'lucide-react'

const PROFILE_CONFIG = {
  useImage: true,
  imageSrc: '/images/view2.png',
  name: 'Darlington Okorie',
  title: 'Full-Stack Developer & Founder',
  bio: 'Building digital solutions that make a difference',
  email: 'devdarlcreates@gmail.com',
  location: 'Nigeria',
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
}

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: '-50px' })
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [hoveredOrg, setHoveredOrg] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    setMounted(true)
    
    // Simple scroll tracking for parallax effect
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrolled = Math.min(100, Math.max(0, (window.scrollY - rect.top) / 5))
        setScrollY(scrolled)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Full organizations list
  const organizations = useMemo(() => [
    { name: 'DevdarlMedia', role: 'Founder & Director', icon: Rocket, url: '#', featured: true, period: '2020 - Present' },
    { name: 'Vision Alive Foundation', role: 'CTO', icon: Heart, url: 'https://visionalive.ng', featured: true, period: '2021 - Present' },
    { name: 'Constituencyproject.org', role: 'Technical Advisor', icon: Globe2, url: 'https://constituencyproject.org', featured: true, period: '2023 - Present' },
    { name: 'OluchiMedia', role: 'Developer', icon: Briefcase, url: 'https://www.oluchimedia.com', featured: false, period: '2023 - Present' },
    { name: 'Chisom Ogbudimkpa', role: 'Developer', icon: Code2, url: 'https://chisomogbudimkpa.com/', featured: false, period: '2023 - Present' },
    { name: 'DrMCF (Dr Modesty Care Foundation)', role: 'Developer', icon: Heart, url: 'http://drmcf.org', featured: false, period: '2024 - Present' },
    { name: 'Netkings', role: 'Tech Partner', icon: GraduationCap, url: 'https://netkings.ng', featured: false, period: '2021 - Present' },
    { name: 'Vision Incubation Hub', role: 'Senior Developer', icon: Users, url: 'https://thevihub.com', featured: false, period: '2022 - Present' },
    { name: 'Emerald Institute', role: 'Tech Partner', icon: GraduationCap, url: '#', featured: false, period: '2022 - Present' },
    { name: 'Ebenezer Chibundu Consults', role: 'Tech Lead', icon: Briefcase, url: 'https://coachace.org', featured: false, period: '2021 - Present' },
    { name: 'Citi Polytechnic, Abuja', role: 'Developer', icon: GraduationCap, url: 'https://citipolytechnic.edu.ng/', featured: false, period: '2022 - 2023' },
    { name: 'Maelis', role: 'Chairman', icon: Code2, url: '#', featured: false, period: '2023 - Present' },
    { name: 'sirng.org', role: 'Full-Stack Developer', icon: Code2, url: 'https://sirng.org', featured: false, period: '2023 - Present' },
  ], [])

  // Stats
  const stats = useMemo(() => [
    { value: '5+', label: 'Years Experience', icon: Award, description: 'Full-stack development' },
    { value: '50+', label: 'Projects Completed', icon: Rocket, description: 'Production apps delivered' },
    { value: '30+', label: 'Happy Clients', icon: Users, description: 'Worldwide' },
    { value: '100+', label: 'Students Mentored', icon: GraduationCap, description: 'Tech education' },
  ], [])

  // Tech stack
  const techStack = useMemo(() => [
    { name: 'React', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20', level: 95 },
    { name: 'Next.js', color: 'bg-gray-500/10 text-gray-600 border-gray-500/20 dark:text-gray-400', level: 90 },
    { name: 'Node.js', color: 'bg-green-500/10 text-green-600 border-green-500/20', level: 88 },
    { name: 'Laravel', color: 'bg-red-500/10 text-red-500 border-red-500/20', level: 85 },
    { name: 'Python', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', level: 82 },
    { name: 'TypeScript', color: 'bg-blue-600/10 text-blue-600 border-blue-600/20', level: 88 },
    { name: 'TailwindCSS', color: 'bg-sky-500/10 text-sky-500 border-sky-500/20', level: 92 },
    { name: 'MongoDB', color: 'bg-green-600/10 text-green-600 border-green-600/20', level: 85 },
    { name: 'PostgreSQL', color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20', level: 83 },
    { name: 'Express.js', color: 'bg-gray-500/10 text-gray-600 border-gray-500/20', level: 87 },
  ], [])

  // Articles/Blog posts
  const articles = useMemo(() => [
    { title: 'Building Scalable Web Applications', platform: 'CoderLegion', date: '2024', url: 'https://coderlegion.com/user/Darlington%20Okorie', icon: BookOpen },
    { title: 'Laravel Best Practices for 2024', platform: 'Dev.to', date: '2024', url: 'https://dev.to/darlingtonokoriec', icon: BookOpen },
    { title: 'Getting Started with React and TypeScript', platform: 'CoderLegion', date: '2023', url: 'https://coderlegion.com/user/Darlington%20Okorie', icon: BookOpen },
  ], [])

  // Volunteering
  const volunteering = useMemo(() => [
    { 
      title: 'Technovation Girls', 
      description: 'Volunteer mentor supporting girls in tech', 
      icon: HandHeart,
      url: 'https://technovationchallenge.org'
    },
    { 
      title: 'International Youth Day Event', 
      description: 'Volunteer & Organizer', 
      icon: Users,
      url: 'https://visionalive.ng/iyd/'
    },
    { 
      title: 'DevFest Aba', 
      description: 'Volunteer & Developer', 
      icon: Code2,
      url: 'https://gdg.community.dev/gdg-aba/'
    },
    { 
      title: 'Google Developer Group, Aba', 
      description: 'Volunteer & Developer', 
      icon: Users,
      url: 'https://gdg.community.dev/gdg-aba/'
    },
  ], [])

  const isValidUrl = useCallback((url: string) => {
    if (!url || url === '#') return false
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }, [])

  const handleOrgClick = useCallback((url: string) => {
    if (url && url !== '#' && isValidUrl(url)) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }, [isValidUrl])

  if (!mounted) return null

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 relative bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#0a0a0a] dark:via-[#171515] dark:to-[#1a1a1a] transition-colors duration-300 overflow-hidden"
      aria-label="About Darlington Okorie - Full-Stack Developer and Founder"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-dark/5 dark:bg-brand-dark/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5/0.05_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5/0.05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4">
              <motion.span 
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-xs font-semibold text-primary uppercase tracking-widest border border-primary/30 px-4 py-1.5 rounded-full bg-primary/5 backdrop-blur-sm inline-flex items-center gap-2"
              >
                <Sparkles className="w-3 h-3" />
                About Me
                <Sparkles className="w-3 h-3" />
              </motion.span>
            </div>
            <motion.h2 className="text-4xl md:text-6xl font-bold text-brand-black dark:text-white font-montserrat mb-6 leading-tight">
              Crafting Digital{' '}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-brand-dark bg-clip-text text-transparent relative inline-block">
                Solutions
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-brand-dark rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </motion.h2>
            <motion.p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed">
              Full-stack developer passionate about building robust digital solutions and empowering developers through education.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* LEFT: Profile Card */}
            <motion.div 
              variants={fadeInUp}
              style={{ transform: `translateY(${scrollY * 0.3}px)` }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto lg:mx-0">
                {/* Floating badges */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-3 -left-3 z-20 bg-gradient-to-r from-primary to-brand-dark text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl"
                >
                  ⚡ Available for Work
                </motion.div>
                
                {/* Main Card */}
                <div className="relative rounded-3xl border border-white/30 dark:border-primary/20 bg-white/40 dark:bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_70px_-15px_rgba(11,217,167,0.25)] transition-all duration-500 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" />
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 animate-pulse" />

                  {/* Photo Section - FIXED IMAGE PROPS */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-brand-black dark:to-brand-dark">
                    {PROFILE_CONFIG.useImage && !imageError ? (
                      <>
                        {imageLoading && (
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                        <Image
                          src={PROFILE_CONFIG.imageSrc}
                          alt={`${PROFILE_CONFIG.name} - ${PROFILE_CONFIG.title}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className={`object-cover object-top transition-all duration-700 ${
                            imageLoading ? 'scale-110 blur-md' : 'scale-100 blur-0'
                          }`}
                          priority
                          quality={75}
                          onLoad={() => setImageLoading(false)}
                          onError={() => {
                            setImageError(true)
                            setImageLoading(false)
                          }}
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br from-primary/20 via-brand-dark/10 to-primary/10">
                        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary to-brand-dark flex items-center justify-center shadow-2xl">
                          <span className="text-6xl font-black text-white font-montserrat">
                            {PROFILE_CONFIG.name.charAt(0)}
                          </span>
                        </div>
                        <div className="text-center space-y-2">
                          <p className="text-2xl font-bold text-brand-black dark:text-white font-montserrat">
                            {PROFILE_CONFIG.name}
                          </p>
                          <p className="text-primary text-sm font-medium">{PROFILE_CONFIG.title}</p>
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-black/90 via-brand-black/50 to-transparent p-6 z-10 backdrop-blur-sm">
                      <h3 className="text-xl font-bold text-white font-montserrat mb-1">{PROFILE_CONFIG.name}</h3>
                      <p className="text-primary text-sm font-medium mb-2">{PROFILE_CONFIG.title}</p>
                      <p className="text-white/80 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {PROFILE_CONFIG.location}
                      </p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="text-center py-2 px-1 rounded-xl bg-white/50 dark:bg-white/5 border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
                      >
                        <stat.icon className="w-4 h-4 text-primary mx-auto mb-1 opacity-60 group-hover:opacity-100 transition-all" />
                        <div className="text-lg font-bold text-primary">{stat.value}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <a
                    href={`mailto:${PROFILE_CONFIG.email}`}
                    className="block mx-4 mb-4 px-4 py-3 bg-gradient-to-r from-primary to-brand-dark text-white rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-300 group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Contact Me
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Content */}
            <div className="space-y-6">
              {/* Who I Am */}
              <motion.div variants={fadeInUp} className="bg-white dark:bg-white/5 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Code2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-black dark:text-white mb-3">Who I Am</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      I'm <strong className="text-primary">Darlington Okorie</strong> <small className="text-gray-400">(Also Known as Devdarl)</small> — a full-stack software developer
                      passionate about building robust digital solutions. As the{' '}
                      <strong className="text-primary">Founder and Director of DevdarlMedia</strong>, I lead a client
                      services and tutorials agency dedicated to delivering premium tech solutions that drive business growth.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Tech Stack */}
              <motion.div variants={fadeInUp} className="bg-white dark:bg-white/5 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-black dark:text-white mb-3">Technical Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech) => (
                        <span key={tech.name} className={`px-3 py-1.5 text-xs font-medium rounded-lg ${tech.color}`}>
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Organizations */}
              <motion.div variants={fadeInUp} className="bg-white dark:bg-white/5 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-black dark:text-white mb-2">Organizations I've Worked With</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Collaborations across education, tech, and non-profit sectors</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                      {organizations.map((org) => (
                        <div
                          key={org.name}
                          onClick={() => handleOrgClick(org.url)}
                          onMouseEnter={() => setHoveredOrg(org.name)}
                          onMouseLeave={() => setHoveredOrg(null)}
                          className="flex items-center gap-3 p-3 rounded-xl group cursor-pointer bg-gradient-to-r from-gray-50 to-white dark:from-white/5 dark:to-white/5 border border-gray-200 dark:border-primary/10 hover:border-primary/40 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                          role="button"
                          tabIndex={0}
                          onKeyPress={(e) => e.key === 'Enter' && handleOrgClick(org.url)}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 relative z-10">
                            <org.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0 relative z-10">
                            <p className="text-sm font-semibold text-brand-black dark:text-white truncate group-hover:text-primary transition-colors">
                              {org.name}
                              {org.featured && <CheckCircle className="w-3 h-3 text-primary inline ml-1" />}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{org.role}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {org.period}
                            </p>
                          </div>
                          {org.url !== '#' && <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300 relative z-10" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Volunteering Section */}
              <motion.div variants={fadeInUp} className="bg-white dark:bg-white/5 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <HandHeart className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-black dark:text-white mb-3">Volunteering</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {volunteering.map((item) => (
                        <a
                          key={item.title}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl group bg-gradient-to-r from-gray-50 to-white dark:from-white/5 dark:to-white/5 border border-gray-200 dark:border-primary/10 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                        >
                          <item.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                          <div>
                            <p className="text-sm font-medium text-brand-black dark:text-white group-hover:text-primary transition-colors">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                          </div>
                          <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-primary ml-auto flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Articles */}
              <motion.div variants={fadeInUp} className="bg-white dark:bg-white/5 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-black dark:text-white mb-3">Featured Articles</h3>
                    <div className="space-y-3">
                      {articles.map((article) => (
                        <a
                          key={article.title}
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 group"
                        >
                          <div>
                            <p className="text-sm font-medium text-brand-black dark:text-white group-hover:text-primary transition-colors">
                              {article.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{article.platform} • {article.date}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quote */}
              <motion.div variants={fadeInUp} className="bg-white dark:bg-white/5 rounded-2xl p-6 border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed text-base">
                      "As the founder of <strong className="text-primary">DevdarlMedia</strong>, I'm committed to
                      bridging the gap between quality tech solutions and accessible tech education. Whether you need a
                      custom software solution or want to level up your coding skills, I've got you covered."
                    </p>
                    <div className="h-0.5 bg-primary w-12 mt-4" />
                    <p className="text-primary font-semibold mt-3 text-sm flex items-center gap-2">
                      — Darlington Okorie
                      <Sparkles className="w-3 h-3 animate-pulse" />
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}