import { error } from '@sveltejs/kit';
import { getCoreTopic } from '$lib/data/core-topics';
import { getAllTags, getPostsByTag } from '$lib/utils/posts';

export const prerender = true;

export async function entries() {
	const tags = await getAllTags();
	return tags.map((tag) => ({ tag }));
}

export async function load({ params }) {
	const tag = params.tag;
	const tags = await getAllTags();

	if (!tag || !tags.includes(tag)) {
		throw error(404, 'Tag nicht gefunden');
	}

	const posts = (await getPostsByTag(tag))
		.sort((first, second) => Date.parse(second.date) - Date.parse(first.date) || first.slug.localeCompare(second.slug));
	const topic = getCoreTopic(tag) ?? null;
	const isCoreTopic = topic !== null;
	const configuredStarterSlugs = topic?.starterSlugs ?? [];
	const starterPosts = isCoreTopic
		? configuredStarterSlugs.map((slug) => {
			const post = posts.find((candidate) => candidate.slug === slug);
			if (!post) throw new Error(`Configured starter post ${slug} is missing or does not carry ${tag}`);
			return post;
		})
		: [];
	const starterSlugs = new Set(starterPosts.map((post) => post.slug));
	const remainingPosts = isCoreTopic
		? posts.filter((post) => !starterSlugs.has(post.slug))
		: posts;

	return {
		tag,
		posts,
		isCoreTopic,
		topic,
		starterPosts,
		remainingPosts
	};
}
