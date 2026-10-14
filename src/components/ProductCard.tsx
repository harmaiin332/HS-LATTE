import React, { useState } from 'react';
import { Product } from '../types/coffee';
import { useCart } from '../context/CartContext';
import { Plus, SlidersHorizontal, Coffee } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onCustomize: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onCustomize }) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const isBeverage = product.category !== 'Bakery';

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-[#ECE4D9] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Visual Slot */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECE4D9]">
          {!imageError ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={() => setImageError(true)}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className={`w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br ${product.fallbackGradient || 'from-[#3A2419] to-[#1A110B]'}`}>
              <Coffee className="w-8 h-8 text-[#C6985C] mb-2 opacity-80" />
              <span className="text-xs uppercase tracking-wider text-[#FAF7F2] font-medium">{product.name}</span>
            </div>
          )}

          {/* Category tag */}
          <div className="absolute top-3 left-3 bg-[#120D0A]/80 backdrop-blur-xs text-[#FAF7F2] text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm">
            {product.category}
          </div>

          {/* Volume or portion */}
          {product.volume && (
            <div className="absolute bottom-3 right-3 bg-[#120D0A]/70 backdrop-blur-xs text-[#FAF7F2] text-[10px] tabular-nums px-2 py-0.5 rounded-sm">
              {product.volume}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-lg font-medium text-[#120D0A] group-hover:text-[#C6985C] transition-colors leading-tight">
              {product.name}
            </h3>
            <span className="text-base font-semibold text-[#120D0A] tabular-nums shrink-0">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <p className="text-xs text-[#7A5B46] leading-relaxed line-clamp-2 mb-3.5">
            {product.description}
          </p>

          {/* Metadata: Tasting notes */}
          {product.tastingNotes && product.tastingNotes.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#A88B77] mb-2">
              <span className="text-[#C6985C] font-medium">Notes:</span>
              <span>{product.tastingNotes.join(' · ')}</span>
            </div>
          )}

          {/* Roast level */}
          {product.roastLevel && (
            <div className="text-[11px] text-[#8C7362] flex items-center gap-1.5">
              <span>Roast:</span>
              <span className="font-medium text-[#2B1D16]">{product.roastLevel}</span>
              {product.caffeine && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{product.caffeine}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Button Controls */}
      <div className="p-5 pt-0 flex items-center gap-2">
        {isBeverage ? (
          <button
            onClick={() => onCustomize(product)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium text-[#120D0A] bg-[#FAF7F2] hover:bg-[#ECE4D9] border border-[#DFD5C6] rounded-md transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#7A5B46]" />
            <span>Customize</span>
          </button>
        ) : null}

        <button
          onClick={() => addToCart(product, 1)}
          className={`inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-semibold text-[#120D0A] bg-[#C6985C] hover:bg-[#B38346] active:scale-95 transition-all rounded-md shadow-xs ${
            !isBeverage ? 'w-full' : ''
          }`}
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus className="w-4 h-4" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
};
