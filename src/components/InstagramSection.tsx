import React from 'react';
import { INSTAGRAM_POSTS } from '../data/brandData';
import { Heart, Instagram } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF7F2] border-b border-[#ECE4D9]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C6985C] mb-1.5">
              <Instagram className="w-4 h-4" />
              <span>@hslatte on Instagram</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-medium text-[#120D0A]">
              Moments from the Counter
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#120D0A] hover:text-[#C6985C] border-b border-[#120D0A] hover:border-[#C6985C] pb-0.5 transition-colors self-start sm:self-auto"
          >
            <span>Follow Our Journal</span>
            <Instagram className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4-column Instagram grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden bg-[#ECE4D9] shadow-xs"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center text-white">
                <div className="flex items-center gap-1.5 text-xs font-semibold mb-2">
                  <Heart className="w-4 h-4 fill-[#C6985C] text-[#C6985C]" />
                  <span className="tabular-nums">{post.likes}</span>
                </div>
                <p className="text-[11px] text-[#ECE4D9] line-clamp-2">
                  {post.caption}
                </p>
                <span className="text-[10px] text-[#C6985C] mt-2 font-mono">
                  {post.tag}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
