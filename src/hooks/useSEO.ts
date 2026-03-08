import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
  image?: string;
}

const SITE_NAME = "Idderf Salem";
const BASE_URL = "https://idderfsalem.dev";
const DEFAULT_DESCRIPTION =
  "Full Stack Developer building production web applications from idea to launch. Specializing in React, TypeScript, Node.js, and payment integrations.";
const OG_IMAGE = `${BASE_URL}/og-image.png`;

const useSEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  type = "website",
  image,
}: SEOProps = {}) => {
  useEffect(() => {
    const fullTitle = title ? `${title} - ${SITE_NAME}` : `${SITE_NAME} - Full Stack Developer`;
    document.title = fullTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const ogImage = image || OG_IMAGE;

    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", `${BASE_URL}${path}`);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
    setMeta("name", "twitter:creator", "@idderfsalem");

    // JSON-LD
    let script = document.querySelector('script[data-seo="jsonld"]') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo", "jsonld");
      document.head.appendChild(script);
    }

    const jsonLd = title
      ? { "@context": "https://schema.org", "@type": "WebPage", name: fullTitle, description, url: `${BASE_URL}${path}`, image: ogImage }
      : {
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Idderf Salem",
          jobTitle: "Full Stack Developer",
          url: BASE_URL,
          image: OG_IMAGE,
          description: DEFAULT_DESCRIPTION,
          knowsAbout: ["React", "TypeScript", "Node.js", "Next.js", "PostgreSQL", "Stripe"],
          sameAs: [
            "https://github.com/slubbles",
            "https://www.linkedin.com/in/idderfsalem/",
            "https://x.com/idderfsalem",
          ],
        };
    script.textContent = JSON.stringify(jsonLd);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${BASE_URL}${path}`;
  }, [title, description, path, type, image]);
};

export default useSEO;
