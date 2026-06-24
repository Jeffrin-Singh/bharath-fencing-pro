import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { X } from "lucide-react";
import { FadeIn } from "@/components/site/FadeIn";
import { supabase } from "@/lib/supabase";
import gStone from "@/assets/gallery/stone-fence.jpg";
import gCement from "@/assets/gallery/cement-pole.jpg";
import gChain from "@/assets/gallery/chain-link.jpg";
import gGate from "@/assets/gallery/gate.jpg";
import gLand from "@/assets/gallery/land-fence.jpg";
import gInstall from "@/assets/gallery/installation.jpg";

type Item = { id: string; image_url: string; category: string };

type FB = Item & { alt: string };
const FALLBACK: FB[] = [
  { id: "f1", image_url: gStone, category: "Land Fencing", alt: "Stone fencing installation on farmland in Kalakad by Bharath Fencing" },
  { id: "f2", image_url: gCement, category: "Land Fencing", alt: "Cement pole fencing along agricultural boundary in Tirunelveli district" },
  { id: "f3", image_url: gChain, category: "Residential", alt: "Chain-link wire fencing around a residential plot in Kalakad" },
  { id: "f4", image_url: gGate, category: "Commercial", alt: "Custom metal gate installation for a commercial property in Tirunelveli" },
  { id: "f5", image_url: gLand, category: "Land Fencing", alt: "Survey-based land fencing protecting farmland near Kalakad" },
  { id: "f6", image_url: gInstall, category: "Land Fencing", alt: "Bharath Fencing team installing fence posts on village land in Tamil Nadu" },
  { id: "f7", image_url: gStone, category: "Residential", alt: "Stone boundary wall around a residential home in Kalakad" },
  { id: "f8", image_url: gCement, category: "Commercial", alt: "Tall cement pole perimeter fencing for a commercial site in Tirunelveli" },
  { id: "f9", image_url: gChain, category: "Residential", alt: "Galvanized chain-link fence for a house plot in Nanguneri" },
  { id: "f10", image_url: gGate, category: "Residential", alt: "Sliding compound gate installation for a Kalakad residence" },
  { id: "f11", image_url: gLand, category: "Land Fencing", alt: "Long agricultural wire fence run completed in Tirunelveli district" },
  { id: "f12", image_url: gInstall, category: "Commercial", alt: "Commercial fencing project handover in Ambasamudram by Bharath Fencing" },
];

const FILTERS = ["All", "Land Fencing", "Residential", "Commercial"] as const;
type Filter = typeof FILTERS[number];

export default function Gallery() {
  const [items, setItems] = useState<Item[]>(FALLBACK);
  const [filter, setFilter] = useState<Filter>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("gallery")
          .select("id, image_url, category")
          .order("uploaded_at", { ascending: false });
        if (error) throw error;
        if (data && data.length > 0) setItems(data as Item[]);
      } catch (e) {
        console.warn("Falling back to placeholder gallery:", e);
      }
    })();
  }, []);

  const filtered = filter === "All" ? items : items.filter(i => i.category === filter);

  return (
    <div>
      <Helmet>
        <title>Fencing Project Gallery in Kalakad, Tirunelveli</title>
        <meta name="description" content="Photos of stone, wire, cement & gate fencing projects completed by Bharath Fencing in Kalakad and across Tirunelveli district." />
        <link rel="canonical" href="https://bharathfenching.online/gallery" />
        <meta property="og:title" content="Fencing Project Gallery in Kalakad, Tirunelveli" />
        <meta property="og:url" content="https://bharathfenching.online/gallery" />
      </Helmet>
      <section className="section-padding border-b border-border">
        <div className="container-max text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl font-extrabold">Our <span className="gold-text">Work</span></h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Real fencing projects completed in and around Kalakad, Tamil Nadu.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border-2 ${
                  filter === f
                    ? "border-[hsl(var(--gold))] bg-[hsl(var(--gold))] text-black"
                    : "border-border text-foreground hover:border-[hsl(var(--gold))]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div key={filter} className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {filtered.map(item => {
              const alt = (item as FB).alt ?? `${item.category} fencing project in Kalakad, Tirunelveli by Bharath Fencing`;
              return (
                <div key={item.id} className="mb-4 break-inside-avoid gallery-item">
                  <button
                    onClick={() => setLightbox(item.image_url)}
                    className="group relative block w-full overflow-hidden rounded-xl gold-border gallery-card"
                  >
                    <img src={item.image_url} alt={alt} loading="lazy" className="gallery-image w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-xs font-semibold gold-text uppercase tracking-wider">{item.category}</span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No images in this category yet.</p>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-4 right-4 text-white" onClick={() => setLightbox(null)} aria-label="Close">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              src={lightbox} alt="Full size"
              className="max-h-[90vh] max-w-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
