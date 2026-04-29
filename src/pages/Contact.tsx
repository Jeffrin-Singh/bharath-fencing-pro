import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { FadeIn } from "@/components/site/FadeIn";
import { BUSINESS } from "@/lib/business";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  message: z.string().trim().min(5, "Please enter a message").max(1000),
});

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
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
      const { error } = await supabase.from("contacts").insert(parsed.data);
      if (error) throw error;
      toast.success("We'll contact you within 2 hours! ✅");
      setForm({ name: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try calling us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="section-padding border-b border-border">
        <div className="container-max text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl font-extrabold">Get in <span className="gold-text">Touch</span></h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Tell us about your land — we'll get back within 2 hours.
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
                title="Bharath Fencing service area — Salem"
                src="https://www.google.com/maps?q=Salem,Tamil+Nadu&output=embed"
                width="100%"
                height="380"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
