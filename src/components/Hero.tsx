import React from 'react';
import { ArrowDown, Coffee, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#120D0A]">
      {/* Background Image with layered cinematic contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_coffee_cup_1792015776549.jpg"
          alt="Artisanal ceramic cup with latte art on espresso bar"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Anti-glare gradient scrim for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A] via-[#120D0A]/70 to-[#120D0A]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#120D0A]/50 to-[#120D0A]/85" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20 text-center flex flex-col items-center">
        {/* Subtle unboxed metadata kicker */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-[0.25em] text-[#C6985C] uppercase mb-4">
          <span>Specialty Roastery</span>
          <span aria-hidden="true">·</span>
          <span>Artisanal Espresso</span>
          <span aria-hidden="true">·</span>
          <span>San Francisco</span>
        </div>

        {/* Primary headline with balance */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial font-medium text-[#FAF7F2] tracking-tight leading-[1.08] max-w-4xl text-balance drop-shadow-md">
          Good Coffee. <span className="italic font-normal text-[#C6985C]">Better Days.</span>
        </h1>

        {/* Narrative description */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-[#ECE4D9]/90 max-w-2xl font-normal leading-relaxed text-balance">
          Every morning begins with intention. Savor single-origin beans roasted weekly in micro-batches, precision-dialed extractions, and freshly baked morning treats.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#120D0A] bg-[#C6985C] hover:bg-[#B38346] active:scale-98 transition-all rounded-md shadow-lg shadow-black/30"
          >
            <Coffee className="w-4 h-4" />
            <span>Explore Menu</span>
          </a>

          <a
            href="#about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium tracking-wider text-[#FAF7F2] bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/15 active:scale-98 border border-[#FAF7F2]/20 backdrop-blur-sm transition-all rounded-md"
          >
            <Sparkles className="w-4 h-4 text-[#C6985C]" />
            <span>Discover Our Craft</span>
          </a>
        </div>

        {/* Essential cafe status note */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm text-[#ECE4D9]/70">
          <span>Open Today: 6:30 AM – 8:00 PM</span>
          <span aria-hidden="true">·</span>
          <span>428 Artisan Way, Roast District</span>
          <span aria-hidden="true">·</span>
          <span>Dine-In, Takeaway & Delivery</span>
        </div>
      </div>

      {/* Downward scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
        <a
          href="#menu"
          aria-label="Scroll down to menu"
          className="text-[#FAF7F2] hover:text-[#C6985C] transition-colors p-2"
        >
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
