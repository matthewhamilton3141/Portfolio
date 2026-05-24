'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Global custom cursor enforcer
  React.useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches
    if (!isTouch) {
      document.documentElement.classList.add('cursor-none')
    }
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}