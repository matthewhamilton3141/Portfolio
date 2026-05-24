"use client"

import { useRef, useState } from "react"

interface LivePhotoProps {
  thumbnailSrc: string
  videoSrc: string
  webmVideoSrc?: string
  alt: string
}

export function LivePhoto({ thumbnailSrc, videoSrc, webmVideoSrc = "/videos/videoSrc.webm", alt }: LivePhotoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Video playback was interrupted or file is unreadable:", err)
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
        // Smoothly scales up the entire card by 4% and adds a deeper shadow on hover
        transform: isHovered ? "scale(1.04) translateY(-4px)" : "scale(1) translateY(0)",
        boxShadow: isHovered 
          ? "0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.15)" 
          : "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
        borderRadius: "12px", // Smooth rounded corners (equivalent to md:rounded-xl)
        overflow: "hidden",   // Forces absolute children to respect the rounded boundary
        transition: "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease-in-out",
        willChange: "transform" // Optimizes browser rendering performance during animations
      }}
    >
      {/* 1. Video Layer */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover block"
        style={{
          opacity: isHovered ? 1 : 0,
          zIndex: isHovered ? 20 : 10,
          transition: "opacity 0.25s ease-in-out",
          borderRadius: "12px"
        }}
      >
        <source src={webmVideoSrc} type="video/webm" />
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* 2. Image Layer */}
      <img
        src={thumbnailSrc}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover block"
        style={{
          opacity: isHovered ? 0 : 1,
          zIndex: isHovered ? 10 : 20,
          transition: "opacity 0.25s ease-in-out",
          borderRadius: "12px"
        }}
      />
    </div>
  )
}