import assert from 'node:assert/strict';
import test from 'node:test';

import { selectLatestHomepagePosts } from './homepage-posts.js';

test('returns only the newest posts in stable chronological order', () => {
	const posts = [
		{ slug: 'z', date: '2026-09-01' },
		{ slug: 'b', date: '2026-09-03' },
		{ slug: 'a', date: '2026-09-03' },
		{ slug: 'c', date: '2026-09-02' },
		{ slug: 'old', date: '2026-08-01' }
	];

	assert.deepEqual(
		selectLatestHomepagePosts(posts, 4).map((post) => post.slug),
		['a', 'b', 'c', 'z']
	);
	assert.deepEqual(posts.map((post) => post.slug), ['z', 'b', 'a', 'c', 'old']);
});

test('returns an empty homepage selection for invalid or empty input', () => {
	assert.deepEqual(selectLatestHomepagePosts([], 4), []);
	assert.deepEqual(selectLatestHomepagePosts(null, 4), []);
	assert.deepEqual(selectLatestHomepagePosts([{ slug: 'a', date: '2026-09-03' }], 0), []);
});
