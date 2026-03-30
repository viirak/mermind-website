import { defineAction } from "astro:actions";
import { env } from "cloudflare:workers";
import { z } from "astro/zod";
import Sequenzy from "sequenzy";

const subscribe = defineAction({
	accept: "form",
	input: z.object({
		email: z.email("Invalid email address"),
		website: z.string().optional(), // honeypot field
	}),
	handler: async (input) => {
		if (input.website) return; // honeypot field
		const apiKey = env.SEQUENZY_API_KEY;
		if (!apiKey) throw new Error("Missing API key");
		const client = new Sequenzy({ apiKey });
		return await client.subscribers
			.create({
				email: input.email,
				lists: [env.SEQUENZY_SUBSCRIBERS_ID],
			})
			.then(() => input)
			.catch((e) => {
				throw new Error(e.message);
			});
	},
});

export default subscribe;
