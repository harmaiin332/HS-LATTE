import React, { useState } from 'react';
import { Product, CustomizationOptions } from '../types/coffee';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Check } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<'Regular (12oz)' | 'Large (16oz)'>('Regular (12oz)');
  const [temperature, setTemperature] = useState<'Hot' | 'Iced'>(
    product?.category === 'Iced Coffee' ? 'Iced' : 'Hot'
  );
  const [milk, setMilk] = useState<'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'Skim Milk' | 'None'>('Whole Milk');
  const [sweetness, setSweetness] = useState<'Standard' | 'Half Sweet' | 'Extra Sweet' | 'Unsweetened'>('Standard');
  const [notes, setNotes] = useState('');

  if (!product) return null;

  const isBeverage = product.category !== 'Bakery';

  // Calculate dynamic price
  let calculatedUnitPrice = product.price;
  if (size === 'Large (16oz)') calculatedUnitPrice += 0.80;
  if (milk === 'Oat Milk' || milk === 'Almond Milk') calculatedUnitPrice += 0.60;

  const totalCalculated = Number((calculatedUnitPrice * quantity).toFixed(2));

  const handleAdd = () => {
    const customization: CustomizationOptions | undefined = isBeverage
      ? {
          size,
          temperature,
          milk,
          sweetness,
          specialInstructions: notes.trim() || undefined
        }
      : undefined;

    addToCart(product, quantity, customization);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#ECE4D9] flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
      >
        {/* Header with image */}
        <div className="relative h-44 sm:h-52 w-full bg-[#ECE4D9] shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-xs transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C6985C]">
              {product.category}
            </span>
            <h2 id="modal-product-title" className="text-2xl font-editorial font-medium">
              {product.name}
            </h2>
          </div>
        </div>

        {/* Scrollable customization area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#2B1D16]">
          <p className="text-xs text-[#7A5B46] leading-relaxed">
            {product.description}
          </p>

          {isBeverage && (
            <>
              {/* Temperature */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3428] mb-2">
                  Temperature
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Hot', 'Iced'] as const).map((temp) => (
                    <button
                      key={temp}
                      type="button"
                      onClick={() => setTemperature(temp)}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center flex items-center justify-center gap-2 ${
                        temperature === temp
                          ? 'border-[#C6985C] bg-[#FAF7F2] text-[#120D0A] font-semibold shadow-xs'
                          : 'border-[#ECE4D9] text-[#7A5B46] hover:border-[#DFD5C6]'
                      }`}
                    >
                      {temperature === temp && <Check className="w-3.5 h-3.5 text-[#C6985C]" />}
                      <span>{temp}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3428] mb-2">
                  Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Regular (12oz)', extra: '' },
                    { label: 'Large (16oz)', extra: '+$0.80' }
                  ].map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setSize(s.label as any)}
                      className={`py-2 px-3 text-xs rounded-lg border transition-all flex items-center justify-between ${
                        size === s.label
                          ? 'border-[#C6985C] bg-[#FAF7F2] text-[#120D0A] font-semibold shadow-xs'
                          : 'border-[#ECE4D9] text-[#7A5B46] hover:border-[#DFD5C6]'
                      }`}
                    >
                      <span>{s.label}</span>
                      {s.extra && <span className="text-[11px] text-[#A88B77]">{s.extra}</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Option */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3428] mb-2">
                  Milk Preference
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { name: 'Whole Milk', extra: '' },
                    { name: 'Oat Milk', extra: '+$0.60' },
                    { name: 'Almond Milk', extra: '+$0.60' },
                    { name: 'Skim Milk', extra: '' },
                    { name: 'None', extra: '' }
                  ].map((m) => (
                    <button
                      key={m.name}
                      type="button"
                      onClick={() => setMilk(m.name as any)}
                      className={`py-2 px-2.5 text-xs rounded-lg border transition-all text-left flex flex-col justify-center ${
                        milk === m.name
                          ? 'border-[#C6985C] bg-[#FAF7F2] text-[#120D0A] font-semibold'
                          : 'border-[#ECE4D9] text-[#7A5B46] hover:border-[#DFD5C6]'
                      }`}
                    >
                      <span className="truncate">{m.name}</span>
                      {m.extra && <span className="text-[10px] text-[#C6985C] font-normal">{m.extra}</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3428] mb-2">
                  Sweetness
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Standard', 'Half Sweet', 'Extra Sweet', 'Unsweetened'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSweetness(lvl)}
                      className={`py-2 px-2 text-xs rounded-lg border transition-all text-center ${
                        sweetness === lvl
                          ? 'border-[#C6985C] bg-[#FAF7F2] text-[#120D0A] font-semibold'
                          : 'border-[#ECE4D9] text-[#7A5B46] hover:border-[#DFD5C6]'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3428] mb-1.5">
                  Special Notes for Barista
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Extra hot, light ice, cinnamon sprinkle"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#ECE4D9] focus:outline-none focus:border-[#C6985C] transition-colors"
                  maxLength={100}
                />
              </div>
            </>
          )}

          {/* Quantity Selector */}
          <div className="pt-2 flex items-center justify-between border-t border-[#ECE4D9]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4A3428]">
              Quantity
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-md border border-[#ECE4D9] flex items-center justify-center hover:bg-[#FAF7F2] text-[#4A3428]"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-semibold tabular-nums w-6 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-md border border-[#ECE4D9] flex items-center justify-center hover:bg-[#FAF7F2] text-[#4A3428]"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 px-6 bg-[#FAF7F2] border-t border-[#ECE4D9] flex items-center justify-between gap-4 shrink-0">
          <div>
            <div className="text-[11px] text-[#7A5B46]">Total amount</div>
            <div className="text-xl font-semibold text-[#120D0A] tabular-nums">
              ${totalCalculated.toFixed(2)}
            </div>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 max-w-xs py-3 px-6 text-xs font-semibold uppercase tracking-wider text-[#120D0A] bg-[#C6985C] hover:bg-[#B38346] active:scale-98 transition-all rounded-md shadow-xs text-center"
          >
            Add to Bag (${totalCalculated.toFixed(2)})
          </button>
        </div>
      </div>
    </div>
  );
};
