import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import useSEO from "@/hooks/useSEO";
import postcontentImg from "@/assets/projects/postcontent.png";
import snarblesImg from "@/assets/projects/snarbles.png";
import odvImg from "@/assets/projects/onedollarventures.png";

const projectData: Record<string, {
  title: string;
  url: string;
  role: string;
  status: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
  stack: string[];
  image: string;
}> = {
  "post-content": {
    title: "Post Content",
    url: "https://postcontent.io",
    role: "Full Stack Developer",
    status: "Live",
    description:
      "Content creation platform that helps users generate hooks, scripts, replies, and X threads powered by AI (Grok API). Built intuitive UI with React and a Node.js backend with user authentication and content management.",
    challenge:
      "Content creators spend hours crafting engaging posts for social media. They needed a tool that could generate high-quality content variations quickly while maintaining their authentic voice and style.",
    solution:
      "Built a full-stack platform integrating the Grok API for intelligent content generation. Designed a clean, distraction-free UI with React, implemented secure authentication, and created a Node.js backend that handles API orchestration, rate limiting, and content history management.",
    results: [
      "Users generate content 10x faster than manual writing",
      "Secure authentication with session management",
      "Real-time AI-powered content generation",
      "Clean, intuitive interface with zero learning curve",
    ],
    tags: ["React", "Node.js", "Grok API", "Authentication"],
    stack: ["React", "TypeScript", "Node.js", "Express", "Grok API", "Tailwind CSS", "JWT Auth"],
    image: postcontentImg,
  },
  "snarbles": {
    title: "Snarbles",
    url: "https://snarbles.xyz",
    role: "Full Stack Developer",
    status: "Live Production",
    description:
      "Full-stack web app with no-code workflow, analytics dashboard, verification system, and Stripe payment processing. Handles real user transactions with under 30-second processing time end-to-end.",
    challenge:
      "The team needed a production-grade platform that could handle real financial transactions, provide analytics insights, and verify user actions — all with a no-code-friendly interface that non-technical users could operate.",
    solution:
      "Architected a comprehensive full-stack solution with Next.js and TypeScript. Integrated Stripe for secure payment processing with webhook handling, built a real-time analytics dashboard, and implemented a verification system. Optimized the entire flow to process transactions in under 30 seconds.",
    results: [
      "Sub-30-second end-to-end transaction processing",
      "Real-time analytics dashboard with actionable insights",
      "Secure Stripe payment integration with webhook handling",
      "No-code workflow enabling non-technical users to operate",
    ],
    tags: ["Next.js", "TypeScript", "Stripe", "Analytics"],
    stack: ["Next.js", "TypeScript", "Stripe API", "PostgreSQL", "Prisma", "Vercel", "Tailwind CSS"],
    image: snarblesImg,
  },
  "one-dollar-ventures": {
    title: "One Dollar Ventures",
    url: "https://onedollarventures.com",
    role: "Full Stack Developer",
    status: "Live",
    description:
      "Micro-crowdfunding platform built with React and Node.js, featuring user onboarding and payment flows.",
    challenge:
      "Creating a micro-crowdfunding platform where users could contribute small amounts required careful handling of payment flows, escrow logic, and a seamless onboarding experience that builds trust with first-time users.",
    solution:
      "Built the platform with React for a responsive frontend and Node.js for the backend. Implemented secure payment flows with proper escrow logic, designed a guided onboarding process, and ensured the platform could handle concurrent transactions reliably.",
    results: [
      "Secure escrow-based payment processing",
      "Guided onboarding with high completion rates",
      "Mobile-responsive design for accessibility",
      "Reliable concurrent transaction handling",
    ],
    tags: ["React", "Node.js", "Payments", "Onboarding"],
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Stripe", "Tailwind CSS"],
    image: odvImg,
  },
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectData[slug] : undefined;

  useSEO({
    title: project?.title,
    description: project?.description,
    path: `/projects/${slug}`,
  });

  if (!project) return <Navigate to="/projects" replace />;

  const allSlugs = Object.keys(projectData);
  const currentIndex = allSlugs.indexOf(slug!);
  const nextSlug = allSlugs[(currentIndex + 1) % allSlugs.length];
  const nextProject = projectData[nextSlug];

  return (
    <PageTransition>
      <div className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-2xl">
          {/* Back */}
          <ScrollReveal>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-[14px] text-muted-foreground hover:text-foreground transition-colors duration-300 mb-10 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
              All Projects
            </Link>
          </ScrollReveal>

          {/* Header */}
          <ScrollReveal delay={0.03}>
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <h1 className="text-[30px] md:text-[40px] font-bold tracking-[-0.02em] text-foreground">{project.title}</h1>
                  <span className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-primary/[0.08] text-primary tracking-wide">
                    {project.status}
                  </span>
                </div>
                <p className="text-[14px] text-muted-foreground/70">{project.role}</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-full gap-1.5 flex-shrink-0 mt-2" asChild>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  Visit <ExternalLink size={12} />
                </a>
              </Button>
            </div>
          </ScrollReveal>

          {/* Screenshot */}
          <ScrollReveal delay={0.04}>
            <div className="rounded-2xl overflow-hidden border border-border/60 mb-12 premium-shadow">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full object-cover object-top"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal delay={0.05}>
            <p className="text-[15px] text-muted-foreground leading-[1.8] mb-12 font-light">{project.description}</p>
          </ScrollReveal>

          {/* Challenge */}
          <ScrollReveal delay={0.07}>
            <div className="bg-card border border-border/60 rounded-2xl p-6 mb-4 premium-shadow">
              <h2 className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground/60 font-medium mb-3">The Challenge</h2>
              <p className="text-[15px] text-muted-foreground leading-[1.8]">{project.challenge}</p>
            </div>
          </ScrollReveal>

          {/* Solution */}
          <ScrollReveal delay={0.09}>
            <div className="bg-card border border-border/60 rounded-2xl p-6 mb-4 premium-shadow">
              <h2 className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground/60 font-medium mb-3">The Solution</h2>
              <p className="text-[15px] text-muted-foreground leading-[1.8]">{project.solution}</p>
            </div>
          </ScrollReveal>

          {/* Results */}
          <ScrollReveal delay={0.11}>
            <div className="bg-card border border-border/60 rounded-2xl p-6 mb-12 premium-shadow">
              <h2 className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground/60 font-medium mb-4">Key Results</h2>
              <div className="space-y-3">
                {project.results.map((result, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-[11px] text-primary/60 font-mono mt-0.5 flex-shrink-0 w-4 text-right">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-[15px] text-foreground/80 leading-[1.6]">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Tech Stack */}
          <ScrollReveal delay={0.13}>
            <div className="mb-16">
              <h2 className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground/60 font-medium mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 text-[13px] rounded-full border border-border/70 text-muted-foreground/80 font-medium hover:border-primary/30 hover:text-foreground hover:bg-primary/[0.03] transition-all duration-300 cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Next project */}
          <ScrollReveal delay={0.15}>
            <div className="border-t border-border/60 pt-10">
              <p className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground/50 mb-3">Next Project</p>
              <Link
                to={`/projects/${nextSlug}`}
                className="group flex items-center justify-between py-4 px-5 rounded-2xl bg-card border border-border/60 premium-shadow hover:premium-shadow-hover hover:-translate-y-0.5 transition-all duration-500"
              >
                <div>
                  <h3 className="text-[16px] font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{nextProject.title}</h3>
                  <p className="text-[13px] text-muted-foreground/70">{nextProject.role}</p>
                </div>
                <ArrowRight size={16} className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectDetail;
