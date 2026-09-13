// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { ProductCategoryDto, ProductDto } from '@/types/product';

export const getAllProducts = async (): Promise<ProductDto[]> => {
  const response = await apiClient.get<ProductDto[]>('/api/v1/products');
  return response.data;
};

export const getProductById = async (id: number): Promise<ProductDto> => {
  const response = await apiClient.get<ProductDto>(`/api/v1/products/${id}`);
  return response.data;
};

export const getAllCategories = async (): Promise<ProductCategoryDto[]> => {
  const response = await apiClient.get<ProductCategoryDto[]>('/api/v1/categories');
  return response.data;
};

export const getCategoryById = async (id: number): Promise<ProductCategoryDto> => {
  const response = await apiClient.get<ProductCategoryDto>(`/api/v1/categories/${id}`);
  return response.data;
};

export const createProduct = async (request: ProductDto): Promise<ProductDto> => {
  const response = await apiClient.post<ProductDto>('/api/v1/admin/products', request);
  return response.data;
};

export const updateProduct = async (id: number, request: ProductDto): Promise<ProductDto> => {
  const response = await apiClient.put<ProductDto>(`/api/v1/admin/products/${id}`, request);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/products/${id}`);
};

export const createCategory = async (request: ProductCategoryDto): Promise<ProductCategoryDto> => {
  const response = await apiClient.post<ProductCategoryDto>('/api/v1/admin/categories', request);
  return response.data;
};

export const updateCategory = async (id: number, request: ProductCategoryDto): Promise<ProductCategoryDto> => {
  const response = await apiClient.put<ProductCategoryDto>(`/api/v1/admin/categories/${id}`, request);
  return response.data;
};

