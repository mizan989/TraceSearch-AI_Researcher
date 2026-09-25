"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Clock, Shield, FileText, Globe, Mail, Cookie } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "@/components/ui/logo";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./social-icons";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const desktopNavItems = [
    { label: "Research", href: "/", icon: Search },
    { label: "History", href: "/history", icon: Clock },
  ];

  const fullNavLinks = [
    { label: "Research", href: "/", icon: Search },
    { label: "History", href: "/history", icon: Clock },
    { label: "Privacy Policy", href: "/privacy", icon: Shield },
    { label: "Terms of Service", href: "/terms", icon: FileText },
    { label: "Cookie Policy", href: "/cookies", icon: Cookie },
  ];

  const socialLinks = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/mizanmohammadd",
      icon: InstagramIcon,
    },
    {
      label: "GitHub",
      href: "https://github.com/mizan989",
      icon: GithubIcon,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mizann989",
      icon: LinkedinIcon,
    },
    {
      label: "Portfolio",
      href: "https://md-mizan.vercel.app",
      icon: Globe,
    },
    {
      label: "Email",
      href: "mailto:mizanmuhammad20@gmail.com",
      icon: Mail,
    },
  ];

  // Close menu on escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Completely lock viewport and background scrolling on both html and body
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.touchAction = "none";
      document.documentElement.style.overscrollBehavior = "none";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.style.overscrollBehavior = "none";
    } else {
      document.documentElement.style.overflow = "";
      document.documentElement.style.touchAction = "";
      document.documentElement.style.overscrollBehavior = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.overscrollBehavior = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.touchAction = "";
      document.documentElement.style.overscrollBehavior = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.overscrollBehavior = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/90 backdrop-blur-md transition-colors">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-text-primary hover:opacity-90 transition-opacity min-w-0"
            >
              <Logo size={32} className="shadow-subtle" />
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-base tracking-tight leading-none truncate">
                  TraceSearch
                </span>
                <span className="text-[11px] text-text-muted font-medium mt-0.5 tracking-normal hidden sm:block">
                  Search · Analyze · Trace
                </span>
              </div>
            </Link>
          </div>

          {/* Right Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {desktopNavItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/"
                    ? pathname === "/" || pathname?.startsWith("/research")
                    : pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors active:scale-[0.98]",
                      isActive
                        ? "bg-surface-subtle text-text-primary border border-border"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-subtle/60"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="h-4 w-[1px] bg-border mx-1 hidden md:block" />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle Button (Strictly hidden on desktop, hides when modal is open) */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-expanded={isOpen}
              aria-label="Open navigation menu"
              className={cn(
                "nav-toggle-btn md:hidden",
                isOpen && "invisible pointer-events-none"
              )}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay (Rendered directly into document.body to avoid parent backdrop-filter traps) */}
      {mounted && isOpen && createPortal(
        <div
          className="fixed inset-0 z-[100] w-screen h-screen h-[100dvh] bg-[#1A0706] text-[#D9D9D9] flex flex-col justify-between overflow-hidden touch-none overscroll-none animate-fade-in select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Top Bar (Exact same height and padding as header so close button lands in exact spot) */}
          <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-8 h-16 flex items-center justify-between border-b border-[#55100D]/60 shrink-0">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 text-[#D9D9D9]"
            >
              <Logo size={28} />
              <span className="font-semibold text-base tracking-tight font-sans text-[#D9D9D9]">
                TraceSearch
              </span>
            </Link>

            {/* Exactly ONE Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
              className="nav-toggle-btn is-open"
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          {/* Middle Section: Clean Primary Navigation Links */}
          <div className="max-w-[1200px] w-full mx-auto px-6 sm:px-8 flex flex-col my-auto py-4 space-y-1">
            {fullNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/" || pathname?.startsWith("/research")
                  : pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group flex items-center justify-between py-3.5 border-b border-[#55100D]/40 text-xl font-medium tracking-tight font-sans transition-colors",
                    isActive
                      ? "text-[#DD0200] font-semibold"
                      : "text-[#D9D9D9]/80 hover:text-[#D9D9D9]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-[#DD0200]" : "text-[#D9D9D9]/50 group-hover:text-[#D9D9D9]"
                    )} />
                    <span>{item.label}</span>
                  </div>
                  <span className={cn(
                    "transition-all text-base",
                    isActive ? "text-[#DD0200]" : "text-[#D9D9D9]/30 group-hover:text-[#D9D9D9] group-hover:translate-x-1.5"
                  )}>
                    &rarr;
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Bottom Section: Social Profile Pills & Clean Footer */}
          <div className="max-w-[1200px] w-full mx-auto px-6 sm:px-8 pt-4 pb-8 border-t border-[#55100D]/60 space-y-4 shrink-0">
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#55100D]/30 hover:bg-[#55100D]/60 border border-[#55100D]/60 hover:border-[#DD0200]/40 text-xs font-medium text-[#D9D9D9]/90 hover:text-[#D9D9D9] transition-all active:scale-95"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#D9D9D9]/70" />
                    <span>{link.label}</span>
                    <span className="text-[10px] text-[#D9D9D9]/40">&#8599;</span>
                  </a>
                );
              })}
            </div>

            <div className="text-[11px] text-[#D9D9D9]/50 text-center font-sans">
              &copy; 2026 Md Mizan · Kolkata, IN
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
