import assert from 'node:assert/strict';
import test from 'node:test';

import { selectHomepagePosts } from './homepage-posts.js';

const posts = [
	{ slug: 'latest-ai', category: 'ki-tools' },
	{ slug: 'pinned-ai', category: 'ki-tools' },
	{ slug: 'maker', category: 'maker' },
	{ slug: 'photo', category: 'fotografie' },
	{ slug: 'automation', category: 'automatisierung' },
	{ slug: 'another-ai', category: 'ki-tools' }
];

test('keeps the configured post first and diversifies the following categories', () => {
	assert.deepEqual(
		selectHomepagePosts(posts, 'pinned-ai').map((post) => post.slug),
		['pinned-ai', 'maker', 'photo', 'automation']
	);
});

test('falls back to the newest post when the configured slug is missing', () => {
	assert.deepEqual(
		selectHomepagePosts(posts, 'missing', 4).map((post) => post.slug),
		['latest-ai', 'maker', 'photo', 'automation']
	);
});

test('returns no posts for an empty source list', () => {
	assert.deepEqual(selectHomepagePosts([], 'missing'), []);
});

test('returns no posts when the requested limit is zero', () => {
	assert.deepEqual(selectHomepagePosts(posts, 'pinned-ai', 0), []);
});
