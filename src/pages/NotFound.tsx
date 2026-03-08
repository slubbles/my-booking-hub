import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import usePageTitle from "@/hooks/usePageTitle";

const NotFound = () => {
  usePageTitle("Page Not Found");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-6">
        <div className="text-[120px] md:text-[180px] font-bold leading-none tracking-tighter text-foreground/5 select-none">
          404
        </div>
        <h1 className="text-[24px] md:text-[32px] font-bold text-foreground -mt-6 mb-2">
          Page not found
        </h1>
        <p className="text-[14px] text-muted-foreground mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="default" size="lg" asChild>
            <Link to="/"><Home size={16} /> Go Home</Link>
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft size={16} /> Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
