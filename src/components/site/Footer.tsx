import { Link } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <img src="/logo.png" alt={`${BUSINESS.name} logo`} className="block h-14 w-auto object-contain mb-3" />
          <p className="text-sm text-muted-foreground mt-3">
            Trusted fencing solutions in Kalakad, Tamil Nadu since 2014. Owned by {BUSINESS.owner}.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-[hsl(var(--gold))]">Home</Link></li>
            <li><Link to="/services" className="text-muted-foreground hover:text-[hsl(var(--gold))]">Services</Link></li>
            <li><Link to="/gallery" className="text-muted-foreground hover:text-[hsl(var(--gold))]">Gallery</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-[hsl(var(--gold))]">About</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-[hsl(var(--gold))]">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <a href={BUSINESS.tel} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[hsl(var(--gold))]">
            <Phone className="w-4 h-4" /> {BUSINESS.phone}
          </a>
          <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[hsl(var(--gold))] mt-2">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <p className="text-sm text-muted-foreground mt-2">{BUSINESS.location}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Business Hours</h4>
          <p className="text-sm text-muted-foreground">{BUSINESS.hours}</p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © 2025 {BUSINESS.name}. All rights reserved.
      </div>
    </footer>
  );
}
