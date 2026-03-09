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
  <footer className="border-t border-border/20">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <span className="text-[15px] font-semibold text-foreground">Idderf Salem</span>
          </div>
          <p className="text-[14px] text-muted-foreground leading-[1.7] max-w-xs mb-6 font-light">
            Full Stack Developer building production web applications from idea to launch.
          </p>
          <div className="flex items-center gap-1">
            {socialLinks.map((s) => (
              <Tooltip key={s.label}>
                <TooltipTrigger asChild>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-secondary/60 transition-all duration-300"
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
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground/60 font-medium mb-4">Navigate</p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: "Experience", href: "/experience" },
                { label: "Blog", href: "/blog" },
                { label: "Skills", href: "/skills" },
                { label: "Experience", href: "/experience" },
              ].map((link) => (
                <Link key={link.href} to={link.href} className="text-[14px] text-muted-foreground/70 hover:text-foreground transition-colors duration-300">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground/60 font-medium mb-4">Connect</p>
            <div className="flex flex-col gap-2.5">
              <Link to="/contact" className="text-[14px] text-muted-foreground/70 hover:text-foreground transition-colors duration-300">Contact</Link>
              <Link to="/booking" className="text-[14px] text-muted-foreground/70 hover:text-foreground transition-colors duration-300">Book a Call</Link>
              <a href="mailto:idderfsalem98@gmail.com" className="text-[14px] text-muted-foreground/70 hover:text-foreground transition-colors duration-300">Email</a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="md:text-right">
          <p className="text-[14px] text-muted-foreground/70 mb-3 font-light">Ready to start a project?</p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-foreground hover:text-primary transition-colors duration-300 group"
          >
            Book a Call <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      <div className="border-t border-border/40 mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-[12px] text-muted-foreground/50">&copy; {new Date().getFullYear()} Idderf Salem</p>
        <p className="text-[12px] text-muted-foreground/50">Built with React &amp; Tailwind CSS</p>
      </div>
    </div>
  </footer>
);

export default Footer;
