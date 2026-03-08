import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AnnouncementBanner = () => {
  const [dismissed, setDismissed] = useState(() => {
    return sessionStorage.getItem("banner-dismissed") === "true";
  });

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("banner-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-foreground text-background overflow-hidden"
        >
          <div className="container mx-auto px-6 flex items-center justify-center gap-3 py-2.5 text-[12px] relative">
            <span className="font-medium">Currently open for new projects</span>
            <Link
              to="/booking"
              className="inline-flex items-center gap-1 font-semibold hover:underline underline-offset-2"
            >
              Book a call <ArrowRight size={12} />
            </Link>
            <button
              onClick={handleDismiss}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-background/10 transition-colors"
              aria-label="Dismiss"
            >
              <X size={13} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBanner;
