// components/themes.ts

export interface ThemeOption {
  id: string
  name: string
  className: string
  previewDot: string
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "zinc",
    name: "black and white",
    className: "theme-stark-mono",
    previewDot: "#1A1714"
  },
  {
    id: "editorial",
    name: "warm",
    className: "theme-warm-editorial",
    previewDot: "#A36A58"
  },
  {
    id: "nordic",
    name: "blue",
    className: "theme-cyber-nordic",
    previewDot: "#88C0D0"
  },
  {
    id: "mint",
    name: "green",
    className: "theme-midnight-mint",
    previewDot: "#52B788"
  },
  {
    id: "lavender",
    name: "purple",
    className: "theme-lavender-dusk",
    previewDot: "#7C5CFC"
  },
  {
    id: "rose",
    name: "rose",
    className: "theme-cherry-blossom",
    previewDot: "#E05870"
  },
]