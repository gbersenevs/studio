"use client";

import { useMemo, useState } from "react";
import { Listing } from "@/src/types/listing";
import { Container } from "./container";

type OccupancyForm = {
  listingSlug: string;
  occupied: boolean;
  occupiedUntil: string;
  note: string;
};

type AdminControlsProps = {
  listings: Listing[];
};

export function AdminControls({ listings }: AdminControlsProps) {
  const defaultListing = listings[0];
  const [form, setForm] = useState<OccupancyForm>({
    listingSlug: defaultListing.slug,
    occupied: false,
    occupiedUntil: "",
    note: "",
  });

  const selectedListing = useMemo(() => {
    return listings.find((listing) => listing.slug === form.listingSlug) ?? defaultListing;
  }, [form.listingSlug, defaultListing, listings]);

  const handleField = (field: keyof OccupancyForm) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value =
      field === "occupied" ? (event.target as HTMLInputElement).checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Container className="py-14 space-y-10">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-text-light">Mock admin</p>
        <h1 className="text-3xl font-semibold text-text">Manage placeholder listings</h1>
        <p className="text-text-muted">
          This demo lets you toggle an occupied flag and note expected return dates without changing any live data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-8">
        <form className="space-y-6 rounded-2xl border border-border/70 bg-white p-6 shadow-soft">
          <div className="space-y-1">
            <label className="text-sm font-medium text-text">Select listing</label>
            <select
              value={form.listingSlug}
              onChange={handleField("listingSlug")}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
            >
              {listings.map((listing) => (
                <option key={listing.slug} value={listing.slug}>
                  {listing.title} ({listing.city})
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-3 text-sm">
            <input
              type="checkbox"
              checked={form.occupied}
              onChange={handleField("occupied")}
              className="mt-1 text-primary"
            />
            <span className="text-text-muted">Mark as occupied (hide on the public site)</span>
          </label>

          <div className="space-y-1">
            <label className="text-sm font-medium text-text">Occupied until</label>
            <input
              type="date"
              value={form.occupiedUntil}
              onChange={handleField("occupiedUntil")}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-text">Note for viewers</label>
            <textarea
              value={form.note}
              onChange={handleField("note")}
              rows={3}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="rounded-2xl bg-primary/10 px-4 py-3 text-sm text-primary">
            Demo action only — nothing is saved yet.
          </div>
        </form>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border/70 bg-white p-6 shadow-soft space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-text-light">Preview</p>
            <h2 className="text-xl font-semibold text-text">{selectedListing.title}</h2>
            <p className="text-sm text-text-muted">
              {selectedListing.city} • {selectedListing.district}
            </p>
            <p className="text-2xl font-semibold text-text">€{selectedListing.priceEur}/mo</p>
            <div className="flex flex-wrap gap-2 text-xs text-text-muted">
              <span className="rounded-full bg-surface px-3 py-1 border border-border">
                {selectedListing.type}
              </span>
              <span className="rounded-full bg-surface px-3 py-1 border border-border">
                {selectedListing.livingRoom ? "Living room" : "No living room"}
              </span>
            </div>
            <p className="text-sm text-text-muted">
              {selectedListing.amenities.slice(0, 3).join(" • ")} … (more in data/listings.csv)
            </p>
            <div className="rounded-xl border border-border/70 bg-surface px-4 py-3 text-sm text-text">
              {form.occupied
                ? `Occupied until ${form.occupiedUntil || "TBD"}. Note: ${form.note || "—"}`
                : "Available — keep the CSV updated when occupancy changes."}
            </div>
          </div>
          <div className="rounded-2xl border border-border/70 bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold text-text">Next steps</p>
            <ul className="mt-3 list-inside space-y-2 text-sm text-text-muted">
              <li>1. Update `data/listings.csv` with the new slug, dates, and notes.</li>
              <li>2. Use the `occupied` column to hide units until they are free.</li>
              <li>3. Replace the note with the actual availability message you want students to see.</li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
