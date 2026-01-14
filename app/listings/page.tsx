import { Metadata } from "next";
import { Container } from "@/components/container";
import { ListingCard } from "@/components/listing-card";
import { FiltersSidebar } from "@/components/filters-sidebar";
import { getListings } from "@/src/lib/listings";
import { Listing } from "@/src/types/listing";

export const metadata: Metadata = {
  title: "Listings",
  description:
    "Student listings for Riga, Latvia and Palanga, Lithuania. All listings are managed by one owner.",
};

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

type FilterState = {
  city: string;
  type: string;
  priceMin?: number;
  priceMax?: number;
  district?: string;
  livingRoom?: "with" | "without";
  amenities: string[];
  sort: string;
};

function parseFilters(searchParams: SearchParams): FilterState {
  const asArray = (value: string | string[] | undefined) =>
    value ? (Array.isArray(value) ? value : [value]) : [];

  const city = (searchParams.city as string) || "all";
  const type = (searchParams.type as string) || "all";
  const priceMin = searchParams.priceMin ? Number(searchParams.priceMin) : undefined;
  const priceMax = searchParams.priceMax ? Number(searchParams.priceMax) : undefined;
  const district = (searchParams.district as string) || "all";
  const livingRoomRaw = (searchParams.livingRoom as string) || "any";
  const livingRoom =
    livingRoomRaw === "with"
      ? "with"
      : livingRoomRaw === "without"
      ? "without"
      : undefined;
  const amenities = asArray(searchParams.amenities)
    .flatMap((a) => a.split(","))
    .filter(Boolean);
  const sort = (searchParams.sort as string) || "newest";

  return {
    city,
    type,
    priceMin,
    priceMax,
    district,
    livingRoom,
    amenities,
    sort,
  };
}

function filterAndSort(data: Listing[], filters: FilterState) {
  const filtered = data.filter((listing) => {
    const matchesCity = filters.city === "all" || listing.city === filters.city;
    const matchesType = filters.type === "all" || listing.type === filters.type;
    const matchesDistrict =
      !filters.district || filters.district === "all" || listing.district === filters.district;
    const matchesPriceMin =
      typeof filters.priceMin !== "number" || listing.priceEur >= filters.priceMin;
    const matchesPriceMax =
      typeof filters.priceMax !== "number" || listing.priceEur <= filters.priceMax;
    const matchesLiving =
      !filters.livingRoom ||
      (filters.livingRoom === "with" && listing.livingRoom) ||
      (filters.livingRoom === "without" && !listing.livingRoom);
    const matchesAmenities =
      filters.amenities.length === 0 ||
      filters.amenities.every((amenity) => listing.amenities.includes(amenity));

    return (
      matchesCity &&
      matchesType &&
      matchesDistrict &&
      matchesPriceMin &&
      matchesPriceMax &&
      matchesLiving &&
      matchesAmenities
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (filters.sort === "price-asc") {
      return a.priceEur - b.priceEur;
    }
    if (filters.sort === "price-desc") {
      return b.priceEur - a.priceEur;
    }
    // newest
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return sorted;
}

export default function ListingsPage({ searchParams }: { searchParams: SearchParams }) {
  const filters = parseFilters(searchParams);
  const allListings = getListings();
  const districts = Array.from(new Set(allListings.map((l) => l.district)));
  const amenityOptions = Array.from(
    new Set(allListings.flatMap((l) => l.amenities))
  ).sort();

  const results = filterAndSort(allListings, filters);

  return (
    <Container className="py-14">
      <div className="max-w-3xl space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-text-light">Student listings</p>
        <h1 className="text-4xl font-semibold text-text">Homes for students</h1>
        <p className="text-text-muted">
          For students in Riga, Latvia and Palanga, Lithuania. All listings are managed by one owner.
        </p>
        <p className="text-sm text-text-light">
          These listings use placeholder details while we prepare the next availability window.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-8 items-start">
        <FiltersSidebar
          city={filters.city}
          type={filters.type}
          priceMin={filters.priceMin}
          priceMax={filters.priceMax}
          district={filters.district}
          livingRoom={filters.livingRoom}
          amenities={filters.amenities}
          sort={filters.sort}
          districts={districts}
          amenitiesOptions={amenityOptions}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-text-light">
            <span>
              Showing {results.length} result{results.length === 1 ? "" : "s"}
            </span>
            <span className="text-text-muted">
              Filters are applied server side and shareable via URL.
            </span>
          </div>
          {results.length === 0 ? (
            <div className="rounded-2xl border border-border/70 bg-white p-6 shadow-soft">
              <p className="text-text-muted">
                No listings match these filters yet. Try broadening your search or contact us for upcoming availability.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
