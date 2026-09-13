import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/siteConfig';
import { MessageCircle } from 'lucide-react';

export const WhatsAppCta = (): React.JSX.Element => {
  const whatsappNumber = siteConfig.footer.phone; // Assuming phone number is the WhatsApp number

  if (!whatsappNumber) {
    return <></>;
  }

  const handleWhatsAppClick = (): void => {
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;
    window.open(url, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-4 right-4 z-50 rounded-full p-4 shadow-lg bg-[#25D366] hover:bg-[#1DA851] transition-all duration-200"
      aria-label="Chat on WhatsApp"
      data-testid="whatsapp-cta"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  );
};