# SmartHome Student Housing MVP

Next.js App Router site for SmartHome, an owner-managed student housing brand covering Riga, Latvia and Palanga, Lithuania. All listings are managed by one owner and use placeholder data ready for a future Telegram bot integration.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Validation**: Zod + server actions
- **Forms**: React server actions with reusable LeadForm
- **Icons**: Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the site.

## Key Routes

- `/` – Home with hero, values, how-it-works, reviews, contact anchor
- `/listings` – Filterable listings index with server-side search params
- `/listing/[slug]` – Listing detail with gallery and CTAs
- `/request` – Fallback lead form page (same form as modal)

## Components

- Reusable CTA button, LeadForm, modal provider
- ListingCard, FiltersSidebar, StepCard, ValueCard, TestimonialCard

## Lead Capture

- Server action with Zod validation
- Stubbed Telegram sender in `src/lib/telegram.ts` logging when env vars are missing
- Fields: full name, email, optional phone, city of interest, preferred contact channel, optional message, agreement checkbox, optional listing slug

## Theming

- Light theme with subtle green and pastel accents
- Custom Tailwind palette set in `tailwind.config.ts`

## Notes

- Icons and favicons are placeholders located in `app/icon.svg` and `public/favicon.svg`.
- Previous service content and branding have been removed. Replace placeholder contact details in `lib/site-config.ts` when ready.
