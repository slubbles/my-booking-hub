import { Mail, Github, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import usePageTitle from "@/hooks/usePageTitle";

const ContactPage = () => {
  usePageTitle("Contact");
  return (
    <PageTransition>
      <div className="py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-lg">
          <div className="text-center">
            <ScrollReveal>
              <span className="text-[11px] uppercase tracking-[0.2em] text-primary font-medium">Get in Touch</span>
              <h1 className="text-[32px] md:text-[42px] font-bold tracking-tight text-foreground mt-2 mb-2">Let's Work Together</h1>
              <p className="text-[15px] text-muted-foreground mb-1">
                Open to freelance projects, full-time roles, and collaborations.
              </p>
              <p className="text-[13px] text-muted-foreground mb-10">
                Based in the Philippines (UTC+8) — available for remote work worldwide.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="border border-border rounded-xl p-7 mb-8 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] transition-all duration-300">
                <p className="text-[12px] text-muted-foreground mb-2">Preferred contact</p>
                <a href="mailto:idderfsalem98@gmail.com" className="inline-flex items-center gap-2 text-[15px] text-foreground font-medium hover:text-primary transition-colors">
                  <Mail size={17} />
                  idderfsalem98@gmail.com
                </a>

                <div className="flex justify-center gap-2 mt-6 pt-6 border-t border-border">
                  {[
                    { icon: Github, href: "https://github.com/slubbles", label: "GitHub" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/idderfsalem/", label: "LinkedIn" },
                    { icon: Twitter, href: "https://x.com/idderfsalem", label: "X (Twitter)" },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/20 hover:bg-secondary transition-all duration-200">
                      <s.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              <p className="text-[13px] text-muted-foreground mb-4">Or schedule a meeting</p>
              <Button size="lg" className="rounded-full px-8 h-12 text-[14px]" asChild>
                <Link to="/booking">Book a Call <ArrowRight size={16} /></Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
