import { getEpisodes } from '$lib/utils/episodes';
import { getPost } from '$lib/utils/posts';
import { error } from '@sveltejs/kit';

export const prerender = true;

export async function load({ params }) {
	const episodes = await getEpisodes();
	const episode = episodes.find((e) => e.slug === params.slug);

	if (!episode) {
		error(404, 'Episode nicht gefunden');
	}

	let content = null;
	try {
		const module = await import(`../../../content/podcast/${params.slug}.md`);
		content = module.default;
	} catch {
		// No content, just show episode details
	}

	// Only surface the blog link if the referenced post is actually published.
	// Drafts and stale slugs would otherwise prerender as 404s.
	const blogSlugResolved = episode.blogSlug
		? (await getPost(episode.blogSlug))?.slug ?? null
		: null;

	return {
		episode: { ...episode, blogSlug: blogSlugResolved },
		content,
	};
}
