import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LeadModalProvider } from "@/components/lead-modal-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.seo.defaultTitle,
    template: `%s | ${siteConfig.seo.siteName}`,
  },
  description: siteConfig.seo.defaultDescription,
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    siteName: siteConfig.seo.siteName,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
  },
  metadataBase: new URL("https://student-housing.example"),
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-background">
        <LeadModalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LeadModalProvider>
      </body>
    </html>
  );
}

