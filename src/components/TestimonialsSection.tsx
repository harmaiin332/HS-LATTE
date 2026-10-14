import React from 'react';
import { TESTIMONIALS } from '../data/brandData';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF7F2] border-b border-[#ECE4D9]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C6985C] mb-2.5">
            Community Voices
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-medium text-[#120D0A] tracking-tight">
            Loved by Coffee Connoisseurs
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#7A5B46] leading-relaxed">
            Real reflections from morning regulars, design neighbors, and certified taste evaluators.
          </p>
        </div>

        {/* Testimonials 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-8 border border-[#ECE4D9] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative"
            >
              <div>
                <Quote className="w-8 h-8 text-[#E7CFAD] mb-4 opacity-75" />
                
                {/* 5-star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C6985C] text-[#C6985C]" />
                  ))}
                </div>

                <p className="text-sm text-[#4A3428] leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-5 border-t border-[#ECE4D9] flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#ECE4D9]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-[#120D0A] truncate">
                    {t.name}
                  </h4>
                  <p className="text-xs text-[#7A5B46] truncate">
                    {t.role}
                  </p>
                  <p className="text-[11px] text-[#C6985C] font-medium truncate mt-0.5">
                    Order: {t.favoriteDrink}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
