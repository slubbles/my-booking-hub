import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import useSEO from "@/hooks/useSEO";

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

const SkillsPage = () => {
  useSEO({ title: "Skills", description: "Technical skills and expertise of Idderf Salem — React, TypeScript, Node.js, Stripe, and more.", path: "/skills" });
  return (
    <PageTransition>
      <div className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-2xl">
          <ScrollReveal>
            <span className="text-[12px] uppercase tracking-[0.25em] text-primary/80 font-medium">Expertise</span>
            <h1 className="text-[30px] md:text-[40px] font-bold tracking-[-0.02em] text-foreground mt-2 mb-1">Technical Skills</h1>
            <p className="text-[15px] text-muted-foreground mb-10 font-light">Technologies and tools I ship production code with.</p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {skillCategories.map((cat, i) => (
              <ScrollReveal key={cat.title} delay={i * 0.05}>
                <div className="bg-card border border-border/60 rounded-2xl p-5 h-full premium-shadow hover:premium-shadow-hover transition-all duration-500">
                  <h2 className="text-[15px] font-semibold text-foreground mb-3">{cat.title}</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 text-[13px] rounded-full bg-secondary text-muted-foreground/80 font-medium hover:text-foreground hover:bg-primary/[0.06] hover:border-primary/20 transition-all duration-300 cursor-default">
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
    </PageTransition>
  );
};

export default SkillsPage;
