import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import {
	buildIssueBody,
	collectCandidates,
	pairBlogWithVideos,
	parseBlogRss,
	parseYouTubeAtom
} from './chase-content-radar.mjs';

const youtubeFixture = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://www.youtube.com/xml/schemas/2015">
  <entry>
    <id>yt:video:short123</id>
    <yt:videoId>short123</yt:videoId>
    <yt:channelId>UCoy6cTJ7Tg0dqS-DI-_REsA</yt:channelId>
    <title>Fable 5.1 in 30 seconds</title>
    <link rel="alternate" href="https://www.youtube.com/shorts/short123" />
    <published>2026-09-01T21:59:44+00:00</published>
  </entry>
  <entry>
    <id>yt:video:onL8VFMzxsA</id>
    <yt:videoId>onL8VFMzxsA</yt:videoId>
    <yt:channelId>UCoy6cTJ7Tg0dqS-DI-_REsA</yt:channelId>
    <title>Fable 5.1 Is The Greatest Model Ever (And Cheaper Than Fable 5)</title>
    <link rel="alternate" href="https://www.youtube.com/watch?v=onL8VFMzxsA" />
    <published>2026-09-01T18:48:58+00:00</published>
  </entry>
</feed>`;

const blogFixture = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <item>
    <title>Fable 5.1: Better Benchmarks, 25% Lower Cost</title>
    <link>https://chaseai.io/blog/fable-5-1-better-cheaper-than-fable-5</link>
    <guid>https://chaseai.io/blog/fable-5-1-better-cheaper-than-fable-5</guid>
    <pubDate>Wed, 02 Sep 2026 01:02:48 GMT</pubDate>
    <description><![CDATA[Fable 5.1 beats Fable 5 while costing less.]]></description>
  </item>
</channel></rss>`;

test('YouTube parser keeps normal videos and excludes Shorts by canonical feed URL', () => {
	const videos = parseYouTubeAtom(youtubeFixture, 'UCoy6cTJ7Tg0dqS-DI-_REsA');

	assert.equal(videos.length, 1);
	assert.equal(videos[0].id, 'onL8VFMzxsA');
	assert.equal(videos[0].key, 'youtube:onL8VFMzxsA');
});

test('blog parser returns a stable canonical key and readable description', () => {
	const posts = parseBlogRss(blogFixture);

	assert.equal(posts.length, 1);
	assert.equal(
		posts[0].key,
		'blog:https://chaseai.io/blog/fable-5-1-better-cheaper-than-fable-5'
	);
	assert.equal(posts[0].description, 'Fable 5.1 beats Fable 5 while costing less.');
});

test('blog posts pair with a recent related long-form video without requiring identical titles', () => {
	const videos = parseYouTubeAtom(youtubeFixture, 'UCoy6cTJ7Tg0dqS-DI-_REsA');
	const posts = parseBlogRss(blogFixture);

	const paired = pairBlogWithVideos(posts, videos);

	assert.equal(paired[0].relatedVideoId, 'onL8VFMzxsA');
});

test('candidate collection is fail-closed at the bootstrap boundary and keeps both source types', () => {
	const result = collectCandidates({
		youtubeXml: youtubeFixture,
		blogXml: blogFixture,
		channelId: 'UCoy6cTJ7Tg0dqS-DI-_REsA',
		notBefore: '2026-09-01T18:00:00Z'
	});

	assert.deepEqual(result.candidates.map((candidate) => candidate.type), ['youtube', 'blog']);
	assert.equal(result.candidates[1].relatedVideoId, 'onL8VFMzxsA');
	assert.throws(() => collectCandidates({
		youtubeXml: youtubeFixture,
		blogXml: blogFixture,
		channelId: 'UCoy6cTJ7Tg0dqS-DI-_REsA',
		notBefore: 'not-a-date'
	}), /notBefore/);
});

test('issue body makes the independent-research and human-release gates explicit', () => {
	const [video] = parseYouTubeAtom(youtubeFixture, 'UCoy6cTJ7Tg0dqS-DI-_REsA');
	const body = buildIssueBody(video);

	assert.match(body, /nur Themenradar/i);
	assert.match(body, /Primärquellen/i);
	assert.match(body, /keine Übersetzung/i);
	assert.match(body, /keine automatische Veröffentlichung/i);
	assert.match(body, /<!-- chase-source:youtube:onL8VFMzxsA -->/);
});

test('GitHub workflow runs remotely every four hours and can create durable radar issues', () => {
	const workflow = readFileSync('.github/workflows/chase-content-radar.yml', 'utf8');

	assert.match(workflow, /cron: ['"]7 \*\/4 \* \* \*['"]/);
	assert.match(workflow, /issues:\s*write/);
	assert.match(workflow, /scripts\/chase-content-radar\.mjs/);
	assert.match(workflow, /actions\/github-script@v8/);
	assert.match(workflow, /issues\.push\(created\.data\)/);
});
