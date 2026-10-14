import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { OrderType } from '../types/coffee';
import { X, Coffee, Bike, Store, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discount,
    tax,
    total,
    submitOrder
  } = useCart();

  const [orderType, setOrderType] = useState<OrderType>('takeaway');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tableOrAddress, setTableOrAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const deliveryFee = orderType === 'delivery' ? 3.50 : 0;
  const finalTotal = Number((total + deliveryFee).toFixed(2));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Valid email is required.';
    }
    if (!phone.trim()) {
      errs.phone = 'Phone number is required for order SMS.';
    }
    if (orderType === 'dine-in' && !tableOrAddress.trim()) {
      errs.tableOrAddress = 'Please enter your table or booth number.';
    }
    if (orderType === 'delivery' && !tableOrAddress.trim()) {
      errs.tableOrAddress = 'Please enter your delivery street address.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitOrder({
        fullName,
        email,
        phone,
        orderType,
        tableOrAddress: tableOrAddress.trim() || 'Express Counter Pickup',
        specialNotes: specialNotes.trim() || undefined
      });
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#ECE4D9] overflow-hidden my-8 animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
      >
        {/* Header */}
        <div className="p-6 bg-[#FAF7F2] border-b border-[#ECE4D9] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C6985C]">
              Demo Checkout
            </span>
            <h2 id="checkout-title" className="text-2xl font-editorial font-medium text-[#120D0A]">
              Complete Your Order
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-[#7A5B46] hover:text-[#120D0A] rounded-md transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handlePlaceOrder} className="p-6 space-y-6">
          {/* Demo Disclaimer Banner */}
          <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block">Portfolio Demonstration Mode</strong>
              <span>This checkout simulates a live cafe order. No real payment will be charged and no live credit card is required.</span>
            </div>
          </div>

          {/* Order Type Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3428] mb-2.5">
              Service Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { type: 'takeaway', label: 'Takeaway', icon: Store, desc: 'Counter pickup' },
                { type: 'dine-in', label: 'Dine-In', icon: Coffee, desc: 'Table service' },
                { type: 'delivery', label: 'Delivery', icon: Bike, desc: '+$3.50 fee' }
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = orderType === opt.type;
                return (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => setOrderType(opt.type as OrderType)}
                    className={`p-3 rounded-xl border transition-all text-left flex flex-col items-center sm:items-start text-center sm:text-left ${
                      isSelected
                        ? 'border-[#C6985C] bg-[#FAF7F2] shadow-xs'
                        : 'border-[#ECE4D9] hover:border-[#DFD5C6]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-[#C6985C]' : 'text-[#7A5B46]'}`} />
                    <span className="text-xs font-semibold text-[#120D0A] block">{opt.label}</span>
                    <span className="text-[10px] text-[#7A5B46]">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3428] mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Elena Rostova"
                  className={`w-full text-xs px-3.5 py-2.5 rounded-lg border ${
                    errors.fullName ? 'border-rose-500 bg-rose-50/20' : 'border-[#ECE4D9]'
                  } focus:outline-none focus:border-[#C6985C]`}
                />
                {errors.fullName && <p className="mt-1 text-[11px] text-rose-600">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3428] mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@example.com"
                  className={`w-full text-xs px-3.5 py-2.5 rounded-lg border ${
                    errors.email ? 'border-rose-500 bg-rose-50/20' : 'border-[#ECE4D9]'
                  } focus:outline-none focus:border-[#C6985C]`}
                />
                {errors.email && <p className="mt-1 text-[11px] text-rose-600">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3428] mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 345-6789"
                  className={`w-full text-xs px-3.5 py-2.5 rounded-lg border ${
                    errors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-[#ECE4D9]'
                  } focus:outline-none focus:border-[#C6985C]`}
                />
                {errors.phone && <p className="mt-1 text-[11px] text-rose-600">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3428] mb-1">
                  {orderType === 'dine-in' ? 'Table / Booth #' : orderType === 'delivery' ? 'Street Address' : 'Pickup Note'}
                  {(orderType === 'dine-in' || orderType === 'delivery') && <span className="text-rose-500">*</span>}
                </label>
                <input
                  type="text"
                  value={tableOrAddress}
                  onChange={(e) => setTableOrAddress(e.target.value)}
                  placeholder={orderType === 'dine-in' ? 'e.g. Table 04 by the window' : orderType === 'delivery' ? 'e.g. 742 Evergreen Terr, Apt 3B' : 'Counter pickup'}
                  className={`w-full text-xs px-3.5 py-2.5 rounded-lg border ${
                    errors.tableOrAddress ? 'border-rose-500 bg-rose-50/20' : 'border-[#ECE4D9]'
                  } focus:outline-none focus:border-[#C6985C]`}
                />
                {errors.tableOrAddress && <p className="mt-1 text-[11px] text-rose-600">{errors.tableOrAddress}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3428] mb-1">
                Order Notes for Barista (Optional)
              </label>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="e.g. Please bring drinks together, extra napkins"
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#ECE4D9] focus:outline-none focus:border-[#C6985C]"
              />
            </div>
          </div>

          {/* Itemized Order Preview */}
          <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#ECE4D9] space-y-2 text-xs">
            <div className="font-semibold text-[#120D0A] flex justify-between">
              <span>Order Summary ({cart.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
              <span>Subtotal: ${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount applied</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            {deliveryFee > 0 && (
              <div className="flex justify-between text-[#7A5B46]">
                <span>Local Eco-Courier Delivery</span>
                <span>+${deliveryFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-[#7A5B46]">
              <span>Taxes (8.5%)</span>
              <span>+${tax.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-[#ECE4D9] flex justify-between font-bold text-sm text-[#120D0A]">
              <span>Total Payable (Simulated)</span>
              <span className="tabular-nums text-base">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="py-3 px-5 text-xs font-medium text-[#7A5B46] hover:text-[#120D0A] border border-[#ECE4D9] rounded-lg transition-colors"
            >
              Back to Bag
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 text-xs font-semibold uppercase tracking-wider text-[#120D0A] bg-[#C6985C] hover:bg-[#B38346] active:scale-98 transition-all rounded-lg shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Place Demo Order (${finalTotal.toFixed(2)})</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
