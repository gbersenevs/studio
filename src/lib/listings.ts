import fs from "fs";
import path from "path";
import { Listing } from "@/src/types/listing";

let cache: Listing[] | null = null;

function parseRow(line: string) {
  const values: string[] = [];
  let buffer = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(buffer);
      buffer = "";
      continue;
    }

    buffer += char;
  }

  if (buffer) {
    values.push(buffer);
  }

  return values;
}

function splitSemicolon(value = "") {
  return value
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseNumber(value?: string) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseBoolean(value?: string) {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return ["1", "true", "yes"].includes(normalized);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function formatImages(entry: Record<string, string>): string[] {
  const override = splitSemicolon(entry.images);
  if (override.length) return override;

  const folder =
    entry["Appartment folder"] ||
    entry["Apartment folder"] ||
    entry["imageFolder"] ||
    entry.imageFolder ||
    "";
  const normalized = folder.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");

  if (!normalized) {
    return ["/placeholder/studio.jpg"];
  }

  const folderPath = path.join(process.cwd(), "data", normalized);
  if (!fs.existsSync(folderPath)) {
    return ["/placeholder/studio.jpg"];
  }

  const files = fs
    .readdirSync(folderPath)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort();

  if (!files.length) {
    return ["/placeholder/studio.jpg"];
  }

  return files.map((file) => `/api/images/${encodeURIComponent(normalized)}/${encodeURIComponent(file)}`);
}

export function getListings(): Listing[] {
  if (cache) {
    return cache;
  }

  const csvPath = path.join(process.cwd(), "data", "listings.csv");
  const rawCsv = fs.readFileSync(csvPath, "utf-8").trim();
  const [headerLine, ...rows] = rawCsv.split("\n");
  const headers = headerLine.split(",").map((header) => header.trim());

  cache = rows
    .filter((line) => line.trim())
    .map((line) => {
      const values = parseRow(line);
      const entry: Record<string, string> = {};

      headers.forEach((header, index) => {
        entry[header] = values[index] ?? "";
      });

      const generatedSlug = entry.slug || slugify(entry.title || "");
      const finalSlug = generatedSlug || `${entry["Appartment folder"] || "listing"}-${Date.now()}`;

      return {
        id: entry.id || finalSlug,
        slug: finalSlug,
        title: entry.title,
        city: entry.city,
        country: entry.country,
        type: entry.type,
        priceEur: parseNumber(entry.priceEur) ?? 0,
        autumnPriceEur: parseNumber(entry.autumn_price),
        springPriceEur: parseNumber(entry.spring_price),
        utilitiesMinEur: parseNumber(entry.utilitiesMinEur),
        utilitiesMaxEur: parseNumber(entry.utilitiesMaxEur),
        district: entry.district,
        address: entry.address,
        bedrooms: parseNumber(entry.bedrooms),
        livingRoom: parseBoolean(entry.livingRoom),
        sizeSqm: parseNumber(entry.sizeSqm),
        amenities: splitSemicolon(entry.amenities),
        images: formatImages(entry),
        createdAt: entry.createdAt || new Date().toISOString(),
      };
    });

  return cache;
}
