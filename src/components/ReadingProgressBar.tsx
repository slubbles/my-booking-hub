import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress((scrollTop / docHeight) * 100);
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  if (progress < 1) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[55] h-[2px] bg-border/30">
      <motion.div
        className="h-full bg-primary"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.05 }}
      />
    </div>
  );
};

export default ReadingProgressBar;
