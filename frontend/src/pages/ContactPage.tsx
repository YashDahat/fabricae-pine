import type { JSX } from 'react';
import { ContactForm } from '@/components/contact/ContactForm';
import { LocationMap } from '@/components/contact/LocationMap';
import { WhatsAppCta } from '@/components/shared/WhatsAppCta';
import { siteConfig } from '@/config/siteConfig';

export default function ContactPage(): React.JSX.Element {
  const { phone, email, address, openingHours } = siteConfig.footer;

  return (
    <div className="bg-white text-[#333333]">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('/images/contact-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">Contact Us</h1>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100" data-testid="contact-phone">
            <h2 className="text-xl font-semibold mb-2">Phone</h2>
            <p className="text-lg">{phone}</p>
            <a href={`tel:${phone}`} className="text-[#D4AF37] hover:underline transition-all duration-200">Call Us</a>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100" data-testid="contact-email">
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <p className="text-lg">{email}</p>
            <a href={`mailto:${email}`} className="text-[#D4AF37] hover:underline transition-all duration-200">Email Us</a>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100" data-testid="contact-address">
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <p className="text-lg">{address}</p>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address ?? '')}`} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline transition-all duration-200">View on Map</a>
          </div>
        </div>
      </section>

      {/* Opening Hours Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Opening Hours</h2>
          <p className="text-lg leading-relaxed">{openingHours}</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Send Us a Message</h2>
          <ContactForm />
        </div>
      </section>

      {/* Location Map Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Our Location</h2>
          <div className="h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-100">
            <LocationMap />
          </div>
        </div>
      </section>

      <WhatsAppCta />
    </div>
  );
}