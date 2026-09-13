import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';

export default function NotFoundPage(): React.JSX.Element {
  return (
    <section className="py-16 px-4 bg-white min-h-[calc(100vh-var(--header-height)-var(--footer-height))] flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-[#D4AF37] mb-4">404</h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-[#333333] mb-6">Page Not Found</h2>
        <p className="text-lg text-[#333333] mb-8 leading-relaxed">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild className="bg-[#D4AF37] hover:bg-[#C2A032] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="notfound-home-cta">
          <Link to={ROUTES.HOME}>Go to Homepage</Link>
        </Button>
      </div>
    </section>
  );
}