import { MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export default function WhatsAppButton() {
  return (
    <a
      href={BUSINESS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-30 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform pulse-ring"
      style={{ background: "#25D366" }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
