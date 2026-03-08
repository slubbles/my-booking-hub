import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import usePageTitle from "@/hooks/usePageTitle";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "RESTful APIs", "Webhooks", "Prisma ORM"],
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "Supabase"],
  },
  {
    title: "Payments",
    skills: ["Stripe API", "Polar.sh", "Escrow Systems", "Fiat & Crypto Processing"],
  },
  {
    title: "DevOps & Tools",
    skills: ["Git/GitHub", "Vercel", "Railway", "Netlify", "Docker", "CI/CD", "AWS (familiar)"],
  },
  {
    title: "Integrations",
    skills: ["Claude API", "Grok API", "X API"],
  },
  {
    title: "Bonus",
    skills: ["Solana blockchain", "Rust", "Smart Contracts"],
  },
];

const SkillsPage = () => (
  <div className="py-16 md:py-24">
    <div className="container mx-auto px-6 max-w-2xl">
      <ScrollReveal>
        <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight text-foreground mb-1">Technical Skills</h1>
        <p className="text-[14px] text-muted-foreground mb-10">Technologies and tools I ship production code with.</p>
      </ScrollReveal>

      <div className="space-y-5">
        {skillCategories.map((cat, i) => (
          <ScrollReveal key={cat.title} delay={i * 0.06}>
            <div className="border border-border rounded-lg p-5 hover:border-foreground/12 transition-colors">
              <h2 className="text-[14px] font-semibold text-foreground mb-3">{cat.title}</h2>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 text-[12px] rounded-md bg-secondary text-muted-foreground">
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
