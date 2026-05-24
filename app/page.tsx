// app/page.tsx
"use client"

import { useRef } from "react"
import { CustomCursor } from "@/components/custom-cursor"
import { TopBar } from "@/components/top-bar"
import { SideNav } from "@/components/side-nav"
import { LandingSection } from "@/components/landing-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { NotchMediaPlayer } from "@/components/notch-media-player"

const sections = [
  { id: "landing", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
]

export default function PortfolioPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="cursor-none relative min-h-screen bg-background">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Top Bar - High stacking index */}
      <TopBar />

      {/* Notch Media Player - High stacking index */}
      <NotchMediaPlayer />

      {/* Side Navigation */}
      <SideNav sections={sections} scrollContainerRef={scrollContainerRef} />

      {/* FIX: Dropped h-screen and scroll-snap-y traps. 
        Changing this to h-auto and allowing natural document overflow ensures your 
        expanding multi-row project grid can stretch down the page seamlessly.
      */}
      <div
        ref={scrollContainerRef}
        className="relative z-0 h-auto w-full overflow-y-visible scroll-smooth"
      >
        <LandingSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  )
}