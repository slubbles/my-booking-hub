import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import useSEO from "@/hooks/useSEO";
import postcontentImg from "@/assets/projects/postcontent.png";
import snarblesImg from "@/assets/projects/snarbles.png";
import odvImg from "@/assets/projects/onedollarventures.png";

const projects = [
  {
    title: "Post Content",
    slug: "post-content",
    role: "Full Stack Developer",
    description: "Content creation platform that helps users generate hooks, scripts, replies, and X threads powered by AI (Grok API). Built intuitive UI with React and a Node.js backend with user authentication and content management.",
    tags: ["React", "Node.js", "Grok API", "Authentication"],
    status: "Live",
    image: postcontentImg,
  },
  {
    title: "Snarbles",
    slug: "snarbles",
    role: "Full Stack Developer",
    description: "Full-stack web app with no-code workflow, analytics dashboard, verification system, and Stripe payment processing. Handles real user transactions with under 30-second processing time end-to-end.",
    tags: ["Next.js", "TypeScript", "Stripe", "Analytics"],
    status: "Live Production",
    image: snarblesImg,
  },
  {
    title: "One Dollar Ventures",
    slug: "one-dollar-ventures",
    role: "Full Stack Developer",
    description: "Micro-crowdfunding platform built with React and Node.js, featuring user onboarding and payment flows.",
    tags: ["React", "Node.js", "Payments", "Onboarding"],
    status: "Live",
    image: odvImg,
  },
];

const ProjectsPage = () => {
  useSEO({
    title: "Projects",
    description: "Live production systems built and shipped by Idderf Salem. Full-stack web applications with React, Node.js, and payment integrations.",
    path: "/projects",
  });

  return (
    <PageTransition>
      <div className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-2xl">
          <ScrollReveal>
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-medium">Portfolio</span>
            <h1 className="text-[30px] md:text-[40px] font-bold tracking-[-0.02em] text-foreground mt-2 mb-1">Key Projects</h1>
            <p className="text-[14px] text-muted-foreground mb-14 font-light">Live production systems I've built and shipped.</p>
          </ScrollReveal>

          <div className="space-y-6">
            {projects.map((project, i) => (
              <ScrollReveal key={project.title} delay={i * 0.07}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="block group bg-card border border-border/60 rounded-2xl overflow-hidden premium-shadow hover:premium-shadow-hover hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="aspect-[16/8] overflow-hidden bg-secondary">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2.5 mb-0.5">
                          <h2 className="text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{project.title}</h2>
                          <span className="px-2 py-0.5 text-[9px] font-medium rounded-full bg-primary/[0.08] text-primary tracking-wide">
                            {project.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground/70">{project.role}</p>
                      </div>
                      <ArrowRight size={13} className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300 mt-1" />
                    </div>
                    <p className="text-[13px] text-muted-foreground leading-[1.7] mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 text-[10px] rounded-full bg-secondary text-muted-foreground/80 font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectsPage;
