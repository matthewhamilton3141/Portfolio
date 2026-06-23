// retiring this lol
// components/custom-cursor.tsx
"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true)
      return
    }

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) setIsVisible(true)
      
      // Update positions directly - no lag at all for dot
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
      ring.style.left = `${mouseX}px`
      ring.style.top = `${mouseY}px`
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Event delegation for hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest("a, button, [role='button'], input, textarea, select, .interactive")) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element
      const related = e.relatedTarget as Element | null
      if (target.closest("a, button, [role='button'], input, textarea, select, .interactive")) {
        if (!related?.closest("a, button, [role='button'], input, textarea, select, .interactive")) {
          setIsHovering(false)
        }
      }
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible])

  if (isTouchDevice) return null

  return (
    <>
      {/* Main dot - z-[99999999] overrides all layout elements */}
      <div
        ref={dotRef}
        className={`fixed -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full pointer-events-none z-[99999999] transition-[opacity,transform] duration-150 ${
          isHovering ? "opacity-0 scale-0" : isVisible ? "opacity-100 scale-100" : "opacity-0"
        }`}
        style={{ backgroundColor: "var(--accent)", top: 0, left: 0 }}
      />
      {/* Ring - z-[99999999] keeps it perfectly aligned on top */}
      <div
        ref={ringRef}
        className={`fixed -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border pointer-events-none z-[99999999] transition-[opacity,transform] duration-150 ${
          isHovering && isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
        style={{ borderColor: "var(--accent)", top: 0, left: 0 }}
      />
    </>
  )
}