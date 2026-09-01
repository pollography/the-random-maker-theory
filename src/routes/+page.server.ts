import { getPosts } from '$lib/utils/posts';
import { getLatestEpisode } from '$lib/utils/episodes';
import { selectHomepagePosts } from '$lib/utils/homepage-posts.js';

export const prerender = true;

const FEATURED_POST_SLUG = 'gemini-notebook-kostenlos-codex-content-workflow';

export async function load() {
	const [posts, latestEpisode] = await Promise.all([getPosts(), getLatestEpisode()]);

	return {
		posts: selectHomepagePosts(posts, FEATURED_POST_SLUG, 4),
		latestEpisode,
		totalCount: posts.length + (latestEpisode ? 1 : 0)
	};
}
