import { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Request",
  description: "Send a request to reserve a call or get more info about a listing.",
};

export default function RequestPage({
  searchParams,
}: {
  searchParams?: { slug?: string };
}) {
  const listingSlug = searchParams?.slug;

  return (
    <Container className="py-14">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-text-light">Lead form</p>
        <h1 className="text-4xl font-semibold text-text">Request more info</h1>
        <p className="text-text-muted">
          Use this form if the modal is unavailable. If you came from a listing, its slug is included for context.
        </p>
        <div className="rounded-2xl border border-border/70 bg-white p-6 shadow-soft">
          <LeadForm listingSlug={listingSlug} />
        </div>
      </div>
    </Container>
  );
}
