import { Home, KeyRound, MessageSquare, Sparkles } from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
import { Container } from "@/components/container";
import { CTAButton } from "@/components/cta-button";
import { ListingCard } from "@/components/listing-card";
import { StepCard } from "@/components/step-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { ValueCard } from "@/components/value-card";
import { getListings } from "@/src/lib/listings";
import { testimonials } from "@/src/data/testimonials";

const offerItems = [
  "Rooms and apartments with clear pricing and noted utilities.",
  "Riga and Palanga locations managed directly by one owner.",
  "Contact by email, WhatsApp, or Telegram. No agencies.",
  "Viewings in person or remote, with simple next steps.",
];

const values = [
  {
    title: "Transparency",
    description: "Straightforward terms and expectations from the first message.",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    title: "Responsiveness",
    description: "Quick replies and clear timing, even for international students.",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    title: "Respect for students",
    description: "Calm communication, no pressure, and honest details.",
    icon: <KeyRound className="w-5 h-5" />,
  },
  {
    title: "Well maintained",
    description: "Spaces kept in good order with one accountable owner.",
    icon: <Home className="w-5 h-5" />,
  },
];

const steps = [
  {
    title: "Choose a listing",
    description: "Browse rooms and apartments in Riga or Palanga.",
  },
  {
    title: "Request more info or reserve a call",
    description: "Tell us how to contact you and what you need.",
  },
  {
    title: "Schedule a viewing",
    description: "In-person or remote video walkthroughs on your time.",
  },
  {
    title: "Sign and move in",
    description: "Agree on terms, sign, and pick a handover date.",
  },
];

export default function HomePage() {
  const previewListings = getListings().slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-surface via-white to-primary/5">
        <Container className="py-16 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-soft border border-border/70 text-sm text-text-muted">
              SmartHome • Owner-managed housing
            </div>
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-text-light">
                SmartHome
              </p>
              <h1 className="text-4xl md:text-5xl font-semibold text-text leading-tight">
                Student apartments and rooms in Riga, Latvia and Palanga, Lithuania
              </h1>
              <p className="text-lg text-text-muted">
                All listings are owned and managed by one owner. Clear communication and simple steps to move in.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <CTAButton label="Reserve a call" size="lg" />
              <CTAButton
                label="Browse listings"
                href="/listings"
                variant="ghost"
                size="lg"
                className="gap-2"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoBadge label="Direct owner" text="No intermediaries" />
              <InfoBadge label="Two cities" text="Riga and Palanga" />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1400&auto=format&fit=crop&q=80"
                alt="Bright student apartment interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute left-4 bottom-4 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-text shadow-soft">
                Placeholder imagery - final photos coming soon
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeader
          title="What we offer"
          subtitle="Listings show pricing, utilities, and contact options up front."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {offerItems.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-border/70 bg-white p-4 shadow-soft"
            >
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <p className="text-sm text-text-muted">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section background="surface">
        <SectionHeader title="Our values" centered />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((value) => (
            <ValueCard
              key={value.title}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Listings preview"
          subtitle="These are placeholder listings. Details will be updated before move-in dates."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {previewListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </Section>

      <Section id="how-it-works" background="surface">
        <SectionHeader
          title="How it works"
          subtitle="Four simple steps from request to move-in."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <StepCard
              key={step.title}
              step={index + 1}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </Section>

      <Section id="reviews">
        <SectionHeader
          title="Reviews"
          subtitle="Placeholder student feedback to show how we communicate."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </Section>

      <Section id="contact" background="surface">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <SectionHeader
              title="Contact"
              subtitle="Pick a channel and we will respond with available slots and next steps."
            />
            <div className="space-y-3 text-sm text-text-muted">
              <ContactLine label="Email" value="hello@juostudio.example" />
              <ContactLine label="WhatsApp" value="+000 0000 0000" />
              <ContactLine label="Telegram" value="@juostudio" />
            </div>
          </div>
          <div className="rounded-2xl border border-border/70 bg-white p-6 shadow-soft space-y-4">
            <p className="text-sm text-text-muted">
              Prefer a quick form? Send a request and we will get back with viewing times.
            </p>
            <CTAButton label="Request more info" variant="primary" size="md" className="w-full" />
            <CTAButton label="Reserve a call" variant="ghost" size="md" className="w-full" />
          </div>
        </div>
      </Section>
    </>
  );
}

function InfoBadge({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-white p-4 shadow-soft">
      <p className="text-xs text-text-light">{label}</p>
      <p className="text-sm font-semibold text-text">{text}</p>
    </div>
  );
}

function ContactLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-surface px-3 py-2">
      <span className="text-xs font-semibold text-text">{label}</span>
      <span className="text-sm text-text-muted">{value}</span>
    </div>
  );
}
