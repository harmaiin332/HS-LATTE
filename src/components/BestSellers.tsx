import React from 'react';
import { Product } from '../types/coffee';
import { COFFEE_PRODUCTS } from '../data/coffeeProducts';
import { useCart } from '../context/CartContext';
import { Plus, Flame } from 'lucide-react';

interface BestSellersProps {
  onCustomize: (product: Product) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ onCustomize }) => {
  const { addToCart } = useCart();
  const bestSellers = COFFEE_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-20 bg-[#FAF7F2] border-b border-[#ECE4D9]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C6985C] mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>House Favorites</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-editorial font-medium text-[#120D0A]">
              Curated Best Sellers
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#4A3428] max-w-md">
            Our most requested extractions and morning pairings, perfected over thousands of handcrafted pours.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl overflow-hidden border border-[#ECE4D9] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#ECE4D9]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback gradient if image fails
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-[#120D0A]/85 backdrop-blur-sm text-[#FAF7F2] text-[11px] font-medium px-2.5 py-1 rounded-sm tracking-wider">
                    {product.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-2 mb-1.5">
                    <h3 className="text-lg font-medium text-[#120D0A] group-hover:text-[#C6985C] transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-base font-semibold text-[#120D0A] tabular-nums shrink-0">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-xs text-[#7A5B46] line-clamp-2 leading-relaxed mb-3">
                    {product.description}
                  </p>

                  {/* Tasting notes */}
                  {product.tastingNotes && (
                    <div className="flex items-center gap-1.5 text-[11px] text-[#A88B77] truncate">
                      <span>{product.tastingNotes.join(' · ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center gap-2">
                {product.category !== 'Bakery' ? (
                  <button
                    onClick={() => onCustomize(product)}
                    className="flex-1 py-2 text-xs font-medium text-[#120D0A] bg-[#FAF7F2] hover:bg-[#ECE4D9] border border-[#DFD5C6] rounded-md transition-colors"
                  >
                    Customize
                  </button>
                ) : null}
                <button
                  onClick={() => addToCart(product, 1)}
                  className={`py-2 text-xs font-semibold text-[#120D0A] bg-[#C6985C] hover:bg-[#B38346] active:scale-95 transition-all rounded-md flex items-center justify-center gap-1.5 ${
                    product.category === 'Bakery' ? 'w-full' : 'px-3.5'
                  }`}
                  aria-label={`Add ${product.name} to cart`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{product.category === 'Bakery' ? 'Add to Cart' : 'Add'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
