// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface InquiryRequestDto {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  companyName: string;
  productInterest: string;
  quantity: number;
  additionalDetails: string;
}

export interface InquiryResponseDto {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  companyName: string;
  productInterest: string;
  quantity: number;
  additionalDetails: string;
  status: InquiryStatus;
  submissionDate: string;
}

export const InquiryStatus = {
  PENDING: 'PENDING',
  REVIEWED: 'REVIEWED',
  CONTACTED: 'CONTACTED',
  CLOSED: 'CLOSED',
} as const;

export type InquiryStatus = typeof InquiryStatus[keyof typeof InquiryStatus];

export const InquiryStatusValues = ['PENDING', 'REVIEWED', 'CONTACTED', 'CLOSED'] as const;

