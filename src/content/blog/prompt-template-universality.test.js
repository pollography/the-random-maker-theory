import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const contentRoot = new URL('./', import.meta.url);
const libraryFile = new URL('../../lib/data/image-prompts.json', import.meta.url);

const articleFiles = new Map([
	['ultimate-bildprompts-part-3', new URL('ultimate-bildprompts-part-3.md', contentRoot)],
	[
		'praezise-bildprompts-weniger-zufall',
		new URL('praezise-bildprompts-weniger-zufall.md', contentRoot)
	]
]);

const hardcodedTestSubject =
	/\b(?:same man|the man|his face|his portrait)\b|\bGlatze\b|\bbald head\b|\blong dark beard\b|\blangen? (?:dunklen? )?Bart\b|\borange(?:farbene)? (?:aviator glasses|Pilotenbrille|Brille)\b|\bt(?:u|ü)rkise[nrms]? (?:Hoodie|Hoodie-Silhouette|Werkzeugteile|Seen|Bl(?:u|ü)ten)\b|\bexact (?:unbranded )?black mirrorless camera\b/i;

/**
 * @typedef {object} PromptEntry
 * @property {string} promptType
 * @property {string} promptText
 * @property {string} command
 * @property {string} [articleSlug]
 */

/** @param {string} article */
function extractPromptBlocks(article) {
	return [...article.matchAll(/```prompt\r?\n([\s\S]*?)\r?\n```/g)].map((match) => match[1].trim());
}

test('all detailed copy-paste prompts are universal templates instead of descriptions of the test subject', async () => {
	/** @type {{ prompts: PromptEntry[] }} */
	const library = JSON.parse(await readFile(libraryFile, 'utf8'));
	const detailedPrompts = library.prompts.filter((prompt) => prompt.promptType === 'detailed');

	assert.equal(detailedPrompts.length, 60);
	for (const prompt of detailedPrompts) {
		assert.match(prompt.promptText, /\[\[[^\]]+\]\]/, `${prompt.command} has no editable placeholder`);
		assert.doesNotMatch(
			prompt.promptText,
			hardcodedTestSubject,
			`${prompt.command} still describes the original test portrait or camera`
		);
	}
});

test('article copy blocks stay byte-for-byte aligned with the canonical library templates', async () => {
	/** @type {{ prompts: PromptEntry[] }} */
	const library = JSON.parse(await readFile(libraryFile, 'utf8'));

	for (const [articleSlug, articleFile] of articleFiles) {
		const article = await readFile(articleFile, 'utf8');
		const articlePrompts = extractPromptBlocks(article);
		const expected = library.prompts
			.filter((prompt) => prompt.promptType === 'detailed' && prompt.articleSlug === articleSlug)
			.map((prompt) => prompt.promptText);

		assert.deepEqual(articlePrompts.slice(0, expected.length), expected, `${articleSlug} is out of sync`);
		for (const promptText of articlePrompts) {
			assert.match(promptText, /\[\[[^\]]+\]\]/, `${articleSlug} contains a block without a placeholder`);
			assert.doesNotMatch(promptText, hardcodedTestSubject, `${articleSlug} contains a hardcoded test subject`);
		}
	}
});
