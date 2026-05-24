"use client"

import { useRef } from "react"
import { CustomCursor } from "@/components/custom-cursor"
import { TopBar } from "@/components/top-bar"
import { SideNav } from "@/components/side-nav"
import { LandingSection } from "@/components/landing-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

// Dots array updated to only hold your 3 remaining sections!
const sections = [
  { id: "landing", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
]

export default function PortfolioPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="cursor-none">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Top Bar */}
      <TopBar />

      {/* Side Navigation */}
      <SideNav sections={sections} scrollContainerRef={scrollContainerRef} />

      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="h-screen overflow-y-scroll scroll-snap-y scroll-smooth"
      >
        <LandingSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  )
}

