import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2, Upload, MessageSquare, Phone, ClipboardList, Image as ImageIcon, BarChart3 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Tab = "leads" | "contacts" | "gallery" | "analytics";

type Lead = { id: string; message: string; phone: string | null; created_at: string };
type Contact = { id: string; name: string; phone: string; message: string; created_at: string };
type GalleryItem = { id: string; image_url: string; category: string; uploaded_at: string };

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: "leads", label: "Leads", icon: ClipboardList },
  { id: "contacts", label: "Contacts", icon: Phone },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const fmt = (s: string) => new Date(s).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("leads");
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
              tab === t.id ? "border-[hsl(var(--gold))] gold-text" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      {tab === "leads" && <LeadsTab />}
      {tab === "contacts" && <ContactsTab />}
      {tab === "gallery" && <GalleryTab />}
      {tab === "analytics" && <AnalyticsTab />}
    </div>
  );
}

function LeadsTab() {
  const [rows, setRows] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("leads").select("*").order("created_at", { ascending: false });
      if (error) toast.error(error.message);
      else setRows((data ?? []) as Lead[]);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p className="text-muted-foreground">Loading leads…</p>;
  if (rows.length === 0) return <p className="text-muted-foreground">No leads yet.</p>;

  return (
    <div className="card-dark p-0 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left border-b border-border">
          <tr>
            <th className="px-4 py-3 font-semibold">Message</th>
            <th className="px-4 py-3 font-semibold">Phone</th>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3 font-semibold">Priority</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-b border-border last:border-0">
              <td className="px-4 py-3 max-w-md">{r.message}</td>
              <td className="px-4 py-3">{r.phone ? <a className="gold-text hover:underline" href={`tel:${r.phone}`}>{r.phone}</a> : <span className="text-muted-foreground">—</span>}</td>
              <td className="px-4 py-3 text-muted-foreground">{fmt(r.created_at)}</td>
              <td className="px-4 py-3"><span className="text-xs font-bold px-2 py-1 rounded-md" style={{ background: "hsl(var(--gold))", color: "hsl(var(--primary-foreground))" }}>HIGH PRIORITY</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContactsTab() {
  const [rows, setRows] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("contacts").select("*").order("created_at", { ascending: false });
      if (error) toast.error(error.message);
      else setRows((data ?? []) as Contact[]);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p className="text-muted-foreground">Loading contacts…</p>;
  if (rows.length === 0) return <p className="text-muted-foreground">No contact submissions yet.</p>;

  return (
    <div className="card-dark p-0 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left border-b border-border">
          <tr>
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Phone</th>
            <th className="px-4 py-3 font-semibold">Message</th>
            <th className="px-4 py-3 font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-b border-border last:border-0">
              <td className="px-4 py-3 font-semibold">{r.name}</td>
              <td className="px-4 py-3"><a className="gold-text hover:underline" href={`tel:${r.phone}`}>{r.phone}</a></td>
              <td className="px-4 py-3 max-w-md text-muted-foreground">{r.message}</td>
              <td className="px-4 py-3 text-muted-foreground">{fmt(r.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GalleryTab() {
  const [rows, setRows] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("Land Fencing");
  const [file, setFile] = useState<File | null>(null);

  const load = async () => {
    const { data, error } = await supabase
      .from("gallery").select("*").order("uploaded_at", { ascending: false });
    if (error) toast.error(error.message);
    else setRows((data ?? []) as GalleryItem[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const onUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Choose an image first.");
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("gallery").upload(path, file, {
        contentType: file.type,
      });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("gallery").getPublicUrl(path);
      const { error: insErr } = await supabase.from("gallery").insert({ image_url: pub.publicUrl, category });
      if (insErr) throw insErr;
      toast.success("Image uploaded!");
      setFile(null);
      (document.getElementById("gallery-file") as HTMLInputElement).value = "";
      load();
    } catch (err: any) {
      toast.error(err?.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async (id: string, image_url: string) => {
    if (!confirm("Delete this image?")) return;
    try {
      // Extract filename from URL
      const fileName = image_url.split("/").pop();
      if (fileName) await supabase.storage.from("gallery").remove([fileName]);
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) throw error;
      toast.success("Deleted");
      setRows(rs => rs.filter(r => r.id !== id));
    } catch (err: any) {
      toast.error(err?.message ?? "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={onUpload} className="card-dark grid sm:grid-cols-3 gap-3 items-end">
        <div className="sm:col-span-1">
          <label className="text-sm font-medium">Image</label>
          <input
            id="gallery-file"
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files?.[0] ?? null)}
            className="mt-1 w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:bg-[hsl(var(--gold))] file:text-black file:font-semibold"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="mt-1 w-full bg-secondary rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
          >
            <option>Land Fencing</option>
            <option>Residential</option>
            <option>Commercial</option>
          </select>
        </div>
        <button disabled={uploading} className="btn-gold disabled:opacity-50">
          <Upload className="w-4 h-4" /> {uploading ? "Uploading…" : "Upload"}
        </button>
      </form>

      {loading ? (
        <p className="text-muted-foreground">Loading gallery…</p>
      ) : rows.length === 0 ? (
        <p className="text-muted-foreground">No images yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {rows.map(r => (
            <div key={r.id} className="relative group rounded-lg overflow-hidden gold-border">
              <img src={r.image_url} alt={r.category} className="w-full aspect-square object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2">
                <span className="text-xs font-semibold gold-text">{r.category}</span>
                <button onClick={() => onDelete(r.id, r.image_url)} className="px-3 py-1.5 rounded-md bg-destructive text-white text-xs flex items-center gap-1">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AnalyticsTab() {
  const [stats, setStats] = useState({ messages: 0, leads: 0, contacts: 0, leadsThisWeek: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const [m, l, c, lw] = await Promise.all([
        supabase.from("messages").select("*", { count: "exact", head: true }),
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.from("contacts").select("*", { count: "exact", head: true }),
        supabase.from("leads").select("*", { count: "exact", head: true }).gte("created_at", weekAgo),
      ]);
      setStats({
        messages: m.count ?? 0,
        leads: l.count ?? 0,
        contacts: c.count ?? 0,
        leadsThisWeek: lw.count ?? 0,
      });
      setLoading(false);
    })();
  }, []);

  if (loading) return <p className="text-muted-foreground">Loading analytics…</p>;

  const cards = [
    { label: "Total Messages", value: stats.messages, icon: MessageSquare },
    { label: "Total Leads", value: stats.leads, icon: ClipboardList },
    { label: "Total Contacts", value: stats.contacts, icon: Phone },
    { label: "Leads This Week", value: stats.leadsThisWeek, icon: BarChart3 },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(c => (
        <div key={c.label} className="card-dark">
          <c.icon className="w-7 h-7 gold-text" />
          <div className="text-3xl font-extrabold mt-3">{c.value}</div>
          <div className="text-sm text-muted-foreground mt-1">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
