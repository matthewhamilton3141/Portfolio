"use client"

import { useRef, useState } from "react"
import Image from "next/image"

interface LivePhotoProps {
  thumbnailSrc: string
  videoSrc: string
  webmVideoSrc?: string
  alt: string
  hoverScale?: number
}

export function LivePhoto({
  thumbnailSrc,
  videoSrc,
  webmVideoSrc = "/videos/videoSrc.webm",
  alt,
  hoverScale = 1.2,
}: LivePhotoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Actual video playback error:", err)
        }
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      className="relative w-full h-full cursor-pointer bg-neutral-200 block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `scale(${hoverScale}) translateY(-10px) translateZ(0)`
          : "scale(1) translateY(0) translateZ(0)",
        boxShadow: isHovered
          ? "0 32px 45px -10px rgb(0 0 0 / 0.3), 0 16px 24px -10px rgb(0 0 0 / 0.22)"
          : "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
        borderRadius: "inherit",
        overflow: "hidden",
        transition: "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease-in-out",
        willChange: "transform",
        isolation: "isolate",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden"
      }}
    >
      {/* 1. Video Layer */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover block"
        style={{
          opacity: isHovered ? 1 : 0,
          zIndex: isHovered ? 20 : 10,
          transition: "opacity 0.25s ease-in-out",
          borderRadius: "inherit",
          WebkitMaskImage: "-webkit-radial-gradient(white, black)"
        }}
      >
        <source src={webmVideoSrc} type="video/webm" />
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* 2. Image Layer */}
      <Image
        src={thumbnailSrc}
        alt={alt}
        fill
        className="object-cover block"
        style={{
          opacity: isHovered ? 0 : 1,
          zIndex: isHovered ? 10 : 20,
          transition: "opacity 0.25s ease-in-out",
          borderRadius: "inherit"
        }}
      />
    </div>
  )
}