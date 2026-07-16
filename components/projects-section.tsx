// components/projects-section.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { LivePhoto } from "./live-photo"

interface Project {
  type: "placeholder" | "soon" | "project" | "hackathon" | "live-photo"
  category?: string
  title: string
  description: string
  link?: string
  liveUrl?: string
  thumbnailSrc?: string
  hoverImageSrc?: string
  videoSrc?: string
  webmVideoSrc?: string
  logoSrc?: string
  logoLink?: string
  startTime?: number
  objectPosition?: string
  /** Scales the thumbnail past its baked-in framing so it fills the frame. Default 1. */
  zoom?: number
}

const projects: Project[] = [
    {
      type: "project",
      category: "currently building",
      title: "gsplat-rt",
      description: "Real-time pipeline converting a live video stream into 3D Gaussian Splats plus a physics-ready collision mesh, exported as an OpenUSD stage for Isaac Sim / Omniverse. A multi-threaded, queue-decoupled architecture runs a strongly-typed FP16 TensorRT depth engine (Depth Anything V2, 2.24×), a custom CUDA TSDF fusion kernel (175× over numpy, bit-for-bit verified), and a learned SuperPoint + LightGlue SLAM front-end (3.5 cm ATE). Benchmarked at 82.7 FPS on an A10G — 2.75× the 30 FPS real-time budget — so an RL robot can see and physically interact with a scene as it's captured.",
      link: "https://github.com/matthewhamilton3141/gsplat-rt",
      thumbnailSrc: "/images/reconstruction_desk.png",
      videoSrc: "https://pub-642075d77d2b430c93bf3b1c60299af0.r2.dev/reconstruction_turntable.mp4",
      zoom: 1.2,
    },
    {
      type: "project",
      category: "personal project",
      title: "Retermina",
      description: "A customizable terminal workspace built on Tauri v2 with a Rust backend driving native PTY shells — fully local, with no cloud, token limits, or subscription. Seven draggable panels (split terminals, syntax-highlighted code, explorer, live project-wide git diff, localhost tracker, native preview window, and an embedded Claude Code CLI with per-project token tracking) arrange freely on a react-grid-layout grid. Iris, a tokenless context-aware command bar, surfaces git/npm/shell macros gated on live repo state, while five structural theme engines and portable Loom presets re-skin the whole app instantly.",
      link: "https://github.com/matthewhamilton3141/Retermina",
      liveUrl: "https://retermina.com/",
      thumbnailSrc: "/images/reterminapreview.png",
      videoSrc: "https://pub-642075d77d2b430c93bf3b1c60299af0.r2.dev/Retermina%20Promo%20(2).mp4",
      zoom: 1.0,
    },
    {
      type: "project",
      category: "personal project",
      title: "Sketchstack",
      description: "Sketchstack is a full-stack web app that turns visual system-design diagrams into structured prompts for AI coding agents like Claude Code and Cursor. Built with Next.js, TypeScript, and React Flow, with Supabase (Postgres, GitHub OAuth, row-level security) powering authentication, cloud save, and shareable links.",
      link: "https://github.com/matthewhamilton3141/sketchstack",
      liveUrl: "https://sketchstack.vercel.app",
      thumbnailSrc: "/images/sketchstack.png",
      hoverImageSrc: "/images/sketchstack.png"
    },
    {
      type: "project",
      category: "personal project",
      title: "Iris-NL",
      description: "Building an open-source TypeScript library that turns plain English into shell commands for terminal tools. Provider-agnostic backend (NVIDIA NIM / local Ollama / TensorRT-LLM) with a built-in safety layer and test suite. Designed to plug into my Retermina terminal app, with a benchmarking harness already in place to measure and optimize a local TensorRT-LLM model on consumer GPU hardware.",
      link: "https://github.com/matthewhamilton3141/iris-nl",
      thumbnailSrc: "/images/iris-nl.png",
      videoSrc: "https://pub-642075d77d2b430c93bf3b1c60299af0.r2.dev/iris-nl.mp4",
      objectPosition: "left"
    },
    {
    type: "hackathon",
    category: "hackathon project",
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
    category: "personal projects",
    title: "portfolio",
    description: "Utilizes React and TypeScript to create a complex, stacked event architecture to create a high-fidelity UI. Leverages Cloudflare R2 Object Storage for efficient asset delivery and is deployed through Vercel to ensure rapid, globally distributed performance. Real-time state management, cloud infrastructure integration for a smooth, responsive user experience.",
    link: "https://github.com/matthewhamilton3141/portfolio",
    thumbnailSrc: "/images/casestudy1.jpeg",
    videoSrc: "https://pub-642075d77d2b430c93bf3b1c60299af0.r2.dev/portfolio.mp4",
    webmVideoSrc: "https://pub-642075d77d2b430c93bf3b1c60299af0.r2.dev/portfolio.webm",
  },

]

type ViewMode = "list" | "grid"

function isLivePhotoProject(project: Project) {
  return project.type !== "soon" && project.type !== "placeholder"
}

export function ProjectsSection() {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [hoveredListIndex, setHoveredListIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Only track the cursor while a preview is actually showing — otherwise every
  // mousemove over the list re-renders the whole section for nothing.
  const handleMouseMove = (e: React.MouseEvent) => {
    if (hoveredListIndex === null) return
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <section
      id="projects"
      className="min-h-dvh w-full bg-background text-foreground transition-colors duration-500 flex flex-col justify-start items-center relative px-[8vw] md:px-[12vw] pt-20 pb-24 overflow-hidden"
    >
      {/* Header with Integrated View Switcher */}
      <div className="relative w-full max-w-[1100px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 z-50">
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
              className={`px-4 py-1.5 rounded-full text-[10px] tracking-[0.12em] lowercase font-bold transition-all ${
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
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch w-full max-w-[1100px] animate-fade-in">
          {projects.map((project) => (
            <GridCard key={project.title} project={project} />
          ))}
        </div>
      )}

      {/* --- RENDER 1: LIST VIEW --- */}
      {viewMode === "list" && (
        <div
          onMouseMove={handleMouseMove}
          className="relative z-10 w-full max-w-[1100px] flex flex-col animate-fade-in border-t border-border/40"
        >
          {projects.map((project, idx) => (
            <div
              key={project.title}
              onMouseEnter={(e) => {
                setHoveredListIndex(idx)
                setMousePos({ x: e.clientX, y: e.clientY })
              }}
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
                      className="inline-flex items-center justify-center transition-transform hover:scale-110 ml-1"
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
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground font-bold no-underline">github repo &rarr;</a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.15em] uppercase text-foreground hover:opacity-80 font-bold no-underline">try &rarr;</a>
                )}
              </div>
            </div>
          ))}

          {/* Floating Live-Hover Preview Window */}
          {hoveredListIndex !== null && projects[hoveredListIndex].type !== "placeholder" && (
            <div
              className="fixed pointer-events-none hidden lg:block z-50 w-[360px] aspect-video rounded-xl overflow-hidden border border-border shadow-2xl bg-zinc-950 animate-fade-in"
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

function GridCard({ project }: { project: Project }) {
  return (
    <div className="bg-card rounded-xl border border-border/60 p-7 flex flex-col h-full">
      <div
        className={`w-full aspect-video relative mb-6 rounded-xl ${
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
function FloatingHoverPreview({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetVideo = project.videoSrc
  const targetWebm = project.webmVideoSrc

  useEffect(() => {
    const video = videoRef.current
    const startTime = project.startTime
    if (!video || startTime == null) return

    const seekToStart = () => {
      video.currentTime = startTime
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
        style={{ objectPosition: project.objectPosition || "center" }}
      >
        {targetWebm && <source src={targetWebm} type="video/webm" />}
        <source src={targetVideo} type="video/mp4" />
      </video>
    )
  }

  return <ProjectThumbnail project={project} />
}

function ProjectThumbnail({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const startTime = project.startTime
    if (!containerRef.current || startTime == null) return

    const video = containerRef.current.querySelector("video")
    if (!video) return

    const seekToStart = () => {
      video.currentTime = startTime
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
      <div className="w-full h-full rounded-xl bg-muted/40 border border-dashed border-border flex flex-col items-center justify-center gap-3 p-6 select-none">
        {project.logoSrc ? (
          <div className="relative w-16 h-16">
            <Image src={project.logoSrc} alt="Logo" fill sizes="64px" className="object-contain dark:invert-[0.15] opacity-60 animate-pulse" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full border-2 border-border border-t-foreground/70 animate-spin" />
        )}
        <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-semibold">Coming Soon</span>
      </div>
    )
  }

  if (project.type === "placeholder") {
    if (project.thumbnailSrc) {
      return (
        <div className="w-full h-full rounded-xl overflow-hidden relative">
          <Image src={project.thumbnailSrc} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 420px" className="object-cover object-top" />
        </div>
      )
    }
    return (
      <div className="w-full h-full rounded-xl bg-muted/30 border border-border/60 flex flex-col items-center justify-center gap-3 p-6 text-center relative overflow-hidden">
        <div className="relative w-14 h-14 flex-shrink-0">
          <Image src="/images/retermina.png" alt="Retermina" fill sizes="56px" className="object-contain" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-bold text-foreground tracking-tight">{project.title}</p>
          <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase font-semibold text-green-500">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            live
          </span>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full h-full relative group/thumb rounded-xl overflow-visible">
      <LivePhoto
        thumbnailSrc={project.thumbnailSrc || ""}
        videoSrc={project.videoSrc || ""}
        webmVideoSrc={project.webmVideoSrc || ""}
        hoverImageSrc={project.hoverImageSrc}
        objectPosition={project.objectPosition || "center"}
        zoom={project.zoom}
        hoverScale={1.4}
        alt={project.title}
      />
    </div>
  )
}

function ProjectCardDetails({ project }: { project: Project }) {
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
            className="inline-flex items-center justify-center transition-transform hover:scale-110"
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
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground font-bold no-underline transition-all duration-200">github repo&rarr;</a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.15em] uppercase text-foreground hover:opacity-80 font-bold no-underline transition-all duration-200">Try &rarr;</a>
        )}
      </div>
    </div>
  )
}