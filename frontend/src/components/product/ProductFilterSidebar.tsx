import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { ProductCategoryDto } from '@/types/product';

interface ProductFilterSidebarProps {
  categories: ProductCategoryDto[];
  selectedCategory: ProductCategoryDto | null;
  onSelectCategory: (category: ProductCategoryDto | null) => void;
}

export default function ProductFilterSidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: ProductFilterSidebarProps): React.JSX.Element {
  return (
    <div className="w-full md:w-64 p-4 bg-white rounded-xl shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <div className="flex flex-col space-y-2">
        <Button
          variant="ghost"
          className={`justify-start transition-all duration-200 ${
            selectedCategory === null ? 'text-[#D4AF37] font-bold' : 'hover:text-[#D4AF37]'
          }`}
          onClick={() => onSelectCategory(null)}
          data-testid="category-all"
        >
          All Products
        </Button>
        <Separator />
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className={`justify-start transition-all duration-200 ${
              selectedCategory?.id === category.id ? 'text-[#D4AF37] font-bold' : 'hover:text-[#D4AF37]'
            }`}
            onClick={() => onSelectCategory(category)}
            data-testid={`category-${category.id}`}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}