import assert from 'node:assert/strict';
import test from 'node:test';
import { appendUniquePosts, createBlogFeedLoader } from './blog-feed.js';

test('appends unseen slugs once and preserves response order without mutating inputs', () => {
	const current = [{ slug: 'a' }];
	const incoming = [{ slug: 'a' }, { slug: 'b' }, { slug: 'b' }, { slug: 'c' }];
	const result = appendUniquePosts(current, incoming);

	assert.deepEqual(result.map((post) => post.slug), ['a', 'b', 'c']);
	assert.deepEqual(current, [{ slug: 'a' }]);
	assert.equal(incoming.length, 4);
});

test('loads one page at a time and stops at the final page', async () => {
	const state = {
		visiblePosts: [{ slug: 'a' }],
		nextPage: 2,
		isLoading: false,
		loadFailed: false,
		liveMessage: ''
	};
	const requested = [];
	const loadNext = createBlogFeedLoader(state, async (page) => {
		requested.push(page);
		return {
			ok: true,
			json: async () => ({
				posts: [{ slug: 'a' }, { slug: 'b' }],
				currentPage: 2,
				totalPages: 2,
				totalCount: 2
			})
		};
	});

	await Promise.all([loadNext(), loadNext()]);

	assert.deepEqual(requested, [2]);
	assert.deepEqual(state.visiblePosts.map((post) => post.slug), ['a', 'b']);
	assert.equal(state.nextPage, null);
	assert.equal(state.isLoading, false);
	assert.equal(state.loadFailed, false);
	assert.equal(state.liveMessage, 'Alle Artikel geladen.');
});

test('exposes a retryable state after a failed page request', async () => {
	const state = {
		visiblePosts: [{ slug: 'a' }],
		nextPage: 2,
		isLoading: false,
		loadFailed: false,
		liveMessage: ''
	};
	let attempts = 0;
	const loadNext = createBlogFeedLoader(state, async () => {
		attempts += 1;
		if (attempts === 1) return { ok: false, status: 503, json: async () => ({}) };
		return {
			ok: true,
			json: async () => ({ posts: [{ slug: 'b' }], currentPage: 2, totalPages: 2, totalCount: 2 })
		};
	});

	await loadNext();
	assert.equal(state.loadFailed, true);
	assert.equal(state.nextPage, 2);
	assert.equal(state.liveMessage, 'Weitere Artikel konnten nicht geladen werden.');

	await loadNext();
	assert.equal(state.loadFailed, false);
	assert.equal(state.nextPage, null);
});
