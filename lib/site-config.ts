export const siteConfig = {
  company: {
    name: "SmartHome",
    descriptor: "Owner-managed student housing",
    email: "hello@juostudio.example",
    whatsapp: "+000 0000 0000",
    telegram: "@juostudio",
    cities: ["Riga, Latvia", "Palanga, Lithuania"],
  },
  seo: {
    siteName: "SmartHome",
    defaultTitle: "SmartHome student housing in Riga and Palanga",
    defaultDescription:
      "Student apartments and rooms in Riga, Latvia and Palanga, Lithuania, managed directly by one owner.",
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
