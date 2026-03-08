import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import usePageTitle from "@/hooks/usePageTitle";
import PageTransition from "@/components/PageTransition";

const NotFound = () => {
  usePageTitle("Page Not Found");

  return (
    <PageTransition>
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center px-6">
          <div className="text-[100px] md:text-[160px] font-bold leading-none tracking-tighter text-foreground/[0.04] select-none">
            404
          </div>
          <h1 className="text-[22px] md:text-[30px] font-bold tracking-[-0.02em] text-foreground -mt-6 mb-2">
            Page not found
          </h1>
          <p className="text-[13px] text-muted-foreground mb-8 max-w-sm mx-auto font-light">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="rounded-full px-7 h-11 text-[13px] font-medium" asChild>
              <Link to="/"><Home size={14} className="mr-1" /> Go Home</Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-7 h-11 text-[13px] font-medium" onClick={() => window.history.back()}>
              <ArrowLeft size={14} className="mr-1" /> Go Back
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
