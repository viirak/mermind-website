// @ts-check

import partytown from "@astrojs/partytown";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://mermind.ai",
	output: "static",

	image: {
		service: {
			entrypoint: "@astrojs/image/sharp",
			config: {
				quality: 80,
				format: ["webp", "avif", "jpeg"],
			},
		},
	},

	integrations: [partytown()],
});
