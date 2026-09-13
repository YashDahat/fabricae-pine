import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductDto } from '@/types/product';
import { useCart } from '@/cart/CartContext';
import { ROUTES } from '@/routes';

interface ProductCardProps {
  product: ProductDto;
}

export default function ProductCard({ product }: ProductCardProps): React.JSX.Element {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      unitPrice: product.price,
      imageUrl: product.imageUrl,
    }, product.minimumOrderQuantity);
  };

  return (
    <Card className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-200 hover:shadow-lg" data-testid={`product-card-${product.id}`}>
      <CardHeader className="p-0 pb-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <CardTitle className="text-xl font-semibold text-[#333333]">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 text-[#333333]">
        <p className="text-lg font-bold mb-2">₹{product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-600">MOQ: {product.minimumOrderQuantity}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-0 pt-4">
        <Link to={ROUTES.PRODUCT_DETAIL.replace(':id', product.id.toString())} data-testid={`product-view-details-${product.id}`}>
          <Button variant="outline" className="transition-all duration-200 hover:bg-gray-100">
            View Details
          </Button>
        </Link>
        <Button
          onClick={handleAddToCart}
          className="bg-[#D4AF37] hover:bg-[#B8942E] text-white font-semibold rounded-full px-4 py-2 transition-all duration-200"
          data-testid={`product-add-to-cart-${product.id}`}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}