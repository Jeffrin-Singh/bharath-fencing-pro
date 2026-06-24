import { Link } from "react-router-dom";
import { ShieldCheck, Award, Clock, IndianRupee, MapPin, User } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { FadeIn } from "@/components/site/FadeIn";
import { BUSINESS } from "@/lib/business";

const values = [
  { icon: ShieldCheck, title: "Integrity", desc: "Honest pricing, transparent work, no hidden charges." },
  { icon: Award, title: "Quality", desc: "Premium materials sourced locally for maximum durability." },
  { icon: Clock, title: "Punctuality", desc: "We start and finish on the dates we promise." },
  { icon: IndianRupee, title: "Affordability", desc: "Fair rates that respect your budget." },
];

export default function About() {
  return (
    <div>
      <Helmet>
        <title>About Bharath Fencing — Kalakad Fencing Contractor</title>
        <meta name="description" content="Bharath Fencing, founded by Ravi Kumar M in Kalakad, has served 500+ landowners across Tirunelveli district with stone, wire and gate fencing." />
        <link rel="canonical" href="https://bharathfenching.online/about" />
        <meta property="og:title" content="About Bharath Fencing — Kalakad Fencing Contractor" />
        <meta property="og:url" content="https://bharathfenching.online/about" />
        <meta property="og:description" content="Founded by Ravi Kumar M in Kalakad, Bharath Fencing has completed 500+ stone, wire and gate fencing projects across Tirunelveli." />
      </Helmet>
      <section className="section-padding border-b border-border">
        <div className="container-max text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl font-extrabold">About <span className="gold-text">Bharath Fencing</span> — Kalakad, Tirunelveli</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Based in Kalakad, Tirunelveli district. Helping local farmers and landowners protect what matters — see <Link to="/services" className="gold-text hover:underline">all our fencing services</Link>.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h2 className="text-3xl font-extrabold">Our <span className="gold-text">Story</span></h2>
            <p className="mt-4 text-muted-foreground">
              {BUSINESS.name} was founded by {BUSINESS.owner} in 2014 in Kalakad with a simple mission: help local
              farmers protect their land with reliable, affordable fencing. After years of seeing landowners
              suffer from boundary disputes, livestock damage and encroachment, Ravi started this business to
              offer end-to-end fencing services — done right, the first time.
            </p>
            <p className="mt-3 text-muted-foreground">
              Today we've completed 500+ projects in and around Kalakad — from small house plots to 50+ acre
              farms. Our team is local, our materials are local, and our commitment to every customer is the
              same: do quality work that lasts.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="card-dark">
              <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center" style={{ background: "var(--gradient-gold)" }}>
                <User className="w-12 h-12 text-black" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-center">{BUSINESS.owner}</h3>
              <p className="text-center gold-text text-sm font-semibold">Founder & Fencing Expert</p>
              <p className="mt-3 text-sm text-muted-foreground text-center">
                10+ years experience in farm and residential fencing in Kalakad, Tamil Nadu.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-card border-y border-border">
        <div className="container-max">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold">Our <span className="gold-text">Location</span></h2>
            <p className="mt-3 text-muted-foreground">Based in Kalakad, Tamil Nadu — our only branch.</p>
          </FadeIn>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {BUSINESS.areas.map(a => (
              <span key={a} className="inline-flex items-center gap-2 px-4 py-2 rounded-full gold-border text-sm font-medium">
                <MapPin className="w-4 h-4 gold-text" /> {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold">Our <span className="gold-text">Values</span></h2>
          </FadeIn>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <FadeIn key={v.title} delay={0.05}>
                <div className="card-dark text-center h-full">
                  <v.icon className="w-10 h-10 gold-text mx-auto" />
                  <h3 className="mt-4 font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-max text-center">
          <FadeIn>
            <Link to="/contact" className="btn-gold">Get in Touch</Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
