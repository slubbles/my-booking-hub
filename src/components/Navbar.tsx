import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-background border-b border-border"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="relative group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
            IS
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-foreground hidden sm:block">
            Idderf Salem
          </span>
        </Link>

        {/* Center nav — pill style */}
        <nav
          ref={navRef}
          className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 bg-secondary/60 rounded-full px-1.5 py-1"
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "relative px-4 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-foreground rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/contact"
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full hover:bg-secondary transition-all duration-200"
          >
            Get in Touch
          </Link>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-full bg-primary text-primary-foreground text-[13px] font-medium hover:bg-primary/90 transition-all duration-200 group"
          >
            Book a Call
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={18} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu — full screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-background/95 backdrop-blur-xl z-40"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col h-full">
              <nav className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-3.5 text-[16px] rounded-xl transition-all",
                        location.pathname === item.href
                          ? "text-foreground font-semibold bg-secondary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      )}
                    >
                      {item.label}
                      <ArrowRight size={16} className={cn(
                        "transition-opacity",
                        location.pathname === item.href ? "opacity-100" : "opacity-0"
                      )} />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pb-8 flex flex-col gap-3">
                <Link
                  to="/contact"
                  className="flex items-center justify-center h-12 rounded-xl border border-border text-[14px] font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  Get in Touch
                </Link>
                <Link
                  to="/booking"
                  className="flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground text-[14px] font-medium hover:bg-primary/90 transition-colors"
                >
                  Book a Call <ArrowRight size={16} />
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
