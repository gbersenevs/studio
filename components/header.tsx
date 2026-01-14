"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Container } from "./container";
import { CTAButton } from "./cta-button";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { navigation, company } = siteConfig;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-border/60">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label={`${company.name} Home`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-semibold">
              JS
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-text">{company.name}</p>
              <p className="text-xs text-text-light">Calm, owner-managed housing</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navigation.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-text hover:text-primary rounded-lg hover:bg-surface transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden p-2 text-text hover:text-primary transition-colors rounded-lg hover:bg-surface"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <div className="hidden md:block">
              <CTAButton
                label="Reserve a call"
                variant="primary"
                size="md"
                className="gap-2"
              />
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            {navigation.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-text hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-border">
              <CTAButton
                label="Reserve a call"
                variant="primary"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
