'use client'
import { motion } from 'framer-motion'
import { useState, FormEvent, ChangeEvent } from 'react'
import { useInView } from 'react-intersection-observer'

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setStatus('sending')
    try {
      const subject = encodeURIComponent(`New Inquiry from ${formData.name}`)
      const body = encodeURIComponent(JSON.stringify({ ...formData, created_at: new Date().toISOString() }, null, 2))
      window.location.href = `mailto:devdarlcreates@gmail.com?subject=${subject}&body=${body}`
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', service_type: '', message: '', budget: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const inputClass = `w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700
    bg-white dark:bg-brand-dark/60 text-brand-black dark:text-white
    placeholder-gray-400 dark:placeholder-gray-500
    focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
    transition-all duration-200`

  const labelClass = "block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1"

  return (
    <section id="contact" className="py-24 relative bg-white dark:bg-brand-black transition-colors duration-300">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-brand-black dark:text-white">Get In Touch</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Have a project in mind or want to level up your tech skills? Let's connect and bring your ideas to life.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Info */}
            <div>
              <h3 className="text-2xl font-bold text-brand-black dark:text-white font-montserrat mb-4">
                Let's Work Together
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                Ready to build something amazing? Whether you need a custom web application,
                mobile solution, or want to enhance your tech skills through personalized tutoring,
                I'm here to help you achieve your goals.
              </p>

              <div className="space-y-4 mb-8">
                {/* Email */}
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <a href="mailto:devdarlcreates@gmail.com" className="text-brand-black dark:text-white hover:text-primary transition-colors text-sm font-medium">
                      devdarlcreates@gmail.com
                    </a>
                  </div>
                </div>

                {/* GitHub */}
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">GitHub</p>
                    <a href="https://github.com/richiedarl" target="_blank" rel="noopener noreferrer" className="text-brand-black dark:text-white hover:text-primary transition-colors text-sm font-medium">
                      github.com/richiedarl
                    </a>
                  </div>
                </div>
              </div>

              {/* Response Time Card */}
              <div className="p-6 border-l-4 border-primary rounded-r-2xl bg-gray-50 dark:bg-brand-dark/50 shadow-sm">
                <h4 className="font-semibold text-brand-black dark:text-white mb-2">Response Time</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  I typically respond within 24 hours. For urgent inquiries, please include "URGENT" in your message subject.
                </p>
              </div>
            </div>

            {/* Right Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className={labelClass}>Full Name *</label>
                <input type="text" id="name" name="name" placeholder="John Doe"
                  value={formData.name} onChange={handleChange} required className={inputClass} />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Email Address *</label>
                <input type="email" id="email" name="email" placeholder="john@example.com"
                  value={formData.email} onChange={handleChange} required className={inputClass} />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="+234 123 456 7890"
                  value={formData.phone} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label htmlFor="service_type" className={labelClass}>Service Interested In *</label>
                <select id="service_type" name="service_type" value={formData.service_type}
                  onChange={handleChange} required className={inputClass}>
                  <option value="">Select a service</option>
                  <option value="web_development">Web Development</option>
                  <option value="mobile_development">Mobile App Development</option>
                  <option value="consultation">Technical Consultation</option>
                  <option value="tutoring">Personal Tutoring</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="budget" className={labelClass}>Budget Range (Optional)</label>
                <input type="text" id="budget" name="budget"
                  placeholder="e.g., ₦500,000 - ₦1,000,000 or $1,000 - $2,000"
                  value={formData.budget} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>Message *</label>
                <textarea id="message" name="message"
                  placeholder="Tell me about your project or what you'd like to learn..."
                  value={formData.message} onChange={handleChange} required rows={5}
                  className={`${inputClass} resize-none`} />
              </div>

              <button type="submit" disabled={status === 'sending'}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
                {status === 'sending' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : 'Send Message'}
              </button>

              {status === 'success' && (
                <div className="bg-primary/10 border border-primary text-primary px-4 py-3 rounded-lg text-center text-sm font-medium">
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-center text-sm font-medium">
                  ✗ Failed to send. Please try again or email me directly at devdarlcreates@gmail.com
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}