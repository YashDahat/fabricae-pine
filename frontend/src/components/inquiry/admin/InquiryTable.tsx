import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useInquiries } from '@/hooks/inquiryHooks';
import { InquiryResponseDto } from '@/types/inquiry';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';

interface InquiryTableProps {
  onView: (inquiry: InquiryResponseDto) => void;
}

export default function InquiryTable({ onView }: InquiryTableProps) {
  const { data: inquiries, isLoading, isError, error } = useInquiries();

  if (isLoading) {
    return <div>Loading inquiries...</div>;
  }

  if (isError) {
    return <div>Error loading inquiries: {error?.message}</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F5F5DC] text-[#333333] font-semibold">
            <TableHead>Client Name</TableHead>
            <TableHead>Client Email</TableHead>
            <TableHead>Product Interest</TableHead>
            <TableHead>Submission Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries && inquiries.length > 0 ? (
            inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell>{inquiry.clientName}</TableCell>
                <TableCell>{inquiry.clientEmail}</TableCell>
                <TableCell>{inquiry.productInterest}</TableCell>
                <TableCell>{format(new Date(inquiry.submissionDate), 'PPP')}</TableCell>
                <TableCell>{inquiry.status}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(inquiry)}
                    data-testid={`view-inquiry-${inquiry.id}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No inquiries found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}