import { defineAction } from "astro:actions";
import { env } from "cloudflare:workers";
import { z } from "astro/zod";
import Sequenzy from "sequenzy";

const submitWaitList = defineAction({
	accept: "form",
	input: z.object({
		email: z.email("Invalid email address"),
		name: z
			.string()
			.min(2, "Name must be at least 2 characters")
			.max(30, "Name must be less than 30 characters")
			.regex(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces"),
		company: z
			.string()
			.min(3, "Company name must be at least 3 characters")
			.max(50, "Company name must be less than 50 characters")
			.regex(
				/^[A-Za-z\s]+$/,
				"Company name must only contain letters and spaces",
			)
			.optional(),
		storeUrl: z
			.url("Invalid store URL")
			.min(3, "Store URL must be at least 3 characters")
			.max(100, "Store URL must be less than 100 characters"),
		website: z.string().optional(), // honeypot field
	}),
	handler: async (input) => {
		if (input.website) return; // honeypot field
		const apiKey = env.SEQUENZY_API_KEY;
		if (!apiKey) throw new Error("Missing API key");
		const client = new Sequenzy({ apiKey });
		return await client.subscribers
			.create({
				firstName: input.name,
				email: input.email,
				customAttributes: {
					company: input.company,
					storeUrl: input.storeUrl,
				},
				lists: [env.SEQUENZY_WAITLIST_ID],
			})
			.then(() => input)
			.catch((e) => {
				throw new Error(e.message);
			});
	},
});

export default submitWaitList;
