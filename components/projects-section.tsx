// components/projects-section.tsx
"use client"

import { useState } from "react"
import { LivePhoto } from "./live-photo"

const projects = [
  {
    type: "live-photo",
    category: "systems & front-end engineering",
    title: "portfolio",
    description: "An interactive, high-performance web experience featuring a layout-synchronized audio visualizer and custom stacked event architectures.",
    link: "https://github.com/matthewhamilton3141/portfolio", 
    useSignatureThumbnail: true,
    videoSrc: "/videos/portfolio-preview.mp4",        
    webmVideoSrc: "/videos/portfolio-preview.webm",   
  },
  {
    type: "live-photo",
    category: "computer vision / ml",
    title: "Sign Language Translator",
    description: "ASL alphabet translation using MediaPipe hand landmarks and a custom classification pipeline.",
    link: "https://github.com/matthewhamilton3141/MediaPipe-sign-language", 
    liveUrl: "https://media-pipe-sign-language.vercel.app/", 
    thumbnailSrc: "/images/videosoon.png",  
    videoSrc: "/videos/sign-language-live.mp4",        
    webmVideoSrc: "/videos/sign-language-live.webm",   
  },
  {
    type: "soon",
    category: "Hackathon Project",
    title: "JamHacks",
    description: "coming soon...",
    logoSrc: "/images/jamhackslogo.png",
  },
  {
    type: "placeholder",
    title: "more to come :)",
    description: "currently engineering new ideas",
  },
]

type ViewMode =  "list" | "grid" | "carousel"

export function ProjectsSection() {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredListIndex, setHoveredListIndex] = useState<number | null>(null)
  
  // Track viewport-relative mouse mouse coordinates directly via state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  // Updates the mouse positions relative to the screen viewport bounds
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <section
      id="projects"
      className="min-h-screen w-full bg-background text-foreground transition-colors duration-500 flex flex-col justify-center items-center relative px-[8vw] md:px-[12vw] py-32 overflow-hidden"
    >
      {/* Header with Integrated View Switcher */}
      <div className="w-full max-w-[1100px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16 z-50">
        <div>
          <h2 className="text-[13px] tracking-[0.25em] lowercase text-muted-foreground font-semibold">
            Projects
          </h2>
        </div>

        {/* Dynamic Layout Controller Switch */}
        <div className="flex bg-muted/40 p-1 rounded-full border border-border/40 backdrop-blur-sm self-stretch sm:self-auto justify-between">
          {(["list", "grid", "carousel" ] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-1.5 rounded-full text-[10px] tracking-[0.12em] lowercase font-bold transition-all cursor-none ${
                viewMode === mode
                  ? "bg-card text-foreground shadow-sm border border-border/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
      

      {/* --- RENDER 3: CAROUSEL VIEW --- */}
      {viewMode === "carousel" && (
        <div className="w-full flex flex-col items-center animate-fade-in">
          <div className="relative w-full max-w-[1100px] h-[480px] flex items-center justify-center" style={{ perspective: "1200px" }}>
            {projects.map((project, i) => {
              let offset = i - activeIndex
              if (offset < -Math.floor(projects.length / 2)) offset += projects.length
              if (offset > Math.floor(projects.length / 2)) offset -= projects.length

              const isActive = offset === 0
              if (Math.abs(offset) > 1) return null

              return (
                <div
                  key={project.title}
                  onClick={() => !isActive && setActiveIndex(i)}
                  className={`absolute w-[320px] md:w-[380px] bg-card rounded-2xl border border-border/80 p-6 select-none transition-all duration-700 ease-out ${
                    isActive ? "cursor-default z-30 opacity-100" : "cursor-pointer z-10 opacity-30 hover:opacity-50"
                  }`}
                  style={{
                    transform: `translateX(${offset * 300}px) translateZ(${isActive ? 0 : -200}px) rotateY(${offset * 40}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {!isActive && <div className="absolute inset-0 bg-background/20 backdrop-blur-sm rounded-2xl z-40 pointer-events-none" />}
                  <div className="w-full aspect-[4/3] relative mb-5 z-20">
                    <ProjectThumbnail project={project} />
                  </div>
                  <ProjectCardDetails project={project} isActive={isActive} />
                </div>
              )
            })}
          </div>
          {/* Carousel Arrows */}
          <div className="flex items-center gap-8 mt-4 z-10">
            <button onClick={handlePrev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-card text-muted-foreground hover:text-foreground transition-all cursor-none active:scale-95">&larr;</button>
            <button onClick={handleNext} className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-card text-muted-foreground hover:text-foreground transition-all cursor-none active:scale-95">&rarr;</button>
          </div>
        </div>
      )}

      {/* --- RENDER 2: GRID VIEW --- */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch w-full max-w-[1100px] animate-fade-in">
          {projects.map((project) => (
            <div key={project.title} className="bg-card rounded-xl border border-border/60 p-6 flex flex-col transition-all duration-300 hover:-translate-y-1">
              <div className="w-full aspect-[4/3] relative mb-5">
                <ProjectThumbnail project={project} />
              </div>
              <ProjectCardDetails project={project} isActive={true} />
            </div>
          ))}
        </div>
      )}
      

      {/* --- RENDER 1: LIST VIEW (Editorial Hover Reveal) --- */}
      {viewMode === "list" && (
        <div 
          onMouseMove={handleMouseMove}
          className="w-full max-w-[1100px] flex flex-col relative animate-fade-in border-t border-border/40"
        >
          {projects.map((project, idx) => (
            <div
              key={project.title}
              onMouseEnter={() => setHoveredListIndex(idx)}
              onMouseLeave={() => setHoveredListIndex(null)}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-8 border-b border-border/40 group relative transition-colors duration-300 hover:bg-muted/10 px-4"
            >
              <div className="max-w-xl">
                <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground/60 font-semibold block mb-1">
                  {project.category || "In Development"}
                </span>
                <h3 className="font-bold text-2xl tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 font-medium leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Links Box for List layout */}
              <div className="flex items-center gap-6 mt-4 sm:mt-0 z-30">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground font-bold no-underline cursor-none">github repo &rarr;</a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.15em] uppercase text-foreground hover:opacity-80 font-bold no-underline cursor-none"> try &rarr;</a>
                )}
              </div>
            </div>
          ))}

          {/* Floating Live-Hover Preview Window */}
          {/*hoveredListIndex !== null && projects[hoveredListIndex].type !== "placeholder" && (
            <div 
              className="fixed pointer-events-none hidden lg:block z-50 w-[240px] aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-2xl animate-fade-in"
              style={{
                left: `${mousePos.x + 20}px`,
                top: `${mousePos.y - 80}px`,
                transform: "translate3d(0, 0, 0)"
              }}
            >
              <ProjectThumbnail project={projects[hoveredListIndex]} />
            </div>
          )*/}
        </div>
      )}
    </section>
  )
}

/* Isolated Sub-component to minimize duplicate conditional code rendering */
function ProjectThumbnail({ project }: { project: any }) {
  if (project.type === "soon") {
    return (
      <div className="w-full h-full rounded-lg bg-muted/40 border border-dashed border-border flex flex-col items-center justify-center p-6 select-none">
        <img src={project.logoSrc} alt="Logo" className="w-16 h-16 object-contain dark:invert-[0.15] opacity-60 mb-3 animate-pulse" />
        <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-semibold">Coming Soon</span>
      </div>
    )
  }
  if (project.type === "placeholder") {
    return (
      <div className="w-full h-full rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center p-6 text-center">
        <div className="w-6 h-6 mb-3 opacity-40 animate-spin text-muted-foreground">
          <svg className="stroke-current fill-none" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeDasharray="16 12" strokeLinecap="round" /></svg>
        </div>
        <p className="text-xs font-bold text-muted-foreground">{project.title}</p>
      </div>
    )
  }
  if (project.useSignatureThumbnail) {
    return (
      <div className="w-full h-full rounded-lg bg-muted/30 border border-border flex items-center justify-center p-8 select-none">
        <img src="/images/signature.svg" alt="Signature" className="w-auto h-[65%] object-contain dark:invert opacity-80" />
      </div>
    )
  }
  return (
    <LivePhoto
      thumbnailSrc={project.thumbnailSrc || ""}
      videoSrc={project.videoSrc || ""}
      webmVideoSrc={project.webmVideoSrc || ""}
      alt={project.title}
    />
  )
}

function ProjectCardDetails({ project, isActive }: { project: any; isActive: boolean }) {
  return (
    <div className="flex flex-col flex-grow relative z-10">
      <p className="text-[9px] tracking-[0.18em] uppercase text-muted-foreground/80 font-bold mb-1.5">
        {project.category || "In Development"}
      </p>
      <h3 className="font-black text-xl tracking-[0.01em] text-card-foreground mb-2 leading-tight">
        {project.title}
      </h3>
      <p className="text-[12px] leading-[1.6] text-muted-foreground font-medium h-[65px] overflow-hidden line-clamp-3">
        {project.description}
      </p>
      
      <div className={`mt-4 flex items-center gap-6 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground font-bold no-underline transition-all duration-200 cursor-none">Code &rarr;</a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.15em] uppercase text-foreground hover:opacity-80 font-bold no-underline transition-all duration-200 cursor-none">Try Live &rarr;</a>
        )}
      </div>
    </div>
  )
}