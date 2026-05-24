"use client"

import { useEffect, useState } from "react"

interface SideNavProps {
  sections: { id: string; label: string }[]
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
}

export function SideNav({ sections, scrollContainerRef }: SideNavProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "")

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const sectionElements = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { root: scrollContainer, threshold: 0.5 }
    )

    sectionElements.forEach((el) => observer.observe(el))

    return () => {
      sectionElements.forEach((el) => observer.unobserve(el))
    }
  }, [sections, scrollContainerRef])

  const handleClick = (id: string) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className="fixed left-3.5 md:left-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-5 opacity-0 animate-fade-in"
      style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
      aria-label="Section navigation"
    >
      {sections.map((section) => (
        <div
          key={section.id}
          className="nav-dot-wrap flex items-center gap-0 cursor-none group"
          onClick={() => handleClick(section.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleClick(section.id)
          }}
          role="button"
          tabIndex={0}
          aria-label={`Go to ${section.label}`}
        >
          <div
            className={`nav-dot w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300 ${
              activeSection === section.id
                ? "bg-accent scale-[1.2]"
                : "bg-ink-muted group-hover:bg-accent group-hover:scale-[1.2]"
            }`}
          />
          <span className="nav-label font-sans text-[11px] tracking-[0.12em] lowercase text-ink-soft whitespace-nowrap max-w-0 overflow-hidden opacity-0 pl-0 transition-all duration-400 ease-out group-hover:max-w-[120px] group-hover:opacity-100 group-hover:pl-3 hidden md:block">
            {section.label}
          </span>
        </div>
      ))}
    </nav>
  )
}
