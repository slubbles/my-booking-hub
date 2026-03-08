import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gradient">Let's Work Together</span>
          </h2>
          <p className="text-muted-foreground mb-2">
            Open to freelance projects, full-time roles, and interesting collaborations.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Based in the Philippines (UTC+8) — available for remote work worldwide.
          </p>

          <a
            href="mailto:idderfsalem98@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-medium glow hover:opacity-90 transition-opacity mb-8"
          >
            <Mail size={18} />
            idderfsalem98@gmail.com
          </a>

          <div className="flex justify-center gap-4 mt-6">
            {[
              { icon: Github, href: "https://github.com/slubbles" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/idderfsalem/" },
              { icon: Twitter, href: "https://x.com/idderfsalem" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
