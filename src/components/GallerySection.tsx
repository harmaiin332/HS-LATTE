import React, { useState } from 'react';
import { GALLERY_ITEMS, GalleryItem } from '../data/brandData';
import { Eye, X } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  return (
    <section className="py-24 bg-[#120D0A] text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C6985C] mb-2">
              Visual Chronicle
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-medium text-white">
              The Coffee Sanctuary
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#ECE4D9]/80 max-w-md">
            Glimpses into our morning rituals, dial-in science, and architectural seating designed for stillness.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#1C1510] border border-[#2D231C] cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <span className="self-start text-[10px] uppercase tracking-wider text-[#FAF7F2] bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-sm border border-white/10">
                  {item.category}
                </span>

                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-base font-editorial font-medium text-white mb-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#C6985C] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Detail</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1C1510] rounded-2xl overflow-hidden border border-[#2D231C]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 text-white bg-black/60 hover:bg-black/90 rounded-full transition-colors"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[16/10] w-full bg-black">
              <img
                src={activeItem.image}
                alt={activeItem.alt}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 bg-[#1C1510] flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C6985C] font-semibold">
                  {activeItem.category}
                </span>
                <h4 className="text-xl font-editorial font-medium text-white">
                  {activeItem.title}
                </h4>
              </div>
              <p className="text-xs text-[#ECE4D9]/60 max-w-xs text-right hidden sm:block">
                Captured on location at HS LATTE Sanctum
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
