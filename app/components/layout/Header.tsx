import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router";

import { MenuIcon } from "~/components/icons";
import { NAV_SECTIONS, SECTION_IDS } from "~/types/homeTypes";
import type { SectionKey } from "~/types/homeTypes";

interface HeaderProps {
  title?: string | null;
  logoUrl?: string | null;
}

function useActiveSection(): SectionKey | null {
  const [active, setActive] = useState<SectionKey | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const entries = new Map<string, IntersectionObserverEntry>();

    function pickActive() {
      // Among all visible sections, pick the one highest in the viewport
      let bestKey: SectionKey | null = null;
      let bestTop = Infinity;

      for (const [key, entry] of entries) {
        if (entry.isIntersecting) {
          const top = entry.boundingClientRect.top;
          if (top < bestTop) {
            bestTop = top;
            bestKey = key as SectionKey;
          }
        }
      }
      setActive(bestKey);
    }

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(SECTION_IDS[id]);
      if (!el) return;

      const obs = new IntersectionObserver(
        (obsEntries) => {
          obsEntries.forEach((entry) => {
            entries.set(id, entry);
          });
          pickActive();
        },
        {
          // Section is "active" when it occupies the upper portion of the viewport
          rootMargin: "-10% 0px -50% 0px",
          threshold: 0,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

export function Header({ title, logoUrl }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const activeSection = useActiveSection();

  // Sync query param when active section changes (scroll-driven)
  useEffect(() => {
    if (!isHomePage || !activeSection) return;
    const url = new URL(window.location.href);
    const current = url.searchParams.get("section");
    if (current !== activeSection) {
      url.searchParams.set("section", activeSection);
      window.history.replaceState({}, "", url.toString());
    }
  }, [isHomePage, activeSection]);

  const handleSectionClick = useCallback(
    (id: SectionKey) => {
      setDrawerOpen(false);

      if (isHomePage) {
        const el = document.getElementById(SECTION_IDS[id]);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          const url = new URL(window.location.href);
          url.searchParams.set("section", id);
          window.history.pushState({}, "", url.toString());
        }
      } else {
        navigate(`/?section=${id}`);
      }
    },
    [isHomePage, navigate]
  );

  const isActive = (id: SectionKey) =>
    isHomePage ? activeSection === id : false;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 bg-black/70 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between p-6 lg:px-12">
          {/* Logo */}
          <button
            onClick={() => handleSectionClick("home")}
            aria-label="Go to top"
            className="flex items-center"
          >
            {logoUrl ? (
              <img src={logoUrl} alt={title ?? "Logo"} className="h-8 w-auto" />
            ) : (
              <span className="text-white font-bold text-lg tracking-wide">{title ?? "Home"}</span>
            )}
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 text-white">
            {NAV_SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleSectionClick(id)}
                className={clsx(
                  "transition-all duration-200 text-md font-bold tracking-wide uppercase cursor-pointer",
                  isActive(id)
                    ? "text-white underline underline-offset-4"
                    : "text-white/70 hover:text-white"
                )}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        </div>
      </header>


      {/* Mobile drawer */}
      <div className="md:hidden">
        {/* Backdrop */}
        <div
          className={clsx(
            "fixed inset-0 bg-black/40 z-40 transition-opacity duration-300",
            drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setDrawerOpen(false)}
        />

        {/* Slide-out panel */}
        <div
          className={clsx(
            "fixed top-0 right-0 h-full w-72 bg-dark-blue z-50 flex flex-col transition-transform duration-300",
            drawerOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            {logoUrl ? (
              <img src={logoUrl} alt={title ?? "Logo"} className="h-8 w-auto" />
            ) : (
              <span>{title}</span>
            )}
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="text-white/70 hover:text-white"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Drawer nav links */}
          <nav className="flex flex-col p-4 gap-2">
            {NAV_SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleSectionClick(id)}
                className={clsx(
                  "text-left text-lg px-3 py-2 rounded-lg transition-colors",
                  isActive(id)
                    ? "text-white bg-white/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
