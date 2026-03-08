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
import { toast } from "sonner";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

const ContactPage = () => {
  useSEO({ title: "Contact", description: "Get in touch with Idderf Salem for freelance projects, full-time roles, and collaborations.", path: "/contact" });
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse({ name, email, message });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Build mailto link with form data
    const subject = encodeURIComponent(`Project Inquiry from ${result.data.name}`);
    const body = encodeURIComponent(`Name: ${result.data.name}\nEmail: ${result.data.email}\n\n${result.data.message}`);
    window.open(`mailto:idderfsalem98@gmail.com?subject=${subject}&body=${body}`, "_self");
    
    toast.success("Opening your email client...");
    setSubmitted(true);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
    setSubmitted(false);
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
                      <h2 className="text-[18px] font-bold text-foreground mb-2">Message ready!</h2>
                      <p className="text-[15px] text-muted-foreground mb-6">Your email client should have opened with the message pre-filled.</p>
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
                      <Button type="submit" className="w-full rounded-full h-11 text-[15px] font-medium group">
                        Send Message <Send size={14} className="ml-1.5 group-hover:translate-x-0.5 transition-transform duration-300" />
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
