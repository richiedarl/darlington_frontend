'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, MapPin, Clock } from 'lucide-react'
import { FaGithub, FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'X (Twitter)', username: '@IamDevdarl', url: 'https://twitter.com/IamDevdarl', icon: FaTwitter, color: 'hover:bg-[#1DA1F2]' },
    { name: 'LinkedIn', username: 'darlingtonOkoriec', url: 'https://linkedin.com/in/darlingtonOkoriec', icon: FaLinkedin, color: 'hover:bg-[#0A66C2]' },
    { name: 'GitHub', username: 'richiedarl', url: 'https://github.com/richiedarl', icon: FaGithub, color: 'hover:bg-[#333]' },
    { name: 'Facebook', username: 'darlingtonOkoriec', url: 'https://facebook.com/darlingtonOkoriec', icon: FaFacebook, color: 'hover:bg-[#1877F2]' },
    { name: 'Instagram', username: 'darlingtonOkoriec', url: 'https://instagram.com/darlingtonOkoriec', icon: FaInstagram, color: 'hover:bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]' },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-brand-black border-t border-primary/20 py-12 transition-colors duration-300">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-montserrat">
              <span className="text-brand-black dark:text-white">Darlington</span>
              <span className="text-primary"> Okorie</span>
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Full-Stack Software Developer & Tech Educator. Founder of DevdarlMedia.
            </p>
            {/* Quick Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Mail className="w-3 h-3 text-primary" />
                <a href="mailto:devdarlcreates@gmail.com" className="hover:text-primary transition-colors">
                  devdarlcreates@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <MapPin className="w-3 h-3 text-primary" />
                <span>Nigeria</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3 text-primary" />
                <span>Response within 24h</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-black dark:text-white font-montserrat">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              {[
                { href: '/', label: 'Home' },
                { href: '/#about', label: 'About' },
                { href: '/#projects', label: 'Projects' },
                { href: '/#services', label: 'Services' },
                { href: '/#skills', label: 'Skills' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-black dark:text-white font-montserrat">Services</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              {[
                { href: '/consultation', label: 'Consultation' },
                { href: '/booking', label: 'Project Booking' },
                { href: '/tutoring', label: 'Personal Tutoring' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect with Social Icons */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-black dark:text-white font-montserrat">Connect</h4>
            <div className="space-y-4">
              {/* Social Icons */}
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 
                               flex items-center justify-center transition-all duration-300
                               hover:text-white ${social.color} hover:shadow-lg`}
                    aria-label={`Follow me on ${social.name}`}
                  >
                    <social.icon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
                    {/* Tooltip */}
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                      {social.username}
                    </span>
                  </motion.a>
                ))}
              </div>
              
              {/* Newsletter Signup (Optional) */}
              <div className="mt-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Stay updated with my latest work</p>
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-brand-dark/60 focus:outline-none focus:border-primary"
                  />
                  <button 
                    type="submit"
                    className="px-3 py-2 text-xs bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Darlington Okorie (Devdarl). All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2 text-xs">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}