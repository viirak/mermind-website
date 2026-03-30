import { defineAction } from "astro:actions";
import { env } from "cloudflare:workers";
import { z } from "astro/zod";
import Sequenzy from "sequenzy";

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

const submitContact = defineAction({
	accept: "form",
	input: z.object({
		name: z
			.string()
			.min(2, "Name must be at least 2 characters")
			.max(30, "Name must be less than 30 characters")
			.regex(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces"),
		email: z.email("Invalid email address"),
		company: z
			.string()
			.min(3, "Company name must be at least 3 characters")
			.max(50, "Company name must be less than 50 characters")
			.regex(
				/^[A-Za-z\s]+$/,
				"Company name must only contain letters and spaces",
			)
			.optional(),
		subject: z.string().min(1, "Please select a subject"),
		message: z
			.string()
			.min(10, "Message must be at least 10 characters")
			.max(1000, "Message must be less than 1000 characters"),
		website: z.string().optional(),
	}),
	handler: async (input) => {
		if (input.website) return { success: true }; // honeypot
		const apiKey = env.SEQUENZY_API_KEY;
		if (!apiKey) return { success: false };
		const client = new Sequenzy({ apiKey });
		try {
			await client.transactional.send({
				to: "contact@mermind.ai",
				subject: "New message from contact form",
				body: `<h1>New message from contact form</h1><p>Name: ${escapeHtml(input.name)}</p><p>Email: ${escapeHtml(input.email)}</p><p>Company: ${escapeHtml(input.company ?? "")}</p><p>Subject: ${escapeHtml(input.subject)}</p><p>Message: ${escapeHtml(input.message)}</p>`,
			});
			return { success: true };
		} catch {
			return { success: false };
		}
	},
});

export default submitContact;
