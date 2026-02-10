import React, { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import axios from "../lib/axios";

function LockedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-1 text-xs text-muted-foreground">
      <Icon icon="ph:lock-bold" className="h-3.5 w-3.5" />
      Coming soon
    </span>
  );
}

function LockCard({ title, subtitle }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <LockedBadge />
          </div>
          <p className="mt-1 text-base font-semibold text-muted-foreground">Locked</p>
          {subtitle ? (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <Icon icon="ph:lock-bold" className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

const pickText = (p) =>
  p?.title || p?.name || p?.summary || "New insight generated";

const pickDate = (p) => p?.createdAt || p?.created_at || null;

export default function DashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError("");

        // ✅ Your DB endpoint
        const res = await axios.get("/personas/");
        console.log("res", res)
        const list = Array.isArray(res.data) ? res.data : res.data?.data;

        if (!cancelled) setPersonas(Array.isArray(list) ? list : []);
      } catch (e) {
        if (!cancelled) {
          setError(e?.response?.data?.message || "Failed to load dashboard data");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const totalInsights = personas.length;

  const recentInsights = useMemo(() => {
    const sorted = [...personas].sort((a, b) => {
      const ad = new Date(pickDate(a) || 0).getTime();
      const bd = new Date(pickDate(b) || 0).getTime();
      return bd - ad;
    });
    return sorted.slice(0, 3);
  }, [personas]);

  const recommendedAction = useMemo(() => {
    if (loading) return { title: "Loading…", subtitle: "Fetching your insights" };
    if (error) return { title: "Unable to load", subtitle: "Refresh and try again" };

    if (totalInsights === 0) {
      return {
        title: "Generate your first insight",
        subtitle: "Upload a document and get structured insights instantly",
      };
    }

    return {
      title: "Review recent insights",
      subtitle: "Use key themes and signals to guide next steps",
    };
  }, [loading, error, totalInsights]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr]">
          <main className="space-y-6">
            {/* Top bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">Overview</h1>
                <p className="text-sm text-muted-foreground">
                  Insight Generator is live. Campaigns, surveys & personas are coming soon.
                </p>
              </div>

              <div className="flex gap-2">
                <Link to="/person-generator">
                  <Button>
                    <Icon icon="ph:plus-bold" className="mr-2 h-5 w-5" />
                    New Insight
                  </Button>
                </Link>

                {/* 🔒 locked CTA */}
                <Button variant="secondary" disabled className="opacity-70 cursor-not-allowed">
                  <Icon icon="ph:lock-bold" className="mr-2 h-5 w-5" />
                  New Campaign
                </Button>
              </div>
            </div>

            {/* Error banner */}
            {error ? (
              <Card className="p-4 border-destructive/30 bg-destructive/5">
                <p className="text-sm text-destructive">{error}</p>
              </Card>
            ) : null}

            {/* Overview cards */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* ✅ Real data: total insights */}
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total insights</p>
                    <p className="mt-1 text-2xl font-semibold">
                      {loading ? "…" : totalInsights}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon icon="ph:sparkle-bold" className="h-5 w-5" />
                  </div>
                </div>
              </Card>

              {/* 🔒 Locked: campaigns */}
              <LockCard
                title="Campaigns"
                subtitle="Campaign performance & planning will be available soon"
              />

              {/* 🔒 Locked: personas */}
              <LockCard
                title="Personas"
                subtitle="Persona ranking and comparison is coming soon"
              />
            </div>

            {/* Two-column section */}
            <section className="grid gap-6 lg:grid-cols-2">
              {/* Recent Insights */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Recent Insights</h4>
                  <Link
                    to="/dashboard/insights"
                    className="text-sm text-primary hover:underline"
                  >
                    View all
                  </Link>
                </div>

                {loading ? (
                  <p className="text-sm text-muted-foreground">Loading insights…</p>
                ) : totalInsights === 0 ? (
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>No insights yet.</p>
                    <Link to="/person-generator" className="text-primary hover:underline">
                      Generate your first insight →
                    </Link>
                  </div>
                ) : (
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {recentInsights.map((p) => (
                      <li key={p.id} className="flex gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                        <span className="line-clamp-2">{pickText(p)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h4 className="font-semibold mb-3">Quick Actions</h4>

                <div className="flex flex-wrap gap-3">
                  {/* ✅ active */}
                  <Button >
                    <Link to="/person-generator">
                      <Icon icon="ph:magic-wand-bold" className="mr-2 h-3 w-3" />
                      Generate Insight
                    </Link>
                  </Button>

                  {/* 🔒 locked */}
                  <Button variant="secondary" disabled className="opacity-70 cursor-not-allowed">
                    <Icon icon="ph:lock-bold" className="mr-2 h-5 w-5" />
                    Analyze Campaign
                  </Button>

                  {/* 🔒 locked */}
                  <Button variant="secondary" disabled className="opacity-70 cursor-not-allowed">
                    <Icon icon="ph:lock-bold" className="mr-2 h-5 w-5" />
                    Export Report
                  </Button>
                </div>

                <div className="mt-5 rounded-lg border border-border bg-muted/30 p-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Icon icon="ph:info-bold" className="mt-0.5 h-4 w-4" />
                    <div>
                      <p className="font-medium text-foreground">Recommended action</p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {recommendedAction.title}
                        </span>{" "}
                        — {recommendedAction.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
