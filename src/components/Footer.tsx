import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12 mt-24">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-semibold text-foreground">Idderf Salem</p>
          <p className="text-sm text-muted-foreground">Full Stack Web3 Developer</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/skills" className="hover:text-foreground transition-colors">Skills</Link>
          <Link to="/projects" className="hover:text-foreground transition-colors">Projects</Link>
          <Link to="/experience" className="hover:text-foreground transition-colors">Experience</Link>
          <Link to="/booking" className="hover:text-foreground transition-colors">Book a Call</Link>
        </div>
        <div className="flex items-center gap-3">
          {[
            { icon: Github, href: "https://github.com/slubbles" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/idderfsalem/" },
            { icon: Twitter, href: "https://x.com/idderfsalem" },
            { icon: Mail, href: "mailto:idderfsalem98@gmail.com" },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all">
              <s.icon size={16} />
            </a>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-8">© {new Date().getFullYear()} Idderf Salem. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
