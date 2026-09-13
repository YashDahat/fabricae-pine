import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateInquiry } from '@/hooks/inquiryHooks';
import { InquiryRequestDto } from '@/types/inquiry';

const formSchema = z.object({
  clientName: z.string().min(1, 'Client Name is required'),
  clientEmail: z.string().email('Invalid email address').min(1, 'Email is required'),
  clientPhone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number cannot exceed 15 digits'),
  companyName: z.string().min(1, 'Company Name is required'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
  additionalDetails: z.string().optional(),
});

interface InquiryFormProps {
  productId: number;
  productName: string;
}

export function InquiryForm({ productId, productName }: InquiryFormProps): React.JSX.Element {
  const { mutate: createInquiry, isPending, isError, error } = useCreateInquiry();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      companyName: '',
      quantity: 1,
      additionalDetails: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>): void => {
    const inquiryRequest: InquiryRequestDto = {
      clientName: values.clientName,
      clientEmail: values.clientEmail,
      clientPhone: values.clientPhone,
      companyName: values.companyName,
      productInterest: productName,
      quantity: values.quantity,
      additionalDetails: values.additionalDetails ?? '',
    };

    createInquiry(inquiryRequest, {
      onSuccess: () => {
        toast.success('Inquiry submitted successfully!');
        form.reset();
      },
      onError: (err) => {
        toast.error(`Failed to submit inquiry: ${err.message}`);
      },
    });
  };

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-semibold mb-6">Inquire about {productName}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} data-testid="inquiry-clientName" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john.doe@example.com" {...field} data-testid="inquiry-clientEmail" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+91 9876543210" {...field} data-testid="inquiry-clientPhone" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Corp" {...field} data-testid="inquiry-companyName" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" {...field} data-testid="inquiry-quantity" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Details (optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Any specific requirements or questions?" {...field} data-testid="inquiry-additionalDetails" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="primary-cta" data-testid="inquiry-submit">
            {isPending ? 'Submitting...' : 'Submit Inquiry'}
          </Button>
          {isError && <p className="text-red-500 mt-2">Error: {error?.message}</p>}
        </form>
      </Form>
    </div>
  );
}