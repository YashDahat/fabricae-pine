import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProductTable } from '@/components/product/admin/ProductTable';
import { ProductForm } from '@/components/product/admin/ProductForm';
import { DeleteConfirmationDialog } from '@/components/shared/DeleteConfirmationDialog';
import { useProducts, useDeleteProduct } from '@/hooks/productHooks';
import { ProductDto } from '@/types/product';
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';

export default function AdminProductsPage() {
  const { data: products, isLoading, isError, error } = useProducts();
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(null);
  const [productToDelete, setProductToDelete] = useState<ProductDto | null>(null);

  const handleEditProduct = (product: ProductDto): void => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (product: ProductDto): void => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = (): void => {
    if (productToDelete) {
      deleteProduct(productToDelete.id, {
        onSuccess: () => {
          toast.success('Product deleted successfully.');
          setIsDeleteDialogOpen(false);
          setProductToDelete(null);
        },
        onError: (err) => {
          toast.error(`Failed to delete product: ${err.message}`);
        },
      });
    }
  };

  const handleFormSuccess = (): void => {
    setIsFormOpen(false);
    setSelectedProduct(null);
    toast.success(selectedProduct ? 'Product updated successfully.' : 'Product created successfully.');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        <p>Error loading products: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#333333]">Product Management</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-[#D4AF37] hover:bg-[#C2A032] text-white font-semibold rounded-md px-6 py-2 transition-all duration-200"
              onClick={() => {
                setSelectedProduct(null);
                setIsFormOpen(true);
              }}
              data-testid="add-product-cta"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedProduct ? 'Edit Product' : 'Create New Product'}</DialogTitle>
            </DialogHeader>
            <ProductForm product={selectedProduct} onClose={() => setIsFormOpen(false)} onSuccess={handleFormSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        {products && products.length > 0 ? (
          <ProductTable products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No products found. Add a new product to get started.</p>
          </div>
        )}
      </div>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        itemType="product"
        itemName={productToDelete?.name ?? ''}
      />
    </div>
  );
}