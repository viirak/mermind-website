import { defineAction } from "astro:actions";
import { z } from "astro/zod";

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
	handler: async (input, context) => {
		console.log("Contact form submitted:", input);
		// Honeypot check: if the hidden field is filled, it's a bot
		if (input.website) {
			return { success: true }; // Return success silently
		}
		// TODO: send email
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return { success: true };
	},
});

export default submitContact;
