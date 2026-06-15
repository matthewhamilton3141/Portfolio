/*{
  type: "soon",
  category: "project for JAMHacks 10",
  title: "JAMHacks",
  description: "coming soon...",
  logoSrc: "/images/jamhackslogo.png",
},*/

/*{
  type: "soon",
  category: "hackathon project",
  title: "Hack the 6ix",
  description: "coming soon...",
  logoSrc: "/images/ht6.png",
},*/

// components/projects-section.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { LivePhoto } from "./live-photo"

const projects = [
    {
    type: "hackathon",
    category: "full-stack dev & blockchain",
    title: "baam",
    description: "A social accountability platform linking Solana smart contracts with a web app and native iMessage extension for peer-to-peer betting.",
    link: "https://github.com/BansonVuong/BAAM.git",
    thumbnailSrc: "/images/baamlogo.png",
    videoSrc: "https://pub-642075d77d2b430c93bf3b1c60299af0.r2.dev/baamimsg.mp4",
    webmVideoSrc: "https://pub-642075d77d2b430c93bf3b1c60299af0.r2.dev/baamimsg.webm",
    logoSrc: "/images/jamhackslogo.png",
    logoLink: "https://jamhacks.ca",
    startTime: 2.23
  },
  {
    type: "live-photo",
    category: "systems & front-end engineering",
    title: "portfolio",
    description: "An interactive, high-performance web experience featuring a layout-synchronized audio visualizer and custom stacked event architectures.",
    link: "https://github.com/matthewhamilton3141/portfolio",
    thumbnailSrc: "/images/casestudy1.jpeg",
    videoSrc: "https://pub-642075d77d2b430c93bf3b1c60299af0.r2.dev/portfolio.mp4",
    webmVideoSrc: "https://pub-642075d77d2b430c93bf3b1c60299af0.r2.dev/portfolio.webm",
  },
  {
    type: "placeholder",
    title: "more to come :)",
    description: "currently engineering new ideas",
  },
]

type ViewMode = "list" | "grid" | "carousel"

// Returns true for projects whose thumbnail is a LivePhoto (the only
// thumbnail type that should be allowed to overflow its container on hover)
function isLivePhotoProject(project: any) {
  return project.type !== "soon" && project.type !== "placeholder" && !project.useSignatureThumbnail
}

export function ProjectsSection() {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredListIndex, setHoveredListIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

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

        <div className="flex bg-muted/40 p-1 rounded-full border border-border/40 backdrop-blur-sm self-stretch sm:self-auto justify-between">
          {(["list", "grid", "carousel"] as ViewMode[]).map((mode) => (
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
                    isActive
                      ? "cursor-default z-30 opacity-100 hover:z-50"
                      : "cursor-pointer z-10 opacity-30 hover:opacity-50"
                  }`}
                  style={{
                    transform: `translateX(${offset * 300}px) translateZ(${isActive ? 0 : -200}px) rotateY(${offset * 40}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {!isActive && <div className="absolute inset-0 bg-background/20 backdrop-blur-sm rounded-2xl z-40 pointer-events-none" />}
                  <div
                    className={`w-full aspect-[4/3] relative mb-5 z-20 rounded-xl ${
                      isActive && isLivePhotoProject(project) ? "overflow-visible" : "overflow-hidden"
                    } ${!isActive ? "pointer-events-none" : ""}`}
                  >
                    <ProjectThumbnail project={project} />
                  </div>
                  <ProjectCardDetails project={project} isActive={isActive} />
                </div>
              )
            })}
          </div>
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
            <div
              key={project.title}
              className={`bg-card rounded-xl border border-border/60 p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 relative ${
                isLivePhotoProject(project) ? "hover:z-20" : ""
              }`}
            >
              <div
                className={`w-full aspect-[4/3] relative mb-5 rounded-xl ${
                  isLivePhotoProject(project) ? "overflow-visible" : "overflow-hidden"
                }`}
              >
                <ProjectThumbnail project={project} />
              </div>
              <ProjectCardDetails project={project} isActive={true} />
            </div>
          ))}
        </div>
      )}

      {/* --- RENDER 1: LIST VIEW --- */}
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
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-2xl tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent">
                    {project.title}
                  </h3>
                  {project.logoSrc && (
                    <a
                      href={project.logoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center transition-transform hover:scale-110 cursor-none ml-1"
                      title="View Hackathon"
                    >
                      <Image src={project.logoSrc} alt="Hackathon Logo" width={20} height={20} className="object-contain" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2 font-medium leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center gap-6 mt-4 sm:mt-0 z-30">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground font-bold no-underline cursor-none">github repo &rarr;</a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.15em] uppercase text-foreground hover:opacity-80 font-bold no-underline cursor-none">try &rarr;</a>
                )}
              </div>
            </div>
          ))}

          {/* Floating Live-Hover Preview Window */}
          {hoveredListIndex !== null && projects[hoveredListIndex].type !== "placeholder" && (
            <div
              className="fixed pointer-events-none hidden lg:block z-50 w-[240px] aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-2xl bg-zinc-950 animate-fade-in"
              style={{
                left: `${mousePos.x + 20}px`,
                top: `${mousePos.y - 80}px`,
                transform: "translate3d(0, 0, 0)"
              }}
            >
              <FloatingHoverPreview project={projects[hoveredListIndex]} />
            </div>
          )}
        </div>
      )}
    </section>
  )
}

/* Explicit asset router for the List View floating element */
function FloatingHoverPreview({ project }: { project: any }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetVideo = project.videoSrc || project.hoverVideoSrc
  const targetWebm = project.webmVideoSrc || project.hoverWebmVideoSrc

  useEffect(() => {
    const video = videoRef.current
    if (!video || project.startTime == null) return

    const seekToStart = () => {
      video.currentTime = project.startTime
    }

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      seekToStart()
    } else {
      video.addEventListener("loadedmetadata", seekToStart, { once: true })
      return () => video.removeEventListener("loadedmetadata", seekToStart)
    }
  }, [project.startTime])

  if (targetVideo) {
    return (
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        crossOrigin="anonymous"
        className="w-full h-full object-cover rounded-xl"
      >
        {targetWebm && <source src={targetWebm} type="video/webm" />}
        <source src={targetVideo} type="video/mp4" />
      </video>
    )
  }

  return <ProjectThumbnail project={project} />
}

function ProjectThumbnail({ project }: { project: any }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || project.startTime == null) return

    const video = containerRef.current.querySelector("video")
    if (!video) return

    const seekToStart = () => {
      video.currentTime = project.startTime
    }

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      seekToStart()
    } else {
      video.addEventListener("loadedmetadata", seekToStart, { once: true })
      return () => video.removeEventListener("loadedmetadata", seekToStart)
    }
  }, [project.startTime])

  if (project.type === "soon") {
    return (
      <div className="w-full h-full rounded-xl bg-muted/40 border border-dashed border-border flex flex-col items-center justify-center p-6 select-none">
        <div className="relative w-16 h-16 mb-3">
          <Image src={project.logoSrc} alt="Logo" fill className="object-contain dark:invert-[0.15] opacity-60 animate-pulse" />
        </div>
        <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-semibold">Coming Soon</span>
      </div>
    )
  }

  if (project.type === "placeholder") {
    return (
      <div className="w-full h-full rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center p-6 text-center">
        <div className="w-6 h-6 mb-3 opacity-40 animate-spin text-muted-foreground">
          <svg className="stroke-current fill-none" strokeWidth="1.8" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeDasharray="16 12" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-xs font-bold text-muted-foreground">{project.title}</p>
      </div>
    )
  }

  if (project.useSignatureThumbnail) {
    return (
      <div className="w-full h-full rounded-xl bg-muted/30 border border-border flex items-center justify-center p-8 select-none">
        <Image src="/images/signature.svg" alt="Signature" width={300} height={100} className="w-auto h-[65%] object-contain dark:invert opacity-80" />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full h-full relative group/thumb rounded-xl overflow-visible">
      <LivePhoto
        thumbnailSrc={project.thumbnailSrc || ""}
        videoSrc={project.videoSrc || ""}
        webmVideoSrc={project.webmVideoSrc || ""}
        alt={project.title}
      />
    </div>
  )
}

function ProjectCardDetails({ project, isActive }: { project: any; isActive: boolean }) {
  return (
    <div className="flex flex-col flex-grow relative z-10">
      <p className="text-[9px] tracking-[0.18em] uppercase text-muted-foreground/80 font-bold mb-1.5">
        {project.category || "In Development"}
      </p>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-black text-xl tracking-[0.01em] text-card-foreground leading-tight">
          {project.title}
        </h3>
        {project.logoSrc && (
          <a
            href={project.logoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center transition-transform hover:scale-110 cursor-none"
            title="View Hackathon"
          >
            <Image
              src={project.logoSrc}
              alt="Hackathon Badge"
              width={18}
              height={18}
              className="object-contain"
            />
          </a>
        )}
      </div>
      <p className="text-[12px] leading-[1.6] text-muted-foreground font-medium h-[65px] overflow-hidden line-clamp-3">
        {project.description}
      </p>

      <div className={`mt-4 flex items-center gap-6 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground font-bold no-underline transition-all duration-200 cursor-none">github repo&rarr;</a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.15em] uppercase text-foreground hover:opacity-80 font-bold no-underline transition-all duration-200 cursor-none">Try Live &rarr;</a>
        )}
      </div>
    </div>
  )
}