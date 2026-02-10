import { useEffect, useState } from "react";
import logo from "@/assets/mtjd.svg";
import { Button } from "./ui/button";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { LogIn, UserPlus, LogOut, Lock, Menu, X } from "lucide-react";

function AppNavItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "transition-colors text-sm font-medium",
          isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

function MarketingNavItem({ hash, children, onClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const targetId = hash.replace("#", "");

    // Close menu first (mobile UX)
    onClick?.();

    if (location.pathname === "/") {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate(`/${hash}`);
    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <a
      href={hash}
      onClick={handleClick}
      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const location = useLocation();

  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  // Prevent background scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Subtle teal slash accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-8 w-[120%] -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] bg-primary/12" />
      </div>

      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* LEFT — LOGO */}
        <Link to="/" className="flex flex-col items-center gap-1">
          <img src={logo} alt="MTJD logo" className="h-7 w-auto" />
          <div className="hidden sm:block leading-tight">
            
            <p className="text-xs text-muted-foreground">Insight Generator</p>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <nav className="hidden md:flex items-center gap-6">
          {!user ? (
            <>
              <MarketingNavItem hash="#how">How it works</MarketingNavItem>
              <MarketingNavItem hash="#outputs">Outputs</MarketingNavItem>
              <MarketingNavItem hash="#who">Who it’s for</MarketingNavItem>
            </>
          ) : (
            <>
              <AppNavItem to="/dashboard">Dashboard</AppNavItem>

              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    [
                      "inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition whitespace-nowrap",
                      isActive
                        ? "border-primary/30 bg-primary/15 text-foreground"
                        : "border-primary/20 bg-primary/10 text-foreground hover:bg-primary/15",
                    ].join(" ")
                  }
                >
                  <Lock size={16} className="text-primary shrink-0" />
                  <span>Admin Panel</span>
                </NavLink>
              )}
            </>
          )}
        </nav>

        {/* RIGHT — ACTIONS (desktop) + MOBILE TOGGLE */}
        <div className="flex items-center gap-2">
          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <Button variant="secondary" onClick={logout} className="flex items-center gap-2">
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button className="flex items-center gap-2">
                    <LogIn size={16} />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="secondary" className="flex items-center gap-2">
                    <UserPlus size={16} />
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <Button
            variant="secondary"
            size="icon"
            className="md:hidden rounded-xl"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden">
          {/* overlay */}
          <div
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* panel */}
          <div className="fixed top-16 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur">
            <div className="mx-auto max-w-7xl px-6 py-4">
              <div className="grid gap-2">
                {!user ? (
                  <>
                    <div className="rounded-2xl border bg-background p-3">
                      <p className="text-xs text-muted-foreground mb-2">Explore</p>
                      <div className="flex flex-col gap-3">
                        <MarketingNavItem hash="#how" onClick={() => setOpen(false)}>
                          How it works
                        </MarketingNavItem>
                        <MarketingNavItem hash="#outputs" onClick={() => setOpen(false)}>
                          Outputs
                        </MarketingNavItem>
                        <MarketingNavItem hash="#who" onClick={() => setOpen(false)}>
                          Who it’s for
                        </MarketingNavItem>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Link to="/login" onClick={() => setOpen(false)}>
                        <Button className="w-full">
                          <LogIn size={16} className="mr-2" />
                          Login
                        </Button>
                      </Link>
                      <Link to="/signup" onClick={() => setOpen(false)}>
                        <Button variant="secondary" className="w-full">
                          <UserPlus size={16} className="mr-2" />
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-2xl border bg-background p-3">
                      <p className="text-xs text-muted-foreground mb-2">Workspace</p>
                      <div className="flex flex-col gap-3">
                        <AppNavItem to="/dashboard" onClick={() => setOpen(false)}>
                          Dashboard
                        </AppNavItem>

                        {isAdmin && (
                          <NavLink
                            to="/admin"
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium bg-primary/10 border-primary/20"
                          >
                            <Lock size={16} className="text-primary" />
                            <span>Admin Panel</span>
                          </NavLink>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="secondary"
                        className="w-full"
                        onClick={() => {
                          setOpen(false);
                          logout();
                        }}
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
