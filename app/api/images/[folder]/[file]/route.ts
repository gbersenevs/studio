import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const MIME_MAP: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".heic": "image/heic",
};

export async function GET(_request: Request, { params }: { params: { folder: string; file: string } }) {
  const { folder, file } = params;
  const safeFolder = folder.replace(/\\+/g, "/").replace(/\.\./g, "");
  const safeFile = file.replace(/\.\./g, "");
  const filePath = path.join(process.cwd(), "data", safeFolder, safeFile);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_MAP[ext] || "application/octet-stream";

  return new NextResponse(fileBuffer, {
    headers: { "Content-Type": contentType, "Cache-Control": "public, max-age=3600" },
  });
}
