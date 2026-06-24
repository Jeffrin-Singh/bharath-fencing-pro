import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { FadeIn } from "@/components/site/FadeIn";
import { BUSINESS } from "@/lib/business";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  location: z.string().trim().min(2, "Location is required").max(100),
  fenceType: z.enum(["Stone", "Cement", "Wire", "Gate"], { errorMap: () => ({ message: "Select fencing type" }) }),
  message: z.string().trim().min(5, "Please enter a message").max(1000),
});

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", location: "", fenceType: "" as "" | "Stone" | "Cement" | "Wire" | "Gate", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const { name, phone, message, location, fenceType } = parsed.data;
      const composed = `Location: ${location}\nFencing Type: ${fenceType}\n\n${message}`;
      const { error } = await supabase.from("contacts").insert({ name, phone, message: composed });
      if (error) throw error;
      toast.success("We'll contact you within 2 hours! ✅");
      setForm({ name: "", phone: "", location: "", fenceType: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try calling us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Contact Bharath Fencing — Kalakad, Tirunelveli</title>
        <meta name="description" content="Call 9944106978 or message Bharath Fencing for a free fencing quote in Kalakad and Tirunelveli district. Site visit within 24 hours." />
        <link rel="canonical" href="https://bharathfenching.online/contact" />
        <meta property="og:title" content="Contact Bharath Fencing — Kalakad, Tirunelveli" />
        <meta property="og:url" content="https://bharathfenching.online/contact" />
        <meta property="og:description" content="Free fencing quotes in Kalakad and Tirunelveli district. Call Ravi Kumar on 9944106978 or send a message." />
      </Helmet>
      <section className="section-padding border-b border-border">
        <div className="container-max text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl font-extrabold">Contact Bharath Fencing in <span className="gold-text">Kalakad, Tirunelveli</span></h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Tell us about your land — we'll get back within 2 hours. New here? <Link to="/services" className="gold-text hover:underline">Browse our fencing services</Link> first.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max grid lg:grid-cols-2 gap-12">
          <FadeIn>
            <div className="card-dark">
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <div className="mt-6 space-y-5">
                <a href={BUSINESS.tel} className="flex items-start gap-4 group">
                  <span className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "hsl(var(--gold) / 0.15)" }}>
                    <Phone className="w-5 h-5 gold-text" />
                  </span>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-semibold group-hover:gold-text">{BUSINESS.phone}</div>
                  </div>
                </a>
                <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <span className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#25D36625" }}>
                    <MessageCircle className="w-5 h-5" style={{ color: "#25D366" }} />
                  </span>
                  <div>
                    <div className="text-sm text-muted-foreground">WhatsApp</div>
                    <div className="font-semibold group-hover:gold-text">Chat with us instantly</div>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <span className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "hsl(var(--gold) / 0.15)" }}>
                    <Clock className="w-5 h-5 gold-text" />
                  </span>
                  <div>
                    <div className="text-sm text-muted-foreground">Business Hours</div>
                    <div className="font-semibold">{BUSINESS.hours}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "hsl(var(--gold) / 0.15)" }}>
                    <MapPin className="w-5 h-5 gold-text" />
                  </span>
                  <div>
                    <div className="text-sm text-muted-foreground">Service Areas</div>
                    <div className="font-semibold">{BUSINESS.areas.join(", ")}</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <form onSubmit={onSubmit} className="card-dark space-y-4">
              <h2 className="text-2xl font-bold">Request a Quote</h2>
              <div>
                <label className="text-sm font-medium">Full Name *</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full bg-secondary rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm font-medium">Phone Number *</label>
                <input
                  inputMode="numeric"
                  maxLength={10}
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                  className="mt-1 w-full bg-secondary rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
                  placeholder="10-digit mobile"
                />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="text-sm font-medium">Location *</label>
                <input
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  className="mt-1 w-full bg-secondary rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
                  placeholder="e.g. Kalakad, Tamil Nadu"
                />
                {errors.location && <p className="text-xs text-destructive mt-1">{errors.location}</p>}
              </div>
              <div>
                <label className="text-sm font-medium">Type of Fencing *</label>
                <select
                  value={form.fenceType}
                  onChange={e => setForm({ ...form, fenceType: e.target.value as typeof form.fenceType })}
                  className="mt-1 w-full bg-secondary rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
                >
                  <option value="">Select fencing type</option>
                  <option value="Stone">Stone Fencing</option>
                  <option value="Cement">Cement Pole Fencing</option>
                  <option value="Wire">Wire / Chain-Link Fencing</option>
                  <option value="Gate">Gate Installation</option>
                </select>
                {errors.fenceType && <p className="text-xs text-destructive mt-1">{errors.fenceType}</p>}
              </div>
              <div>
                <label className="text-sm font-medium">Message *</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="mt-1 w-full bg-secondary rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] resize-none"
                  placeholder="Tell us about your land — location, size, type of fencing needed"
                />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>
              <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-max">
          <FadeIn>
            <div className="rounded-2xl overflow-hidden gold-border">
              <iframe
                title="Bharath Fencing — exact location"
                src="https://www.google.com/maps?q=8.5111758,77.5867109&z=17&output=embed"
                width="100%"
                height="380"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="mt-3 text-center">
                <a
                  href="https://www.google.com/maps/place/Bharath+fenching+(company)/@8.5111758,77.584136,17z/data=!3m1!4b1!4m6!3m5!1s0x3b046900024be14f:0x933a8918f38c9c3c!8m2!3d8.5111758!4d77.5867109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm gold-text hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
