import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CTAButton } from "@/components/cta-button";
import { Container } from "@/components/container";
import { getListings } from "@/src/lib/listings";
import { ImageGallery } from "@/components/image-gallery";

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const listing = getListings().find((item) => item.slug === params.slug);
  if (!listing) {
    return {
      title: "Listing not found",
      description: "The requested listing was not found.",
    };
  }

  return {
    title: `${listing.title} | Student housing`,
    description: `Student listing in ${listing.city}, ${listing.district}. Placeholder details will be updated.`,
  };
}

export default function ListingPage({ params }: Props) {
  const listing = getListings().find((item) => item.slug === params.slug);

  if (!listing) {
    notFound();
  }

  return (
    <Container className="py-12 space-y-8">
      <div className="flex items-center gap-3 text-sm text-text-light">
        <Link href="/listings" className="text-primary hover:underline">
          Back to listings
        </Link>
        <span>•</span>
        <span>
          {listing?.city} • {listing?.district}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <ImageGallery images={listing!.images} />
          {(listing?.detailedLongDescription || listing?.longDescription) && (
            <p className="mt-6 rounded-2xl border border-border/60 bg-white/80 p-4 text-sm leading-relaxed text-text-muted">
              {listing.detailedLongDescription || listing.longDescription}
            </p>
          )}
        </div>

        <div className="space-y-4 rounded-3xl border border-border/70 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-text-light">
                {listing!.city}
              </p>
              <h1 className="text-2xl font-semibold text-text">{listing!.title}</h1>
            <p className="text-sm text-text-muted">
              {listing!.district}
              {listing?.address ? ` • ${listing.address}` : ""}
            </p>
            {listing.viewType && (
              <span className="mt-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                {listing.viewType}
              </span>
            )}
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary capitalize">
              {listing!.type}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-3xl font-semibold text-text">€{listing!.priceEur}/mo</p>
            {listing!.utilitiesMinEur && listing!.utilitiesMaxEur && (
              <p className="text-sm text-text-muted">
                Utilities estimated €{listing!.utilitiesMinEur}-{listing!.utilitiesMaxEur}
              </p>
            )}
          </div>

          <div className="space-y-2 text-sm text-text-muted">
            <Fact label="City" value={`${listing!.city}, ${listing!.country}`} />
            <Fact label="District" value={listing!.district} />
            {listing!.sizeSqm && <Fact label="Size" value={`${listing!.sizeSqm} sqm`} />}
            <Fact
              label="Living room"
              value={listing!.livingRoom ? "Yes, shared space" : "No living room"}
            />
            {typeof listing!.bedrooms === "number" && (
              <Fact label="Bedrooms" value={String(listing!.bedrooms)} />
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-text">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {listing!.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-full bg-surface px-3 py-1 text-xs text-text-muted border border-border/60"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <CTAButton label="Reserve a call" listingSlug={listing!.slug} className="w-full" />
            <CTAButton
              label="Request more info"
              variant="ghost"
              listingSlug={listing!.slug}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/60 bg-surface px-3 py-2">
      <span className="text-xs text-text-light">{label}</span>
      <span className="text-sm text-text">{value}</span>
    </div>
  );
}
