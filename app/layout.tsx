// app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CustomCursor } from "@/components/custom-cursor"
import { ThemeMenu } from "@/components/theme-menu"

export const metadata: Metadata = {
  title: "matthewh",
  description: "swe, systems design engineering @ uwaterloo",
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