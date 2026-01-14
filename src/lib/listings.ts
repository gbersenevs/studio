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

  const folder = entry.imageFolder ? entry.imageFolder.replace(/\\/g, "/") : "";
  const basePath = folder ? folder.replace(/\/$/, "") : "";

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
    images: splitSemicolon(entry.images).map((image) =>
      image.startsWith("/") ? image : basePath ? `/${basePath}/${image}` : `/${image}`
    ),
    createdAt: entry.createdAt || new Date().toISOString(),
  };
    });

  return cache;
}
