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

const SkillsPage = () => {
  usePageTitle("Skills");
  return (
    <PageTransition>
      <div className="py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-2xl">
          <ScrollReveal>
            <span className="text-[11px] uppercase tracking-[0.2em] text-primary font-medium">Expertise</span>
            <h1 className="text-[32px] md:text-[42px] font-bold tracking-tight text-foreground mt-2 mb-1">Technical Skills</h1>
            <p className="text-[15px] text-muted-foreground mb-12">Technologies and tools I ship production code with.</p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {skillCategories.map((cat, i) => (
              <ScrollReveal key={cat.title} delay={i * 0.06}>
                <div className="border border-border rounded-xl p-5 h-full hover:border-foreground/15 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] transition-all duration-300">
                  <h2 className="text-[14px] font-bold text-foreground mb-3">{cat.title}</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 text-[12px] rounded-full border border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground transition-all duration-200 cursor-default">
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
