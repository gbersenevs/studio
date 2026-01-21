import Link from "next/link";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Container } from "./container";
import { CTAButton } from "./cta-button";

export function Footer() {
  const { company, navigation } = siteConfig;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface text-text mt-16 border-t border-border/60">
      <Container>
        <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-semibold">
                SH
              </div>
              <div>
                <p className="font-semibold text-text">{company.name}</p>
                <p className="text-sm text-text-light">{company.descriptor}</p>
              </div>
            </div>
            <p className="text-sm text-text-muted">
              Student apartments and rooms in Riga, Latvia and Palanga, Lithuania. All listings are managed by one owner.
            </p>
            <p className="text-xs text-text-light">
              The information on this site uses placeholders while details are prepared.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-text">Navigate</h4>
            <div className="flex flex-col gap-2 text-sm text-text-muted">
              {navigation.main.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              ))}
              <CTAButton label="Request more info" variant="ghost" size="sm" className="w-max" />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-text">Contact</h4>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <Mail className="w-4 h-4 text-primary" />
              <span>{company.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span>{company.whatsapp} / {company.telegram}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{company.cities.join(" • ")}</span>
            </div>
          </div>
        </div>
        <div className="py-4 border-t border-border/60 text-sm text-text-light flex justify-between items-center flex-wrap gap-2">
          <span>© {currentYear} {company.name}. All rights reserved.</span>
          <span>Built for students with clear and direct communication.</span>
        </div>
      </Container>
    </footer>
  );
}
