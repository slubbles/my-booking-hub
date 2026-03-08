import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ThemeToggle = () => {
  // Read initial state from the DOM class (set by inline script in index.html)
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => setDark(!dark)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{dark ? "Light mode" : "Dark mode"}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeToggle;
