// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { LookbookEntryDto } from '@/types/lookbook';

export const getAllLookbookEntries = async (): Promise<LookbookEntryDto[]> => {
  const response = await apiClient.get<LookbookEntryDto[]>('/api/v1/lookbook');
  return response.data;
};

export const getLookbookEntryById = async (id: number): Promise<LookbookEntryDto> => {
  const response = await apiClient.get<LookbookEntryDto>(`/api/v1/lookbook/${id}`);
  return response.data;
};

export const createLookbookEntry = async (request: LookbookEntryDto): Promise<LookbookEntryDto> => {
  const response = await apiClient.post<LookbookEntryDto>('/api/v1/admin/lookbook', request);
  return response.data;
};

export const updateLookbookEntry = async (id: number, request: LookbookEntryDto): Promise<LookbookEntryDto> => {
  const response = await apiClient.put<LookbookEntryDto>(`/api/v1/admin/lookbook/${id}`, request);
  return response.data;
};

export const deleteLookbookEntry = async (id: number): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/lookbook/${id}`);
};

