'use client'
import { motion } from 'framer-motion'
import { useState, FormEvent, ChangeEvent, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { 
  Mail, 
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
  Phone,
  Sparkles,
  ArrowRight
} from 'lucide-react'
// Import from react-icons
import { FaGithub, FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa'

interface FormData {
  name: string
  email: string
  phone: string
  service_type: string
  message: string
  budget: string
}

type StatusType = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', service_type: '', message: '', budget: ''
  })
  const [status, setStatus] = useState<StatusType>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Social media links with React Icons
  const socialLinks = [
    { name: 'X (Twitter)', username: '@IamDevdarl', url: 'https://twitter.com/IamDevdarl', icon: FaTwitter, color: 'hover:bg-[#1DA1F2]' },
    { name: 'LinkedIn', username: 'darlingtonOkoriec', url: 'https://linkedin.com/in/darlingtonOkoriec', icon: FaLinkedin, color: 'hover:bg-[#0A66C2]' },
    { name: 'GitHub', username: 'richiedarl', url: 'https://github.com/richiedarl', icon: FaGithub, color: 'hover:bg-[#333]' },
    { name: 'Facebook', username: 'darlingtonOkoriec', url: 'https://facebook.com/darlingtonOkoriec', icon: FaFacebook, color: 'hover:bg-[#1877F2]' },
    { name: 'Instagram', username: 'darlingtonOkoriec', url: 'https://instagram.com/darlingtonOkoriec', icon: FaInstagram, color: 'hover:bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]' },
  ]

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    setStatus('sending')
    setErrorMessage('')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', service_type: '', message: '', budget: '' })
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setStatus('idle'), 5000)
      } else {
        throw new Error(data.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Send failed:', error)
      setStatus('error')
      setErrorMessage('Failed to send message. Please try again or email me directly.')
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const inputClass = `w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700
    bg-white dark:bg-brand-dark/60 text-brand-black dark:text-white
    placeholder-gray-400 dark:placeholder-gray-500
    focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
    transition-all duration-200`

  const labelClass = "block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1"

  return (
    <section id="contact" className="py-24 relative bg-white dark:bg-brand-black transition-colors duration-300 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-brand-dark/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-dark/5 dark:bg-brand-dark/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-block mb-4"
            >
              <span className="text-xs font-semibold text-primary uppercase tracking-widest border border-primary/30 px-4 py-1.5 rounded-full bg-primary/5 backdrop-blur-sm inline-flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                Contact Me
                <Sparkles className="w-3 h-3" />
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-brand-black dark:text-white font-montserrat mb-4"
            >
              Get In{' '}
              <span className="bg-gradient-to-r from-primary to-brand-dark bg-clip-text text-transparent">
                Touch
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Have a project in mind or want to level up your tech skills? Let's connect and bring your ideas to life.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info & Socials */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-brand-black dark:text-white font-montserrat mb-4">
                  Let's Work Together
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Ready to build something amazing? Whether you need a custom web application,
                  mobile solution, or want to enhance your tech skills through personalized tutoring,
                  I'm here to help you achieve your goals.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
                    <a href="mailto:devdarlcreates@gmail.com" className="text-brand-black dark:text-white hover:text-primary transition-colors font-medium">
                      devdarlcreates@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Phone</p>
                    <a href="tel:+2341234567890" className="text-brand-black dark:text-white hover:text-primary transition-colors font-medium">
                      +234 (0) 123 456 7890
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Location</p>
                    <p className="text-brand-black dark:text-white font-medium">Nigeria</p>
                  </div>
                </div>
              </div>

              {/* Response Time Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-brand-dark/5 border border-primary/10 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-brand-black dark:text-white">Response Time</h4>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  I typically respond within 24 hours. For urgent inquiries, please include <span className="text-primary font-medium">"URGENT"</span> in your message subject.
                </p>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-brand-black dark:text-white mb-4">Connect With Me</h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group relative w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 
                                 flex items-center justify-center transition-all duration-300
                                 hover:text-white ${social.color} hover:shadow-lg`}
                      aria-label={`Follow me on ${social.name}`}
                    >
                      <social.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
                      {/* Tooltip */}
                      <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg z-20">
                        {social.username}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability Badge */}
              <div className="flex items-center gap-3 pt-4 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
                </div>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">Available for freelance work</span>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={labelClass}>Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      placeholder="John Doe"
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      className={inputClass} 
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="john@example.com"
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      className={inputClass} 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      placeholder="+234 123 456 7890"
                      value={formData.phone} 
                      onChange={handleChange} 
                      className={inputClass} 
                    />
                  </div>

                  <div>
                    <label htmlFor="service_type" className={labelClass}>Service Interested In *</label>
                    <select 
                      id="service_type" 
                      name="service_type" 
                      value={formData.service_type}
                      onChange={handleChange} 
                      required 
                      className={inputClass}
                    >
                      <option value="">Select a service</option>
                      <option value="web_development">🌐 Web Development</option>
                      <option value="mobile_development">📱 Mobile App Development</option>
                      <option value="consultation">💡 Technical Consultation</option>
                      <option value="tutoring">📚 Personal Tutoring</option>
                      <option value="other">✨ Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className={labelClass}>Budget Range (Optional)</label>
                  <input 
                    type="text" 
                    id="budget" 
                    name="budget"
                    placeholder="e.g., ₦500,000 - ₦1,000,000 or $1,000 - $2,000"
                    value={formData.budget} 
                    onChange={handleChange} 
                    className={inputClass} 
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>Message *</label>
                  <textarea 
                    id="message" 
                    name="message"
                    placeholder="Tell me about your project or what you'd like to learn..."
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    rows={5}
                    className={`${inputClass} resize-none`} 
                  />
                </div>

                <motion.button 
                  type="submit" 
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group py-3"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 bg-green-500/10 border border-green-500 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg text-sm"
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>✓ Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}
                
                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage || 'Failed to send. Please email me directly at devdarlcreates@gmail.com'}</span>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}