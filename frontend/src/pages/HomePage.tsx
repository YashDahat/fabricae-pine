import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import AboutSnippet from '@/components/home/AboutSnippet';

export default function HomePage(): React.JSX.Element {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <AboutSnippet />
    </div>
  );
}