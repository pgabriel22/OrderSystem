import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Ensure correct base path
  build: {
    outDir: "dist", // Output folder
    rollupOptions: {
      output: {
        entryFileNames: `[name].[hash].js`, // Ensure JS files have the .js extension
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `[name].[hash].[ext]`,
      },
    },
  },
  server: {
    mimeTypes: {
      "application/javascript": ["js"],
    },
  },
});
