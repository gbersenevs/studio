"use client";

import Image from "next/image";
import { useState } from "react";

type ImageGalleryProps = {
  images: string[];
};

export function ImageGallery({ images }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [preview, setPreview] = useState(false);

  if (!images.length) {
    return null;
  }

  const active = images[current];

  const goPrev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () => setCurrent((prev) => (prev + 1) % images.length);

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border border-border/70 shadow-soft">
        <div className="aspect-[4/3] relative">
          <Image
            src={active}
            alt={`Listing image ${current + 1}`}
            fill
            className="object-cover cursor-pointer"
            onClick={() => setPreview(true)}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            type="button"
            onClick={goPrev}
            className="h-10 w-10 rounded-full bg-white/80 text-text shadow hover:bg-white"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            className="h-10 w-10 rounded-full bg-white/80 text-text shadow hover:bg-white"
          >
            ›
          </button>
        </div>
        <div className="absolute left-4 bottom-4 rounded-full bg-white/90 px-3 py-1 text-xs text-text shadow-soft">
          {current + 1}/{images.length}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, index) => (
          <button
            key={img + index}
            type="button"
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60"
            onClick={() => {
              setCurrent(index);
              setPreview(true);
            }}
          >
            <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              type="button"
              onClick={() => setPreview(false)}
              className="absolute top-4 right-4 z-20 rounded-full bg-white/80 p-2 text-2xl"
            >
              ×
            </button>
            <div className="relative aspect-[4/3]">
              <Image src={active} alt={`Preview ${current + 1}`} fill className="object-contain" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
