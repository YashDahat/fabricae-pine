import { useProducts } from '@/hooks/productHooks';
import { ProductCard } from '@/components/product/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

export default function FeaturedProducts() {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-[300px] w-full rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    toast.error(`Failed to load products: ${error?.message || 'Unknown error'}`);
    return (
      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10">Featured Products</h2>
          <p>Error loading featured products. Please try again later.</p>
        </div>
      </section>
    );
  }

  const featuredProducts = products?.slice(0, 3) || [];

  return (
    <section className="py-16 px-4 bg-[#F5F5DC]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">Featured Products</h2>
        {featuredProducts.length === 0 ? (
          <div className="text-center text-[#333333]">
            <p>No featured products available at the moment.</p>
            <Link to={ROUTES.PRODUCTS} className="text-[#D4AF37] hover:underline mt-4 inline-block">
              View all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}