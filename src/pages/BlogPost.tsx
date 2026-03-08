import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import useSEO from "@/hooks/useSEO";
import { blogPosts } from "@/data/blogPosts";
import { format } from "date-fns";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useSEO({
    title: post?.title,
    description: post?.excerpt,
    path: `/blog/${slug}`,
  });

  if (!post) return <Navigate to="/blog" replace />;

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length];

  return (
    <PageTransition>
      <div className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-2xl">
          <ScrollReveal>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors duration-300 mb-10 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
              All Posts
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.03}>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4 text-[11px] text-muted-foreground/60">
                <time>{format(new Date(post.date), "MMMM d, yyyy")}</time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h1 className="text-[26px] md:text-[36px] font-bold tracking-[-0.02em] text-foreground leading-[1.15] mb-4">{post.title}</h1>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 text-[10px] rounded-full bg-secondary text-muted-foreground/80 font-medium">{tag}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <article className="space-y-5 mb-16">
              {post.content.map((paragraph, i) => (
                <p key={i} className="text-[14px] text-muted-foreground leading-[1.85] font-light">{paragraph}</p>
              ))}
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.07}>
            <div className="border-t border-border/60 pt-10">
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50 mb-3">Next Post</p>
              <Link
                to={`/blog/${nextPost.slug}`}
                className="group flex items-center justify-between py-4 px-5 rounded-2xl bg-card border border-border/60 premium-shadow hover:premium-shadow-hover hover:-translate-y-0.5 transition-all duration-500"
              >
                <div>
                  <h3 className="text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{nextPost.title}</h3>
                  <p className="text-[11px] text-muted-foreground/70">{nextPost.readTime}</p>
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

export default BlogPost;
