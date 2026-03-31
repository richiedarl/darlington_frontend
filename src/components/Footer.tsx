'use client'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

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
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Full-Stack Software Developer & Tech Educator. Founder of DevdarlMedia.
            </p>
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
                  <Link href={link.href} className="hover:text-primary transition-colors">
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
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-black dark:text-white font-montserrat">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <a href="mailto:devdarlcreates@gmail.com" className="hover:text-primary transition-colors break-words">
                  devdarlcreates@gmail.com
                </a>
              </li>
              <li>
                <a href="https://github.com/richiedarl" target="_blank" rel="noopener noreferrer"
                  className="hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Darlington Okorie (DevdarlMedia). All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}