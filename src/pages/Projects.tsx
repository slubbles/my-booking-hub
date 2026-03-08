import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Snarbles",
    role: "Web3 & Full Stack Developer (Solo)",
    description: "No-code platform for creating tokens on Solana & Algorand in under 30 seconds.",
    tags: ["Next.js", "TypeScript", "Algorand SDK", "Solana Web3.js"],
    status: "Live Production",
    statusColor: "bg-primary/10 text-primary",
  },
  {
    title: "Stripe Payment Integration",
    role: "Full Stack Developer",
    description: "Complete payment processing with React frontend and Node.js backend.",
    tags: ["React", "Node.js", "Express", "Stripe API"],
    status: "Production-Ready",
    statusColor: "bg-secondary text-secondary-foreground",
  },
  {
    title: "Token Presale Platform",
    role: "Smart Contract & Full Stack Developer",
    description: "Multi-round token sales with vesting schedules and escrow.",
    tags: ["Anchor (Rust)", "Next.js", "TypeScript", "TailwindCSS"],
    status: "MVP",
    statusColor: "bg-secondary text-secondary-foreground",
  },
  {
    title: "Post Content",
    role: "Full Stack Developer",
    description: "AI-powered content posting & management system with Grok 4-1 fast reasoning.",
    tags: ["Next.js", "TypeScript", "Node.js", "Grok API"],
    status: "Live",
    statusColor: "bg-primary/10 text-primary",
  },
  {
    title: "One Dollar Ventures (ODV)",
    role: "Smart Contract & Full Stack Developer",
    description: "Platform for affordable venture opportunities built with React and Node.js.",
    tags: ["React", "Node.js", "TypeScript", "Solana"],
    status: "Live",
    statusColor: "bg-primary/10 text-primary",
  },
  {
    title: "P2P Marketplace Framework",
    role: "Smart Contract & Full Stack Developer",
    description: "Trustless escrow system for peer-to-peer transactions.",
    tags: ["Solana", "Next.js", "TypeScript", "shadcn/ui"],
    status: "Live MVP",
    statusColor: "bg-primary/10 text-primary",
  },
];

const ProjectsPage = () => (
  <div className="py-20">
    <div className="container mx-auto px-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">Projects</h1>
        <p className="text-muted-foreground mb-12">Live production systems and frameworks I've built.</p>
      </motion.div>

      <div className="space-y-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group border border-border rounded-2xl p-6 hover:border-foreground/15 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-lg font-semibold text-foreground">{project.title}</h2>
                  <span className={`px-2.5 py-0.5 text-[11px] font-medium rounded-full ${project.statusColor}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{project.role}</p>
              </div>
              <ExternalLink size={16} className="text-muted-foreground group-hover:text-foreground transition-colors mt-1" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-xs rounded-md bg-secondary text-muted-foreground">{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default ProjectsPage;
