// src/app/page.tsx
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Services from '@/components/Services'
import Skills from '@/components/Skills'
import Contact from '@/app/contact/page'

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-[#201e1e] to-[#2a2828]">
      <Hero />
      <About />
      <Projects />
      <Services />
      <Skills />
      {/* <Contact /> */}
    </div>
  )
}