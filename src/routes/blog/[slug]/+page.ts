import { getPosts } from '$lib/utils/posts';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const posts = await getPosts();
	const post = posts.find((p) => p.slug === params.slug);

	if (!post) {
		error(404, 'Post nicht gefunden');
	}

	const { default: content } = await import(`../../../content/blog/${params.slug}.md`);

	// Related posts: same tags, excluding current, max 3
	const relatedPosts = posts
		.filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
		.sort((a, b) => {
			const aMatches = a.tags.filter((t) => post.tags.includes(t)).length;
			const bMatches = b.tags.filter((t) => post.tags.includes(t)).length;
			return bMatches - aMatches;
		})
		.slice(0, 3);

	return {
		post,
		content,
		relatedPosts,
	};
}
