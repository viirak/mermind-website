import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://mermind.ai",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});
