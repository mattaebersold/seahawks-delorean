import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import netlifyReactRouter from "@netlify/vite-plugin-react-router";
import netlify from "@netlify/vite-plugin";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  optimizeDeps: {
    include: ["react-dropzone"],
  },
  ssr: {
    noExternal: ["react-dropzone", "sanity-plugin-media"],
  },
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    netlifyReactRouter(),
    netlify(),
    devtoolsJson(),
  ],
});
