import { useParams } from 'react-router-dom';
import { useProductById } from '@/hooks/productHooks';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import { ProductDetails } from '@/components/product/ProductDetails';
import { InquiryForm } from '@/components/inquiry/InquiryForm';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id) : undefined;

  const { data: product, isLoading, isError, error } = useProductById(productId);

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-[400px] w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-red-500">
          <h2 className="text-2xl font-semibold">Error loading product details</h2>
          <p>{error?.message || 'An unexpected error occurred.'}</p>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <h2 className="text-2xl font-semibold">Product not found</h2>
          <p>The product you are looking for does not exist or has been removed.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center">
            <ProductImageGallery product={product} />
          </div>
          <div className="space-y-6">
            <ProductDetails product={product} />
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">Inquire about this product</h3>
              <InquiryForm productId={product.id} productName={product.name} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}