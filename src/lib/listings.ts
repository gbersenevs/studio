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

function deriveImagePaths(entry: Record<string, string>) {
  const explicit = splitSemicolon(entry.images);
  if (explicit.length) {
    return explicit;
  }

  const folder =
    entry["Appartment folder"] ||
    entry["Apartment folder"] ||
    entry["imageFolder"] ||
    entry.imageFolder ||
    "";

  if (!folder) {
    return ["/placeholder/studio.jpg"];
  }

  const normalized = folder.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
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

      return {
        id: entry.id,
        slug: entry.slug,
        title: entry.title,
        city: entry.city as Listing["city"],
        country: entry.country,
        type: entry.type as Listing["type"],
        priceEur: Number(entry.priceEur),
        utilitiesMinEur: entry.utilitiesMinEur ? Number(entry.utilitiesMinEur) : undefined,
        utilitiesMaxEur: entry.utilitiesMaxEur ? Number(entry.utilitiesMaxEur) : undefined,
        district: entry.district,
        address: entry.address,
        bedrooms: entry.bedrooms ? Number(entry.bedrooms) : undefined,
        livingRoom: entry.livingRoom === "true",
        sizeSqm: entry.sizeSqm ? Number(entry.sizeSqm) : undefined,
        amenities: splitSemicolon(entry.amenities),
        images: deriveImagePaths(entry),
        createdAt: entry.createdAt || new Date().toISOString(),
      };
    });

  return cache;
}
