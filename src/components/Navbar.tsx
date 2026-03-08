import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background transition-shadow duration-200",
        scrolled && "shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]"
      )}
    >
      <div className="container mx-auto flex h-[60px] items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="text-[17px] font-bold tracking-[-0.01em] text-foreground">
          Idderf Salem
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "relative px-3.5 py-1.5 text-[14px] transition-colors",
                location.pathname === item.href
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              {location.pathname === item.href && (
                <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-foreground rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            className="text-[14px] text-foreground hover:text-muted-foreground transition-colors"
          >
            Get in Touch
          </Link>
          <Link
            to="/booking"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-foreground text-background text-[13px] font-medium hover:bg-foreground/90 transition-colors"
          >
            Book a Call <ChevronRight size={14} />
          </Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={cn("h-px transition-colors", scrolled ? "bg-transparent" : "bg-border")} />

      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "block px-3 py-2.5 text-[14px] rounded-md transition-colors",
                location.pathname === item.href
                  ? "text-foreground font-medium bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-border flex flex-col gap-2">
            <Link
              to="/contact"
              className="px-3 py-2.5 text-[14px] text-muted-foreground hover:text-foreground"
            >
              Get in Touch
            </Link>
            <Link
              to="/booking"
              className="inline-flex items-center justify-center gap-1.5 h-10 rounded-full bg-foreground text-background text-[13px] font-medium"
            >
              Book a Call <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
