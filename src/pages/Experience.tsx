import {} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import useSEO from "@/hooks/useSEO";

const highlights = [
  "Designed, built, and deployed multiple production web applications from scratch, handling all layers of the stack",
  "Implemented Stripe payment integration with secure checkout flows, webhook handling, and subscription management",
  "Built RESTful APIs with Node.js and integrated third-party services including payment processors and AI APIs",
  "Deployed and maintained live apps on Vercel, Railway, and Netlify with CI/CD pipelines",
  "Architected a peer-to-peer marketplace with escrow logic and real transaction handling",
];

const certs = [
  { icon: GraduationCap, type: "Bootcamp", title: "Solana Bootcamp" },
  { icon: Award, type: "Certification", title: "Anchor Framework" },
  { icon: ShieldCheck, type: "Training", title: "Smart Contract Security" },
];

const ExperiencePage = () => {
  useSEO({ title: "Experience", description: "Professional experience and certifications of Idderf Salem - Full Stack Developer.", path: "/experience" });
  return (
    <PageTransition>
      <div className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-2xl">
          <ScrollReveal>
            <span className="text-[12px] uppercase tracking-[0.25em] text-primary/80 font-medium">Background</span>
            <h1 className="text-[30px] md:text-[40px] font-bold tracking-[-0.02em] text-foreground mt-2 mb-1">Experience</h1>
            <p className="text-[15px] text-muted-foreground mb-10 font-light">Building production systems and shipping real products.</p>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="bg-card border border-border/60 rounded-2xl p-6 mb-10 premium-shadow hover:premium-shadow-hover transition-all duration-500">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 rounded-xl bg-primary/[0.08] flex items-center justify-center flex-shrink-0">
                  <Briefcase size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h2 className="text-[16px] font-semibold text-foreground">Full Stack Developer</h2>
                    <span className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-primary/[0.08] text-primary tracking-wide">Active</span>
                  </div>
                  <p className="text-[14px] text-muted-foreground/70 mt-0.5">Freelance / Self-Employed · Dec 2023 - Present</p>
                </div>
              </div>
              <div className="space-y-3 ml-[60px]">
                {highlights.map((item, i) => (
                  <ScrollReveal key={i} delay={0.1 + i * 0.04} distance={8}>
                    <div className="flex gap-3 items-start">
                      <span className="text-[11px] text-primary/60 font-mono mt-1 flex-shrink-0 w-4 text-right">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-[14px] text-muted-foreground leading-[1.75]">{item}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2 className="text-[16px] font-semibold text-foreground mb-4">Certifications & Training</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-4">
            {certs.map((cert, i) => (
              <ScrollReveal key={cert.title} delay={0.12 + i * 0.05}>
                <div className="bg-card border border-border/60 rounded-2xl p-5 premium-shadow hover:premium-shadow-hover transition-all duration-500 h-full">
                  <cert.icon size={18} className="text-primary/80 mb-3" />
                  <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground/60 mb-1">{cert.type}</p>
                  <h3 className="text-[15px] font-semibold text-foreground">{cert.title}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ExperiencePage;
