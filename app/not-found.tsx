import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Home, MessageSquare } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <Container>
        <div className="relative text-center max-w-lg mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6">
            <span className="text-4xl font-bold text-primary">404</span>
          </div>
          <h1 className="text-3xl md:text-4xl mb-4">Page not found</h1>
          <p className="text-text-muted mb-8">
            The page you are looking for does not exist or has been moved. 
            Let&apos;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/">
              <Home className="w-4 h-4 mr-2" />
              Go to home
            </Button>
            <Button href="/#contact" variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
