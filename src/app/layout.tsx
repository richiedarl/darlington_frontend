// src/app/layout.tsx
import type { Metadata } from 'next'
import { Poppins, Montserrat } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
  fallback: ['system-ui', 'sans-serif'],  // ← ADD THIS
  preload: false,  // ← ADD THIS
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800'],
  fallback: ['system-ui', 'sans-serif'],  // ← ADD THIS
  preload: false,  // ← ADD THIS
})
export const metadata: Metadata = {
  title: 'Darlington Okorie | Full-Stack Software Developer',
  description: 'Darlington Okorie - Full-Stack Software Developer specializing in React, Node.js, Laravel, and modern web technologies. Founder of DevdarlMedia.',
  keywords: 'Darlington Okorie, software developer, full-stack developer, React, Node.js, Laravel, Python, DevdarlMedia, web development, mobile development',
  authors: [{ name: 'Darlington Okorie' }],
  openGraph: {
    title: 'Darlington Okorie | Full-Stack Software Developer',
    description: 'Expert software development services by Darlington Okorie. Specializing in modern web and mobile technologies.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${montserrat.variable} font-poppins`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  )
}