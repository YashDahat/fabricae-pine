import { useState } from 'react';
import { useInquiries, useUpdateInquiryStatus } from '@/hooks/inquiryHooks';
import { InquiryResponseDto, InquiryStatus } from '@/types/inquiry';
import InquiryTable from '@/components/inquiry/admin/InquiryTable';
import { InquiryDetailView } from '@/components/inquiry/admin/InquiryDetailView';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminInquiriesPage() {
  const { data: inquiries, isLoading, isError, error } = useInquiries();
  const { mutate: updateStatus } = useUpdateInquiryStatus();

  const [selectedInquiry, setSelectedInquiry] = useState<InquiryResponseDto | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState<boolean>(false);

  const handleViewInquiry = (inquiry: InquiryResponseDto): void => {
    setSelectedInquiry(inquiry);
    setIsDetailViewOpen(true);
  };

  const handleCloseDetailView = (): void => {
    setIsDetailViewOpen(false);
    setSelectedInquiry(null);
  };

  const handleStatusUpdate = (): void => {
    // Re-fetch inquiries after status update if necessary, or rely on query invalidation
    // The useUpdateInquiryStatus hook should handle invalidation automatically.
    // For now, just close the detail view.
    handleCloseDetailView();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Manage Inquiries</h1>
        <Skeleton className="h-[500px] w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-8 px-4 text-red-600">
        <h1 className="text-3xl font-bold mb-6">Manage Inquiries</h1>
        <p>Error loading inquiries: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Manage Inquiries</h1>
      <InquiryTable onView={handleViewInquiry} />

      <Dialog open={isDetailViewOpen} onOpenChange={setIsDetailViewOpen}>
        <DialogContent className="sm:max-w-[800px]">
          {selectedInquiry && (
            <InquiryDetailView
              inquiry={selectedInquiry}
              onClose={handleCloseDetailView}
              onStatusUpdate={handleStatusUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}