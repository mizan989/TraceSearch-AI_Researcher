import React from "react";
import Link from "next/link";
import { Globe, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./social-icons";

export function Footer() {
  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/mizan989",
      icon: GithubIcon,
      external: true,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mizann989",
      icon: LinkedinIcon,
      external: true,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/mizanmohammadd",
      icon: InstagramIcon,
      external: true,
    },
    {
      label: "Portfolio",
      href: "https://md-mizan.vercel.app",
      icon: Globe,
      external: true,
    },
    {
      label: "Email",
      href: "mailto:mizanmuhammad20@gmail.com",
      icon: Mail,
      external: false,
    },
  ];

  return (
    <footer className="w-full border-t border-border py-8 mt-auto bg-surface-subtle/40 text-xs text-text-muted transition-colors">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-text-primary">TraceSearch</span>
            <span>·</span>
            <span>Search. Analyze. Trace.</span>
          </div>
          <span className="hidden sm:inline text-text-muted/60">|</span>
          <span className="text-text-muted">
            Designed and built by{" "}
            <a
              href="https://md-mizan.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-ocean-deep font-medium transition-colors underline decoration-border-strong underline-offset-2 hover:decoration-ocean-deep"
            >
              Md Mizan
            </a>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-text-muted">
            <Link
              href="/privacy"
              className="hover:text-ocean-deep transition-colors"
            >
              Privacy Policy
            </Link>
            <span>·</span>
            <Link
              href="/terms"
              className="hover:text-ocean-deep transition-colors"
            >
              Terms of Service
            </Link>
            <span>·</span>
            <Link
              href="/cookies"
              className="hover:text-ocean-deep transition-colors"
            >
              Cookie Policy
            </Link>
          </div>

          <div className="h-3.5 w-[1px] bg-border hidden sm:block" />

          <div className="flex items-center gap-1.5">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={link.label}
                  title={link.label}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-text-muted hover:text-ocean-deep hover:bg-surface border border-transparent hover:border-border transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
