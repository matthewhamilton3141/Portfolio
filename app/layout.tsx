import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CustomCursor } from "@/components/custom-cursor"
import { ThemeMenu } from "@/components/theme-menu"

export const metadata: Metadata = {
  title: "Matthew Hamilton · Portfolio",
  description: "Engineering Portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-warm-white text-ink transition-colors duration-500 antialiased selection:bg-accent-warm/20 selection:text-ink">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Global UI Components layout canvas */}
          {children}
          
          <CustomCursor />
          <ThemeMenu />
        </ThemeProvider>
      </body>
    </html>
  )
}