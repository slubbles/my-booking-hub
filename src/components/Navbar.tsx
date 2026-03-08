import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        <Link to="/" className="text-[15px] font-semibold tracking-tight text-foreground">
          Idderf Salem
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "px-3.5 py-1.5 text-[13px] rounded-md transition-colors",
                location.pathname === item.href
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button size="sm" className="ml-3 rounded-md text-[13px] h-8 px-4" asChild>
            <Link to="/booking">Book a Call</Link>
          </Button>
        </nav>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-3 space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-3 py-2.5 text-[13px] rounded-md transition-colors",
                location.pathname === item.href
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/booking"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2.5 text-[13px] font-medium text-primary"
          >
            Book a Call →
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
