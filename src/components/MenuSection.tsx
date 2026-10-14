import React, { useState, useMemo } from 'react';
import { ProductCategory, Product } from '../types/coffee';
import { COFFEE_PRODUCTS, CATEGORIES } from '../data/coffeeProducts';
import { ProductCard } from './ProductCard';
import { Search, Sparkles, X } from 'lucide-react';

interface MenuSectionProps {
  onCustomize: (product: Product) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onCustomize }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return COFFEE_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.tastingNotes &&
          product.tastingNotes.some((note) =>
            note.toLowerCase().includes(searchQuery.toLowerCase())
          ));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="menu" className="py-24 bg-[#FAF7F2] border-b border-[#ECE4D9]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C6985C] mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisan Roasts & Bakery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-medium text-[#120D0A] tracking-tight">
            The HS LATTE Menu
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#7A5B46] leading-relaxed">
            Crafted with ethically sourced beans, dialed extraction curves, and microfoam steamed to silky perfection.
          </p>
        </div>

        {/* Filter Bar and Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#ECE4D9]">
          {/* Interactive Category Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 bg-[#ECE4D9]/60 rounded-xl overflow-x-auto max-w-full scrollbar-none">
            {CATEGORIES.map((category) => {
              const count = category === 'All'
                ? COFFEE_PRODUCTS.length
                : COFFEE_PRODUCTS.filter((p) => p.category === category).length;
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-[#120D0A] shadow-xs font-semibold'
                      : 'text-[#7A5B46] hover:text-[#120D0A]'
                  }`}
                >
                  <span>{category}</span>
                  <span className={`text-[10px] tabular-nums px-1.5 py-0.2 rounded-full ${isActive ? 'bg-[#FAF7F2] text-[#C6985C]' : 'text-[#8C7362]'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A88B77]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, cocoa, vanilla..."
              className="w-full text-xs pl-9 pr-8 py-2.5 bg-white border border-[#ECE4D9] rounded-xl text-[#2B1D16] placeholder-[#A88B77] focus:outline-none focus:border-[#C6985C] shadow-xs transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A88B77] hover:text-[#2B1D16]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onCustomize={onCustomize}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-2xl border border-[#ECE4D9] p-8">
            <p className="text-base text-[#4A3428] font-medium mb-2">No coffee or treats match your search</p>
            <p className="text-xs text-[#7A5B46] mb-4">
              Try searching for something else like "latte", "espresso", or "cookie".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 text-xs font-semibold text-[#120D0A] bg-[#C6985C] hover:bg-[#B38346] rounded-md transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
