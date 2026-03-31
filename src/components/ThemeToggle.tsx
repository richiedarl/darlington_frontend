'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
                 flex items-center justify-center text-xl
                 bg-primary text-brand-dark
                 shadow-[0_0_20px_rgba(11,217,167,0.4)]
                 hover:shadow-[0_0_35px_rgba(11,217,167,0.6)]
                 hover:scale-110 active:scale-95
                 transition-all duration-300"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}