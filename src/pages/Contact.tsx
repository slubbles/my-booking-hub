import { useState } from "react";
import { Mail, Github, Linkedin, Twitter, ArrowRight, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import useSEO from "@/hooks/useSEO";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { postJson, ApiError } from "@/lib/api";
import { captureMonitoringException } from "@/lib/monitoring";
import { contactSubmissionSchema } from "@/lib/schemas";
import { trackEvent } from "@/components/AnalyticsProvider";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const ContactPage = () => {
  useSEO({ title: "Contact", description: "Get in touch with Idderf Salem for freelance projects, full-time roles, and collaborations.", path: "/contact" });
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSubmissionSchema.safeParse({ name, email, message, website });
    if (!result.success) {
      setErrors(
        Object.fromEntries(
          Object.entries(result.error.flatten().fieldErrors).map(([key, value]) => [key, value?.[0] || "Invalid value"]),
        ),
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await postJson<{ success: boolean }>("/api/contact", result.data);
      trackEvent("contact_submit", { route: "/contact" });
      toast.success("Message sent successfully.");
      setSubmitted(true);
    } catch (error) {
      captureMonitoringException(error, { feature: "contact" });

      if (error instanceof ApiError && error.details) {
        setErrors(error.details);
      }

      toast.error(error instanceof Error ? error.message : "Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setWebsite("");
    setErrors({});
    setSubmitted(false);
    setIsSubmitting(false);
  };

  return (
    <PageTransition>
      <div className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-lg">
          <div className="text-center">
            <ScrollReveal>
              <span className="text-[12px] uppercase tracking-[0.25em] text-primary/80 font-medium">Get in Touch</span>
              <h1 className="text-[30px] md:text-[40px] font-bold tracking-[-0.02em] text-foreground mt-2 mb-2">Let's Work Together</h1>
              <p className="text-[15px] text-muted-foreground mb-1 font-light">
                Open to freelance projects, full-time roles, and collaborations.
              </p>
              <p className="text-[14px] text-muted-foreground/70 mb-8">
                Based in the Philippines (UTC+8) - available for remote work worldwide.
              </p>
            </ScrollReveal>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ScrollReveal>
                    <div className="bg-card border border-border/60 rounded-2xl p-8 mb-8 premium-shadow text-center">
                      <div className="w-14 h-14 rounded-full bg-primary/[0.08] flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={28} className="text-primary" />
                      </div>
                      <h2 className="text-[18px] font-bold text-foreground mb-2">Message sent</h2>
                      <p className="text-[15px] text-muted-foreground mb-6">Your message has been stored and a notification has been sent.</p>
                      <Button variant="outline" size="sm" className="rounded-full" onClick={resetForm}>Send Another</Button>
                    </div>
                  </ScrollReveal>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ScrollReveal delay={0.08}>
                    <form onSubmit={handleSubmit} noValidate className="bg-card border border-border/60 rounded-2xl p-7 mb-8 premium-shadow text-left">
                      <input
                        type="text"
                        name="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="absolute opacity-0 pointer-events-none h-0 w-0"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />
                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="text-[14px] font-medium text-foreground mb-1.5 block">Name</label>
                          <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="text-[15px]"
                            maxLength={100}
                          />
                          {errors.name && <p className="text-[13px] text-destructive mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="text-[14px] font-medium text-foreground mb-1.5 block">Email</label>
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="text-[15px]"
                            maxLength={255}
                          />
                          {errors.email && <p className="text-[13px] text-destructive mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="text-[14px] font-medium text-foreground mb-1.5 block">Message</label>
                          <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell me about your project, timeline, and budget..."
                            className="min-h-[120px] text-[15px] resize-none"
                            maxLength={2000}
                          />
                          <div className="flex justify-between mt-1">
                            {errors.message && <p className="text-[13px] text-destructive">{errors.message}</p>}
                            <p className="text-[12px] text-muted-foreground/50 ml-auto">{message.length}/2000</p>
                          </div>
                        </div>
                      </div>
                      <Button type="submit" className="w-full rounded-full h-11 text-[15px] font-medium group" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"} <Send size={14} className="ml-1.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                      </Button>
                    </form>
                  </ScrollReveal>

                  <ScrollReveal delay={0.12}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-px flex-1 bg-border/60" />
                      <span className="text-[12px] text-muted-foreground/50 uppercase tracking-wider">or reach out directly</span>
                      <div className="h-px flex-1 bg-border/60" />
                    </div>

                    <div className="flex justify-center gap-2 mb-8">
                      <a href="mailto:idderfsalem98@gmail.com" className="inline-flex items-center gap-1.5 px-4 py-2 text-[14px] text-muted-foreground hover:text-foreground rounded-full border border-border/60 hover:border-border transition-all duration-300">
                        <Mail size={14} /> Email
                      </a>
                      {[
                        { icon: Github, href: "https://github.com/slubbles", label: "GitHub" },
                        { icon: Linkedin, href: "https://www.linkedin.com/in/idderfsalem/", label: "LinkedIn" },
                        { icon: Twitter, href: "https://x.com/idderfsalem", label: "X" },
                      ].map((s) => (
                        <Tooltip key={s.label}>
                          <TooltipTrigger asChild>
                            <a
                              href={s.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={s.label}
                              className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:border-border transition-all duration-300"
                            >
                              <s.icon size={14} />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{s.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.16}>
                    <p className="text-[14px] text-muted-foreground/70 mb-4">Or schedule a meeting</p>
                    <Button size="lg" className="rounded-full px-8 h-11 text-[15px] font-medium shadow-sm" asChild>
                      <Link to="/booking">Book a Call <ArrowRight size={15} className="ml-1" /></Link>
                    </Button>
                  </ScrollReveal>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
