import { sortArchivePosts } from './blog-pagination.js';

/**
 * Select the newest homepage posts using the same deterministic order as the blog archive.
 *
 * @template {{ slug: string, date: string }} T
 * @param {T[] | null | undefined} posts
 * @param {number} [limit]
 * @returns {T[]}
 */
export function selectLatestHomepagePosts(posts, limit = 4) {
	if (!Array.isArray(posts) || posts.length === 0 || !Number.isFinite(limit) || limit <= 0) {
		return [];
	}

	return sortArchivePosts(posts).slice(0, Math.floor(limit));
}
