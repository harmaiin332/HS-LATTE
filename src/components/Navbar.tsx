import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'Our Story', href: '#about' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#120D0A]/95 backdrop-blur-md py-3.5 border-b border-[#2D231C] shadow-lg'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#home"
            className="text-2xl md:text-3xl font-editorial tracking-wider text-[#FAF7F2] font-semibold whitespace-nowrap shrink-0 hover:text-[#C6985C] transition-colors"
          >
            HS LATTE
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-[#ECE4D9]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#C6985C] transition-colors whitespace-nowrap shrink-0 py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#C6985C] after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Shopping Bag */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open shopping bag with ${totalItems} items`}
              className="relative p-2 text-[#FAF7F2] hover:text-[#C6985C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6985C] rounded-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C6985C] text-[#120D0A] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-sm">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            <a
              href="#menu"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#120D0A] bg-[#C6985C] hover:bg-[#B38346] active:scale-98 transition-all rounded-md shadow-sm whitespace-nowrap shrink-0"
            >
              Order Now
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
              className="md:hidden p-2 text-[#FAF7F2] hover:text-[#C6985C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6985C] rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#120D0A]/95 backdrop-blur-lg pt-24 px-8 pb-8 md:hidden flex flex-col justify-between">
          <nav className="flex flex-col gap-6 text-lg font-medium text-[#ECE4D9]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#C6985C] transition-colors border-b border-[#2D231C] pb-3"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="space-y-4 pt-6 border-t border-[#2D231C]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-[#FAF7F2] bg-[#1C1510] border border-[#2D231C] rounded-md"
            >
              <ShoppingBag className="w-4 h-4 text-[#C6985C]" />
              <span>View Cart ({totalItems})</span>
            </button>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center py-3 text-sm font-semibold uppercase tracking-wider text-[#120D0A] bg-[#C6985C] rounded-md"
            >
              Explore Menu
            </a>
          </div>
        </div>
      )}
    </>
  );
};
