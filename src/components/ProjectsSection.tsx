import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Snarbles",
    role: "Web3 & Full Stack Developer",
    description: "No-code platform for creating tokens on Solana & Algorand in under 30 seconds",
    tags: ["Next.js", "TypeScript", "Algorand SDK", "Solana Web3.js"],
    badge: "LIVE PRODUCTION",
    badgeVariant: "default" as const,
  },
  {
    title: "Stripe Payment Integration",
    role: "Full Stack Developer",
    description: "Complete payment processing with React frontend and Node.js backend",
    tags: ["React", "Node.js", "Express", "Stripe API"],
    badge: "PRODUCTION-READY",
    badgeVariant: "secondary" as const,
  },
  {
    title: "Token Presale Platform",
    role: "Smart Contract & Full Stack Developer",
    description: "Multi-round token sales with vesting schedules and escrow",
    tags: ["Anchor (Rust)", "Next.js", "TypeScript", "TailwindCSS"],
    badge: "MVP",
    badgeVariant: "outline" as const,
  },
  {
    title: "Post Content",
    role: "Full Stack Developer",
    description: "AI-powered content posting & management system with Grok 4-1 fast reasoning",
    tags: ["Next.js", "TypeScript", "Node.js", "Grok API"],
    badge: "LIVE",
    badgeVariant: "default" as const,
  },
  {
    title: "One Dollar Ventures (ODV)",
    role: "Smart Contract & Full Stack Developer",
    description: "Platform for affordable venture opportunities built with React and Node.js",
    tags: ["React", "Node.js", "TypeScript", "Solana"],
    badge: "LIVE",
    badgeVariant: "default" as const,
  },
  {
    title: "P2P Marketplace Framework",
    role: "Smart Contract & Full Stack Developer",
    description: "Trustless escrow system for peer-to-peer transactions",
    tags: ["Solana", "Next.js", "TypeScript", "shadcn/ui"],
    badge: "LIVE MVP",
    badgeVariant: "default" as const,
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-muted-foreground">Live production systems and frameworks I've built</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6 group hover:border-primary/20 transition-all flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <Badge variant={project.badgeVariant} className="text-[10px] uppercase tracking-wider">
                  {project.badge}
                </Badge>
                <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{project.role}</p>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-[10px] rounded-md bg-secondary text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
