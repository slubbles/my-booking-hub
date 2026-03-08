import { motion } from "framer-motion";
import { MapPin, Clock, Github, Linkedin, Twitter, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import profileImg from "@/assets/profile.jpg";

const roles = ["Full Stack Developer", "Web3 Engineer", "Product Builder", "Blockchain Developer"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
          if (displayText.length === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const stats = [
    { value: "2+", label: "Years Experience" },
    { value: "6+", label: "Live Projects" },
    { value: "3", label: "Blockchains" },
    { value: "10+", label: "Happy Clients" },
  ];

  const socials = [
    { icon: Github, href: "https://github.com/slubbles", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/idderfsalem/", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/idderfsalem", label: "Twitter" },
    { icon: Mail, href: "mailto:idderfsalem98@gmail.com", label: "Email" },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(175 80% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(175 80% 50%) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Profile image */}
          <div className="relative mb-6">
            <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-primary/30 p-1">
              <img src={profileImg} alt="Idderf Salem" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                Available for Work
              </span>
            </div>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-gradient">Idderf Salem</span>
          </h1>

          {/* Typewriter */}
          <div className="h-10 flex items-center mb-4">
            <span className="font-mono text-lg md:text-xl text-muted-foreground">
              {displayText}
              <span className="animate-pulse-glow text-primary">|</span>
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5"><MapPin size={14} /> Philippines 🇵🇭</span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> UTC+8</span>
          </div>

          {/* Bio */}
          <p className="max-w-2xl text-muted-foreground leading-relaxed mb-8 text-sm md:text-base">
            Product Engineer and Full Stack Developer with over a year of production experience building and deploying Web3 MVPs and traditional web applications. Proven track record shipping complete end-to-end solutions.
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl px-8 py-5 mb-8 inline-flex gap-8 md:gap-12"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 mb-8"
          >
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="#booking">Book a Call</a>
            </Button>
          </motion.div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
