import assert from 'node:assert/strict';
import test from 'node:test';

import {
	createArchivePageData,
	paginatePosts,
	sortArchivePosts
} from './blog-pagination.js';

/** @param {string} slug @param {string} date */
const post = (slug, date) => ({ slug, date });

test('sorts by date descending and slug ascending', () => {
	const result = sortArchivePosts([
		post('z', '2026-01-01'),
		post('a', '2026-01-01'),
		post('new', '2026-02-01')
	]);

	assert.deepEqual(result.map((entry) => entry.slug), ['new', 'a', 'z']);
});

test('splits thirteen posts into twelve plus one without overlap', () => {
	const posts = Array.from(
		{ length: 13 },
		(_, index) => post(`p-${index}`, `2026-01-${String(index + 1).padStart(2, '0')}`)
	);
	const first = paginatePosts(posts, 1);
	const second = paginatePosts(posts, 2);

	assert.equal(first.posts.length, 12);
	assert.equal(second.posts.length, 1);
	assert.equal(new Set([...first.posts, ...second.posts].map((entry) => entry.slug)).size, 13);
});

test('models an empty archive as one valid empty first page', () => {
	assert.deepEqual(createArchivePageData([], 1), {
		posts: [],
		currentPage: 1,
		totalPages: 1,
		totalCount: 0
	});
});

test('keeps one and twelve posts on the first page', () => {
	assert.equal(paginatePosts([post('only', '2026-01-01')], 1).posts.length, 1);
	assert.equal(
		paginatePosts(
			Array.from({ length: 12 }, (_, index) => post(`p-${index}`, '2026-01-01')),
			1
		).posts.length,
		12
	);
});

test('rejects non-integer and out-of-range pages', () => {
	const posts = [post('one', '2026-01-01')];

	for (const page of [0, -1, 1.5, Number.NaN, 2]) {
		assert.throws(() => paginatePosts(posts, page), RangeError);
	}
});

test('does not mutate or trust the caller sort order', () => {
	const posts = [post('older', '2026-01-01'), post('newer', '2026-02-01')];

	assert.deepEqual(paginatePosts(posts, 1).posts.map((entry) => entry.slug), ['newer', 'older']);
	assert.deepEqual(posts.map((entry) => entry.slug), ['older', 'newer']);
});
