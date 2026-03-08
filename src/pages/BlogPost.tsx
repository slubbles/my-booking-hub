import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Link2, Check } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import useSEO from "@/hooks/useSEO";
import { blogPosts } from "@/data/blogPosts";
import { format } from "date-fns";
import { toast } from "sonner";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const [copied, setCopied] = useState(false);

  useSEO({
    title: post?.title,
    description: post?.excerpt,
    path: `/blog/${slug}`,
  });

  if (!post) return <Navigate to="/blog" replace />;

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length];

  const postUrl = `https://idderfsalem.dev/blog/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnX = () => {
    window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`, "_blank");
  };

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
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 text-[10px] rounded-full bg-secondary text-muted-foreground/80 font-medium">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleCopyLink}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-secondary/60 transition-all duration-300"
                    aria-label="Copy link"
                  >
                    {copied ? <Check size={14} /> : <Link2 size={14} />}
                  </button>
                  <button
                    onClick={shareOnX}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-secondary/60 transition-all duration-300"
                    aria-label="Share on X"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </button>
                  <button
                    onClick={shareOnLinkedIn}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-secondary/60 transition-all duration-300"
                    aria-label="Share on LinkedIn"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </button>
                </div>
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
