// components/projects-section.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { LivePhoto } from "./live-photo"

const projects = [
  {
    type: "live-photo",
    category: "front-end engineering and systems",
    title: "Portfolio",
    description: "An interactive, high-performance web experience featuring a layout-synchronized audio visualizer and custom stacked event architectures.",
    link: "https://github.com/matthewhamilton3141/portfolio", 
    liveUrl: "https://matthewh.dev", 
    useSignatureThumbnail: true, // Flag to dynamically switch layout to the theme-synchronized signature SVG
    videoSrc: "/videos/portfolio-preview.mp4",        
    webmVideoSrc: "/videos/portfolio-preview.webm",   
  },
  {
    type: "live-photo",
    category: "computer vision / ml",
    title: "MediaPipe Keyboard",
    description: "ASL alphabet translation using MediaPipe hand landmarks and a custom classification pipeline.",
    link: "https://github.com/matthewhamilton3141/MediaPipe-sign-language", 
    liveUrl: "https://media-pipe-sign-language.vercel.app/", 
    thumbnailSrc: "/images/videosoon.png",  
    videoSrc: "/videos/sign-language-live.mp4",        
    webmVideoSrc: "/videos/sign-language-live.webm",   
  },
  {
    type: "soon",
    category: "upcoming Hackathon",
    title: "JamHacks",
    description: "An exciting development coming soon for the JamHacks build. Stay tuned for details.",
    logoSrc: "/images/jamhackslogo.png",
  },
  {
    type: "placeholder",
    title: "more to come :)",
    description: "currently engineering new ideas",
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  
  const [visibleItems, setVisibleItems] = useState<boolean[]>(() => 
    new Array(projects.length + 1).fill(false)
  )

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
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal-item")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="h-auto w-full px-[8vw] md:px-[12vw] py-32 bg-background text-foreground transition-colors duration-500 flex flex-col justify-center"
    >
      <h2
        data-index="0"
        className={`reveal-item text-[13px] tracking-[0.25em] lowercase text-muted-foreground font-semibold mb-16 transition-all duration-700 ${
          visibleItems[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch w-full">
        {projects.map((project, i) => {
          const itemIndex = i + 1
          const isVisible = visibleItems[itemIndex]

          // 1. Pinned Coming Soon Card
          if (project.type === "soon") {
            return (
              <div
                key={project.title}
                data-index={itemIndex}
                className={`project-card reveal-item relative flex flex-col bg-card rounded-xl border border-border/60 p-6 overflow-hidden transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div className="w-full aspect-[4/3] rounded-lg bg-muted/40 border border-dashed border-border flex flex-col items-center justify-center p-6 mb-5 select-none">
                  <img 
                    src={project.logoSrc} 
                    alt="Logo" 
                    className="w-20 h-20 object-contain dark:invert-[0.15] opacity-60 mb-3 animate-pulse"
                  />
                  <span className="text-[10px] tracking-[0.18em] lowercase text-muted-foreground font-semibold">
                    Coming Soon
                  </span>
                </div>
                <div className="flex flex-col flex-grow">
                  <p className="text-[10px] tracking-[0.18em] lowercase text-muted-foreground/80 font-bold mb-2">
                    {project.category}
                  </p>
                  <h3 className="font-black text-2xl tracking-[0.01em] text-card-foreground mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-[13px] leading-[1.7] text-muted-foreground font-medium">{project.description}</p>
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
                className={`project-card reveal-item relative flex flex-col bg-card rounded-xl border border-border/60 p-6 overflow-visible transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div className="w-full aspect-[4/3] relative mb-5 flex-shrink-0 z-30">
                  {/* Dynamically checks if card uses signature thumbnail directly instead of image strings */}
                  {project.useSignatureThumbnail ? (
                    <div className="w-full h-full rounded-lg bg-muted/30 border border-border flex items-center justify-center p-8 select-none group">
                      <img 
                        src="/images/signature.svg" 
                        alt="Signature Theme Adaptive Asset" 
                        className="w-auto h-[70%] max-h-[110px] object-contain transition-all duration-500 opacity-75 dark:invert dark:opacity-85 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <LivePhoto
                      thumbnailSrc={project.thumbnailSrc || ""}
                      videoSrc={project.videoSrc || ""}
                      webmVideoSrc={project.webmVideoSrc || ""}
                      alt={project.title}
                    />
                  )}
                </div>
                <div className="flex flex-col flex-grow relative z-10">
                  <p className="text-[10px] tracking-[0.18em] lowercase text-muted-foreground/80 font-bold mb-2">
                    {project.category}
                  </p>
                  <h3 className="font-black text-2xl tracking-[0.01em] text-card-foreground mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-[13px] leading-[1.7] text-muted-foreground font-medium mb-4">{project.description}</p>
                  
                  <div className="mt-auto flex items-center gap-6">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] lowercase text-muted-foreground hover:text-foreground font-bold no-underline transition-all duration-200 hover:translate-x-0.5"
                    >
                      github repo &rarr;
                    </a>
                    
                    <a
                      href={project.liveUrl || project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] lowercase text-foreground hover:opacity-80 font-bold no-underline transition-all duration-200 hover:translate-x-0.5"
                    >
                      try it yourself &rarr;
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
              className={`project-card reveal-item relative flex flex-col items-center justify-center text-center bg-transparent border-2 border-dashed border-border rounded-xl p-8 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="max-w-[240px] flex flex-col items-center">
                <div className="w-8 h-8 mb-4 opacity-40 flex items-center justify-center">
                  <svg className="w-full h-full stroke-current fill-none animate-spin text-muted-foreground" strokeWidth="1.8" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeDasharray="16 12" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="font-black text-xl tracking-[0.01em] text-muted-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-[12px] leading-[1.65] text-muted-foreground/70 font-medium">{project.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}