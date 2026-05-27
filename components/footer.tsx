import React from 'react';

interface InspoItem {
  name: string;
  url: string;
  logoPath: string;
}

export function Footer() {
  const inspirations: InspoItem[] = [
    {
      name: "justin wu",
      url: "https://www.justinzwu.com/me",
      logoPath: "/images/justinzwu.svg"
    },
    {
      name: "hanz po",
      url: "https://hanzpo.com/",
      logoPath: "/images/hanzpo.svg"
    },
    {
      name: "pranav marthi",
      url: "https://pranavmarthi.com/",
      logoPath: "/images/pranavmarthi.png"
    },
  ];

  return (
    /* Changed to w-full, dropped the hardcoded height and scroll snap rules */
    <footer className="w-full px-[8vw] md:px-[12vw] py-6 bg-cream flex justify-between items-center border-t border-border transition-colors duration-500">
      
      {/* Left Side: Name & Technical Stack String */}
      <span className="text-[11px] tracking-[0.1em] text-ink-muted shrink-0">
        matthew hamilton · 陳文飛 · built with React, Next.js & TypeScript
      </span>

      {/* Middle & Right Container */}
      <div className="flex-1 flex items-center justify-between ml-12 md:ml-24 text-[11px] tracking-[0.1em] text-ink-muted">
        
        {/* Expanded Inspiration & Copyright Block grouped together on the right */}
        <div className="flex items-center gap-6 md:gap-10 ml-auto">
          <div className="flex items-center gap-3">
            <span>inspired by:</span>
            
            <div className="flex items-center gap-4">
              {inspirations.map((inspo, index) => (
                <a
                  key={index}
                  href={inspo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View portfolio by ${inspo.name}`}
                  className="group flex items-center gap-2 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <img 
                    src={inspo.logoPath} 
                    alt="" 
                    className="h-5 w-auto object-contain" 
                  />
                  <span className="text-ink-muted group-hover:text-ink dark:group-hover:text-white transition-colors duration-200 lowercase">
                    {inspo.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}