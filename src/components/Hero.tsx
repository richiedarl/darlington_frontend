'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-white dark:bg-brand-black transition-colors duration-300">

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-dark/10 dark:bg-brand-dark/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 text-sm font-semibold text-primary border border-primary/30 rounded-full bg-primary/5 dark:bg-primary/10 backdrop-blur-sm">
                ⚡ Full-Stack Software Developer
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-montserrat leading-tight">
              <span className="text-brand-black dark:text-white">Darlington</span>
              <br />
              <span className="bg-gradient-to-r from-primary to-brand-dark bg-clip-text text-transparent">
                Okorie
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 font-medium">
              Full-Stack Software Developer & Tech Educator
            </p>

            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              I craft high-performance, scalable digital solutions using modern technologies.
              <br />
              <span className="text-sm text-primary mt-2 inline-block font-semibold">
                Founder, DevdarlMedia
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#projects" className="btn-primary inline-block text-center">
                View Curated Work
              </Link>
              <Link href="/contact" className="btn-outline inline-block text-center">
                Let's Talk
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '5+', label: 'Years Experience' },
                { value: '50+', label: 'Projects Delivered' },
                { value: '30+', label: 'Happy Clients' },
                { value: '24/7', label: 'Support' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  className="p-4 text-center rounded-2xl
                             bg-white/60 dark:bg-white/5 backdrop-blur-sm
                             border border-primary/20 dark:border-primary/10
                             shadow-[0_4px_20px_rgba(11,217,167,0.08)]
                             hover:shadow-[0_4px_20px_rgba(11,217,167,0.2)]
                             hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-primary font-montserrat">{stat.value}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right — Profile Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            {/* Rotating ring decoration */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full
                         border border-dashed border-primary/20 dark:border-primary/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[380px] h-[380px] md:w-[460px] md:h-[460px] rounded-full
                         border border-dashed border-brand-dark/10 dark:border-primary/10"
            />

            {/* Glow blob */}
            <div className="absolute w-72 h-72 bg-gradient-to-br from-primary/30 to-brand-dark/30 rounded-full blur-3xl opacity-50 dark:opacity-60" />

            {/* Floating dots */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-8 right-8 w-4 h-4 bg-primary rounded-full shadow-[0_0_12px_rgba(11,217,167,0.6)]"
            />
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-12 left-8 w-3 h-3 bg-brand-dark rounded-full shadow-[0_0_10px_rgba(3,45,52,0.6)]"
            />
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/3 left-4 w-2 h-2 bg-primary/60 rounded-full"
            />

            {/* Main image card */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              {/* Glassmorphism frame */}
              <div className="relative rounded-3xl p-1.5
                              bg-gradient-to-br from-primary/30 via-white/10 to-brand-dark/20
                              dark:from-primary/20 dark:via-white/5 dark:to-brand-dark/30
                              shadow-[0_20px_60px_rgba(11,217,167,0.2)] dark:shadow-[0_20px_60px_rgba(11,217,167,0.25)]
                              backdrop-blur-sm">

                {/* Shimmer top line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent rounded-full" />

                {/* Image container */}
                <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden
                                bg-gradient-to-br from-gray-100 to-gray-200 dark:from-brand-black dark:to-brand-dark">

                  {/* ── YOUR PHOTO: place it at /public/images/profile.jpg ── */}
                  <Image
                    src="/images/profile.png"
                    alt="Darlington Okorie"
                    fill
                    priority
                    className="object-cover object-top"
                  />

                  {/* Fallback gradient shown behind image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-brand-black dark:to-brand-dark -z-10">
                    <div className="text-center px-6">
                      <div className="w-40 h-40 mx-auto bg-gradient-to-br from-primary to-brand-dark rounded-full
                                      flex items-center justify-center
                                      shadow-[0_0_40px_rgba(11,217,167,0.4)]">
                        <span className="text-6xl">👨‍💻</span>
                      </div>
                      <p className="text-brand-black dark:text-white font-bold mt-4 font-montserrat">Darlington Okorie</p>
                      <p className="text-primary text-sm mt-1">Full-Stack Developer</p>
                    </div>
                  </div>

                  {/* Bottom name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-black/80 via-brand-black/40 to-transparent p-4 z-10">
                    <p className="text-white font-bold font-montserrat text-sm">Darlington Okorie</p>
                    <p className="text-primary text-xs mt-0.5">Full-Stack Developer · DevdarlMedia</p>
                  </div>
                </div>

                {/* Shimmer bottom line */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-full" />
              </div>

              {/* Floating badge — top right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute -top-4 -right-4 bg-primary text-brand-dark text-xs font-bold
                           px-3 py-1.5 rounded-full
                           shadow-[0_0_20px_rgba(11,217,167,0.5)]
                           border border-primary/20"
              >
                ✦ Available for Work
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
                className="absolute -bottom-4 -left-4
                           bg-white/80 dark:bg-brand-dark/80 backdrop-blur-md
                           border border-primary/20 rounded-2xl px-3 py-2
                           shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(11,217,167,0.1)]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_6px_rgba(11,217,167,0.8)]" />
                  <span className="text-xs font-semibold text-brand-black dark:text-white">Open to Projects</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}