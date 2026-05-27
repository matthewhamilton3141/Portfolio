import React from 'react';

interface InspoItem {
  name: string;
  url: string;
  logoPath: string;
}

export function Footer() {
  return (
    /* Changed to w-full, dropped the hardcoded height and scroll snap rules */
    <footer className="w-full px-[8vw] md:px-[12vw] py-6 bg-cream flex justify-between items-center border-t border-border transition-colors duration-500">
      
      {/* Left Side: Name & Technical Stack String */}
      <span className="text-[11px] tracking-[0.1em] text-ink-muted shrink-0">
        matthew hamilton · 陳文飛 · built with React, Next.js & TypeScript
      </span>

      {/* Middle & Right Container */}
      <div className="flex-1 flex items-center justify-between ml-12 md:ml-24 text-[11px] tracking-[0.1em] text-ink-muted">
      </div>
    </footer>
  );
}