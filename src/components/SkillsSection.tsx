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

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gradient">Technical Skills</span>
          </h2>
          <p className="text-muted-foreground">Technologies and tools I ship production code with</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-primary/20 transition-colors group"
            >
              <h3 className="font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs rounded-lg bg-secondary text-secondary-foreground border border-border/30"
                  >
                    {skill}
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

export default SkillsSection;
