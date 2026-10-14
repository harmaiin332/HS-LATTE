import React from 'react';
import { CAFE_INFO } from '../data/brandData';
import { Instagram, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#120D0A] text-[#FAF7F2] border-t border-[#2D231C]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#2D231C]">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="text-2xl font-editorial font-semibold tracking-wider text-white hover:text-[#C6985C] transition-colors block">
              HS LATTE
            </a>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C6985C] font-medium">
              Good Coffee. Better Days.
            </p>
            <p className="text-xs text-[#ECE4D9]/70 leading-relaxed max-w-sm">
              Specialty roastery and cafe dedicated to micro-batch roasting, mindful extractions, and the preservation of artisanal coffee culture.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-9 h-9 rounded-full bg-[#1C1510] border border-[#2D231C] flex items-center justify-center text-[#ECE4D9] hover:text-[#C6985C] hover:border-[#C6985C] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C6985C]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#ECE4D9]/80">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Specialty Menu</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Our Ethos</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">The Standard</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Sanctuary Hours</a></li>
            </ul>
          </div>

          {/* Offerings */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C6985C]">
              Featured Roasts
            </h4>
            <ul className="space-y-2 text-xs text-[#ECE4D9]/80">
              <li>Spanish Latte (Signature)</li>
              <li>Caramel Sea Salt Latte</li>
              <li>20-Hour Single-Origin Cold Brew</li>
              <li>Double Ristretto Espresso</li>
              <li>Valrhona Sea Salt Cookies</li>
            </ul>
          </div>

          {/* Sanctuary Location */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C6985C]">
              Sanctuary
            </h4>
            <div className="text-xs text-[#ECE4D9]/80 space-y-1.5 leading-relaxed">
              <p>{CAFE_INFO.address}</p>
              <p>{CAFE_INFO.city}</p>
              <p className="pt-1 text-[#C6985C]">{CAFE_INFO.phone}</p>
              <p className="text-[#ECE4D9]/60">{CAFE_INFO.email}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#ECE4D9]/60">
          <div>
            © {new Date().getFullYear()} HS LATTE Specialty Coffee Co. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Specialty Coffee Association Member</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#C6985C] hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
