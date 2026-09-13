import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useProducts, useDeleteProduct } from '@/hooks/productHooks';
import { ProductDto } from '@/types/product';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

interface ProductTableProps {
  onEdit: (product: ProductDto) => void;
  onDelete: (product: ProductDto) => void;
}

export function ProductTable({ onEdit, onDelete }: ProductTableProps): React.JSX.Element {
  const { data: products, isLoading, isError, error } = useProducts();
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (isError) {
    return <div>Error loading products: {error?.message}</div>;
  }

  const handleDelete = (productId: number, productName: string): void => {
    if (confirm(`Are you sure you want to delete product "${productName}"?`)) {
      deleteProduct(productId, {
        onSuccess: () => {
          toast.success(`Product "${productName}" deleted successfully.`);
          onDelete({ id: productId, name: productName, description: '', price: 0, minimumOrderQuantity: 0, imageUrl: '', categoryId: 0, categoryName: '' }); // Pass a dummy product object for onDelete
        },
        onError: (err) => {
          toast.error(`Failed to delete product "${productName}": ${err.message}`);
        },
      });
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-[#F5F5DC] text-[#333333] font-semibold">
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>MOQ</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products && products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={product.imageUrl} alt={product.name} className="h-12 w-12 object-cover rounded-md" />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.categoryName}</TableCell>
                <TableCell>₹{product.price.toFixed(2)}</TableCell>
                <TableCell>{product.minimumOrderQuantity}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(product)}
                    className="mr-2 hover:bg-gray-100 transition-all duration-200"
                    data-testid={`edit-product-${product.id}`}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(product.id, product.name)}
                    disabled={isDeleting}
                    className="hover:bg-red-100 transition-all duration-200"
                    data-testid={`delete-product-${product.id}`}
                  >
                    <Trash2Icon className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}