import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Link, NavLink, Outlet } from "react-router-dom";

function SideItem({ to, icon, label, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
          isActive
            ? "bg-primary/10 text-foreground border border-primary/20"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
        ].join(" ")
      }
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon icon={icon} className="h-5 w-5" />
      </span>
      <span className="flex-1">{label}</span>
    </NavLink>
  );
}

function LockedSideItem({ icon, label }) {
  return (
    <div
      className={[
        "flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium",
        "text-muted-foreground/70 bg-muted/30 border border-border",
        "cursor-not-allowed select-none",
      ].join(" ")}
      title="Coming soon"
      aria-disabled="true"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon icon={icon} className="h-4 w-4" />
      </span>

      <span className="flex-1">{label}</span>

      <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-1 text-[8px] text-muted-foreground">
        <Icon icon="ph:lock-bold" className="h-3.5 w-3.5" />
        Coming soon
      </span>
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-20 h-fit">
            <Card className="p-4">
              <div className="mb-4">
                <p className="text-xs text-muted-foreground">Workspace</p>
                <h2 className="text-lg font-semibold">Dashboard</h2>
              </div>

              <div className="space-y-2">
                <SideItem
                  to="/dashboard"
                  icon="ph:squares-four-bold"
                  label="Overview"
                  end
                />

                <SideItem
                  to="/dashboard/insights"
                  icon="ph:lightbulb-filament-bold"
                  label="Insights"
                />

                {/* 🔒 Locked for now */}
                <LockedSideItem
                  icon="ph:clipboard-text-bold"
                  label="Surveys"
                />

                {/* 🔒 Locked for now */}
                <LockedSideItem
                  icon="ph:chart-line-up-bold"
                  label="Campaigns"
                />

                {/* 🔁 Settings renamed to Personas and locked */}
                <LockedSideItem
                  icon="ph:users-three-bold"
                  label="Personas"
                />
              </div>

              <div className="mt-5 border-t pt-4">
                <Link to="/person-generator">
                  <Button className="w-full">
                    <Icon icon="ph:plus-bold" className="mr-2 h-5 w-5" />
                    Create New Insights
                  </Button>
                </Link>
              </div>
            </Card>
          </aside>

          {/* Route outlet */}
          <main className="space-y-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
