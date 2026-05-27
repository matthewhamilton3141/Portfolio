// components/landing-section.tsx
"use client"

import { useEffect, useState, useRef } from "react"
import { LivePhoto } from "./live-photo"
import Image from "next/image"
import React from "react"

export function LandingSection() {
  // Typewriter state
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [typingDone, setTypingDone] = useState(false)
  const [showSignature, setShowSignature] = useState(false)
  const [isNameHovered, setIsNameHovered] = useState(false)
  
  // Element reveal state
  const [showElements, setShowElements] = useState({
    eyebrow: false,
    tagline: false,
    projectsHint: false,
    contactHint: false,
    photo: false,
    bio: false,
  })
  
  const fullName = "MATTHEW HAMILTON"
  const chineseName = "陳文飛"
  const indexRef = useRef(0)

  // Typewriter effect
  useEffect(() => {
    const typeSpeed = 80
    const startDelay = 300

    const typeNext = () => {
      if (indexRef.current <= fullName.length) {
        setTypedText(fullName.slice(0, indexRef.current))
        indexRef.current++
        setTimeout(typeNext, typeSpeed + (Math.random() * 30 - 15))
      } else {
        setShowCursor(false)
        setTypingDone(true)
        // Show signature after typing completes
        setTimeout(() => {
          setShowSignature(true)
        }, 400)
      }
    }

    setTimeout(typeNext, startDelay)
  }, [])

  // Stagger other elements after typing starts
  useEffect(() => {
    setTimeout(() => setShowElements((s) => ({ ...s, eyebrow: true })), 100)
    setTimeout(() => setShowElements((s) => ({ ...s, photo: true })), 800)
    setTimeout(() => setShowElements((s) => ({ ...s, bio: true })), 1000)
  }, [])

  // Show tagline and stagger scroll hints sequentially after typing is done
  useEffect(() => {
    if (typingDone) {
      setTimeout(() => setShowElements((s) => ({ ...s, tagline: true })), 200)
      setTimeout(() => setShowElements((s) => ({ ...s, projectsHint: true })), 2800)
      setTimeout(() => setShowElements((s) => ({ ...s, contactHint: true })), 2950)
    }
  }, [typingDone])

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="landing" className="min-h-screen md:h-screen scroll-snap-start grid grid-cols-1 md:grid-cols-2 bg-warm-white transition-colors duration-500 overflow-hidden relative">
      {/* Divider line between panels */}
      <div className="panel-divider absolute left-1/2 top-[15%] bottom-[15%] w-px bg-border z-[2] pointer-events-none hidden md:block" />

      {/* Left panel */}
      <div className="landing-left flex flex-col justify-center px-[8vw] py-[100px] md:px-[6vw] md:py-0 md:pl-[12vw] relative z-[1]">
        
        {/* INNER WRAPPER */}
        <div className="flex flex-col max-w-[520px] gap-y-3 md:gap-y-5">
          
          {/* Eyebrow */}
          <p
            className={`text-[17px] tracking-[0.24em] text-ink-muted transition-all duration-800 ${
              showElements.eyebrow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            aspiring software engineer
          </p>

          {/* Interactive Name Container */}
          <div
            className={`name-wrap relative z-[10] w-full ${typingDone ? "interactive cursor-pointer pointer-events-auto" : "pointer-events-none"}`}
            aria-label="MATTHEW HAMILTON (陳文飛)"
            onMouseEnter={() => {
              if (typingDone) setIsNameHovered(true)
            }}
            onMouseLeave={() => {
              if (typingDone) setIsNameHovered(false)
            }}
          >
            <div className="relative w-full block h-auto">
              
              {/* English name - Scaled down slightly to stay tight and balanced */}
              <div
                className={`name-en font-black text-[clamp(42px,5vw,72px)] leading-[0.85] tracking-[0.06em] text-foreground transition-opacity duration-300 ${
                  isNameHovered && typingDone ? "opacity-0 invisible" : "opacity-100 visible"
                }`}
                style={{ 
                  fontFamily: "var(--font-geist-sans), sans-serif", 
                  transform: "scaleX(1.15)", 
                  transformOrigin: "left center" 
                }}
              >
                <div className="block uppercase select-none">
                  {typedText.slice(0, 7)}
                </div>
                <div className="block uppercase select-none">
                  {typedText.slice(7).trim()}
                  {showCursor && (
                    <span className="inline-block w-[6px] h-[0.85em] bg-accent ml-1 align-middle rounded-sm animate-blink" />
                  )}
                </div>
              </div>

              {/* Chinese name */}
              <span
                className={`name-zh absolute top-0 left-0 block font-bold text-accent-warm whitespace-nowrap transition-opacity duration-300 ${
                  isNameHovered && typingDone ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                style={{ 
                  fontFamily: "'Noto Serif SC', serif",
                  fontSize: "clamp(64px, 8vw, 110px)",    
                  lineHeight: "1.0",                     
                  transform: "scaleX(1.3)",              
                  transformOrigin: "left center",
                  letterSpacing: "0.08em"                
                }}
                aria-hidden="true"
              >
                {chineseName}
              </span>

            </div>
          </div>

          {/* Tagline */}
          <p
            className={`font-light text-[clamp(13px,2vw,20px)] text-ink-soft transition-all duration-800 ${
              showElements.tagline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            engineering student @ uwaterloo
          </p>

          {/* Signature */}
          <div
            className={`mt-3 md:mt-5 transition-opacity duration-500 ${
              showSignature ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          >
            <img 
              src="/images/signature.svg" 
              alt="" 
              className="h-[105px] md:h-[130px] w-auto dark:invert dark:opacity-80"
              style={{ filter: "var(--signature-filter, none)" }}
            />
          </div>

        </div> {/* END OF INNER WRAPPER */}
        
      </div>

      {/* Right panel */}
      <div className="landing-right relative flex flex-col justify-center px-[8vw] py-10 md:px-[5vw] md:py-[80px] md:pr-[8vw] bg-cream transition-colors duration-500 overflow-y-auto overflow-x-hidden">
        
        {/* Container for Photo + Interactive Logo Sandbox */}
        <div className="flex flex-row items-stretch gap-8 mb-8 w-full max-w-[640px]">
          
          {/* Live Photo component Wrapper */}
          <div
            className={`w-[200px] md:w-[240px] aspect-[3/4] rounded-xl relative overflow-hidden flex-shrink-0 transition-all duration-800 ${
              showElements.photo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{
              // Hard anchors to stop hardware-accelerated video frames from escaping the bounds
              isolation: "isolate",
              WebkitMaskImage: "-webkit-radial-gradient(white, black)",
            }}
          >
            <LivePhoto
              thumbnailSrc="/images/thumbnailSrc.jpg"
              videoSrc="/videos/videoSrc.mp4"
              webmVideoSrc="/videos/videoSrc.webm"
              alt="Profile photo"
            />
          </div>

          {/* Interactive Physics Canvas Sandbox Area */}
          <div 
            className={`w-[200px] md:w-[240px] max-w-[240px] aspect-[3/4] rounded-xl border border-dashed border-border/60 bg-surface/20 relative overflow-hidden transition-all duration-800 delay-300 hidden sm:block ${
              showElements.photo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <LogoSandbox logos={["/images/waterloologo.png", "/images/nvidialogo.png", "/images/jamhackslogo.png", "/images/bayernlogo.png", "/images/overwatchlogo.png", "/images/league.png", "images/typescript.png", "/images/rayquaza.png"]} />
          </div>
        </div>

        {/* Bio Text Wrapper */}
        <div
          className={`about-bio transition-all duration-800 max-w-[460px] ${
            showElements.bio ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-[15px] leading-[1.8] text-ink-soft mb-4">
            incoming{" "}
            <a 
              href="https://uwaterloo.ca/future-students/programs/systems-design-engineering"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-2 py-0.5 rounded bg-accent/5 text-accent font-semibold border border-accent/10 transition-all duration-200 hover:bg-accent/15 hover:border-accent/30 cursor-none"
            >
              systems design engineering @ uwaterloo
            </a>
          </p>
          <p className="text-[15px] leading-[1.8] text-ink-soft mb-5">
            {"originally from toronto, now based in waterloo for fall '26 to winter '27. i enjoy exploring nature, video games, and trying new things."}
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {["Python", "AI/ML", "JavaScript", "React"].map((tag) => (
              <span
                key={tag}
                className="text-[11px] tracking-[0.12em] lowercase py-2 px-4 border border-border rounded-full text-ink-soft bg-surface transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width Grid Overlay Container holding both interactive scroll navigation hints */}
      <div className="absolute bottom-8 left-0 right-0 w-full hidden md:grid grid-cols-1 md:grid-cols-2 px-[8vw] md:px-0 pointer-events-none z-20">
        
        {/* PROJECTS TARGET LINK */}
        <div className="flex md:justify-start md:pl-[12vw] justify-center">
          <button
            onClick={() => scrollToSection("projects")}
            className="flex flex-col items-center gap-2 pointer-events-auto cursor-none bg-transparent border-none p-0 group"
          >
            <span className="text-[10px] tracking-[0.18em] lowercase text-ink-muted group-hover:text-ink transition-colors duration-200">
              Projects
            </span>
            <div className="w-px h-9 bg-gradient-to-b from-ink-muted to-transparent animate-scroll-pulse group-hover:from-ink" />
          </button>
        </div>

        {/* CONTACT TARGET LINK */}
        <div className="flex md:justify-end md:pr-[8vw] justify-center mt-6 md:mt-0">
          <button
            onClick={() => scrollToSection("contact")}
            className="flex flex-col items-center gap-2 pointer-events-auto cursor-none bg-transparent border-none p-0 group"
          >
            <span className="text-[10px] tracking-[0.18em] lowercase text-ink-muted group-hover:text-ink transition-colors duration-200">
              Contact
            </span>
            <div className="w-px h-9 bg-gradient-to-b from-ink-muted to-transparent animate-scroll-pulse group-hover:from-ink" />
          </button>
        </div>

      </div>
    </section>
  )
}


interface LogoItem {
  img: HTMLImageElement
  x: number
  y: number
  targetX: number // NEW: Tracks mouse position for smooth easing
  targetY: number // NEW: Tracks mouse position for smooth easing
  vx: number
  vy: number
  radius: number 
  width: number  
  height: number 
  isDragging: boolean
  loaded: boolean 
}

export const LogoSandbox = React.memo(function LogoSandbox({ logos }: { logos: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const itemsRef = useRef<LogoItem[]>([])
  const dragItemIndex = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const containerWidth = rect.width || 240
    const containerHeight = rect.height || 320

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    ctx.scale(dpr, dpr)

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"

    let targetSize = 96
    if (logos.length > 3) targetSize = 74

    const cols = Math.ceil(Math.sqrt(logos.length))
    const cellWidth = containerWidth / cols
    const cellHeight = containerHeight / Math.ceil(logos.length / cols)

    const loadedItems: LogoItem[] = logos.map((src, idx) => {
      const img = new window.Image()
      img.src = src
      
      const angle = Math.random() * Math.PI * 2
      // Slightly dialed down base speed so they drift elegantly
      const speed = 0.4 + Math.random() * 0.4

      const colIndex = idx % cols
      const rowIndex = Math.floor(idx / cols)
      
      const startX = colIndex * cellWidth + (cellWidth - targetSize) / 2
      const startY = rowIndex * cellHeight + (cellHeight - targetSize) / 2

      const item: LogoItem = {
        img,
        x: Math.max(10, Math.min(containerWidth - targetSize - 10, startX)),
        y: Math.max(10, Math.min(containerHeight - targetSize - 10, startY)),
        targetX: Math.max(10, Math.min(containerWidth - targetSize - 10, startX)),
        targetY: Math.max(10, Math.min(containerHeight - targetSize - 10, startY)),
        vx: Math.cos(angle) * speed, 
        vy: Math.sin(angle) * speed, 
        radius: targetSize / 2,
        width: targetSize,
        height: targetSize,
        isDragging: false,
        loaded: false, 
      }

      img.onload = () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight
        if (aspectRatio > 1) {
          item.width = targetSize
          item.height = targetSize / aspectRatio
        } else {
          item.width = targetSize * aspectRatio
          item.height = targetSize
        }
        item.radius = Math.max(item.width, item.height) / 2
        item.loaded = true 
      }

      return item
    })
    itemsRef.current = loadedItems

    let animationFrameId: number

    const updatePhysics = () => {
      ctx.clearRect(0, 0, containerWidth, containerHeight)
      const items = itemsRef.current.filter(item => item.loaded) 

      // ORIGINAL BOUNCE PHYSICS ENGINE
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const item1 = items[i]
          const item2 = items[j]

          const c1x = item1.x + item1.width / 2
          const c1y = item1.y + item1.height / 2
          const c2x = item2.x + item2.width / 2
          const c2y = item2.y + item2.height / 2

          const dx = c2x - c1x
          const dy = c2y - c1y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const minDist = item1.radius + item2.radius

          if (distance < minDist) {
            const overlap = minDist - distance
            const nx = dx / (distance || 1)
            const ny = dy / (distance || 1)

            if (!item1.isDragging && !item2.isDragging) {
              item1.x -= nx * (overlap / 2)
              item1.y -= ny * (overlap / 2)
              item2.x += nx * (overlap / 2)
              item2.y += ny * (overlap / 2)
            } else if (item1.isDragging) {
              item2.x += nx * overlap
              item2.y += ny * overlap
            } else if (item2.isDragging) {
              item1.x -= nx * overlap
              item1.y -= ny * overlap
            }

            const kx = item1.vx - item2.vx
            const ky = item1.vy - item2.vy
            const p = 2 * (nx * kx + ny * ky) / 2 

            if (!item1.isDragging) {
              item1.vx -= p * nx
              item1.vy -= p * ny
            }
            if (!item2.isDragging) {
              item2.vx += p * nx
              item2.vy += p * ny
            }
          }
        }
      }

      items.forEach((item) => {
        if (item.isDragging) {
          const prevX = item.x
          const prevY = item.y

          // FIXED: Smoothly transition to mouse coordinates over a few frames (0.15 = 15% travel per frame)
          item.x += (item.targetX - item.x) * 0.15
          item.y += (item.targetY - item.y) * 0.15

          // Generate fluid velocity vectors based on your real throw speed
          item.vx = (item.x - prevX) * 0.4
          item.vy = (item.y - prevY) * 0.4
        } else {
          // Subtle drag friction so they slow down beautifully after a big throw
          item.vx *= 0.98
          item.vy *= 0.98

          item.x += item.vx
          item.y += item.vy

          if (item.x <= 0) {
            item.x = 0
            item.vx = Math.abs(item.vx) * 0.7
          } else if (item.x + item.width >= containerWidth) {
            item.x = containerWidth - item.width
            item.vx = -Math.abs(item.vx) * 0.7
          }

          if (item.y <= 0) {
            item.y = 0
            item.vy = Math.abs(item.vy) * 0.7
          } else if (item.y + item.height >= containerHeight) {
            item.y = containerHeight - item.height
            item.vy = -Math.abs(item.vy) * 0.7
          }
        }

        ctx.save()
        ctx.globalAlpha = item.isDragging ? 1.0 : 0.9
        ctx.drawImage(item.img, item.x, item.y, item.width, item.height)
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(updatePhysics)
    }

    animationFrameId = requestAnimationFrame(updatePhysics)

    const getCanvasMousePos = (e: MouseEvent) => {
      const currentRect = canvas.getBoundingClientRect()
      return { x: e.clientX - currentRect.left, y: e.clientY - currentRect.top }
    }

    const handleMouseDown = (e: MouseEvent) => {
      const pos = getCanvasMousePos(e)
      const items = itemsRef.current.filter(item => item.loaded)
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i]
        if (pos.x >= item.x && pos.x <= item.x + item.width && pos.y >= item.y && pos.y <= item.y + item.height) {
          dragItemIndex.current = itemsRef.current.indexOf(item)
          item.isDragging = true
          item.targetX = pos.x - item.width / 2
          item.targetY = pos.y - item.height / 2
          break
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (dragItemIndex.current === null) return
      const pos = getCanvasMousePos(e)
      const item = itemsRef.current[dragItemIndex.current]

      // Set target properties instead of instantly hard-snapping layout parameters
      item.targetX = pos.x - item.width / 2
      item.targetY = pos.y - item.height / 2
    }

    const handleMouseUp = () => {
      if (dragItemIndex.current === null) return
      const item = itemsRef.current[dragItemIndex.current]
      item.isDragging = false

      // Prevent extreme speed spikes if a user whips their mouse excessively fast
      item.vx = Math.max(-4, Math.min(4, item.vx))
      item.vy = Math.max(-4, Math.min(4, item.vy))

      dragItemIndex.current = null
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [logos])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full select-none"
      style={{ cursor: 'grab' }}
    />
  )
}, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.logos) === JSON.stringify(nextProps.logos)
})