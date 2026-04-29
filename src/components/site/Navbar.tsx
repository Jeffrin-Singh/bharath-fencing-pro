import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/business";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container-max flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-extrabold gold-text tracking-tight">
          {BUSINESS.name}
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? "gold-text" : "text-foreground hover:text-[hsl(var(--gold))]"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <a href={BUSINESS.tel} className="hidden md:inline-flex btn-gold !py-2 !px-4 text-sm">
          <Phone className="w-4 h-4" /> Call Now
        </a>
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="flex flex-col px-4 py-3 gap-1">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${isActive ? "gold-text bg-secondary" : "text-foreground hover:bg-secondary"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <button
              onClick={() => { setOpen(false); window.location.href = BUSINESS.tel; }}
              className="btn-gold !py-2 !px-4 mt-2 text-sm"
            >
              <Phone className="w-4 h-4" /> Call Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
