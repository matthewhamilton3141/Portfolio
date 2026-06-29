// app/layout.tsx
import type { Metadata } from "next"
import { Geist, Geist_Mono, DM_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// Self-hosted via next/font: no render-blocking Google request, no layout shift,
// and it defines the --font-* CSS vars the components/styles already reference.
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" })
import { ThemeMenu } from "@/components/theme-menu"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "matthew h",
  description: "swe, systems design engineering @ uwaterloo",
  
  // Link share card preview configuration
  openGraph: {
    title: "matthew h",
    description: "swe, systems design engineering @ uwaterloo",
    url: "https://matthewhamilton.dev",
    siteName: "matthew h",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://matthewhamilton.dev/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "swe, systems design engineering @ uwaterloo",
      },
    ],
  },
  
  // Custom display configurations for X/Twitter
  twitter: {
    card: "summary_large_image",
    title: "matthew h",
    description: "swe, systems design engineering @ uwaterloo",
    images: ["https://matthewhamilton.dev/images/og-card.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body 
        className="bg-zinc-950 text-zinc-50 transition-colors duration-500 antialiased selection:bg-accent-warm/20 selection:text-white"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Main Page Layout Wrapper */}
          {children}
          
          {/* Global UI Components */}
          <ThemeMenu />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}