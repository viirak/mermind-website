import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context) {
	const posts = await getCollection("blog", ({ data }) => {
		return data.draft !== true;
	});

	return rss({
		title: "Mermind Writing",
		description: "Notes and updates from Mermind on building software.",
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			link: `/blog/${post.id}/`,
		})),
	});
}
