/**
 * @template {{ slug: string }} T
 * @param {T[]} currentPosts
 * @param {T[]} incomingPosts
 * @returns {T[]}
 */
export function appendUniquePosts(currentPosts, incomingPosts) {
	const seen = new Set();

	return [...currentPosts, ...incomingPosts].filter((post) => {
		if (seen.has(post.slug)) return false;
		seen.add(post.slug);
		return true;
	});
}

/**
 * @template {{ slug: string }} T
 * @param {{ visiblePosts: T[], nextPage: number | null, isLoading: boolean, loadFailed: boolean, liveMessage: string }} state
 * @param {(page: number) => Promise<{ ok: boolean, status?: number, json: () => Promise<any> }>} fetchPage
 */
export function createBlogFeedLoader(state, fetchPage) {
	return async function loadNext() {
		if (state.isLoading || state.nextPage === null) return;

		const requestedPage = state.nextPage;
		state.isLoading = true;
		state.loadFailed = false;
		state.liveMessage = '';

		try {
			const response = await fetchPage(requestedPage);
			if (!response.ok) throw new Error(`Blog page request failed: ${response.status}`);

			const payload = await response.json();
			state.visiblePosts = appendUniquePosts(state.visiblePosts, payload.posts);
			state.nextPage = requestedPage < payload.totalPages ? requestedPage + 1 : null;
			state.liveMessage =
				state.nextPage === null
					? 'Alle Artikel geladen.'
					: `${state.visiblePosts.length} von ${payload.totalCount} Artikeln geladen.`;
		} catch {
			state.loadFailed = true;
			state.liveMessage = 'Weitere Artikel konnten nicht geladen werden.';
		} finally {
			state.isLoading = false;
		}
	};
}
