import { Mail, Github, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import usePageTitle from "@/hooks/usePageTitle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ContactPage = () => {
  usePageTitle("Contact");
  return (
    <PageTransition>
      <div className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-lg">
          <div className="text-center">
            <ScrollReveal>
              <span className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-medium">Get in Touch</span>
              <h1 className="text-[30px] md:text-[40px] font-bold tracking-[-0.02em] text-foreground mt-2 mb-2">Let's Work Together</h1>
              <p className="text-[14px] text-muted-foreground mb-1 font-light">
                Open to freelance projects, full-time roles, and collaborations.
              </p>
              <p className="text-[12px] text-muted-foreground/70 mb-12">
                Based in the Philippines (UTC+8) - available for remote work worldwide.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="bg-card border border-border/60 rounded-2xl p-7 mb-8 premium-shadow hover:premium-shadow-hover transition-all duration-500">
                <p className="text-[11px] text-muted-foreground/70 mb-2">Preferred contact</p>
                <a href="mailto:idderfsalem98@gmail.com" className="inline-flex items-center gap-2 text-[14px] text-foreground font-medium hover:text-primary transition-colors duration-300">
                  <Mail size={16} />
                  idderfsalem98@gmail.com
                </a>

                <div className="flex justify-center gap-2 mt-6 pt-6 border-t border-border/50">
                  {[
                    { icon: Github, href: "https://github.com/slubbles", label: "GitHub" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/idderfsalem/", label: "LinkedIn" },
                    { icon: Twitter, href: "https://x.com/idderfsalem", label: "X (Twitter)" },
                  ].map((s) => (
                    <Tooltip key={s.label}>
                      <TooltipTrigger asChild>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="w-9 h-9 rounded-xl border border-border/60 flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:border-border hover:bg-secondary/50 transition-all duration-300"
                        >
                          <s.icon size={14} />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{s.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.14}>
              <p className="text-[12px] text-muted-foreground/70 mb-4">Or schedule a meeting</p>
              <Button size="lg" className="rounded-full px-8 h-11 text-[13px] font-medium shadow-sm" asChild>
                <Link to="/booking">Book a Call <ArrowRight size={15} className="ml-1" /></Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
