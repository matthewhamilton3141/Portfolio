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
      type: "placeholder",
      category: "currently building",
      title: "Retermina",
      description: "Retermina is a highly-customizable terminal wrapper built with Tauri & React. It features modular drag-and-drop workspaces, Iris (zero-token local macros & localhost tracker), and 5 structural UI engines",
      link: "https://github.com/matthewhamilton3141/Retermina",
      liveUrl: "https://github.com/matthewhamilton3141/Retermina",
    },
    {
    type: "hackathon",
    category: "full-stack dev & blockchain",
    title: "baam",
    description: "BAAM goes where you go, a social betting platform for your personal circle linking Solana smart contracts, MongoDB Atlas for data management, and Vultr for backend infrastructure to provide a native iMessage plugin, Discord bot, and a centralized web app.",
    link: "https://github.com/BansonVuong/BAAM",
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
    description: "Utilizes React and TypeScript to create a complex, stacked event architecture to create a high-fidelity UI. Leverages Cloudflare R2 Object Storage for efficient asset delivery and is deployed through Vercel to ensure rapid, globally distributed performance. Real-time state management, cloud infrastructure integration for a smooth, responsive user experience.",
    link: "https://github.com/matthewhamilton3141/portfolio",
    thumbnailSrc: "/images/casestudy1.jpeg",
    videoSrc: "https://pub-642075d77d2b430c93bf3b1c60299af0.r2.dev/portfolio.mp4",
    webmVideoSrc: "https://pub-642075d77d2b430c93bf3b1c60299af0.r2.dev/portfolio.webm",
  },

]

type ViewMode = "list" | "grid"

function isLivePhotoProject(project: any) {
  return project.type !== "soon" && project.type !== "placeholder" && !project.useSignatureThumbnail
}

export function ProjectsSection() {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [hoveredListIndex, setHoveredListIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <section
      id="projects"
      className="min-h-screen w-full bg-background text-foreground transition-colors duration-500 flex flex-col justify-start items-center relative px-[8vw] md:px-[12vw] pt-20 pb-24 overflow-hidden"
    >
      {/* Header with Integrated View Switcher */}
      <div className="w-full max-w-[1100px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 z-50">
        <div>
          <h2 className="text-[13px] tracking-[0.25em] lowercase text-muted-foreground font-semibold">
            Projects
          </h2>
        </div>

        <div className="flex bg-muted/40 p-1 rounded-full border border-border/40 backdrop-blur-sm self-stretch sm:self-auto justify-between">
          {(["list", "grid"] as ViewMode[]).map((mode) => (
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

      {/* --- RENDER 2: GRID VIEW --- */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch w-full max-w-[1100px] animate-fade-in">
          {projects.map((project) => (
            <GridCard key={project.title} project={project} />
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
              className="fixed pointer-events-none hidden lg:block z-50 w-[360px] aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-2xl bg-zinc-950 animate-fade-in"
              style={{
                left: `${mousePos.x + 20}px`,
                top: `${mousePos.y - 120}px`,
                transform: "translate3d(0, 0, 0)"
              }}
            >
              <FloatingHoverPreview key={projects[hoveredListIndex].title} project={projects[hoveredListIndex]} />
            </div>
          )}
        </div>
      )}
    </section>
  )
}

function GridCard({ project }: { project: any }) {
  return (
    <div className="bg-card rounded-xl border border-border/60 p-7 flex flex-col h-full">
      <div
        className={`w-full aspect-[4/3] relative mb-6 rounded-xl ${
          isLivePhotoProject(project) ? "overflow-visible" : "overflow-hidden"
        }`}
      >
        <ProjectThumbnail project={project} />
      </div>
      <ProjectCardDetails project={project} />
    </div>
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

function ProjectCardDetails({ project }: { project: any }) {
  return (
    <div className="flex flex-col flex-grow">
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
            <Image src={project.logoSrc} alt="Hackathon Badge" width={18} height={18} className="object-contain" />
          </a>
        )}
      </div>

      <p className="text-[12px] leading-[1.6] text-muted-foreground font-medium">
        {project.description}
      </p>

      <div className="mt-auto pt-4 flex items-center gap-6">
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