import { Phone, MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export default function CTAButtons({ size = "md" }: { size?: "sm" | "md" }) {
  const cls = size === "sm" ? "!py-2 !px-4 text-sm" : "";
  return (
    <div className="flex flex-wrap gap-3">
      <a href={BUSINESS.tel} className={`btn-gold ${cls}`}>
        <Phone className="w-4 h-4" /> Call Now
      </a>
      <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className={`btn-whatsapp ${cls}`}>
        <MessageCircle className="w-4 h-4" /> WhatsApp
      </a>
    </div>
  );
}
