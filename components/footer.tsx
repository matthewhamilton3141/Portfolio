"use client"

export function Footer() {
  return (
    /* Changed to w-full, dropped the hardcoded height and scroll snap rules */
    <footer className="w-full px-[8vw] md:px-[12vw] py-6 bg-cream flex flex-col sm:flex-row gap-2 justify-between items-center border-t border-border transition-colors duration-500">

      {/* Left Side: Name & Technical Stack String */}
      <span className="text-[11px] tracking-[0.1em] text-ink-muted text-center sm:text-left">
        matthew hamilton · 陳文飛 · built with React, Next.js & TypeScript
      </span>

      {/* Right: back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-[11px] tracking-[0.1em] text-ink-muted hover:text-ink transition-colors duration-200 shrink-0"
      >
        back to top ↑
      </button>
    </footer>
  );
}