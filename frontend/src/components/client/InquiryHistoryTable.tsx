import type { JSX } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useInquiries } from '@/hooks/inquiryHooks';
import { InquiryResponseDto, InquiryStatus } from '@/types/inquiry';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export function InquiryHistoryTable(): React.JSX.Element {
  const { user } = useAuth();
  const { data: inquiries, isLoading, isError, error } = useInquiries();

  const clientInquiries = inquiries?.filter(
    (inquiry) => inquiry.clientEmail === user?.username || inquiry.clientPhone === user?.username
  );

  const formatSubmissionDate = (isoDate: string): string => {
    return new Date(isoDate).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatStatus = (status: InquiryStatus): string => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Error loading inquiries: {error?.message}</div>;
  }

  if (!clientInquiries || clientInquiries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        You have not submitted any inquiries yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-100">
      <Table data-testid="inquiry-history-table">
        <TableHeader className="bg-[#0A4837] text-white">
          <TableRow>
            <TableHead className="text-white">Submission Date</TableHead>
            <TableHead className="text-white">Product Interest</TableHead>
            <TableHead className="text-white">Quantity</TableHead>
            <TableHead className="text-white">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientInquiries.map((inquiry: InquiryResponseDto) => (
            <TableRow key={inquiry.id} className="bg-white even:bg-gray-50">
              <TableCell>{formatSubmissionDate(inquiry.submissionDate)}</TableCell>
              <TableCell>{inquiry.productInterest}</TableCell>
              <TableCell>{inquiry.quantity}</TableCell>
              <TableCell>{formatStatus(inquiry.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}