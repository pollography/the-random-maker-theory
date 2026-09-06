import assert from 'node:assert/strict';
import test from 'node:test';

import { selectLatestEpisodeWithUrl } from './homepage-media.js';

test('selects the newest episode that has the requested URL', () => {
	const episodes = [
		{ slug: 'new-empty', date: '2026-09-03', audioUrl: '' },
		{ slug: 'playable', date: '2026-09-02', audioUrl: 'https://open.spotify.com/episode/id' },
		{ slug: 'older', date: '2026-09-01', audioUrl: 'https://open.spotify.com/episode/older' }
	];

	assert.equal(selectLatestEpisodeWithUrl(episodes, 'audioUrl')?.slug, 'playable');
	assert.equal(episodes[0].slug, 'new-empty');
});

test('uses the slug as a deterministic tie breaker', () => {
	const episodes = [
		{ slug: 'z', date: '2026-09-03', videoUrl: 'https://youtube.com/watch?v=z' },
		{ slug: 'a', date: '2026-09-03', videoUrl: 'https://youtube.com/watch?v=a' }
	];

	assert.equal(selectLatestEpisodeWithUrl(episodes, 'videoUrl')?.slug, 'a');
});

test('returns null when no episode has a real URL', () => {
	assert.equal(selectLatestEpisodeWithUrl([], 'audioUrl'), null);
	assert.equal(selectLatestEpisodeWithUrl([{ slug: 'empty', date: '2026-09-03', audioUrl: '  ' }], 'audioUrl'), null);
});
