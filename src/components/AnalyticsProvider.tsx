import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

const PLAUSIBLE_SCRIPT_ID = "plausible-analytics-script";

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string>; callback?: () => void }) => void;
  }
}

const ensurePlausibleScript = (domain: string, scriptUrl: string) => {
  if (typeof document === "undefined") {
    return;
  }

  if (document.getElementById(PLAUSIBLE_SCRIPT_ID)) {
    return;
  }

  const script = document.createElement("script");
  script.id = PLAUSIBLE_SCRIPT_ID;
  script.defer = true;
  script.setAttribute("data-domain", domain);
  script.src = scriptUrl;
  document.head.appendChild(script);
};

export const trackEvent = (eventName: string, props?: Record<string, string>) => {
  if (typeof window === "undefined" || typeof window.plausible !== "function") {
    return;
  }

  window.plausible(eventName, props ? { props } : undefined);
};

const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
  const plausibleScriptUrl = import.meta.env.VITE_PLAUSIBLE_SCRIPT_URL || "https://plausible.io/js/script.js";

  useEffect(() => {
    if (!plausibleDomain) {
      return;
    }

    ensurePlausibleScript(plausibleDomain, plausibleScriptUrl);
  }, [plausibleDomain, plausibleScriptUrl]);

  useEffect(() => {
    if (!plausibleDomain || typeof window === "undefined" || typeof window.plausible !== "function") {
      return;
    }

    window.plausible("pageview", {
      props: {
        path: `${location.pathname}${location.search}`,
      },
    });
  }, [location.pathname, location.search, plausibleDomain]);

  return <>{children}</>;
};

export default AnalyticsProvider;