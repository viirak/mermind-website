import { defineAction } from "astro:actions";
import { env } from "cloudflare:workers";
import { z } from "astro/zod";
import Sequenzy from "sequenzy";

const submitWaitList = defineAction({
	accept: "form",
	input: z.object({
		email: z.email("Invalid email address"),
		website: z.string().optional(), // honeypot field
	}),
	handler: async (input) => {
		if (input.website) return { success: true }; // honeypot
		const apiKey = env.SEQUENZY_API_KEY;
		if (!apiKey) return { success: false };
		const client = new Sequenzy({ apiKey });
		await client.subscribers
			.create({
				email: input.email,
				lists: [env.SEQUENZY_WAITLIST_ID],
			})
			.then(() => {
				return { success: true };
			})
			.catch(() => {
				return { success: false };
			});
	},
});

export default submitWaitList;
