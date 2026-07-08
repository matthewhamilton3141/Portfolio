"use client"

import { useRef, useState } from "react"
import Image from "next/image"

interface LivePhotoProps {
  thumbnailSrc: string
  videoSrc: string
  webmVideoSrc?: string
  alt: string
  hoverScale?: number
  /** CSS object-position for the video/image crop (e.g. "left", "center"). */
  objectPosition?: string
  /** Scales the image/video past its baked-in framing so it fills the frame. Default 1. */
  zoom?: number
  /** Set on above-the-fold instances to prioritise the LCP image. */
  priority?: boolean
}

export function LivePhoto({
  thumbnailSrc,
  videoSrc,
  webmVideoSrc,
  alt,
  hoverScale = 1.2,
  objectPosition = "center",
  zoom = 1,
  priority = false,
}: LivePhotoProps) {
  const zoomTransform = zoom !== 1 ? `scale(${zoom})` : undefined
  const hasVideo = Boolean(videoSrc)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const activate = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Actual video playback error:", err)
        }
      })
    }
  }

  const deactivate = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      className="relative w-full h-full cursor-pointer bg-neutral-200 block"
      // Mouse: play on hover. Touch: tap toggles play/pause (no hover on phones).
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") activate()
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") deactivate()
      }}
      onPointerUp={(e) => {
        if (e.pointerType !== "mouse") (isHovered ? deactivate : activate)()
      }}
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
      {/* 1. Video Layer — only when a preview video exists */}
      {hasVideo && (
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
            objectPosition,
            transform: zoomTransform,
            transition: "opacity 0.25s ease-in-out",
            borderRadius: "inherit",
            WebkitMaskImage: "-webkit-radial-gradient(white, black)"
          }}
        >
          {webmVideoSrc && <source src={webmVideoSrc} type="video/webm" />}
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* 2. Image Layer — stays visible on hover when there's no video */}
      <Image
        src={thumbnailSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 200px, 240px"
        priority={priority}
        className="object-cover block"
        style={{
          opacity: isHovered && hasVideo ? 0 : 1,
          zIndex: isHovered ? 10 : 20,
          transform: zoomTransform,
          transition: "opacity 0.25s ease-in-out",
          borderRadius: "inherit"
        }}
      />
    </div>
  )
}