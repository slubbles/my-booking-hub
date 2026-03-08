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
      <div className="py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-2xl">
          <ScrollReveal>
            <span className="text-[11px] uppercase tracking-[0.2em] text-primary font-medium">Background</span>
            <h1 className="text-[32px] md:text-[42px] font-bold tracking-tight text-foreground mt-2 mb-1">Experience</h1>
            <p className="text-[15px] text-muted-foreground mb-12">Building production systems and shipping real products.</p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="border border-border rounded-xl p-6 mb-10 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <Briefcase size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h2 className="text-[17px] font-bold text-foreground">Full Stack Developer</h2>
                    <span className="px-2.5 py-0.5 text-[10px] font-medium rounded-full bg-primary/8 text-primary">Active</span>
                  </div>
                  <p className="text-[13px] text-muted-foreground mt-0.5">Freelance / Self-Employed · Dec 2023 — Present</p>
                </div>
              </div>
              <div className="space-y-3 ml-16">
                {highlights.map((item, i) => (
                  <ScrollReveal key={i} delay={0.12 + i * 0.04} distance={10}>
                    <div className="flex gap-3 items-start">
                      <span className="text-[10px] text-primary font-mono mt-1 flex-shrink-0 w-5 text-right">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-[13px] text-muted-foreground leading-[1.7]">{item}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-[18px] font-bold text-foreground mb-5">Certifications & Training</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-4">
            {certs.map((cert, i) => (
              <ScrollReveal key={cert.title} delay={0.14 + i * 0.06}>
                <div className="border border-border rounded-xl p-5 hover:border-foreground/15 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] transition-all duration-300 h-full">
                  <cert.icon size={20} className="text-primary mb-3" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">{cert.type}</p>
                  <h3 className="text-[14px] font-semibold text-foreground">{cert.title}</h3>
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
