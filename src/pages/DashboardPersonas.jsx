import { useEffect, useMemo, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/lib/axios"; // ✅ use axios instance

function safeText(v, fallback = "—") {
  if (typeof v === "string" && v.trim()) return v.trim();
  return fallback;
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function PersonaCard({ persona, onOpen }) {
  const title = safeText(persona?.name, "Generated Persona");
  const summary = safeText(persona?.summary, "No summary yet.");
  const created = formatDate(persona?.createdAt);

  const hasMessaging =
    persona?.messaging_pillars && Object.keys(persona.messaging_pillars).length > 0;
  const hasEmotional =
    persona?.emotional_profile && Object.keys(persona.emotional_profile).length > 0;

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
      className="group cursor-pointer p-5 border bg-background hover:bg-muted/30 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">
            {created ? `Created ${created}` : "Persona"}
          </p>

          <h3 className="mt-1 truncate text-base font-semibold group-hover:text-foreground">
            {title}
          </h3>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon icon="ph:user-circle-fill" className="h-6 w-6" />
        </div>
      </div>

      <p className="mt-3 line-clamp-3 text-sm text-muted-foreground leading-relaxed">
        {summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {hasEmotional && (
          <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Emotional profile
          </span>
        )}
        {hasMessaging && (
          <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Messaging pillars
          </span>
        )}
        <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
          <Icon icon="ph:files-bold" className="h-4 w-4" />
          ID: {String(persona?.id)}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Click to view details</span>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
          Open
          <Icon icon="ph:arrow-right-bold" className="h-4 w-4" />
        </span>
      </div>
    </Card>
  );
}

export default function DashboardPersonas() {
  const navigate = useNavigate();

  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [q, setQ] = useState("");

  const loadPersonas = useCallback(async () => {
    setLoading(true);
    setErrMsg("");

    try {
      // ✅ Auth handled automatically by axios (Bearer token + refresh interceptor)
      const res = await api.get("/personas"); // no trailing slash
      const data = res.data;

      setPersonas(Array.isArray(data) ? data : []);
    } catch (e) {
      const status = e?.response?.status;
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "Failed to load personas";

      // Helpful message for auth failures
      if (status === 401) {
        setErrMsg("You’re not logged in (or your session expired). Please login again.");
      } else {
        setErrMsg(msg);
      }
      setPersonas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      await loadPersonas();
    })();
    return () => {
      mounted = false;
    };
  }, [loadPersonas]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return personas;

    return personas.filter((p) => {
      const name = (p?.name || "").toLowerCase();
      const summary = (p?.summary || "").toLowerCase();
      return (
        name.includes(query) ||
        summary.includes(query) ||
        String(p?.id).includes(query)
      );
    });
  }, [personas, q]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Insights</h1>
          <p className="text-sm text-muted-foreground">
            Browse and open generated personas. Click any card to view details.
          </p>
        </div>

        <div className="flex gap-2">
          <Link to="/person-generator">
            <Button className="px-6 py-6">
              <Icon icon="ph:plus-bold" className="mr-2 h-5 w-5" />
              Create New Insights
            </Button>
          </Link>

          <Button
            variant="secondary"
            className="px-6 py-6"
            onClick={loadPersonas}
            disabled={loading}
          >
            <Icon icon="ph:arrows-clockwise-bold" className="mr-2 h-5 w-5" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Search + stats */}
      <Card className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 rounded-2xl border bg-background px-3 py-2 w-full md:max-w-lg">
            <Icon icon="ph:magnifying-glass-bold" className="h-5 w-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, summary, or ID..."
              className="h-9 w-full bg-transparent text-sm outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Total: {personas.length}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1">
              Showing: {filtered.length}
            </span>
          </div>
        </div>
      </Card>

      {/* Loading / Error / Empty */}
      {loading && (
        <Card className="p-10">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Icon icon="ph:spinner-gap-bold" className="h-6 w-6 animate-spin" />
            <p className="text-sm">Loading Insights…</p>
          </div>
        </Card>
      )}

      {!loading && errMsg && (
        <Card className="p-10 border-destructive/30">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <Icon icon="ph:warning-circle-bold" className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold">Couldn’t load Insights</p>
              <p className="mt-1 text-sm text-muted-foreground">{errMsg}</p>

              <div className="mt-4 flex gap-2">
                <Button variant="secondary" onClick={loadPersonas}>
                  Try again
                </Button>

                {errMsg.toLowerCase().includes("login") && (
                  <Button onClick={() => navigate("/login")}>Go to login</Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {!loading && !errMsg && filtered.length === 0 && (
        <Card className="p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon icon="ph:users-three-bold" className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-semibold">No Insights yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Generate your first Insights to see it here.
          </p>
          <div className="mt-6 flex justify-center">
            <Link to="/person-generator">
              <Button className="px-8 py-6">
                <Icon icon="ph:plus-bold" className="mr-2 h-5 w-5" />
                Create New Insight
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Grid */}
      {!loading && !errMsg && filtered.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <PersonaCard
              key={p.id}
              persona={p}
              onOpen={() => navigate(`/personas/${p.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}