import ScrollReveal from "@/components/ScrollReveal";

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
      <ScrollReveal>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">Technical Skills</h1>
        <p className="text-muted-foreground mb-12">Technologies and tools I ship production code with.</p>
      </ScrollReveal>

      <div className="space-y-6">
        {skillCategories.map((cat, i) => (
          <ScrollReveal key={cat.title} delay={i * 0.08}>
            <div className="border border-border rounded-2xl p-6 hover:border-foreground/15 transition-colors">
              <h2 className="font-semibold text-foreground mb-4">{cat.title}</h2>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-sm rounded-lg bg-secondary text-secondary-foreground hover-scale inline-block">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </div>
);

export default SkillsPage;
