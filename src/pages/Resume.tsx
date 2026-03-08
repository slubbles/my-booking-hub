import { ExternalLink as ExtLink, Briefcase, GraduationCap, Code2, Globe, Mail, Rocket, ExternalLink } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import usePageTitle from "@/hooks/usePageTitle";
import { Button } from "@/components/ui/button";

const experience = [
  {
    role: "Full Stack Developer",
    company: "Freelance / Self-Employed",
    period: "Dec 2023 - Present",
    active: true,
    points: [
      "Designed, built, and deployed multiple production web applications from scratch, handling all layers of the stack",
      "Implemented Stripe payment integration with secure checkout flows, webhook handling, and subscription management",
      "Built RESTful APIs with Node.js and integrated third-party services including payment processors and AI APIs",
      "Deployed and maintained live apps on Vercel, Railway, and Netlify with CI/CD pipelines",
      "Architected a peer-to-peer marketplace with escrow logic and real transaction handling",
    ],
  },
];

const projects = [
  {
    name: "Post Content",
    url: "https://postcontent.io",
    desc: "Content creation platform powered by AI (Grok API). Built intuitive UI with React and a Node.js backend with user authentication and content management.",
  },
  {
    name: "Snarbles",
    url: "https://snarbles.xyz",
    desc: "Full-stack web app with no-code workflow, analytics dashboard, verification system, and Stripe payment processing. Under 30-second end-to-end processing.",
  },
  {
    name: "One Dollar Ventures",
    url: "https://onedollarventures.com",
    desc: "Micro-crowdfunding platform built with React and Node.js, featuring user onboarding and payment flows.",
  },
];

const skills = {
  "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  "Backend": ["Node.js", "RESTful APIs", "Webhooks", "Prisma ORM"],
  "Database": ["PostgreSQL", "Supabase"],
  "Payments": ["Stripe API", "Polar.sh", "Escrow Systems", "Fiat & Crypto Processing"],
  "DevOps & Tools": ["Git/GitHub", "Vercel", "Railway", "Netlify", "Docker", "CI/CD", "AWS (familiar)"],
  "Integrations": ["Claude API", "Grok API", "X API"],
};

const education = [
  { title: "Solana Bootcamp", type: "Bootcamp" },
  { title: "Anchor Framework", type: "Certification" },
  { title: "Smart Contract Security", type: "Training" },
];

const ResumePage = () => {
  usePageTitle("Resume");

  return (
    <PageTransition>
      <div className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-2xl">
          {/* Header */}
          <ScrollReveal>
            <div className="flex items-start justify-between gap-4 mb-14">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-medium">Curriculum Vitae</span>
                <h1 className="text-[30px] md:text-[40px] font-bold tracking-[-0.02em] text-foreground mt-2 mb-1">Idderf Salem</h1>
                <p className="text-[14px] text-muted-foreground font-light">Full Stack Developer with over a year of production experience building and deploying end-to-end web applications.</p>
                <div className="flex items-center gap-4 mt-3 text-[11px] text-muted-foreground/70 flex-wrap">
                  <span className="flex items-center gap-1.5"><Globe size={12} /> idderfsalem.dev</span>
                  <span className="flex items-center gap-1.5"><Mail size={12} /> Available for hire</span>
                  <a href="https://github.com/slubbles" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground transition-colors">github.com/slubbles</a>
                  <a href="https://x.com/idderfsalem" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground transition-colors">@idderfsalem</a>
                </div>
              </div>
              <Button
                variant="dark"
                size="sm"
                className="rounded-full gap-1.5 flex-shrink-0 mt-2"
                onClick={() => window.print()}
              >
                <Download size={14} />
                <span className="hidden sm:inline">Print</span>
              </Button>
            </div>
          </ScrollReveal>

          {/* Summary */}
          <ScrollReveal delay={0.03}>
            <div className="bg-card border border-border/60 rounded-2xl p-6 mb-12 premium-shadow">
              <p className="text-[12px] leading-[1.8] text-muted-foreground">
                Proven ability to ship complete solutions independently - from UI design to backend APIs, payment systems, and deployment. Experienced with React, TypeScript, Node.js, PostgreSQL, and cloud platforms. Comfortable working across the entire stack and delivering production-ready products under real-world constraints.
              </p>
            </div>
          </ScrollReveal>

          {/* Experience */}
          <ScrollReveal delay={0.05}>
            <div className="mb-12">
              <div className="flex items-center gap-2.5 mb-5">
                <Briefcase size={14} className="text-primary/70" />
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-foreground">Work Experience</h2>
              </div>
              {experience.map((exp, i) => (
                <div key={i} className="bg-card border border-border/60 rounded-2xl p-6 premium-shadow">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                    <h3 className="text-[15px] font-semibold text-foreground">{exp.role}</h3>
                    {exp.active && (
                      <span className="px-2.5 py-0.5 text-[9px] font-medium rounded-full bg-primary/8 text-primary tracking-wide">Active</span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground/70 mb-4">{exp.company} · {exp.period}</p>
                  <ul className="space-y-2.5">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex gap-3 items-start">
                        <span className="text-[9px] text-primary/50 font-mono mt-0.5 flex-shrink-0 w-4 text-right">{String(j + 1).padStart(2, "0")}</span>
                        <p className="text-[12px] text-muted-foreground leading-[1.75]">{point}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Key Projects */}
          <ScrollReveal delay={0.07}>
            <div className="mb-12">
              <div className="flex items-center gap-2.5 mb-5">
                <Rocket size={14} className="text-primary/70" />
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-foreground">Key Projects</h2>
              </div>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.name} className="bg-card border border-border/60 rounded-2xl p-5 premium-shadow hover:premium-shadow-hover transition-all duration-500">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[13px] font-semibold text-foreground">{project.name}</h3>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] text-primary/70 hover:text-primary transition-colors"
                      >
                        Visit <ExternalLink size={10} />
                      </a>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-[1.7]">{project.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Skills */}
          <ScrollReveal delay={0.09}>
            <div className="mb-12">
              <div className="flex items-center gap-2.5 mb-5">
                <Code2 size={14} className="text-primary/70" />
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-foreground">Technical Skills</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category} className="bg-card border border-border/60 rounded-2xl p-5 premium-shadow">
                    <p className="text-[11px] font-semibold text-foreground mb-3">{category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((skill) => (
                        <span key={skill} className="px-2.5 py-1 text-[10px] rounded-full bg-secondary text-muted-foreground/80 font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Education */}
          <ScrollReveal delay={0.11}>
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <GraduationCap size={14} className="text-primary/70" />
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-foreground">Certifications & Training</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {education.map((edu) => (
                  <div key={edu.title} className="bg-card border border-border/60 rounded-2xl p-5 premium-shadow hover:premium-shadow-hover transition-all duration-500">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60 mb-1">{edu.type}</p>
                    <h3 className="text-[12px] font-semibold text-foreground">{edu.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Bonus note */}
          <ScrollReveal delay={0.13}>
            <p className="text-[10px] text-muted-foreground/50 text-center mt-14">
              Bonus: Solana blockchain, Rust, Smart Contracts - available where relevant.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
};

export default ResumePage;
