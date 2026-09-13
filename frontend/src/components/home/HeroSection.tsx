import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';
import { Link } from 'react-router-dom';

export default function HeroSection(): React.JSX.Element {
  return (
    <section
      className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url("/images/hero-bg.jpg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-center text-white p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Crafting Excellence in Every Thread
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Fabricae PINE: Your trusted partner for high-quality garment manufacturing.
        </p>
        <Link to={ROUTES.PRODUCTS}>
          <Button
            className="bg-[#D4AF37] hover:bg-[#C2A032] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
            data-testid="hero-products-cta"
          >
            Explore Our Products
          </Button>
        </Link>
      </div>
    </section>
  );
}