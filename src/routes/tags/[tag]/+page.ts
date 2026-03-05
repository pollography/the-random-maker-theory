import { getPostsByTag } from '$lib/utils/posts';

export async function load({ params }) {
	const posts = await getPostsByTag(params.tag);

	return {
		tag: params.tag,
		posts,
	};
}
