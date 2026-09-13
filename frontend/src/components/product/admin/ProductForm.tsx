import type { JSX } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  useCreateProduct,
  useUpdateProduct,
  useCategories,
} from '@/hooks/productHooks';
import { ProductDto, ProductCategoryDto } from '@/types/product';

interface ProductFormProps {
  product: ProductDto | null;
  onClose: () => void;
  onSuccess: () => void;
}

const productFormSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  minimumOrderQuantity: z.coerce.number().min(1, 'Minimum order quantity must be at least 1'),
  imageUrl: z.string().url('Invalid image URL').min(1, 'Image URL is required'),
  categoryId: z.coerce.number({ invalid_type_error: 'Category is required' }),
});

export function ProductForm({ product, onClose, onSuccess }: ProductFormProps): React.JSX.Element {
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
      minimumOrderQuantity: product?.minimumOrderQuantity ?? 1,
      imageUrl: product?.imageUrl ?? '',
      categoryId: product?.categoryId ?? undefined,
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        price: product.price,
        minimumOrderQuantity: product.minimumOrderQuantity,
        imageUrl: product.imageUrl,
        categoryId: product.categoryId,
      });
    } else {
      form.reset({
        name: '',
        description: '',
        price: 0,
        minimumOrderQuantity: 1,
        imageUrl: '',
        categoryId: undefined,
      });
    }
  }, [product, form]);

  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const onSubmit = (values: z.infer<typeof productFormSchema>): void => {
    const productData: ProductDto = {
      id: product?.id ?? 0, // ID is ignored for create, required for update
      name: values.name,
      description: values.description,
      price: values.price,
      minimumOrderQuantity: values.minimumOrderQuantity,
      imageUrl: values.imageUrl,
      categoryId: values.categoryId,
      categoryName: categories?.find(cat => cat.id === values.categoryId)?.name ?? '', // Will be updated by backend
    };

    if (product) {
      updateProduct(
        { id: product.id, request: productData },
        {
          onSuccess: () => {
            toast.success('Product updated successfully.');
            onSuccess();
            onClose();
          },
          onError: (error) => {
            toast.error(`Failed to update product: ${error.message}`);
          },
        }
      );
    } else {
      createProduct(productData, {
        onSuccess: () => {
          toast.success('Product created successfully.');
          onSuccess();
          onClose();
        },
        onError: (error) => {
          toast.error(`Failed to create product: ${error.message}`);
        },
      });
    }
  };

  const isSubmitting: boolean = isCreating || isUpdating;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} data-testid="product-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter product description" {...field} data-testid="product-description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (INR)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="Enter price" {...field} data-testid="product-price" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minimumOrderQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Order Quantity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter minimum order quantity" {...field} data-testid="product-moq" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter image URL" {...field} data-testid="product-image-url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value !== undefined ? String(field.value) : ''}
                disabled={isLoadingCategories || isSubmitting}
              >
                <FormControl>
                  <SelectTrigger data-testid="product-category-select">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoadingCategories ? (
                    <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                  ) : (
                    categories?.map((category: ProductCategoryDto) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} data-testid="product-submit">
            {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </Form>
  );
}