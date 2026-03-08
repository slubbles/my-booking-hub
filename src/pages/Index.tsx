import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, ExternalLink } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import profileImg from "@/assets/profile.jpg";

const stats = [
  { value: "2+", label: "Years" },
  { value: "5+", label: "Projects Shipped" },
  { value: "10+", label: "Clients" },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS",
  "Prisma", "Supabase", "Vercel", "Docker", "REST APIs",
];

const featuredProjects = [
  {
    title: "Post Content",
    url: "https://postcontent.io",
    desc: "AI-powered content creation platform with Grok API",
    tags: ["React", "Node.js", "Grok API"],
  },
  {
    title: "Snarbles",
    url: "https://snarbles.xyz",
    desc: "Full-stack app with Stripe payments & analytics",
    tags: ["Next.js", "Stripe", "TypeScript"],
  },
  {
    title: "One Dollar Ventures",
    url: "https://onedollarventures.com",
    desc: "Micro-crowdfunding with payment flows",
    tags: ["React", "Node.js", "Payments"],
  },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8">
                <img src={profileImg} alt="Idderf Salem" className="w-12 h-12 rounded-full object-cover ring-2 ring-border" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    <span className="text-[13px] font-medium text-foreground">Available for Work</span>
                  </div>
                  <div className="flex items-center gap-3 text-[12px] text-muted-foreground mt-0.5">
                    <span className="flex items-center gap-1"><MapPin size={11} /> Philippines 🇵🇭</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> UTC+8</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.06}>
              <h1 className="text-[40px] md:text-[60px] font-bold tracking-[-0.03em] text-foreground leading-[1.05] mb-5">
                I build products<br />
                <span className="text-muted-foreground">from idea to launch</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <p className="text-[16px] text-muted-foreground leading-[1.65] mb-8 max-w-lg">
                Full Stack Developer shipping end-to-end web applications — UI design, backend APIs, payment integrations, and deployment. Everything you need to go live.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              <div className="flex flex-wrap gap-3 mb-16">
                <Button size="lg" asChild>
                  <Link to="/projects">View My Work <ArrowRight size={16} /></Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/booking">Book a Call</Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="flex gap-10 mb-0">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-[28px] font-bold text-foreground leading-none">{stat.value}</div>
                    <div className="text-[12px] text-muted-foreground mt-1.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Tech stack strip */}
      <section className="border-y border-border py-5 overflow-hidden">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium mr-2 flex-shrink-0">Tech Stack</span>
              {techStack.map((t) => (
                <span key={t} className="px-2.5 py-1 text-[12px] rounded-md bg-secondary text-muted-foreground whitespace-nowrap">
                  {t}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-[24px] md:text-[28px] font-bold tracking-tight text-foreground">Featured Projects</h2>
                <p className="text-[13px] text-muted-foreground mt-1">Live production apps I've built and shipped.</p>
              </div>
              <Link to="/projects" className="hidden sm:flex items-center gap-1 text-[13px] text-muted-foreground hover:text-foreground transition-colors">
                View all <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-4">
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project.title} delay={i * 0.08}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border border-border rounded-lg p-5 h-full hover:border-foreground/12 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-[15px] font-semibold text-foreground">{project.title}</h3>
                    <ExternalLink size={13} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                  </div>
                  <p className="text-[13px] text-muted-foreground leading-[1.5] mb-3">{project.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[11px] rounded-md bg-secondary text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>

          <Link to="/projects" className="sm:hidden flex items-center justify-center gap-1 text-[13px] text-muted-foreground hover:text-foreground transition-colors mt-6">
            View all projects <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="border border-border rounded-xl p-8 md:p-12 text-center max-w-2xl mx-auto">
              <h2 className="text-[24px] md:text-[28px] font-bold tracking-tight text-foreground mb-3">
                Have a project in mind?
              </h2>
              <p className="text-[14px] text-muted-foreground mb-6 max-w-md mx-auto">
                I'm currently available for freelance work and full-time opportunities. Let's build something great together.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" asChild>
                  <Link to="/booking">Book a Call <ArrowRight size={16} /></Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:idderfsalem98@gmail.com">Email Me</a>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Index;
