import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const contentDir = dirname(fileURLToPath(import.meta.url));
const articles = [
	'ultimate-bildprompts-part-3.md',
	'kuerzeste-bildprompts-technik-innenansichten.md'
];

test('image-prompt articles belong to KI & Tech and Fotografie, not Maker', async () => {
	for (const article of articles) {
		const source = await readFile(join(contentDir, article), 'utf8');
		const tags = source.match(/^tags:\s*\[(.+)\]$/m)?.[1] ?? '';

		assert.match(tags, /"ki-tools"/, `${article} needs the KI & Tech tag`);
		assert.match(tags, /"fotografie"/, `${article} needs the Fotografie tag`);
		assert.doesNotMatch(tags, /"maker"/, `${article} must not appear under Maker`);
	}
});
