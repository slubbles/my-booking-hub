import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10 mt-20">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[13px] font-medium text-foreground">Idderf Salem</p>
        <div className="flex items-center gap-5 text-[13px] text-muted-foreground">
          <Link to="/skills" className="hover:text-foreground transition-colors">Skills</Link>
          <Link to="/projects" className="hover:text-foreground transition-colors">Projects</Link>
          <Link to="/experience" className="hover:text-foreground transition-colors">Experience</Link>
          <Link to="/booking" className="hover:text-foreground transition-colors">Book a Call</Link>
        </div>
        <div className="flex items-center gap-2">
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
    </div>
  </footer>
);

export default Footer;
