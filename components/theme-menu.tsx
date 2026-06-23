// components/theme-menu.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import { THEME_OPTIONS, ThemeOption } from "./themes"

export function ThemeMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTheme, setActiveTheme] = useState<ThemeOption>(THEME_OPTIONS[0])
  const menuRef = useRef<HTMLDivElement>(null)

  // Load saved theme on mount
  useEffect(() => {
    const savedThemeId = localStorage.getItem("portfolio-palette")
    if (savedThemeId) {
      const matched = THEME_OPTIONS.find(t => t.id === savedThemeId)
      if (matched) {
        setActiveTheme(matched)
        const root = document.documentElement
        THEME_OPTIONS.forEach(t => {
          if (t.className) root.classList.remove(t.className)
        })
        if (matched.className) root.classList.add(matched.className)
      }
    } else {
      // Default initial layout assignment: Black and White
      document.documentElement.classList.add("theme-stark-mono")
    }
  }, [])

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleThemeChange = (selected: ThemeOption) => {
    if (typeof window === "undefined") return

    const root = document.documentElement
    
    // Clear all existing preset theme classes
    THEME_OPTIONS.forEach((t) => {
      if (t.className) root.classList.remove(t.className)
    })

    // Apply the chosen preset theme class
    if (selected.className) {
      root.classList.add(selected.className)
    }

    localStorage.setItem("portfolio-palette", selected.id)
    setActiveTheme(selected)
    setIsOpen(false)
  }

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-[300] flex flex-col items-end gap-2 pointer-events-auto">
      {isOpen && (
        <div className="bg-cream border border-border/60 rounded-xl p-2 shadow-xl flex flex-col gap-0.5 min-w-[160px] animate-fade-in">
          <p className="text-[10px] lowercase tracking-[0.15em] text-ink-muted font-bold px-2.5 py-1">
            Palettes
          </p>
          {THEME_OPTIONS.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme)}
              className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-semibold tracking-wide text-left transition-colors ${
                activeTheme.id === theme.id
                  ? "bg-blush/60 text-ink"
                  : "text-ink-soft hover:bg-blush/30 hover:text-ink"
              }`}
            >
              <span 
                className="w-3 h-3 rounded-full border border-ink/10 flex-shrink-0" 
                style={{ backgroundColor: theme.previewDot }}
              />
              {theme.name}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-cream border border-border/80 shadow-md hover:shadow-lg flex items-center justify-center text-ink-soft hover:text-ink transition-all active:scale-95"
        aria-label="Toggle art palette selector"
      >
        <svg 
          className={`w-5 h-5 fill-none stroke-current transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} 
          strokeWidth="1.6" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1-1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a17.676 17.676 0 0 1-3.42-3.42" />
        </svg>
      </button>
    </div>
  )
}