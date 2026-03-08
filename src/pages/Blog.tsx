import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import useSEO from "@/hooks/useSEO";
import { blogPosts } from "@/data/blogPosts";
import { format } from "date-fns";

const BlogPage = () => {
  useSEO({
    title: "Blog",
    description: "Technical writing by Idderf Salem — deep dives into payment integrations, AI architecture, and full-stack development.",
    path: "/blog",
  });

  return (
    <PageTransition>
      <div className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-2xl">
          <ScrollReveal>
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-medium">Writing</span>
            <h1 className="text-[30px] md:text-[40px] font-bold tracking-[-0.02em] text-foreground mt-2 mb-1">Blog</h1>
            <p className="text-[14px] text-muted-foreground mb-14 font-light">Technical deep dives and lessons from shipping production apps.</p>
          </ScrollReveal>

          <div className="space-y-4">
            {blogPosts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.07}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="block group bg-card border border-border/60 rounded-2xl p-6 premium-shadow hover:premium-shadow-hover hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-3 text-[11px] text-muted-foreground/60">
                    <time>{format(new Date(post.date), "MMM d, yyyy")}</time>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-[16px] font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 leading-snug">{post.title}</h2>
                      <p className="text-[13px] text-muted-foreground leading-[1.7] mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-0.5 text-[10px] rounded-full bg-secondary text-muted-foreground/80 font-medium">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300 mt-1 flex-shrink-0" />
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

export default BlogPage;
