import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const highlights = [
  "Built and deployed Snarbles, a live production token creation platform on Solana/Algorand",
  "Developed complete Stripe payment integration with React + Node.js backend",
  "Architected P2P marketplace framework with trustless escrow smart contracts",
  "Built Post Content, an AI-powered content generation platform using Grok 4-1",
  "Developed One Dollar Ventures (ODV), a live venture platform with Solana smart contracts",
  "Shipped production MVPs end to end, from smart contracts to mobile-optimized frontends",
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gradient">Work Experience</span>
          </h2>
          <p className="text-muted-foreground">Building production systems and shipping real products</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
              <Briefcase size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Full Stack Web3 Developer</h3>
              <p className="text-sm text-muted-foreground">Self-Employed • Freelance</p>
              <p className="text-xs text-primary mt-1">Dec 2023 — Present • Remote, Philippines 🇵🇭</p>
            </div>
            <span className="ml-auto px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              Active
            </span>
          </div>

          <div className="space-y-3">
            {highlights.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="font-mono text-xs text-primary mt-0.5 flex-shrink-0">0{i + 1}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
