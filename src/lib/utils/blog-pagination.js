const DEFAULT_PAGE_SIZE = 12;

/** @typedef {{ slug: string, date: string }} ArchivePost */

/** @param {ArchivePost[]} posts */
export function sortArchivePosts(posts) {
	return [...posts].sort((left, right) => {
		const dateDifference = new Date(right.date).getTime() - new Date(left.date).getTime();
		return dateDifference || String(left.slug).localeCompare(String(right.slug));
	});
}

/** @param {ArchivePost[]} posts @param {number} page @param {number} [pageSize] */
export function createArchivePageData(posts, page, pageSize = DEFAULT_PAGE_SIZE) {
	if (!Number.isInteger(page) || page < 1) {
		throw new RangeError('Archive page must be a positive integer.');
	}

	const sortedPosts = sortArchivePosts(posts);
	const totalCount = sortedPosts.length;
	const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

	if (page > totalPages) {
		throw new RangeError('Archive page is out of range.');
	}

	const start = (page - 1) * pageSize;
	return {
		posts: sortedPosts.slice(start, start + pageSize),
		currentPage: page,
		totalPages,
		totalCount
	};
}

/** @param {ArchivePost[]} posts @param {number} page @param {number} [pageSize] */
export function paginatePosts(posts, page, pageSize = DEFAULT_PAGE_SIZE) {
	return createArchivePageData(posts, page, pageSize);
}
