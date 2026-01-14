export const siteConfig = {
  company: {
    name: "Company name",
    descriptor: "Student housing company",
    email: "hello@student-housing.example",
    whatsapp: "+000 0000 0000",
    telegram: "@studenthousing",
    cities: ["Riga, Latvia", "Palanga, Lithuania"],
  },
  seo: {
    siteName: "Company name",
    defaultTitle: "Student housing in Riga and Palanga",
    defaultDescription:
      "Student apartments and rooms in Riga, Latvia and Palanga, Lithuania managed by one owner.",
    locale: "en",
    type: "website",
  },
  navigation: {
    main: [
      { label: "Home", href: "/" },
      { label: "Listings", href: "/listings" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Reviews", href: "/#reviews" },
      { label: "Contact", href: "/#contact" },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
