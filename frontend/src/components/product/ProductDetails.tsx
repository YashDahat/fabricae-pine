import { ProductDto } from '@/types/product';

interface ProductDetailsProps {
  product: ProductDto;
}

export function ProductDetails({ product }: ProductDetailsProps): React.JSX.Element {
  return (
    <div className="space-y-6 text-[#333333] leading-relaxed">
      <h2 className="text-3xl font-semibold text-gray-800" data-testid="product-name">{product.name}</h2>
      <p className="text-lg" data-testid="product-description">{product.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Pricing</h3>
          <p className="text-lg" data-testid="product-price">
            Price: ₹{product.price.toLocaleString('en-IN')} per unit
          </p>
          <p className="text-lg" data-testid="product-moq">
            Minimum Order Quantity: {product.minimumOrderQuantity} units
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Category</h3>
          <p className="text-lg" data-testid="product-category">{product.categoryName}</p>
        </div>
      </div>
    </div>
  );
}