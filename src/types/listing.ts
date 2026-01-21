export interface Listing {
  id: string;
  slug: string;
  title: string;
  city: string;
  country: string;
  type: string;
  priceEur: number;
  autumnPriceEur?: number;
  springPriceEur?: number;
  utilitiesMinEur?: number;
  utilitiesMaxEur?: number;
  district: string;
  address?: string;
  bedrooms?: number;
  livingRoom: boolean;
  sizeSqm?: number;
  viewType?: string;
  longDescription?: string;
  detailedLongDescription?: string;
  amenities: string[];
  images: string[];
  createdAt: string; // ISO string
}
