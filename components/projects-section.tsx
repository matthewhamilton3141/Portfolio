"use client"

import { useEffect, useRef, useState } from "react"
import { LivePhoto } from "./live-photo"

const projects = [
  {
    type: "soon",
    category: "Hackathon Project",
    title: "JamHacks",
    description: "An exciting development coming soon for the JamHacks build. Stay tuned for details.",
    logoSrc: "/images/jamhackslogo.png",
  },
  {
    type: "live-photo",
    category: "computer vision / ml",
    title: "Sign Language Translator",
    description: "ASL alphabet translation using MediaPipe hand landmarks and a custom classification pipeline.",
    link: "https://github.com/matthewhamilton3141/MediaPipe-sign-language", 
    thumbnailSrc: "/images/sign-language-thumbnail.jpg", 
    videoSrc: "/videos/sign-language-live.mp4",        
    webmVideoSrc: "/videos/sign-language-live.webm",   
  },
  {
    type: "placeholder",
    title: "more to come :)",
    description: "currently engineering new ideas",
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(projects.length + 1).fill(false))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleItems((prev) => {
              const next = [...prev]
              next[index] = true
              return next
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal-item")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen scroll-snap-start px-[8vw] md:px-[12vw] py-24 bg-warm-white flex flex-col justify-center transition-colors duration-500"
    >
      <h2
        data-index="0"
        className={`reveal-item text-[13px] tracking-[0.25em] uppercase text-ink-muted font-semibold mb-12 transition-all duration-700 ${
          visibleItems[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        Selected Projects
      </h2>

      <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {projects.map((project, i) => {
          const itemIndex = i + 1
          const isVisible = visibleItems[itemIndex]

          // 1. Pinned Coming Soon Card
          if (project.type === "soon") {
            return (
              <div
                key={project.title}
                data-index={itemIndex}
                className={`project-card reveal-item relative flex flex-col bg-cream rounded-xl border border-border/40 p-6 overflow-hidden transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-full aspect-[4/3] rounded-lg bg-surface/40 border border-dashed border-border/60 flex flex-col items-center justify-center p-6 mb-5 select-none">
                  <img 
                    src={project.logoSrc} 
                    alt="JamHacks logo" 
                    className="w-32 h-32 object-contain opacity-100 mb-3 animate-pulse"
                  />
                  <span className="text-[10px] tracking-[0.18em] uppercase text-ink-muted font-semibold">
                    Coming Soon
                  </span>
                </div>
                <div className="flex flex-col flex-grow">
                  <p className="text-[10px] tracking-[0.18em] uppercase text-accent font-bold mb-2">
                    {project.category}
                  </p>
                  <h3 className="font-black text-2xl tracking-[0.01em] text-ink mb-2 leading-tight" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                    {project.title}
                  </h3>
                  <p className="text-[13px] leading-[1.7] text-ink-soft font-medium">{project.description}</p>
                </div>
              </div>
            )
          }

          // 2. Active Featured Live Photo Card
          if (project.type === "live-photo") {
            return (
              <div
                key={project.title}
                data-index={itemIndex}
                className={`project-card reveal-item relative flex flex-col bg-cream rounded-xl border border-border/40 p-6 overflow-visible transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-full aspect-[4/3] relative mb-5 flex-shrink-0 z-30">
                  <LivePhoto
                    thumbnailSrc={project.thumbnailSrc || ""}
                    videoSrc={project.videoSrc || ""}
                    webmVideoSrc={project.webmVideoSrc || ""}
                    alt={project.title}
                  />
                </div>
                <div className="flex flex-col flex-grow relative z-10">
                  <p className="text-[10px] tracking-[0.18em] uppercase text-accent font-bold mb-2">
                    {project.category}
                  </p>
                  <h3 className="font-black text-2xl tracking-[0.01em] text-ink mb-2 leading-tight" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                    {project.title}
                  </h3>
                  <p className="text-[13px] leading-[1.7] text-ink-soft font-medium mb-4">{project.description}</p>
                  <div className="mt-auto">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-accent font-bold no-underline border-b-2 border-transparent transition-all duration-200 hover:translate-x-0.5"
                    >
                      View project &rarr;
                    </a>
                  </div>
                </div>
              </div>
            )
          }

          // 3. More To Come Slate
          return (
            <div
              key={project.title}
              data-index={itemIndex}
              className={`project-card reveal-item relative flex flex-col items-center justify-center text-center bg-transparent border-2 border-dashed border-border/50 rounded-xl p-8 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="max-w-[240px] flex flex-col items-center">
                <div className="w-8 h-8 mb-4 opacity-40 flex items-center justify-center">
                  <svg className="w-full h-full stroke-current fill-none animate-spin text-ink-muted" strokeWidth="1.8" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeDasharray="16 12" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="font-black text-xl tracking-[0.01em] text-ink-muted mb-2" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  {project.title}
                </h3>
                <p className="text-[12px] leading-[1.65] text-ink-muted/90 font-medium">{project.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}