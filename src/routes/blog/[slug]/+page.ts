import { getPosts } from '$lib/utils/posts';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const posts = await getPosts();
	const post = posts.find((p) => p.slug === params.slug);

	if (!post) {
		error(404, 'Post nicht gefunden');
	}

	const { default: content } = await import(`../../../content/blog/${params.slug}.md`);

	return {
		post,
		content,
	};
}
