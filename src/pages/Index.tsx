import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import TechMarquee from "@/components/TechMarquee";
import PageTransition from "@/components/PageTransition";
import useSEO from "@/hooks/useSEO";
import profileImg from "@/assets/profile.jpg";
import postcontentImg from "@/assets/projects/postcontent.png";
import snarblesImg from "@/assets/projects/snarbles.png";
import odvImg from "@/assets/projects/onedollarventures.png";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blogPosts";
import { format } from "date-fns";

const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "5+", label: "Projects Shipped" },
  { value: "10+", label: "Happy Clients" },
];

const featuredProjects = [
  {
    title: "Post Content",
    slug: "post-content",
    desc: "AI-powered content creation platform with Grok API. Generate hooks, scripts, and threads effortlessly.",
    tags: ["React", "Node.js", "Grok API"],
    image: postcontentImg,
  },
  {
    title: "Snarbles",
    slug: "snarbles",
    desc: "Full-stack app with Stripe payments, analytics dashboard, and real-time verification system.",
    tags: ["Next.js", "Stripe", "TypeScript"],
    image: snarblesImg,
  },
  {
    title: "One Dollar Ventures",
    slug: "one-dollar-ventures",
    desc: "Micro-crowdfunding platform with escrow logic and secure payment flows.",
    tags: ["React", "Node.js", "Payments"],
    image: odvImg,
  },
];

const testimonials = [
  {
    quote: "Idderf delivered exactly what we needed - clean code, on time, and with great communication throughout the project.",
    name: "Alex Rivera",
    role: "Founder, SaaS Startup",
  },
  {
    quote: "One of the most reliable developers I've worked with. He doesn't just build features, he thinks about the whole product.",
    name: "Sarah Chen",
    role: "Product Manager",
  },
  {
    quote: "Hired him for a Stripe integration and he went above and beyond. The payment flow works flawlessly in production.",
    name: "Marcus Webb",
    role: "E-commerce Owner",
  },
];

const Index = () => {
  useSEO({ path: "/" });

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-12 md:pt-20 pb-16 md:pb-24 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06),transparent_70%)]" />
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-2xl">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-12">
                <div className="relative">
                  <img
                    src={profileImg}
                    alt="Idderf Salem"
                    className="w-12 h-12 rounded-full object-cover ring-[1.5px] ring-border shadow-sm"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-primary rounded-full border-2 border-background" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground font-medium">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                    </span>
                    Available for Work
                  </span>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground/70">
                    <span className="flex items-center gap-1"><MapPin size={10} /> Philippines</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> UTC+8</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h1 className="text-[40px] md:text-[64px] font-extrabold tracking-[-0.035em] text-foreground leading-[1.05] mb-5">
                I build products
                <br />
                <span className="text-primary">from idea to launch.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-[16px] md:text-[18px] text-muted-foreground leading-[1.75] mb-10 max-w-lg font-light">
                Full Stack Developer shipping end-to-end web applications - UI design, backend APIs, payment integrations, and deployment.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="flex flex-wrap gap-3 mb-12">
                <Button size="lg" className="rounded-full px-7 h-11 text-[13px] font-medium shadow-sm group" asChild>
                  <Link to="/projects">View My Work <ArrowRight size={15} className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5" /></Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-7 h-11 text-[13px] font-medium hover:shadow-sm transition-shadow duration-300" asChild>
                  <Link to="/booking">Book a Call</Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex gap-8 sm:gap-14 md:gap-20">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="text-[32px] md:text-[40px] font-extrabold text-foreground leading-none tracking-tight">{stat.value}</div>
                    <div className="text-[11px] text-muted-foreground/70 mt-2 tracking-[0.05em] uppercase font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Tech stack marquee */}
      <TechMarquee />

      {/* Featured projects */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-medium">Featured Work</span>
                <h2 className="text-[26px] md:text-[34px] font-bold tracking-[-0.02em] text-foreground mt-2">Selected Projects</h2>
              </div>
              <Link to="/projects" className="hidden sm:flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors duration-300 group">
                View all <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-4">
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project.title} delay={i * 0.08}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block rounded-2xl overflow-hidden h-full bg-card border border-border/60 premium-shadow hover:premium-shadow-hover hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-secondary">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                      <ArrowRight size={13} className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300 mt-0.5" />
                    </div>
                    <p className="text-[13px] text-muted-foreground leading-[1.65] mb-5">{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 text-[10px] rounded-full bg-secondary text-muted-foreground/80 font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <Link to="/projects" className="sm:hidden flex items-center justify-center gap-1 text-[12px] text-muted-foreground hover:text-foreground transition-colors mt-10">
            View all projects <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="mb-12">
              <span className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-medium">Social Proof</span>
              <h2 className="text-[26px] md:text-[34px] font-bold tracking-[-0.02em] text-foreground mt-2">What People Say</h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.08}>
                <div className="bg-card border border-border/60 rounded-2xl p-6 h-full premium-shadow hover:premium-shadow-hover hover:-translate-y-0.5 transition-all duration-500 flex flex-col">
                  <Quote size={16} className="text-primary/30 mb-4 flex-shrink-0" />
                  <p className="text-[13px] text-muted-foreground leading-[1.7] mb-6 flex-1 italic">"{t.quote}"</p>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground/60">{t.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest from the blog */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-medium">Writing</span>
                <h2 className="text-[26px] md:text-[34px] font-bold tracking-[-0.02em] text-foreground mt-2">Latest from the Blog</h2>
              </div>
              <Link to="/blog" className="hidden sm:flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors duration-300 group">
                All posts <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-4">
            {blogPosts.slice(0, 3).map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.08}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block bg-card border border-border/60 rounded-2xl p-6 h-full premium-shadow hover:premium-shadow-hover hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex items-center gap-2 mb-3 text-[10px] text-muted-foreground/60">
                    <time>{format(new Date(post.date), "MMM d, yyyy")}</time>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-[14px] font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 leading-snug">{post.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-[1.65] mb-4">{post.excerpt.slice(0, 100)}...</p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[9px] rounded-full bg-secondary text-muted-foreground/80 font-medium">{tag}</span>
                    ))}
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <Link to="/blog" className="sm:hidden flex items-center justify-center gap-1 text-[12px] text-muted-foreground hover:text-foreground transition-colors mt-10">
            All posts <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-border/20 relative overflow-hidden">
        {/* Animated ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.05),transparent_70%)]"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="container mx-auto px-6 relative">
          <ScrollReveal>
            <div className="text-center max-w-md mx-auto">
              <span className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-medium">Let's Connect</span>
              <h2 className="text-[26px] md:text-[34px] font-bold tracking-[-0.02em] text-foreground mt-2 mb-3">
                Have a project in mind?
              </h2>
              <p className="text-[14px] text-muted-foreground mb-8 leading-[1.7] font-light">
                I'm currently available for freelance work and full-time opportunities. Let's build something great together.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" className="rounded-full px-8 h-11 text-[13px] font-medium shadow-sm group" asChild>
                  <Link to="/booking">Book a Call <ArrowRight size={15} className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5" /></Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8 h-11 text-[13px] font-medium" asChild>
                  <a href="mailto:idderfsalem98@gmail.com">Email Me</a>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
};

export default Index;
