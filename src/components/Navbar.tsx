import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="text-lg font-bold tracking-tight text-foreground">
          Idderf Salem
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "px-4 py-2 text-sm rounded-lg transition-colors",
                location.pathname === item.href
                  ? "text-foreground font-medium bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/booking"
            className={cn(
              "ml-2 px-5 py-2 text-sm rounded-lg font-medium transition-colors",
              location.pathname === "/booking"
                ? "bg-primary text-primary-foreground"
                : "bg-foreground text-background hover:bg-foreground/90"
            )}
          >
            Book a Call
          </Link>
        </nav>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-4 py-3 text-sm rounded-lg transition-colors",
                location.pathname === item.href
                  ? "text-foreground font-medium bg-secondary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/booking"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 text-sm rounded-lg font-medium bg-foreground text-background mt-2 text-center"
          >
            Book a Call
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
