import { error } from '@sveltejs/kit';
import type { Post } from '$lib/utils/posts';
import type { PageLoadEvent } from './$types';

export const prerender = false; // Don't prerender preview pages

export async function load({ params }: PageLoadEvent) {
	// Load ALL posts including drafts — bypass the draft filter in getPosts()
	const modules = import.meta.glob<{ metadata: Record<string, unknown>; default: unknown }>(
		'/src/content/blog/*.md',
		{ eager: true }
	);

	const allPosts: Post[] = [];

	for (const path in modules) {
		const module = modules[path];
		const metadata = module.metadata as Record<string, unknown>;

		allPosts.push({
			slug: metadata.slug as string,
			title: metadata.title as string,
			titleAccent: (metadata.titleAccent as string) || '',
			date: metadata.date as string,
			description: metadata.description as string,
			tags: (metadata.tags as string[]) || [],
			category: (metadata.category as string) || 'general',
			heroImage: metadata.heroImage as string | undefined,
			heroImageThumb: metadata.heroImageThumb as string | undefined,
			draft: (metadata.draft as boolean) || false,
			readingTime: metadata.readingTime as number | undefined,
			podcastSlug: metadata.podcastSlug as string | undefined,
			podcastUrl: metadata.podcastUrl as string | undefined,
			videoUrl: metadata.videoUrl as string | undefined,
		});
	}

	const post = allPosts.find((p) => p.slug === params.slug);

	if (!post) {
		error(404, 'Post nicht gefunden');
	}

	const { default: content } = await import(`../../../content/blog/${params.slug}.md`);

	// Related posts: same tags, excluding current, max 3 — only published posts
	const publishedPosts = allPosts.filter((p) => !p.draft);
	const relatedPosts = publishedPosts
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
