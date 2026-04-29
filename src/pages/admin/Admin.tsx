import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { LogOut, ShieldAlert } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ADMIN_EMAIL } from "@/lib/business";
import AdminDashboard from "./AdminDashboard";

export default function Admin() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });
    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      setSession(sess);
      setChecking(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Redirect non-admin logged-in users
  useEffect(() => {
    if (!checking && session && session.user.email !== ADMIN_EMAIL) {
      toast.error("Access denied.");
      navigate("/", { replace: true });
    }
  }, [session, checking, navigate]);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err: any) {
      toast.error(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (checking) {
    return <div className="section-padding text-center text-muted-foreground">Checking session…</div>;
  }

  if (!session) {
    return (
      <div className="section-padding">
        <div className="max-w-md mx-auto card-dark">
          <div className="flex items-center gap-2 gold-text">
            <ShieldAlert className="w-5 h-5" />
            <h1 className="text-xl font-bold">Admin Login</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Restricted area — authorized personnel only.</p>
          <form onSubmit={onLogin} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1 w-full bg-secondary rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="mt-1 w-full bg-secondary rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
              />
            </div>
            <button disabled={loading} className="btn-gold w-full disabled:opacity-50">
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (session.user.email !== ADMIN_EMAIL) return null;

  return (
    <div className="section-padding">
      <div className="container-max">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold">Admin <span className="gold-text">Dashboard</span></h1>
            <p className="text-sm text-muted-foreground mt-1">Signed in as {session.user.email}</p>
          </div>
          <button onClick={onLogout} className="btn-outline-gold !py-2 !px-4 text-sm">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
        <AdminDashboard />
      </div>
    </div>
  );
}
