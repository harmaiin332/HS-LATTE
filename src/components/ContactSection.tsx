import React, { useState } from 'react';
import { CAFE_INFO } from '../data/brandData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a message with at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate brief network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF7F2] border-b border-[#ECE4D9]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C6985C] mb-2.5">
            Visit & Connect
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-medium text-[#120D0A] tracking-tight">
            We’d Love to Welcome You
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#7A5B46] leading-relaxed">
            Drop by our flagship sanctuary or send us a message for catering, bean wholesale, and private events.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Cafe Information, Address & Hours */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-8 border border-[#ECE4D9] shadow-xs space-y-8">
            <div>
              <h3 className="text-xl font-editorial font-medium text-[#120D0A] mb-4">
                Flagship Sanctuary
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-[#4A3428]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C6985C] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-[#120D0A]">{CAFE_INFO.address}</div>
                    <div className="text-[#7A5B46]">{CAFE_INFO.city}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C6985C] shrink-0" />
                  <a href={`tel:${CAFE_INFO.phone}`} className="hover:text-[#C6985C] transition-colors">
                    {CAFE_INFO.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C6985C] shrink-0" />
                  <a href={`mailto:${CAFE_INFO.email}`} className="hover:text-[#C6985C] transition-colors">
                    {CAFE_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="pt-6 border-t border-[#ECE4D9]">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#120D0A] mb-3">
                <Clock className="w-4 h-4 text-[#C6985C]" />
                <span>Brewing Hours</span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm">
                {CAFE_INFO.hours.map((h, i) => (
                  <div key={i} className="flex items-center justify-between py-1 border-b border-[#FAF7F2]">
                    <span className="text-[#4A3428] font-medium">{h.days}</span>
                    <span className="text-[#7A5B46] tabular-nums">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Atmosphere note */}
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#ECE4D9] text-xs text-[#7A5B46] leading-relaxed">
              High-speed optical Wi-Fi available, dedicated quiet corner tables for focus, and seasonal patio seating.
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-8 border border-[#ECE4D9] shadow-xs">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-editorial font-medium text-[#120D0A] mb-1">
                  Send a Message
                </h3>
                <p className="text-xs text-[#7A5B46] mb-6">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3428] mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border ${
                        errors.name ? 'border-rose-500 bg-rose-50/20' : 'border-[#ECE4D9]'
                      } focus:outline-none focus:border-[#C6985C] transition-colors`}
                    />
                    {errors.name && <p className="mt-1 text-[11px] text-rose-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3428] mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border ${
                        errors.email ? 'border-rose-500 bg-rose-50/20' : 'border-[#ECE4D9]'
                      } focus:outline-none focus:border-[#C6985C] transition-colors`}
                    />
                    {errors.email && <p className="mt-1 text-[11px] text-rose-600">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3428] mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#ECE4D9] focus:outline-none focus:border-[#C6985C] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3428] mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#ECE4D9] focus:outline-none focus:border-[#C6985C] bg-white transition-colors"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Wholesale Beans">Wholesale Beans & Roasts</option>
                      <option value="Private Event">Private Event / Reservation</option>
                      <option value="Careers">Careers & Apprenticeship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3428] mb-1.5">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you have in mind..."
                    className={`w-full text-xs sm:text-sm p-3.5 rounded-lg border ${
                      errors.message ? 'border-rose-500 bg-rose-50/20' : 'border-[#ECE4D9]'
                    } focus:outline-none focus:border-[#C6985C] transition-colors resize-y`}
                  />
                  {errors.message && <p className="mt-1 text-[11px] text-rose-600">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#120D0A] bg-[#C6985C] hover:bg-[#B38346] active:scale-98 transition-all rounded-lg shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#C6985C]/40 flex items-center justify-center text-[#C6985C] mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-editorial font-medium text-[#120D0A]">
                  Thank You, {formData.name}
                </h3>
                <p className="text-sm text-[#7A5B46] max-w-md mx-auto leading-relaxed">
                  Your message has been received. Our hospitality manager will contact you at <span className="font-semibold text-[#120D0A]">{formData.email}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: 'General Inquiry',
                      message: ''
                    });
                  }}
                  className="mt-4 px-6 py-2.5 text-xs font-semibold text-[#120D0A] bg-[#FAF7F2] hover:bg-[#ECE4D9] border border-[#DFD5C6] rounded-md transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
