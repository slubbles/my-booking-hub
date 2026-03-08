import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ContactPage = () => (
  <div className="py-20">
    <div className="container mx-auto px-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">Let's Work Together</h1>
        <p className="text-muted-foreground mb-2">
          Open to freelance projects, full-time roles, and interesting collaborations.
        </p>
        <p className="text-sm text-muted-foreground mb-10">
          Based in the Philippines (UTC+8) — available for remote work worldwide.
        </p>

        <div className="border border-border rounded-2xl p-8 mb-8">
          <p className="text-sm text-muted-foreground mb-2">Preferred contact method</p>
          <a href="mailto:idderfsalem98@gmail.com" className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors">
            <Mail size={18} />
            idderfsalem98@gmail.com
          </a>

          <div className="flex justify-center gap-3 mt-6 pt-6 border-t border-border">
            {[
              { icon: Github, href: "https://github.com/slubbles", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/idderfsalem/", label: "LinkedIn" },
              { icon: Twitter, href: "https://x.com/idderfsalem", label: "Twitter" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all">
                <s.icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">Or schedule a meeting directly</p>
        <Button variant="dark" size="lg" asChild>
          <Link to="/booking">Book a Call</Link>
        </Button>
      </motion.div>
    </div>
  </div>
);

export default ContactPage;
