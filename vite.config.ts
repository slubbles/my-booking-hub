import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return undefined;
          }

          if (id.includes("react") || id.includes("scheduler")) {
            return "react-vendor";
          }

          if (id.includes("react-router") || id.includes("@remix-run")) {
            return "router-vendor";
          }

          if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils")) {
            return "motion-vendor";
          }

          if (id.includes("@radix-ui") || id.includes("cmdk") || id.includes("vaul") || id.includes("embla-carousel-react")) {
            return "ui-vendor";
          }

          if (id.includes("@sentry")) {
            return "monitoring-vendor";
          }

          if (id.includes("@supabase") || id.includes("ws")) {
            return "supabase-vendor";
          }

          if (id.includes("date-fns") || id.includes("zod")) {
            return "utils-vendor";
          }

          if (id.includes("recharts") || id.includes("d3-")) {
            return "charts-vendor";
          }

          return "vendor";
        },
      },
    },
  },
}));
