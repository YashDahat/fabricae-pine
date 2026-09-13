import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

export default function AboutSnippet(): React.JSX.Element {
  return (
    <section className="py-16 px-4 bg-[#F5F5DC]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#333333] mb-6">
          Crafting Excellence, Fabric by Fabric
        </h2>
        <p className="text-[#333333] leading-relaxed mb-8 max-w-3xl mx-auto">
          At Fabricae PINE, we believe in the art of garment manufacturing. With a legacy built on
          precision, quality, and ethical practices, we transform raw materials into exquisite
          apparel. Our commitment to sustainable production and innovative design ensures that every
          piece tells a story of craftsmanship and care.
        </p>
        <Link to={ROUTES.ABOUT}>
          <Button
            className="bg-[#D4AF37] hover:bg-[#C2A032] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
            data-testid="about-us-cta"
          >
            Learn More About Us
          </Button>
        </Link>
      </div>
    </section>
  );
}