import { motion } from "framer-motion";
import { Mountain, Square, Fence, DoorOpen, Shield, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeIn } from "@/components/site/FadeIn";
import CTAButtons from "@/components/site/CTAButtons";
import gStone from "@/assets/gallery/stone-fence.jpg";
import gCement from "@/assets/gallery/cement-pole.jpg";
import gChain from "@/assets/gallery/chain-link.jpg";
import gGate from "@/assets/gallery/gate.jpg";
import gLand from "@/assets/gallery/land-fence.jpg";

const services = [
  {
    icon: Mountain,
    title: "Stone Fencing",
    desc: "Built to last for generations, stone fencing is the most durable option for permanent boundaries. We use locally sourced granite and skilled masonry to create rugged, weather-resistant walls.",
    bullets: ["Farmland boundaries", "Village plots", "Permanent borders", "Low maintenance"],
    img: gStone,
  },
  {
    icon: Square,
    title: "Cement Pole Fencing",
    desc: "Cost-effective and strong, cement pole fencing is the go-to choice for long agricultural perimeters. Combined with barbed or smooth wire for full protection.",
    bullets: ["Agricultural land", "Perimeter walls", "Long boundaries", "10+ year lifespan"],
    img: gCement,
  },
  {
    icon: Fence,
    title: "Chain-Link / Wire Fencing",
    desc: "Affordable galvanized chain-link mesh — perfect for residential plots, gardens, schools and poultry farms. Quick to install and easy to maintain.",
    bullets: ["Residential plots", "Poultry farms", "Gardens", "Schools & playgrounds"],
    img: gChain,
  },
  {
    icon: DoorOpen,
    title: "Gate Installation",
    desc: "Custom-fabricated metal gates designed for your entrance — from heavy-duty farm gates to elegant compound gates with sliding mechanisms.",
    bullets: ["Main entrance gates", "Farm gates", "Compound gates", "Sliding gates"],
    img: gGate,
  },
  {
    icon: Shield,
    title: "Land Protection Solutions",
    desc: "Survey-based fencing to mark and protect your boundaries officially. Prevent disputes and secure government land marking with proper documentation.",
    bullets: ["Survey-based fencing", "Dispute prevention", "Government land marking", "Boundary documentation"],
    img: gLand,
  },
];

export default function Services() {
  return (
    <div>
      <section className="section-padding border-b border-border">
        <div className="container-max text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl font-extrabold">Our <span className="gold-text">Services</span></h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              From stone walls to electric gates — we offer end-to-end fencing for every land type across Tamil Nadu.
            </p>
          </FadeIn>
        </div>
      </section>

      {services.map((s, i) => (
        <section key={s.title} className={`section-padding ${i % 2 === 1 ? "bg-card border-y border-border" : ""}`}>
          <div className="container-max grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn className={i % 2 === 1 ? "lg:order-2" : ""}>
              <img src={s.img} alt={s.title} loading="lazy" width={1024} height={768} className="rounded-2xl gold-border w-full" />
            </FadeIn>
            <FadeIn delay={0.1} className={i % 2 === 1 ? "lg:order-1" : ""}>
              <s.icon className="w-12 h-12 gold-text" />
              <h2 className="mt-3 text-3xl font-extrabold">{s.title}</h2>
              <p className="mt-4 text-muted-foreground">{s.desc}</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-2">
                {s.bullets.map(b => (
                  <li key={b} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 gold-text shrink-0" /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/contact" className="btn-gold">Get Quote</Link>
              </div>
            </FadeIn>
          </div>
        </section>
      ))}

      <section className="section-padding">
        <div className="container-max text-center">
          <FadeIn>
            <h2 className="text-3xl font-extrabold">Not sure which fencing you need?</h2>
            <p className="mt-3 text-muted-foreground">Call us — we'll visit your site for free and recommend the best solution.</p>
            <div className="mt-6 flex justify-center"><CTAButtons /></div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
