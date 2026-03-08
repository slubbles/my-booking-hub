import { Link } from "react-router-dom";
import { ArrowLeft, Home, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import usePageTitle from "@/hooks/usePageTitle";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";

const NotFound = () => {
  usePageTitle("Page Not Found");

  return (
    <PageTransition>
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center px-6 max-w-md">
          <ScrollReveal>
            <div className="relative mb-8">
              <div className="text-[120px] md:text-[180px] font-extrabold leading-none tracking-tighter text-foreground/[0.04] select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/[0.06] flex items-center justify-center">
                  <Search size={32} className="text-primary/60" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h1 className="text-[24px] md:text-[32px] font-bold tracking-[-0.02em] text-foreground mb-3">
              Page not found
            </h1>
            <p className="text-[15px] text-muted-foreground mb-10 leading-[1.7] font-light">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Button size="lg" className="rounded-full px-7 h-11 text-[15px] font-medium shadow-sm group" asChild>
                <Link to="/">
                  <Home size={14} className="mr-1.5" /> Go Home
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-7 h-11 text-[15px] font-medium" onClick={() => window.history.back()}>
                <ArrowLeft size={14} className="mr-1.5" /> Go Back
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="border-t border-border/60 pt-8">
              <p className="text-[13px] text-muted-foreground/60 mb-4">Maybe you were looking for:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { label: "Projects", href: "/projects" },
                  { label: "Experience", href: "/experience" },
                  { label: "Blog", href: "/blog" },
                  { label: "Contact", href: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 text-[14px] rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-300 group"
                  >
                    {link.label}
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
