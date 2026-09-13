import { ProductDto } from '@/types/product';

interface ProductImageGalleryProps {
  product: ProductDto;
}

export default function ProductImageGallery({ product }: ProductImageGalleryProps): React.JSX.Element {
  return (
    <div className="w-full">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-auto object-cover rounded-lg shadow-md"
        data-testid="product-image"
      />
    </div>
  );
}