import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { test } from 'node:test';

/** @param {...string} parts */
const read = (...parts) => readFile(join(process.cwd(), ...parts), 'utf8');

test('legacy check cleanup preserves interaction, metadata, and accessibility contracts', async () => {
	const [card, blogCard, episodeCard, comparison, mindMap, posts, article, cloudXrArticle] = await Promise.all([
		read('src', 'lib', 'components', 'design-system', 'Card.svelte'),
		read('src', 'lib', 'components', 'blog', 'BlogCard.svelte'),
		read('src', 'lib', 'components', 'podcast', 'EpisodeCard.svelte'),
		read('src', 'lib', 'components', 'blog', 'ComparisonTable.svelte'),
		read('src', 'lib', 'components', 'blog', 'MindMap3D.svelte'),
		read('src', 'lib', 'utils', 'posts.ts'),
		read('src', 'routes', 'blog', '[slug]', '+page.svelte'),
		read('src', 'content', 'blog', 'nvidia-rtx-apple-vision-pro-cloudxr.md')
	]);

	assert.match(card, /{:else if onclick}[\s\S]*?<button[\s\S]*?onclick=\{onclick\}/);
	assert.doesNotMatch(card, /<div[^>]+\{onclick\}/);
	assert.match(blogCard, /line-clamp:\s*3/);
	assert.match(episodeCard, /line-clamp:\s*2/);
	assert.match(comparison, /{#each items as item, i \(item\.name\)}\s*\{@const stars = renderStars/);
	assert.match(mindMap, /let seoNodes = \$derived\(data \? flattenForSEO\(data\) : \[\]\)/);
	assert.match(mindMap, /role="img"[\s\S]*?aria-label="Interaktive 3D Konzept-Map:[\s\S]*?<canvas[\s\S]*?aria-hidden="true"/);
	assert.match(posts, /updated\?: string/);
	assert.match(posts, /updated:\s*metadata\.updated/);
	assert.match(article, /return\s*\{\s*destroy\(\)[\s\S]*?removeEventListener/);
	assert.doesNotMatch(cloudXrArticle, /<p>\s*<MindMap3D[\s\S]*?<\/p>/);
	assert.match(cloudXrArticle, /<\/div>\r?\n\r?\n<h2>Quellen &amp; Links<\/h2>/);
});
