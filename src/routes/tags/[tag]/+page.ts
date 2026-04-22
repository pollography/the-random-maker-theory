import { getAllTags, getPostsByTag } from '$lib/utils/posts';

export const prerender = true;

export async function entries() {
	const tags = await getAllTags();
	return tags.map((tag) => ({ tag }));
}

export async function load({ params }) {
	const posts = await getPostsByTag(params.tag);

	return {
		tag: params.tag,
		posts,
	};
}
