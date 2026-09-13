import type { JSX } from 'react';
import React from 'react';

export function LocationMap(): React.JSX.Element {
  // Hardcoded latitude and longitude for Fabricae PINE's location
  const latitude = 28.6139; // Example: New Delhi latitude
  const longitude = 77.2090; // Example: New Delhi longitude
  const zoom = 15;

  // Google Maps embed URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${latitude},${longitude}&zoom=${zoom}`;

  return (
    <section className="py-16 px-4 bg-white" data-testid="location-map-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#333333]">
          Our Location
        </h2>
        <div className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Fabricae PINE Location"
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            data-testid="google-map-iframe"
          ></iframe>
        </div>
      </div>
    </section>
  );
}