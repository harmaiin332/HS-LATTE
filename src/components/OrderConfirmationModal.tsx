import React from 'react';
import { useCart } from '../context/CartContext';
import { Check, Coffee, Clock, MapPin, Receipt, X } from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { completedOrder, setCompletedOrder } = useCart();

  if (!completedOrder) return null;

  const handleClose = () => {
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#ECE4D9] overflow-hidden my-8 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-[#7A5B46] hover:text-[#120D0A] rounded-full transition-colors"
          aria-label="Close receipt"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Celebration Banner */}
        <div className="p-8 text-center bg-[#FAF7F2] border-b border-[#ECE4D9]">
          <div className="w-16 h-16 rounded-full bg-[#C6985C]/15 border border-[#C6985C]/40 flex items-center justify-center text-[#C6985C] mx-auto mb-4">
            <Check className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C6985C] mb-1">
            Order Confirmed (Demo)
          </div>
          <h2 id="confirmation-title" className="text-3xl font-editorial font-medium text-[#120D0A]">
            Brewing In Progress
          </h2>
          <p className="text-xs text-[#7A5B46] mt-2 max-w-sm mx-auto">
            Thank you, <strong className="text-[#120D0A]">{completedOrder.customer.fullName}</strong>. Our barista has received your ticket and is pulling your shots now.
          </p>

          {/* Pickup Code Token */}
          <div className="mt-5 inline-flex flex-col items-center p-3 px-6 bg-white rounded-xl border border-[#ECE4D9] shadow-xs">
            <span className="text-[10px] text-[#A88B77] uppercase tracking-wider font-semibold">
              Pickup Ticket Code
            </span>
            <span className="text-2xl font-mono font-bold tracking-wider text-[#120D0A]">
              {completedOrder.pickupCode}
            </span>
          </div>
        </div>

        {/* Status Strip */}
        <div className="grid grid-cols-2 divide-x divide-[#ECE4D9] border-b border-[#ECE4D9] bg-white text-center text-xs py-3.5">
          <div className="flex items-center justify-center gap-2 text-[#4A3428]">
            <Clock className="w-4 h-4 text-[#C6985C]" />
            <span>Ready in ~<strong className="text-[#120D0A]">{completedOrder.estimatedMinutes} mins</strong></span>
          </div>
          <div className="flex items-center justify-center gap-2 text-[#4A3428]">
            <MapPin className="w-4 h-4 text-[#C6985C]" />
            <span className="capitalize"><strong className="text-[#120D0A]">{completedOrder.customer.orderType}</strong></span>
          </div>
        </div>

        {/* Itemized Receipt Details */}
        <div className="p-6 space-y-4 max-h-64 overflow-y-auto">
          <div className="flex items-center justify-between text-xs font-semibold text-[#4A3428] uppercase tracking-wider">
            <span>Itemized Receipt</span>
            <span className="font-mono text-[11px] text-[#A88B77]">{completedOrder.orderId}</span>
          </div>

          <div className="space-y-2.5">
            {completedOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start text-xs border-b border-[#FAF7F2] pb-2">
                <div>
                  <div className="font-medium text-[#120D0A]">
                    {item.quantity} × {item.product.name}
                  </div>
                  {item.customization && (
                    <div className="text-[11px] text-[#8C7362]">
                      {item.customization.size} · {item.customization.milk} · {item.customization.temperature}
                    </div>
                  )}
                </div>
                <span className="tabular-nums font-medium text-[#120D0A]">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-2 space-y-1 text-xs text-[#7A5B46]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="tabular-nums">${completedOrder.subtotal.toFixed(2)}</span>
            </div>
            {completedOrder.deliveryFee > 0 && (
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="tabular-nums">${completedOrder.deliveryFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="tabular-nums">${completedOrder.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-[#120D0A] pt-2 border-t border-[#ECE4D9]">
              <span className="font-editorial">Total Amount</span>
              <span className="tabular-nums text-base">${completedOrder.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Demo Footer Note & Action */}
        <div className="p-6 bg-[#FAF7F2] border-t border-[#ECE4D9] space-y-3">
          <div className="text-[11px] text-[#7A5B46] text-center leading-relaxed">
            A confirmation receipt has been simulated for <span className="font-medium text-[#120D0A]">{completedOrder.customer.email}</span>. No real monetary transaction occurred.
          </div>
          <button
            onClick={handleClose}
            className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#120D0A] bg-[#C6985C] hover:bg-[#B38346] active:scale-98 transition-all rounded-lg shadow-xs"
          >
            Start Another Order
          </button>
        </div>
      </div>
    </div>
  );
};
