import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { VitePWAOptions } from "vite-plugin-pwa";
import { VitePWA } from "vite-plugin-pwa";
import type { RollupReplaceOptions } from "@rollup/plugin-replace";
import replace from "@rollup/plugin-replace";

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  includeAssets: [
    "favicon.ico",
    "apple-touch-icon.png",
    "favicon-16x16.png",
    "favicon-32x32.png",
  ],
  manifest: {
    name: "Civilian Defense Drills",
    short_name: "CDD",
    description: "App to create & record shooting drills.",
    theme_color: "#ff9b52",
    icons: [
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
};

const replaceOptions: RollupReplaceOptions = {
  preventAssignment: true,
  __DATE__: new Date().toISOString(),
};

export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions), replace(replaceOptions)],
});
