import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, setIsCartOpen } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#1C1510] text-[#FAF7F2] p-4 rounded-xl border border-[#2D231C] shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <CheckCircle2 className="w-4 h-4 text-[#C6985C] shrink-0" />
          <p className="text-xs font-medium text-[#ECE4D9] truncate">
            {toastMessage}
          </p>
        </div>
        <button
          onClick={() => setIsCartOpen(true)}
          className="text-xs text-[#C6985C] hover:text-[#FAF7F2] font-semibold flex items-center gap-1 shrink-0 whitespace-nowrap"
        >
          <span>View Bag</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
