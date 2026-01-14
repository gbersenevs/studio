import Link from "next/link";
import Image from "next/image";
import { CTAButton } from "./cta-button";
import { Listing } from "@/src/types/listing";

type ListingCardProps = {
  listing: Listing;
};

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-soft">
      <div className="relative aspect-[4/3]">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
          priority={false}
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-text shadow-sm">
            {listing.city}
          </span>
          <span className="rounded-full bg-primary/90 text-white px-3 py-1 text-xs font-medium capitalize">
            {listing.type}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-1">
          <Link
            href={`/listing/${listing.slug}`}
            className="text-lg font-semibold text-text hover:text-primary"
          >
            {listing.title}
          </Link>
          <p className="text-sm text-text-muted">
            {listing.district} • {listing.city}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-lg bg-surface px-3 py-1 font-semibold text-text">
            €{listing.priceEur}/mo
          </span>
          {listing.utilitiesMinEur && listing.utilitiesMaxEur && (
            <span className="rounded-lg bg-surface px-3 py-1 text-text-muted">
              Utilities ~ €{listing.utilitiesMinEur}-{listing.utilitiesMaxEur}
            </span>
          )}
          <span className="rounded-lg bg-surface px-3 py-1 text-text-muted">
            {listing.livingRoom ? "Living room" : "No living room"}
          </span>
        </div>

        <p className="text-xs text-text-light">
          Details will be updated as soon as new photos and specs are confirmed.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Link
            href={`/listing/${listing.slug}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View details
          </Link>
          <CTAButton
            label="Request more info"
            listingSlug={listing.slug}
            variant="ghost"
            size="sm"
          />
        </div>
      </div>
    </article>
  );
}
