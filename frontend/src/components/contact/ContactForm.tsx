import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

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
import { Button } from '@/components/ui/button';
import { useCreateInquiry } from '@/hooks/inquiryHooks';
import { InquiryRequestDto } from '@/types/inquiry';

const formSchema = z.object({
  clientName: z.string().min(1, 'Name is required'),
  clientEmail: z.string().email('Invalid email address'),
  clientPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  companyName: z.string().optional(),
  productInterest: z.string().optional(),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1').optional(),
  additionalDetails: z.string().optional(),
});

export function ContactForm(): React.JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      companyName: '',
      productInterest: '',
      quantity: undefined,
      additionalDetails: '',
    },
  });

  const { mutate: createInquiry, isPending } = useCreateInquiry();

  const onSubmit = (values: z.infer<typeof formSchema>): void => {
    const inquiryRequest: InquiryRequestDto = {
      clientName: values.clientName,
      clientEmail: values.clientEmail,
      clientPhone: values.clientPhone,
      companyName: values.companyName ?? '',
      productInterest: values.productInterest ?? '',
      quantity: values.quantity ?? 0,
      additionalDetails: values.additionalDetails ?? '',
    };

    createInquiry(inquiryRequest, {
      onSuccess: () => {
        toast.success('Inquiry submitted successfully!');
        form.reset();
      },
      onError: (error) => {
        toast.error(`Failed to submit inquiry: ${error.message}`);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} data-testid="contact-form-name" />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@example.com" {...field} data-testid="contact-form-email" />
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
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+91 98765 43210" {...field} data-testid="contact-form-phone" />
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
              <FormLabel>Company Name (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Acme Corp" {...field} data-testid="contact-form-company" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productInterest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Interest (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Custom Uniforms" {...field} data-testid="contact-form-product-interest" />
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
              <FormLabel>Quantity (Optional)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="100" {...field} data-testid="contact-form-quantity" />
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
              <FormLabel>Additional Details (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Any specific requirements or questions..." rows={5} {...field} data-testid="contact-form-details" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-[#D4AF37] hover:bg-[#C2A032] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          disabled={isPending}
          data-testid="contact-form-submit"
        >
          {isPending ? 'Submitting...' : 'Submit Inquiry'}
        </Button>
      </form>
    </Form>
  );
}