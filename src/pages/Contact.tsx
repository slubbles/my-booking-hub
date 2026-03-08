import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import usePageTitle from "@/hooks/usePageTitle";

const ContactPage = () => (
  <div className="py-16 md:py-24">
    <div className="container mx-auto px-6 max-w-lg">
      <div className="text-center">
        <ScrollReveal>
          <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight text-foreground mb-2">Let's Work Together</h1>
          <p className="text-[14px] text-muted-foreground mb-1">
            Open to freelance projects, full-time roles, and collaborations.
          </p>
          <p className="text-[12px] text-muted-foreground mb-8">
            Based in the Philippines (UTC+8) — available for remote work worldwide.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="border border-border rounded-lg p-6 mb-6">
            <p className="text-[12px] text-muted-foreground mb-1.5">Preferred contact</p>
            <a href="mailto:idderfsalem98@gmail.com" className="inline-flex items-center gap-2 text-[14px] text-foreground font-medium hover:text-primary transition-colors">
              <Mail size={16} />
              idderfsalem98@gmail.com
            </a>

            <div className="flex justify-center gap-2 mt-5 pt-5 border-t border-border">
              {[
                { icon: Github, href: "https://github.com/slubbles" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/idderfsalem/" },
                { icon: Twitter, href: "https://x.com/idderfsalem" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.18}>
          <p className="text-[12px] text-muted-foreground mb-3">Or schedule a meeting</p>
          <Button size="lg" asChild>
            <Link to="/booking">Book a Call</Link>
          </Button>
        </ScrollReveal>
      </div>
    </div>
  </div>
);

export default ContactPage;
