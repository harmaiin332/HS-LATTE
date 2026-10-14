import React, { useState } from 'react';
import { BRAND_STATS } from '../data/brandData';
import { BookOpen, X, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  return (
    <section id="about" className="py-24 bg-[#120D0A] text-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* 2-Column Split: Visual Narrative & Editorial Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Large Coffee Shop Interior Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#2D231C] aspect-[16/10] lg:aspect-[4/3]">
              <img
                src="/src/assets/images/about_coffee_interior_1792015777133.jpg"
                alt="HS LATTE modern coffee bar interior with oak counters and cozy seating"
                className="w-full h-full object-cover object-center scale-100 hover:scale-102 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-[#120D0A]/85 backdrop-blur-md p-4 rounded-xl border border-[#2D231C]">
                <div className="text-xs uppercase tracking-widest text-[#C6985C] font-semibold mb-0.5">
                  The Sanctum
                </div>
                <div className="text-sm font-light text-[#ECE4D9]">
                  Architectural acoustic wood, natural morning light, and calibrated soundscapes.
                </div>
              </div>
            </div>
          </div>

          {/* Right: Storytelling copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C6985C] mb-3">
              Our Ethos & Origin
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-medium tracking-tight text-[#FAF7F2] leading-[1.15] mb-6">
              More Than Just Coffee.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#ECE4D9]/80 font-light leading-relaxed">
              <p>
                HS LATTE was founded with a singular conviction: exceptional coffee is not an accident of nature, but the culmination of uncompromising dedication at every link of the chain.
              </p>
              <p>
                From the volcanic micro-climates of Colombia and the high plateaus of Yirgacheffe, Ethiopia, to our custom-modified drum roaster, we treat each harvest with reverent craftsmanship. We roast in micro-batches under 12kg to safeguard delicate terroir, floral aromatics, and deep natural chocolate notes.
              </p>
              <p>
                Beyond the cup, HS LATTE is an intentional space. Designed for morning clarity, collaborative quiet, and the comfort of being recognized by name and order.
              </p>
            </div>

            {/* Discover Our Story CTA */}
            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => setIsStoryModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#120D0A] bg-[#C6985C] hover:bg-[#B38346] active:scale-98 transition-all rounded-md shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Discover Our Story</span>
              </button>
            </div>
          </div>
        </div>

        {/* Full-width KPI Statistics Strip */}
        <div className="mt-20 pt-12 border-t border-[#2D231C] grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {BRAND_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-semibold text-[#C6985C] tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium tracking-wide text-[#ECE4D9]/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discover Our Story Modal */}
      {isStoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl bg-[#1C1510] text-[#FAF7F2] rounded-2xl border border-[#2D231C] shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="story-modal-title"
          >
            <button
              onClick={() => setIsStoryModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-[#ECE4D9]/60 hover:text-white rounded-full transition-colors"
              aria-label="Close story dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-semibold uppercase tracking-widest text-[#C6985C]">
              HS LATTE Philosophy
            </span>
            <h3 id="story-modal-title" className="text-2xl sm:text-3xl font-editorial font-medium mt-1 mb-6 text-white">
              The Journey of a Perfect Pour
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#ECE4D9]/85 leading-relaxed font-light">
              <p>
                Our baristas don't just push buttons; they calibrate extractions every 90 minutes. Grind sizes are micro-adjusted based on bar ambient humidity, water TDS (total dissolved solids) is maintained at exactly 135 ppm, and milk is frothed to exactly 63°C for maximum natural sweetness without scalding.
              </p>
              
              <div className="my-6 p-4 rounded-xl bg-[#120D0A] border border-[#2D231C] space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C6985C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Direct Producer Contracts</strong>
                    <span>We pay 65% above fair-trade market minimums directly to farming cooperatives in Colombia, Ethiopia, and Guatemala.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C6985C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Zero Synthetic Flavors</strong>
                    <span>Our caramel, vanilla syrups, and chocolate ganache are made from scratch in-house using raw botanicals and unrefined sugars.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C6985C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Community Soil Program</strong>
                    <span>All spent coffee grounds are collected weekly by community urban gardens to revitalize local compost and fruit orchards.</span>
                  </div>
                </div>
              </div>

              <p>
                Thank you for being part of this mindful ritual. Whether you stay for an hour or grab an espresso on your walk to work, we are honored to make your day better.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#2D231C] flex justify-end">
              <button
                onClick={() => setIsStoryModalOpen(false)}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#120D0A] bg-[#C6985C] hover:bg-[#B38346] rounded-md transition-colors"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
