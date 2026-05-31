import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ClipboardList, Award, Users, Wrench, MapPin, Check, Mountain, Square, Fence, DoorOpen, Shield, Star } from "lucide-react";

import { BUSINESS } from "@/lib/business";
import { FadeIn, StaggerGrid, StaggerItem } from "@/components/site/FadeIn";
import CTAButtons from "@/components/site/CTAButtons";
import hero from "@/assets/hero.jpg";
import gStone from "@/assets/gallery/stone-fence.jpg";
import gCement from "@/assets/gallery/cement-pole.jpg";
import gChain from "@/assets/gallery/chain-link.jpg";
import gGate from "@/assets/gallery/gate.jpg";
import gLand from "@/assets/gallery/land-fence.jpg";
import gInstall from "@/assets/gallery/installation.jpg";

const services = [
  { icon: Mountain, title: "Stone Fencing", desc: "Permanent stone borders for farmland and village plots." },
  { icon: Square, title: "Cement Pole Fencing", desc: "Strong concrete posts for long agricultural perimeters." },
  { icon: Fence, title: "Chain-Link / Wire Fencing", desc: "Affordable wire mesh for plots, schools and farms." },
  { icon: DoorOpen, title: "Gate Installation", desc: "Custom main gates, farm gates and sliding gates." },
  { icon: Shield, title: "Land Protection", desc: "Survey-based fencing to prevent disputes." },
];

const stats = [
  { icon: Award, value: "10+", label: "Years Experience" },
  { icon: Users, value: "500+", label: "Projects Completed" },
  { icon: Wrench, value: "5", label: "Service Types" },
  { icon: MapPin, value: "TN Wide", label: "Coverage" },
];

const why = [
  "Quality Materials",
  "Experienced Team",
  "On-Time Delivery",
  "Affordable Pricing",
];

const testimonials = [
  { name: "Murugan S.", place: "Salem", text: "Ravi sir and his team fenced my 3-acre farm in just 4 days. Very neat work and fair pricing." },
  { name: "Lakshmi P.", place: "Erode", text: "We had a land dispute issue. Bharath Fencing did proper survey and stone fencing. Problem solved!" },
  { name: "Karthik R.", place: "Namakkal", text: "Best gate installation I've seen in our area. Strong material and on-time work. Highly recommend." },
];

const galleryImgs = [gStone, gCement, gChain, gGate, gLand, gInstall];

export default function Home() {
  const scrollToContact = () => {
    document.getElementById("home-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="Sturdy fence protecting farmland in Tamil Nadu" className="w-full h-full object-cover ken-burns" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/40" />
        </div>
        <div className="relative container-max px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase gold-text border gold-border px-3 py-1 rounded-full">
              By {BUSINESS.owner} — Fencing Expert
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Protect Your Land with <span className="gold-shimmer">Reliable Fencing</span> Solutions
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Stone, cement, wire & gate installation across Tamil Nadu — trusted by 500+ landowners.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={BUSINESS.tel} className="btn-gold pulse-ring">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <button onClick={scrollToContact} className="btn-outline-gold">
                <ClipboardList className="w-4 h-4" /> Get Free Quote
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-card">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08} className="flex items-center gap-3">
              <s.icon className="w-8 h-8 gold-text shrink-0 float-slow" style={{ animationDelay: `${i * 0.3}s` }} />
              <div>
                <div className="text-2xl font-extrabold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-padding">
        <div className="container-max">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold">Our <span className="gold-text">Services</span></h2>
            <p className="mt-3 text-muted-foreground">Comprehensive fencing solutions for every type of land and need.</p>
          </FadeIn>
          <StaggerGrid className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <StaggerItem key={s.title}>
                <div className="card-dark h-full flex flex-col group">
                  <s.icon className="w-10 h-10 gold-text icon-bounce-hover" />
                  <h3 className="text-xl font-bold mt-4">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 flex-1">{s.desc}</p>
                  <Link to="/services" className="mt-4 text-sm font-semibold gold-text hover:underline">
                    Learn More →
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-padding bg-card border-y border-border">
        <div className="container-max grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold">Why Choose <span className="gold-text">Bharath Fencing</span>?</h2>
            <p className="mt-4 text-muted-foreground">
              We've helped 500+ landowners across Tamil Nadu protect their property with durable fencing built to last.
            </p>
            <ul className="mt-6 space-y-3">
              {why.map(w => (
                <li key={w} className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--gold))" }}>
                    <Check className="w-4 h-4 text-black" />
                  </span>
                  <span className="font-medium">{w}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8"><CTAButtons /></div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <img src={gLand} alt="Long perimeter fence across Tamil Nadu farmland" loading="lazy" width={1024} height={768} className="rounded-2xl gold-border w-full" />
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding">
        <div className="container-max">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold">What Our <span className="gold-text">Customers Say</span></h2>
          </FadeIn>
          <StaggerGrid className="mt-12 grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <StaggerItem key={t.name}>
                <div className="card-dark h-full">
                  <div className="flex gap-1 gold-text">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground italic">"{t.text}"</p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="font-bold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.place}, Tamil Nadu</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="section-padding bg-card border-y border-border">
        <div className="container-max">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold">Recent <span className="gold-text">Projects</span></h2>
            <p className="mt-3 text-muted-foreground">A few of our completed fencing jobs across Tamil Nadu.</p>
          </FadeIn>
          <StaggerGrid className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImgs.map((img, i) => (
              <StaggerItem key={i}>
                <div className="overflow-hidden rounded-lg gold-border">
                  <img src={img} alt={`Fencing project ${i + 1}`} loading="lazy" width={1024} height={768} className="aspect-[4/3] object-cover w-full transition-transform duration-700 hover:scale-110" />
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
          <div className="mt-8 text-center">
            <Link to="/gallery" className="btn-outline-gold">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="home-cta" className="section-padding">
        <div className="container-max">
          <FadeIn>
            <div className="rounded-2xl p-10 md:p-16 text-center" style={{ background: "hsl(var(--card))", border: "2px solid hsl(var(--gold))" }}>
              <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to Fence Your <span className="gold-text">Land</span>?</h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Get a free quote today. Call or WhatsApp us and we'll visit your site within 24 hours.
              </p>
              <div className="mt-8 flex justify-center"><CTAButtons /></div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
