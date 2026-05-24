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

      {/* Scroll Container - Explicitly isolated to z-0 so it never covers up the TopBar links */}
      <div
        ref={scrollContainerRef}
        className="relative z-0 h-screen overflow-y-scroll scroll-snap-y scroll-smooth"
      >
        <LandingSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  )
}