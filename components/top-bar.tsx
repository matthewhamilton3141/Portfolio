"use client"

import { ThemeToggle } from "./theme-toggle"

export function TopBar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-[200] flex justify-end items-center px-5 py-4 md:px-9 md:py-5 gap-2 opacity-0 animate-fade-in pointer-events-auto"
      style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
      role="banner"
    >
      <a
        href="https://linkedin.com/in/matthewhamilton3141"
        target="_blank"
        rel="noopener"
        className="topbar-icon w-[38px] h-[38px] rounded-full border border-border bg-surface flex items-center justify-center cursor-none text-ink-soft no-underline transition-all duration-250 hover:bg-blush hover:border-dusty-rose hover:text-accent hover:scale-[1.08]"
        aria-label="LinkedIn"
        title="LinkedIn"
      >
        <svg className="w-[17px] h-[17px] stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="3" />
          <path d="M7 10v7M7 7v.5M12 17v-4a2 2 0 014 0v4M12 10v7" />
        </svg>
      </a>
      
      <a
        href="https://github.com/matthewhamilton3141"
        target="_blank"
        rel="noopener"
        className="topbar-icon w-[38px] h-[38px] rounded-full border border-border bg-surface flex items-center justify-center cursor-none text-ink-soft no-underline transition-all duration-250 hover:bg-blush hover:border-dusty-rose hover:text-accent hover:scale-[1.08]"
        aria-label="GitHub"
        title="GitHub"
      >
        <svg className="w-[17px] h-[17px] stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
        </svg>
      </a>

      {/* Added Instagram Link Block */}
      <a
        href="https://instagram.com/mxtth2w"
        target="_blank"
        rel="noopener"
        className="topbar-icon w-[38px] h-[38px] rounded-full border border-border bg-surface flex items-center justify-center cursor-none text-ink-soft no-underline transition-all duration-250 hover:bg-blush hover:border-dusty-rose hover:text-accent hover:scale-[1.08]"
        aria-label="Instagram"
        title="Instagram"
      >
        <svg className="w-[17px] h-[17px] stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </a>

      <a
        href="mailto:matthewhamilton3141@gmail.com"
        className="topbar-icon w-[38px] h-[38px] rounded-full border border-border bg-surface flex items-center justify-center cursor-none text-ink-soft no-underline transition-all duration-250 hover:bg-blush hover:border-dusty-rose hover:text-accent hover:scale-[1.08]"
        aria-label="Email"
        title="Email"
      >
        <svg className="w-[17px] h-[17px] stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </a>
      
      <ThemeToggle />
    </header>
  )
}