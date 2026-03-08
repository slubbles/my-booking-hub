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
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="bg-foreground text-background overflow-hidden"
        >
          <div className="container mx-auto px-6 flex items-center justify-center gap-3 py-2 text-[13px] relative">
            <span className="font-medium tracking-wide">Currently open for new projects</span>
            <Link
              to="/booking"
              className="inline-flex items-center gap-1 font-semibold hover:underline underline-offset-2 opacity-80 hover:opacity-100 transition-opacity"
            >
              Book a call <ArrowRight size={11} />
            </Link>
            <button
              onClick={handleDismiss}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-background/10 transition-colors"
              aria-label="Dismiss"
            >
              <X size={12} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBanner;
