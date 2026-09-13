// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface ProductDto {
  id: number;
  name: string;
  description: string;
  price: number;
  minimumOrderQuantity: number;
  imageUrl: string;
  categoryId: number;
  categoryName: string;
}

export interface ProductCategoryDto {
  id: number;
  name: string;
  description: string;
}

