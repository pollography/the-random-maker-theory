import { getPosts } from '$lib/utils/posts';
import { getLatestEpisode } from '$lib/utils/episodes';

export const prerender = true;

export async function load() {
	const [posts, latestEpisode] = await Promise.all([
		getPosts(),
		getLatestEpisode()
	]);

	return {
		posts,
		latestEpisode,
		totalCount: posts.length + (latestEpisode ? 1 : 0)
	};
}
