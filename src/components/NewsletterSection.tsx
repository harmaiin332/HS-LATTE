import React, { useState } from 'react';
import { Mail, Check, Copy, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const NewsletterSection: React.FC = () => {
  const { applyPromoCode, showToast } = useCart();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubscribed(true);
    showToast('Welcome to the HS LATTE circle! Enjoy 15% off.');
  };

  const handleApplyPromo = () => {
    applyPromoCode('HSLATTE15');
    setCopied(true);
    showToast('Code HSLATTE15 applied to your bag!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-20 bg-[#F5EFEB] border-b border-[#ECE4D9]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C6985C] mb-2.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Morning Gazette</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-editorial font-medium text-[#120D0A] tracking-tight mb-3">
          Join the HS LATTE Circle
        </h2>
        
        <p className="text-sm sm:text-base text-[#7A5B46] max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Receive notes on seasonal micro-lots, private tasting invitations, and receive a complimentary 15% discount on your first order.
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A88B77]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 bg-white border border-[#ECE4D9] rounded-lg text-[#120D0A] placeholder-[#A88B77] focus:outline-none focus:border-[#C6985C] shadow-xs"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#120D0A] bg-[#C6985C] hover:bg-[#B38346] active:scale-98 transition-all rounded-lg whitespace-nowrap shadow-xs"
              >
                Subscribe
              </button>
            </div>
            {error && (
              <p className="mt-2 text-xs text-rose-700 font-medium text-left">
                {error}
              </p>
            )}
            <p className="mt-3 text-[11px] text-[#A88B77]">
              We respect your inbox. Unsubscribe at any time with a single click.
            </p>
          </form>
        ) : (
          <div className="bg-white rounded-2xl p-6 border border-[#ECE4D9] shadow-xs max-w-md mx-auto animate-in fade-in duration-300">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#C6985C]/40 flex items-center justify-center text-[#C6985C] mx-auto mb-3">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-editorial font-medium text-[#120D0A] mb-1">
              You are on the list!
            </h3>
            <p className="text-xs text-[#7A5B46] mb-4">
              Here is your 15% discount code for today:
            </p>
            <div className="flex items-center justify-between p-3 bg-[#FAF7F2] rounded-xl border border-[#ECE4D9] mb-4">
              <code className="font-mono font-bold text-sm tracking-wider text-[#120D0A]">
                HSLATTE15
              </code>
              <button
                onClick={handleApplyPromo}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#120D0A] bg-[#C6985C] hover:bg-[#B38346] rounded-md transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Applied' : 'Apply to Bag'}</span>
              </button>
            </div>
            <p className="text-[11px] text-[#A88B77]">
              Check your inbox for our guide to home pour-over brewing.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
