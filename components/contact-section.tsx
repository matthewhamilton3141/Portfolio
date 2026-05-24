"use client"

import { useEffect, useRef, useState } from "react"

const modernLinks = [
  { 
    label: "resume", 
    href: "/resume.pdf", 
    external: true,
    icon: (
      <svg className="w-[17px] h-[17px] stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    )
  },
  { 
    label: "Email", 
    href: "mailto:matthewhamilton3141@gmail.com", 
    external: false,
    icon: (
      <svg className="w-[17px] h-[17px] stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )
  },
  { 
    label: "LinkedIn", 
    href: "https://www.linkedin.com/in/matthewhamilton3141/", 
    external: true,
    icon: (
      <svg className="w-[17px] h-[17px] stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <path d="M7 10v7M7 7v.5M12 17v-4a2 2 0 014 0v4M12 10v7" />
      </svg>
    )
  },
  { 
    label: "GitHub", 
    href: "https://github.com/matthewhamilton3141", 
    external: true,
    icon: (
      <svg className="w-[17px] h-[17px] stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
      </svg>
    )
  },
  { 
    label: "Instagram", 
    href: "https://www.instagram.com/mxtth2w/", 
    external: true,
    icon: (
      <svg className="w-[17px] h-[17px] stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  },
]

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      className="min-h-screen scroll-snap-start flex flex-col justify-center items-center bg-warm-white transition-colors duration-500 px-6 relative"
    >
      <div
        ref={containerRef}
        className={`flex flex-col items-center text-center transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Editorial label heading */}
        <p className="text-[11px] tracking-[0.25em] lowercase text-ink-muted mb-10 font-sans">
          get in touch
        </p>

        {/* Changed layout back to flex-col to let items descend vertically */}
        <div className="flex flex-col items-center gap-5 md:gap-6">
          {modernLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-3.5 no-underline cursor-none py-1 transition-transform duration-300 hover:scale-[1.03]"
            >
              {/* Icon alignment vector system */}
              <div className="text-ink-muted transition-colors duration-300 group-hover:text-accent-warm flex items-center justify-center">
                {link.icon}
              </div>

              {/* Clean typography style matching your reference variant */}
              <span 
                className="block font-semibold tracking-[0.06em] lowercase text-[13px] md:text-[14px] text-ink transition-colors duration-300 group-hover:text-accent-warm"
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}