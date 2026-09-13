import React, { useState } from 'react';
import { useProducts, useCategories } from '@/hooks/productHooks';
import { ProductGrid } from '@/components/product/ProductGrid';
import ProductFilterSidebar from '@/components/product/ProductFilterSidebar';
import { ProductCategoryDto } from '@/types/product';
import { Skeleton } from '@/components/ui/skeleton';

const ProductsPage = () => {
  const { data: products, isLoading: isLoadingProducts, isError: isErrorProducts } = useProducts();
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryDto | null>(null);

  const filteredProducts = selectedCategory
    ? products?.filter(product => product.categoryId === selectedCategory.id)
    : products;

  const handleSelectCategory = (category: ProductCategoryDto | null): void => {
    setSelectedCategory(category);
  };

  if (isLoadingProducts || isLoadingCategories) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-72 w-full" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isErrorProducts || isErrorCategories) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          <p>Error loading products or categories. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="relative h-[400px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(/images/products-hero.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Our Products</h1>
          <p className="mt-4 text-lg md:text-xl">Discover the quality and craftsmanship of Fabricae PINE.</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              {categories && (
                <ProductFilterSidebar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleSelectCategory}
                />
              )}
            </div>
            <div className="md:col-span-3">
              {filteredProducts && filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <div className="text-center py-10">
                  <h2 className="text-2xl font-semibold text-gray-700">No products found</h2>
                  <p className="mt-2 text-gray-500">Try adjusting your filters or browse all products.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;