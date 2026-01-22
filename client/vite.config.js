import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = parseInt(env.PORT || "3001");

  return {
    plugins: [react(), tailwindcss()],

    publicDir: "public",
    base: env.PUBLIC_URL || "/",

    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },

    server: {
      port: port,
      host: env.HOST || "localhost",
      https: env.HTTPS === "true" ? {} : undefined,
      open: true,
    },

    preview: {
      port,
    },

    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom"],
      esbuildOptions: {
        loader: {
          ".js": "jsx",
        },
      },
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    esbuild: {
      logOverride: { "this-is-undefined-in-esm": "silent" },
    },
  };
});
