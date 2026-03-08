import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/70 backdrop-blur-2xl border-b border-border/40"
          : "bg-background/95 border-b border-transparent"
      )}
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="relative group flex items-center">
          <span className="text-[14px] font-semibold tracking-tight text-foreground">
            Idderf Salem
          </span>
        </Link>

        {/* Center nav */}
        <nav
          ref={navRef}
          className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2 bg-secondary/50 rounded-full px-1 py-0.5 border border-border/40"
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "relative px-4 py-1.5 text-[12px] font-medium rounded-full transition-all duration-300",
                  isActive
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-foreground rounded-full"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-1.5">
          <ThemeToggle />
          <Link
            to="/contact"
            className="text-[12px] font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full hover:bg-secondary/60 transition-all duration-300"
          >
            Get in Touch
          </Link>
          <Link
            to="/booking"
            className="inline-flex items-center gap-1.5 h-8 px-4 rounded-full bg-primary text-primary-foreground text-[12px] font-medium hover:bg-primary/90 transition-all duration-300 group"
          >
            Book a Call
            <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={16} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden fixed inset-x-0 top-14 bottom-0 bg-background/98 backdrop-blur-2xl z-40"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col h-full">
              <nav className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 text-[15px] rounded-xl transition-all duration-300",
                        location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href))
                          ? "text-foreground font-semibold bg-secondary/70"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                      )}
                    >
                      {item.label}
                      <ArrowRight size={14} className={cn(
                        "transition-opacity",
                        (location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href))) ? "opacity-60" : "opacity-0"
                      )} />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pb-8 flex flex-col gap-2.5">
                <Link
                  to="/contact"
                  className="flex items-center justify-center h-11 rounded-xl border border-border text-[13px] font-medium text-foreground hover:bg-secondary transition-all duration-300"
                >
                  Get in Touch
                </Link>
                <Link
                  to="/booking"
                  className="flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-primary-foreground text-[13px] font-medium hover:bg-primary/90 transition-all duration-300"
                >
                  Book a Call <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
