import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Blockchain",
    skills: ["Solana (Web3.js, Anchor, Rust)", "Algorand SDK", "SOON Network", "Smart Contracts", "DeFi", "SPL Tokens"],
  },
  {
    title: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "TailwindCSS", "shadcn/ui", "Responsive Design"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "Supabase", "PostgreSQL", "Prisma", "RESTful APIs", "Webhooks"],
  },
  {
    title: "Payment & Billing",
    skills: ["Stripe API", "Polar.sh", "Escrow Systems", "Fiat & Crypto Processing"],
  },
  {
    title: "DevOps & Tools",
    skills: ["Git/GitHub", "Vercel", "Railway", "Netlify", "Docker", "CI/CD", "AWS"],
  },
];

const SkillsPage = () => (
  <div className="py-20">
    <div className="container mx-auto px-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">Technical Skills</h1>
        <p className="text-muted-foreground mb-12">Technologies and tools I ship production code with.</p>
      </motion.div>

      <div className="space-y-6">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="border border-border rounded-2xl p-6"
          >
            <h2 className="font-semibold text-foreground mb-4">{cat.title}</h2>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 text-sm rounded-lg bg-secondary text-secondary-foreground">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default SkillsPage;
