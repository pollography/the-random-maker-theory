import { getPosts } from '$lib/utils/posts';
import { getLatestEpisode } from '$lib/utils/episodes';

export const prerender = true;

export async function load() {
	const [posts, latestEpisode] = await Promise.all([getPosts(), getLatestEpisode()]);

	return {
		posts: posts.slice(0, 6),
		latestEpisode,
		totalCount: posts.length + (latestEpisode ? 1 : 0)
	};
}
