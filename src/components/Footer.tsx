import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const socialLinks = [
  { icon: Github, href: "https://github.com/slubbles", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/idderfsalem/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/idderfsalem", label: "X (Twitter)" },
  { icon: Mail, href: "mailto:idderfsalem98@gmail.com", label: "Email" },
];

const Footer = () => (
  <footer className="border-t border-border mt-0">
    <div className="container mx-auto px-6 py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-[11px] font-bold">
              IS
            </div>
            <span className="text-[15px] font-bold text-foreground">Idderf Salem</span>
          </div>
          <p className="text-[13px] text-muted-foreground leading-[1.6] max-w-xs mb-5">
            Full Stack Developer building production web applications from idea to launch.
          </p>
          <div className="flex items-center gap-1.5">
            {socialLinks.map((s) => (
              <Tooltip key={s.label}>
                <TooltipTrigger asChild>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
                  >
                    <s.icon size={15} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{s.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4">Navigate</p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Skills", href: "/skills" },
                { label: "Projects", href: "/projects" },
                { label: "Experience", href: "/experience" },
              ].map((link) => (
                <Link key={link.href} to={link.href} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4">Connect</p>
            <div className="flex flex-col gap-2.5">
              <Link to="/contact" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              <Link to="/booking" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Book a Call</Link>
              <a href="mailto:idderfsalem98@gmail.com" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Email</a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="md:text-right">
          <p className="text-[13px] text-muted-foreground mb-4">Ready to start a project?</p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-foreground hover:text-primary transition-colors group"
          >
            Book a Call <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="border-t border-border mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-[11px] text-muted-foreground">© {new Date().getFullYear()} Idderf Salem. All rights reserved.</p>
        <p className="text-[11px] text-muted-foreground">Built with React & Tailwind CSS</p>
      </div>
    </div>
  </footer>
);

export default Footer;
