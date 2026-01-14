export type ListingCity = "Riga" | "Palanga";

export type ListingType = "room" | "apartment";

export interface Listing {
  id: string;
  slug: string;
  title: string;
  city: ListingCity;
  country: string;
  type: ListingType;
  priceEur: number;
  utilitiesMinEur?: number;
  utilitiesMaxEur?: number;
  district: string;
  address?: string;
  bedrooms?: number;
  livingRoom: boolean;
  sizeSqm?: number;
  amenities: string[];
  images: string[];
  createdAt: string; // ISO string
}
