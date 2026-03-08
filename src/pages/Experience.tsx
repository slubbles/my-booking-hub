import { Briefcase, GraduationCap, Award, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import usePageTitle from "@/hooks/usePageTitle";

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
  usePageTitle("Experience");
  return (
  <PageTransition>
  <div className="py-16 md:py-24">
    <div className="container mx-auto px-6 max-w-2xl">
      <ScrollReveal>
        <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight text-foreground mb-1">Experience</h1>
        <p className="text-[14px] text-muted-foreground mb-10">Building production systems and shipping real products.</p>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <div className="border border-border rounded-lg p-5 mb-10">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
              <Briefcase size={18} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="text-[15px] font-semibold text-foreground">Full Stack Developer</h2>
                <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/8 text-primary">Active</span>
              </div>
              <p className="text-[12px] text-muted-foreground">Freelance / Self-Employed · Dec 2023 — Present</p>
            </div>
          </div>
          <div className="space-y-2.5 ml-[52px]">
            {highlights.map((item, i) => (
              <ScrollReveal key={i} delay={0.12 + i * 0.04} distance={10}>
                <div className="flex gap-2.5 items-start">
                  <span className="text-[11px] text-muted-foreground font-mono mt-0.5 flex-shrink-0 w-4">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[13px] text-muted-foreground leading-[1.6]">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2 className="text-[16px] font-semibold text-foreground mb-4">Certifications & Training</h2>
      </ScrollReveal>
      <div className="grid sm:grid-cols-3 gap-3">
        {certs.map((cert, i) => (
          <ScrollReveal key={cert.title} delay={0.14 + i * 0.06}>
            <div className="border border-border rounded-lg p-4 hover:border-foreground/12 transition-colors h-full">
              <cert.icon size={18} className="text-primary mb-2.5" />
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">{cert.type}</p>
              <h3 className="text-[13px] font-medium text-foreground">{cert.title}</h3>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </div>
);

export default ExperiencePage;
