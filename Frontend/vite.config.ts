import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    // Bind to all IPv4 interfaces to avoid IPv6-only listen issues
    // and use Vite's default port so the dev client connects reliably.
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      overlay: true,
    },
    // Workaround for Linux inotify watch limits (ENOSPC).
    // Polling avoids using additional file watchers.
    watch: {
      usePolling: true,
      interval: 100,
      ignored: ["**/node_modules/**", "**/.git/**"],
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
