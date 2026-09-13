// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { InquiryRequestDto, InquiryResponseDto, InquiryStatus } from '@/types/inquiry';

export const createInquiry = async (request: InquiryRequestDto): Promise<InquiryResponseDto> => {
  const response = await apiClient.post<InquiryResponseDto>('/api/v1/inquiries', request);
  return response.data;
};

export const getAllInquiries = async (): Promise<InquiryResponseDto[]> => {
  const response = await apiClient.get<InquiryResponseDto[]>('/api/v1/admin/inquiries');
  return response.data;
};

export const getInquiryById = async (id: number): Promise<InquiryResponseDto> => {
  const response = await apiClient.get<InquiryResponseDto>(`/api/v1/admin/inquiries/${id}`);
  return response.data;
};

export const updateInquiryStatus = async (id: number, request: InquiryStatus): Promise<InquiryResponseDto> => {
  const response = await apiClient.put<InquiryResponseDto>(`/api/v1/admin/inquiries/${id}/status`, request);
  return response.data;
};

