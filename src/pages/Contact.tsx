import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

const ContactPage = () => (
  <div className="py-20">
    <div className="container mx-auto px-6 max-w-2xl">
      <div className="text-center">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">Let's Work Together</h1>
          <p className="text-muted-foreground mb-2">
            Open to freelance projects, full-time roles, and interesting collaborations.
          </p>
          <p className="text-sm text-muted-foreground mb-10">
            Based in the Philippines (UTC+8) — available for remote work worldwide.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="border border-border rounded-2xl p-8 mb-8">
            <p className="text-sm text-muted-foreground mb-2">Preferred contact method</p>
            <a href="mailto:idderfsalem98@gmail.com" className="story-link inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors">
              <Mail size={18} />
              <span>idderfsalem98@gmail.com</span>
            </a>

            <div className="flex justify-center gap-3 mt-6 pt-6 border-t border-border">
              {[
                { icon: Github, href: "https://github.com/slubbles", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/idderfsalem/", label: "LinkedIn" },
                { icon: Twitter, href: "https://x.com/idderfsalem", label: "Twitter" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all hover-scale">
                  <s.icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p className="text-sm text-muted-foreground mb-4">Or schedule a meeting directly</p>
          <Button variant="dark" size="lg" className="hover-scale" asChild>
            <Link to="/booking">Book a Call</Link>
          </Button>
        </ScrollReveal>
      </div>
    </div>
  </div>
);

export default ContactPage;
