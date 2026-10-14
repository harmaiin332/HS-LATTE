import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Product } from './types/coffee';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BestSellers } from './components/BestSellers';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GallerySection } from './components/GallerySection';
import { InstagramSection } from './components/InstagramSection';
import { NewsletterSection } from './components/NewsletterSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { ProductModal } from './components/ProductModal';
import { Toast } from './components/Toast';

function AppContent() {
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#120D0A] flex flex-col selection:bg-[#C6985C]/25 selection:text-[#120D0A]">
      {/* Top Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Full-screen Hero Section */}
        <Hero />

        {/* Curated Best Sellers */}
        <BestSellers onCustomize={(p) => setCustomizingProduct(p)} />

        {/* Full Interactive Menu & Filtering */}
        <MenuSection onCustomize={(p) => setCustomizingProduct(p)} />

        {/* Brand Story & Interior Space */}
        <AboutSection />

        {/* Quality Pillars & Standards */}
        <WhyChooseUs />

        {/* Community Testimonials */}
        <TestimonialsSection />

        {/* Visual Coffee Gallery */}
        <GallerySection />

        {/* Instagram Journal */}
        <InstagramSection />

        {/* Newsletter & Welcome Discount */}
        <NewsletterSection />

        {/* Visit & Contact Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Customization Dialog */}
      <ProductModal
        product={customizingProduct}
        onClose={() => setCustomizingProduct(null)}
      />

      {/* Checkout Dialog */}
      <CheckoutModal />

      {/* Order Confirmation Receipt */}
      <OrderConfirmationModal />

      {/* Global Interactive Toast */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
