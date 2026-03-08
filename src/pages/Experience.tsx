import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, ShieldCheck } from "lucide-react";

const highlights = [
  "Built and deployed Snarbles, a live production token creation platform on Solana/Algorand",
  "Developed complete Stripe payment integration with React + Node.js backend",
  "Architected P2P marketplace framework with trustless escrow smart contracts",
  "Built Post Content, an AI-powered content generation platform using Grok 4-1",
  "Developed One Dollar Ventures (ODV), a live venture platform with Solana smart contracts",
  "Shipped production MVPs end to end, from smart contracts to mobile-optimized frontends",
];

const certs = [
  { icon: GraduationCap, type: "Bootcamp", title: "Solana Bootcamp", skills: ["Solana Web3.js", "On-chain Programs", "Token Standards"] },
  { icon: Award, type: "Certification", title: "Anchor Framework", skills: ["Rust Smart Contracts", "PDAs", "CPIs"] },
  { icon: ShieldCheck, type: "Training", title: "Smart Contract Security", skills: ["Vulnerability Auditing", "Access Control"] },
];

const ExperiencePage = () => (
  <div className="py-20">
    <div className="container mx-auto px-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">Experience</h1>
        <p className="text-muted-foreground mb-12">Building production systems and shipping real products.</p>
      </motion.div>

      {/* Work */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border border-border rounded-2xl p-6 mb-12"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Briefcase size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="font-semibold text-foreground">Full Stack Web3 Developer</h2>
              <span className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-primary/10 text-primary">Active</span>
            </div>
            <p className="text-sm text-muted-foreground">Freelance • Dec 2023 — Present • Remote, Philippines 🇵🇭</p>
          </div>
        </div>
        <div className="space-y-3 ml-[60px]">
          {highlights.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-xs text-muted-foreground font-mono mt-0.5 flex-shrink-0 w-5">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-xl font-semibold text-foreground mb-6">Education & Certifications</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {certs.map((cert) => (
            <div key={cert.title} className="border border-border rounded-2xl p-5">
              <cert.icon size={20} className="text-primary mb-3" />
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">{cert.type}</p>
              <h3 className="font-medium text-foreground text-sm mb-3">{cert.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((s) => (
                  <span key={s} className="px-2 py-0.5 text-[11px] rounded bg-secondary text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default ExperiencePage;
