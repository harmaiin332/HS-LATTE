import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    promoCode,
    applyPromoCode,
    removePromoCode,
    tax,
    total,
    totalItems,
    setIsCheckoutOpen
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoFeedback(res);
    if (res.success) {
      setInputCode('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#ECE4D9] animate-in slide-in-from-right duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-title"
        >
          {/* Header */}
          <div className="p-6 bg-[#FAF7F2] border-b border-[#ECE4D9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C6985C]" />
              <h2 id="cart-title" className="text-xl font-editorial font-medium text-[#120D0A]">
                Your Order Bag
              </h2>
              <span className="text-xs bg-[#ECE4D9] text-[#4A3428] font-semibold px-2 py-0.5 rounded-full tabular-nums">
                {totalItems}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#7A5B46] hover:text-[#120D0A] rounded-md transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length > 0 ? (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-[#ECE4D9] text-xs text-[#7A5B46]">
                  <span>Item & Customizations</span>
                  <button
                    onClick={clearCart}
                    className="text-xs text-rose-700 hover:underline inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear bag</span>
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3.5 bg-[#FAF7F2] rounded-xl border border-[#ECE4D9] transition-all"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-[#ECE4D9] shrink-0"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-medium text-[#120D0A] truncate">
                          {item.product.name}
                        </h4>
                        <span className="text-xs font-semibold text-[#120D0A] tabular-nums shrink-0">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Customization details */}
                      {item.customization && (
                        <div className="text-[11px] text-[#7A5B46] mt-0.5 space-y-0.5">
                          <div>
                            {item.customization.size} · {item.customization.temperature}
                          </div>
                          <div>
                            {item.customization.milk} · {item.customization.sweetness}
                          </div>
                          {item.customization.specialInstructions && (
                            <div className="italic text-[#A88B77] truncate">
                              "{item.customization.specialInstructions}"
                            </div>
                          )}
                        </div>
                      )}

                      {/* Stepper + Delete */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-white rounded-md border border-[#ECE4D9] px-2 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-[#7A5B46] hover:text-[#120D0A]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium tabular-nums min-w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-[#7A5B46] hover:text-[#120D0A]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#A88B77] hover:text-rose-600 transition-colors p-1"
                          aria-label={`Remove ${item.product.name} from bag`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#ECE4D9] flex items-center justify-center text-[#A88B77] mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="text-lg font-editorial font-medium text-[#120D0A] mb-1">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#7A5B46] max-w-xs mb-6">
                  Add fresh single-origin espresso or our signature Spanish Latte to start your order.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#120D0A] bg-[#C6985C] hover:bg-[#B38346] rounded-md transition-colors"
                >
                  Explore The Menu
                </button>
              </div>
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#FAF7F2] border-t border-[#ECE4D9] space-y-4">
              {/* Promo code box */}
              {!promoCode ? (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#A88B77] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Promo code (try HSLATTE15)"
                      className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-[#ECE4D9] rounded-md uppercase placeholder:normal-case focus:outline-none focus:border-[#C6985C]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs font-medium text-[#120D0A] bg-white border border-[#ECE4D9] hover:bg-[#ECE4D9] rounded-md transition-colors"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                  <span className="font-medium">Code {promoCode} active</span>
                  <button
                    onClick={removePromoCode}
                    className="text-xs text-rose-700 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              {promoFeedback && (
                <p className={`text-[11px] ${promoFeedback.success ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {promoFeedback.message}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#4A3428] pt-2 border-t border-[#ECE4D9]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-[#120D0A]">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span className="tabular-nums">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax (8.5%)</span>
                  <span className="tabular-nums text-[#120D0A]">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#120D0A] pt-2 border-t border-[#ECE4D9]">
                  <span className="font-editorial">Total Amount</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#120D0A] bg-[#C6985C] hover:bg-[#B38346] active:scale-98 transition-all rounded-lg flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-center text-[#7A5B46]">
                Demo ordering mode · No charge will be made
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
