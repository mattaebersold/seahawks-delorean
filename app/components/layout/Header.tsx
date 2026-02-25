import { useState } from "react";
import clsx from "clsx";
import { NavLink } from "react-router";

import { LogoIcon, MenuIcon } from "~/components/icons";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "underline underline-offset-4" : "";

interface HeaderProps {
  title?: string | null;
  navLinks?: Array<{ text: string | null; href: string | null }> | null;
}

export function Header({ title, navLinks }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const validLinks = navLinks?.filter((l): l is { text: string; href: string } =>
    typeof l.text === "string" && typeof l.href === "string"
  ) ?? [];

  return (
    <>
      <header className="bg-white/10">
        <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
          {/* Logo */}
          <NavLink to={"/"}>
            <LogoIcon className="text-white text-3xl"/>
          </NavLink>

          {/* Desktop nav */}
          {validLinks.length > 0 && (
            <nav className="hidden md:flex gap-3 text-white">
              {validLinks.map((link) => (
                <NavLink key={link.href} to={link.href} className={navLinkClass}>
                  {link.text}
                </NavLink>
              ))}
            </nav>
          )}

          {/* Mobile menu button */}
          {validLinks.length > 0 && (
            <button
              className="md:hidden text-dark-blue"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          )}
        </div>
      </header>

      {/* Mobile drawer — only rendered in the DOM on mobile via md:hidden on the outer wrapper */}
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
            "fixed top-0 right-0 h-full w-72 bg-white z-50 flex flex-col transition-transform duration-300",
            drawerOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between p-4 border-b border-black/10">
            <LogoIcon className="text-dark-blue" />
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="text-dark-blue"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Drawer nav links */}
          {validLinks.length > 0 && (
            <nav className="flex flex-col p-4 gap-4 text-dark-blue">
              {validLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    clsx("text-lg", isActive && "underline underline-offset-4")
                  }
                  onClick={() => setDrawerOpen(false)}
                >
                  {link.text}
                </NavLink>
              ))}
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
