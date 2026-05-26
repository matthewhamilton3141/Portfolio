// app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CustomCursor } from "@/components/custom-cursor"
import { ThemeMenu } from "@/components/theme-menu"

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
        url: "https://matthewhamilton.dev/images/icon.png", // Make sure to save a screenshot as og-preview.png in public/images/
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
    images: ["https://matthewhamilton.dev/images/icon.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
          <CustomCursor />
          <ThemeMenu />
        </ThemeProvider>
      </body>
    </html>
  )
}