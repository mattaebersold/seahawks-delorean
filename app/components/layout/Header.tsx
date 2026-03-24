import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router";

import { MenuIcon } from "~/components/icons";
import { NAV_SECTIONS, SECTION_IDS } from "~/types/homeTypes";
import type { SectionKey } from "~/types/homeTypes";

interface HeaderProps {
  title?: string | null;
  logoUrl?: string | null;
  facebookUrl?: string | null;
}

const HEADER_HEIGHT = 72; // matches --spacing-header

function useActiveSection(): SectionKey | null {
  const [active, setActive] = useState<SectionKey | null>(null);

  useEffect(() => {
    function update() {
      // Pick the last section whose top edge has crossed the header + 20% threshold
      const threshold = HEADER_HEIGHT + window.innerHeight * 0.2;
      let activeKey: SectionKey | null = null;
      for (const { id } of NAV_SECTIONS) {
        const el = document.getElementById(SECTION_IDS[id]);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) {
          activeKey = id;
        }
      }
      setActive(activeKey);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return active;
}

export function Header({ title, logoUrl, facebookUrl }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const activeSection = useActiveSection();

  // Update hash as user scrolls (replaceState bypasses React Router so it won't re-trigger the scroll effect)
  useEffect(() => {
    if (!isHomePage || !activeSection) return;
    const hash = `#${activeSection}`;
    if (window.location.hash !== hash) {
      window.history.replaceState({}, "", hash);
    }
  }, [isHomePage, activeSection]);

  const handleSectionClick = useCallback(
    (id: SectionKey) => {
      setDrawerOpen(false);

      if (isHomePage) {
        const el = document.getElementById(SECTION_IDS[id]);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState({}, "", `#${id}`);
        }
      } else {
        navigate(`/#${id}`);
      }
    },
    [isHomePage, navigate]
  );

  const isActive = (id: SectionKey) =>
    isHomePage ? activeSection === id : false;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 bg-black/70 backdrop-blur-md">
        <div className="flex items-center justify-between p-6">
          {/* Logo */}
          <button
            onClick={() => handleSectionClick("home")}
            aria-label="Go to top"
            className="flex items-center"
          >
            {logoUrl ? (
              <img src={logoUrl} alt={title ?? "Logo"} className="h-12 w-auto" />
            ) : (
              <span className="text-white font-bold text-lg tracking-wide">{title ?? "Home"}</span>
            )}
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-white">
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
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2" width="24" height="24">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
              </a>
            )}
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
              <img src={logoUrl} alt={title ?? "Logo"} className="h-12 w-auto" />
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
