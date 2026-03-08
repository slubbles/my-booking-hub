import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border mt-0">
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <p className="text-[15px] font-bold text-foreground mb-1.5">Idderf Salem</p>
          <p className="text-[13px] text-muted-foreground leading-[1.5] max-w-xs">
            Full Stack Developer building production web applications from idea to launch.
          </p>
          <div className="flex items-center gap-1.5 mt-4">
            {[
              { icon: Github, href: "https://github.com/slubbles" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/idderfsalem/" },
              { icon: Twitter, href: "https://x.com/idderfsalem" },
              { icon: Mail, href: "mailto:idderfsalem98@gmail.com" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
                <s.icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-16">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium mb-3">Navigate</p>
            <div className="flex flex-col gap-2">
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
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium mb-3">Connect</p>
            <div className="flex flex-col gap-2">
              <Link to="/contact" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              <Link to="/booking" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Book a Call</Link>
              <a href="mailto:idderfsalem98@gmail.com" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Email</a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="md:text-right">
          <p className="text-[13px] text-muted-foreground mb-3">Ready to start a project?</p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground hover:text-primary transition-colors"
          >
            Book a Call <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="border-t border-border mt-10 pt-6 text-center">
        <p className="text-[11px] text-muted-foreground">© {new Date().getFullYear()} Idderf Salem. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
