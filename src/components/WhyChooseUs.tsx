import React from 'react';
import { WHY_CHOOSE_ITEMS } from '../data/brandData';
import { Flame, Award, Sparkles, Leaf } from 'lucide-react';

const iconMap = {
  Flame,
  Award,
  Sparkles,
  Leaf
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-[#F5EFEB] border-b border-[#ECE4D9]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C6985C] mb-2.5">
            The Standard
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-medium text-[#120D0A] tracking-tight">
            Why Choose HS LATTE
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#7A5B46] leading-relaxed">
            Every step—from sourcing cherry harvests to steaming microfoam—is guided by exacting artisanal standards.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE_ITEMS.map((item) => {
            const Icon = iconMap[item.iconName];
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-7 border border-[#ECE4D9] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#ECE4D9] flex items-center justify-center text-[#C6985C] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-editorial font-medium text-[#120D0A] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7A5B46] leading-relaxed mb-6 font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ECE4D9] mt-auto">
                  <div className="text-2xl font-editorial font-bold text-[#120D0A] tabular-nums">
                    {item.metric}
                  </div>
                  <div className="text-[11px] text-[#A88B77] uppercase tracking-wider font-medium">
                    {item.metricLabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
