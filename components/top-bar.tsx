// components/top-bar.tsx
"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function TopBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isNotchExpanded, setIsNotchExpanded] = useState(false)

  // Listen to Notch state custom event
  useEffect(() => {
    const handleNotchState = (e: Event) => {
      const customEvent = e as CustomEvent
      setIsNotchExpanded(customEvent.detail.isExpanded)
    }

    window.addEventListener("notchStateChange", handleNotchState)
    return () => window.removeEventListener("notchStateChange", handleNotchState)
  }, [])

  return (
    <header
      // Added mobile conditional transitions to seamlessly disappear when the notch opens
      className={`fixed top-0 left-0 right-0 z-[99999] flex flex-col md:flex-row-reverse justify-between items-start md:items-center h-fit px-5 py-4 md:px-9 md:py-5 pointer-events-none opacity-0 animate-fade-in transition-all duration-300
        ${isNotchExpanded ? "max-md:opacity-0 max-md:pointer-events-none" : ""}
      `}
      style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
      role="banner"
    >
      {/* MOBILE MENU TRIGGER BUTTON */}
      <div className="flex md:hidden pointer-events-auto relative z-[100] mt-2 ml-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-[42px] h-[42px] rounded-full border border-border bg-surface flex items-center justify-center text-ink-soft transition-all active:scale-95 shadow-md"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* NAVIGATION ITEMS LIST */}
      <div
        className={`
          flex flex-col md:flex-row items-center gap-3 md:gap-2 pointer-events-auto
          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top
          absolute md:relative top-[76px] md:top-0 left-5 md:left-auto md:right-0
          bg-surface/95 backdrop-blur-md md:bg-transparent 
          p-4 md:p-0 rounded-[20px] md:rounded-none border border-border md:border-none shadow-xl md:shadow-none
          ${isOpen 
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none md:opacity-100 md:scale-100 md:translate-y-0 md:pointer-events-auto"
          }
        `}
      >
        {/* Retermina */}
        <div className="flex items-center gap-2 relative z-[100000]">
          <span className="text-[11px] font-semibold tracking-wide text-ink-muted flex items-center gap-1 select-none">
            try now <span className="animate-nudge-right">→</span>
          </span>
          <a
            href="https://retermina.com"
            target="_blank"
            rel="noopener noreferrer"
            className="topbar-icon w-[38px] h-[38px] rounded-full border border-border bg-surface flex items-center justify-center text-ink-soft no-underline transition-all duration-250 hover:bg-accent/10 hover:border-accent hover:text-accent hover:scale-[1.08] select-none shrink-0"
            aria-label="Retermina"
            title="Retermina"
          >
            <span className="text-[12px] font-bold font-mono leading-none tracking-[0em]" style={{ transform: "translateX(-2px) translateY(-1px)", display: "inline-block" }}>
              <span style={{ display: "inline-block", transform: "scaleX(0.6)", transformOrigin: "center" }}>{'>'}</span>
              {'_'}
            </span>
          </a>
        </div>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/matthewhamilton3141"
          target="_blank"
          rel="noopener noreferrer"
          className="topbar-icon relative z-[100000] w-[38px] h-[38px] rounded-full border border-border bg-surface flex items-center justify-center text-ink-soft no-underline transition-all duration-250 hover:bg-accent/10 hover:border-accent hover:text-accent hover:scale-[1.08] select-none shrink-0"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <svg className="w-[17px] h-[17px] stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="3" />
            <path d="M7 10v7M7 7v.5M12 17v-4a2 2 0 014 0v4M12 10v7" />
          </svg>
        </a>
        
        {/* GitHub */}
        <a
          href="https://github.com/matthewhamilton3141"
          target="_blank"
          rel="noopener noreferrer"
          className="topbar-icon relative z-[100000] w-[38px] h-[38px] rounded-full border border-border bg-surface flex items-center justify-center text-ink-soft no-underline transition-all duration-250 hover:bg-accent/10 hover:border-accent hover:text-accent hover:scale-[1.08] select-none shrink-0"
          aria-label="GitHub"
          title="GitHub"
        >
          <svg className="w-[17px] h-[17px] stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 020 4.77 5.07 5.07 0 0 019.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/mxtth2w"
          target="_blank"
          rel="noopener noreferrer"
          className="topbar-icon relative z-[100000] w-[38px] h-[38px] rounded-full border border-border bg-surface flex items-center justify-center text-ink-soft no-underline transition-all duration-250 hover:bg-accent/10 hover:border-accent hover:text-accent hover:scale-[1.08] select-none shrink-0"
          aria-label="Instagram"
          title="Instagram"
        >
          <svg className="w-[17px] h-[17px] stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>

        {/* Email */}
        <a
          href="mailto:matthewhamilton3141@gmail.com"
          className="topbar-icon relative z-[100000] w-[38px] h-[38px] rounded-full border border-border bg-surface flex items-center justify-center text-ink-soft no-underline transition-all duration-250 hover:bg-accent/10 hover:border-accent hover:text-accent hover:scale-[1.08] select-none shrink-0"
          aria-label="Email"
          title="Email"
          onClick={() => setIsOpen(false)}
        >
          <svg className="w-[17px] h-[17px] stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </a>
        
        {/* Theme Toggle */}
        <div className="flex items-center justify-center shrink-0 w-[38px] h-[38px] relative z-[100000]">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}