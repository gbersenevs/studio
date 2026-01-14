"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { X } from "lucide-react";
import { LeadForm } from "./lead-form";

type LeadModalContextValue = {
  open: (listingSlug?: string) => void;
  close: () => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [listingSlug, setListingSlug] = useState<string | undefined>();

  const value = useMemo(
    () => ({
      open: (slug?: string) => {
        setListingSlug(slug);
        setIsOpen(true);
      },
      close: () => setIsOpen(false),
    }),
    []
  );

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-border/60">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/60">
              <div>
                <p className="text-sm text-text-muted">Student housing company</p>
                <h3 className="text-xl font-semibold text-text">Reserve a call or request more info</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-surface text-text-muted"
                aria-label="Close lead form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <LeadForm listingSlug={listingSlug} />
            </div>
          </div>
        </div>
      )}
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal must be used within LeadModalProvider");
  }
  return ctx;
}
