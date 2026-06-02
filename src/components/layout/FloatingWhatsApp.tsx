import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FloatingWhatsApp = () => {
  const phoneNumber = "233539147743";
  const message = "Hello Hola Collections! 👋 I have some questions about your products.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-lg animate-bounce"
        onClick={() => window.open(whatsappUrl, "_blank")}
      >
        <MessageCircle className="h-8 w-8 text-white" />
      </Button>
    </div>
  );
};