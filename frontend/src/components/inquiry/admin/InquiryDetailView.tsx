import type { JSX } from 'react';
import { InquiryResponseDto, InquiryStatus, InquiryStatusValues } from '@/types/inquiry';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useUpdateInquiryStatus } from '@/hooks/inquiryHooks';
import { toast } from 'sonner';
import { useState } from 'react';

interface InquiryDetailViewProps {
  inquiry: InquiryResponseDto;
  onClose: () => void;
  onStatusUpdate: () => void;
}

export function InquiryDetailView({ inquiry, onClose, onStatusUpdate }: InquiryDetailViewProps): React.JSX.Element {
  const { mutate: updateStatus, isPending } = useUpdateInquiryStatus();
  const [currentStatus, setCurrentStatus] = useState<InquiryStatus>(inquiry.status);

  const handleStatusChange = (newStatus: InquiryStatus): void => {
    setCurrentStatus(newStatus);
    updateStatus(
      { id: inquiry.id, request: newStatus },
      {
        onSuccess: () => {
          toast.success('Inquiry status updated successfully.');
          onStatusUpdate();
        },
        onError: (error) => {
          toast.error(`Failed to update inquiry status: ${error.message}`);
        },
      }
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle data-testid="inquiry-detail-title">Inquiry Details</DialogTitle>
          <DialogDescription>
            View and manage the details of this client inquiry.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="clientName" className="text-right">
              Client Name
            </Label>
            <span id="clientName" className="col-span-3" data-testid="inquiry-client-name">{inquiry.clientName}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="clientEmail" className="text-right">
              Email
            </Label>
            <span id="clientEmail" className="col-span-3" data-testid="inquiry-client-email">{inquiry.clientEmail}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="clientPhone" className="text-right">
              Phone
            </Label>
            <span id="clientPhone" className="col-span-3" data-testid="inquiry-client-phone">{inquiry.clientPhone}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="companyName" className="text-right">
              Company Name
            </Label>
            <span id="companyName" className="col-span-3" data-testid="inquiry-company-name">{inquiry.companyName}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productInterest" className="text-right">
              Product Interest
            </Label>
            <span id="productInterest" className="col-span-3" data-testid="inquiry-product-interest">{inquiry.productInterest}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <span id="quantity" className="col-span-3" data-testid="inquiry-quantity">{inquiry.quantity}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="additionalDetails" className="text-right">
              Additional Details
            </Label>
            <span id="additionalDetails" className="col-span-3" data-testid="inquiry-additional-details">{inquiry.additionalDetails}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="submissionDate" className="text-right">
              Submission Date
            </Label>
            <span id="submissionDate" className="col-span-3" data-testid="inquiry-submission-date">{new Date(inquiry.submissionDate).toLocaleDateString()}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select onValueChange={handleStatusChange} value={currentStatus} disabled={isPending}>
              <SelectTrigger className="col-span-3" data-testid="inquiry-status-select">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {InquiryStatusValues.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose} data-testid="inquiry-detail-close-button">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}