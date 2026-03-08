import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="container mx-auto flex h-[60px] items-center justify-between px-6">
        {/* Logo — left */}
        <Link to="/" className="text-[17px] font-bold tracking-tight text-foreground">
          Idderf Salem
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "px-3.5 py-1.5 text-[14px] transition-colors",
                location.pathname === item.href
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side — Sign in + CTA */}
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

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Subtle bottom line */}
      <div className="h-px bg-border" />

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-3 py-2.5 text-[14px] rounded-md transition-colors",
                location.pathname === item.href
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-border flex flex-col gap-2">
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-[14px] text-muted-foreground hover:text-foreground"
            >
              Get in Touch
            </Link>
            <Link
              to="/booking"
              onClick={() => setMobileOpen(false)}
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
