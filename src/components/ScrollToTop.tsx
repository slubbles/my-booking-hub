import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset focus to main content for screen readers on route change
    const main = document.getElementById("main-content");
    if (main) {
      main.blur();
      main.focus({ preventScroll: true });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
