import { Star } from "lucide-react";
import { Testimonial } from "@/src/types/testimonial";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-white p-6 shadow-soft h-full flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-amber-500">
          {Array.from({ length: testimonial.rating }).map((_, idx) => (
            <Star key={idx} className="w-4 h-4 fill-current" />
          ))}
        </div>
        <span className="text-xs text-text-light">
          {new Date(testimonial.createdAt).toLocaleDateString("en-GB", {
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
      <p className="text-sm text-text-muted flex-1">“{testimonial.text}”</p>
      <div>
        <p className="font-semibold text-text">{testimonial.name}</p>
        <p className="text-xs text-text-light">{testimonial.city}</p>
      </div>
    </div>
  );
}
