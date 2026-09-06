import { getPosts } from '$lib/utils/posts';
import { getEpisodes } from '$lib/utils/episodes';
import { selectLatestEpisodeWithUrl } from '$lib/utils/homepage-media.js';
import { selectLatestHomepagePosts } from '$lib/utils/homepage-posts.js';

export const prerender = true;

export async function load() {
	const [posts, episodes] = await Promise.all([getPosts(), getEpisodes()]);

	return {
		posts: selectLatestHomepagePosts(posts, 4),
		latestVideo: selectLatestEpisodeWithUrl(episodes, 'videoUrl'),
		latestAudio: selectLatestEpisodeWithUrl(episodes, 'audioUrl'),
		totalCount: posts.length + episodes.length
	};
}
