import { getEpisodes } from '$lib/utils/episodes';
import { error } from '@sveltejs/kit';

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

	return {
		episode,
		content,
	};
}
