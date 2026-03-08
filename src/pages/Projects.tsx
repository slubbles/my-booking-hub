import { ExternalLink } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import usePageTitle from "@/hooks/usePageTitle";

const projects = [
  {
    title: "Post Content",
    url: "https://postcontent.io",
    role: "Full Stack Developer",
    description: "Content creation platform that helps users generate hooks, scripts, replies, and X threads powered by AI (Grok API). Built intuitive UI with React and a Node.js backend with user authentication and content management.",
    tags: ["React", "Node.js", "Grok API", "Authentication"],
    status: "Live",
    emoji: "✍️",
  },
  {
    title: "Snarbles",
    url: "https://snarbles.xyz",
    role: "Full Stack Developer",
    description: "Full-stack web app with no-code workflow, analytics dashboard, verification system, and Stripe payment processing. Handles real user transactions with under 30-second processing time end-to-end.",
    tags: ["Next.js", "TypeScript", "Stripe", "Analytics"],
    status: "Live Production",
    emoji: "⚡",
  },
  {
    title: "One Dollar Ventures",
    url: "https://onedollarventures.com",
    role: "Full Stack Developer",
    description: "Micro-crowdfunding platform built with React and Node.js, featuring user onboarding and payment flows.",
    tags: ["React", "Node.js", "Payments", "Onboarding"],
    status: "Live",
    emoji: "💰",
  },
];

const ProjectsPage = () => {
  usePageTitle("Projects");
  return (
    <PageTransition>
      <div className="py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-2xl">
          <ScrollReveal>
            <span className="text-[11px] uppercase tracking-[0.2em] text-primary font-medium">Portfolio</span>
            <h1 className="text-[32px] md:text-[42px] font-bold tracking-tight text-foreground mt-2 mb-1">Key Projects</h1>
            <p className="text-[15px] text-muted-foreground mb-12">Live production systems I've built and shipped.</p>
          </ScrollReveal>

          <div className="space-y-5">
            {projects.map((project, i) => (
              <ScrollReveal key={project.title} delay={i * 0.08}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group border border-border rounded-xl p-6 hover:border-foreground/15 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[24px]">{project.emoji}</span>
                      <div>
                        <div className="flex items-center gap-2.5 mb-0.5">
                          <h2 className="text-[16px] font-bold text-foreground">{project.title}</h2>
                          <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/8 text-primary">
                            {project.status}
                          </span>
                        </div>
                        <p className="text-[12px] text-muted-foreground">{project.role}</p>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-muted-foreground group-hover:text-foreground transition-all mt-1 opacity-0 group-hover:opacity-100" />
                  </div>
                  <p className="text-[13px] text-muted-foreground leading-[1.65] mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 text-[11px] rounded-full border border-border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectsPage;
