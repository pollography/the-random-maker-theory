import { normalizeTopicFamily } from '../data/core-topics.js';

/**
 * Select a featured homepage post, then prefer recent posts from other categories.
 * The source list is expected to already be sorted newest first.
 *
 * @template {{ slug: string, category?: string }} T
 * @param {T[]} posts
 * @param {string} featuredSlug
 * @param {number} [limit]
 * @returns {T[]}
 */
export function selectHomepagePosts(posts, featuredSlug, limit = 4) {
	if (!Array.isArray(posts) || posts.length === 0 || limit <= 0) return [];

	const featured = posts.find((post) => post.slug === featuredSlug) ?? posts[0];
	const selected = [featured];
	const usedSlugs = new Set([featured.slug]);
	const usedFamilies = new Set([normalizeTopicFamily(featured.category)]);

	for (const post of posts) {
		if (selected.length >= limit) break;
		const family = normalizeTopicFamily(post.category);
		if (usedSlugs.has(post.slug) || usedFamilies.has(family)) continue;
		selected.push(post);
		usedSlugs.add(post.slug);
		usedFamilies.add(family);
	}

	for (const post of posts) {
		if (selected.length >= limit) break;
		if (usedSlugs.has(post.slug)) continue;
		selected.push(post);
		usedSlugs.add(post.slug);
	}

	return selected;
}
