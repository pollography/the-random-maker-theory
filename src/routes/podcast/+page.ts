import { getEpisodes } from '$lib/utils/episodes';

export const prerender = true;

export async function load() {
	const episodes = await getEpisodes();
	return { episodes };
}
