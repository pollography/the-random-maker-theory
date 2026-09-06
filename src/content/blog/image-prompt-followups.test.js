// @ts-nocheck
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { readImageDimensions } from '../../../scripts/generate-image-metadata.mjs';

const contentRoot = new URL('./', import.meta.url);
const staticRoot = new URL('../../../static/', import.meta.url);
const libraryUrl = new URL('../../lib/data/image-prompts.json', import.meta.url);

const articleFiles = [
	'kuerzeste-bildprompts-menschen-posen.md',
	'kuerzeste-bildprompts-avatare-reaktionen.md',
	'kuerzeste-bildprompts-alter-transformation.md',
	'kuerzeste-bildprompts-technik-innenansichten.md',
	'kuerzeste-bildprompts-infografiken-wissen.md',
	'kuerzeste-bildprompts-welten-filmszenen.md',
	'bildprompts-spielzeug-sammlerstuecke.md',
	'bildprompts-miniaturwelten.md',
	'bildprompts-comics-retro.md',
	'bildprompts-stoff-knete-glas.md',
	'bildprompts-portraet-verbessern.md',
	'bildprompts-creator-ki-video.md'
];

const hardcodedTestSubject =
	/\bGlatze\b|\bbald head\b|\blangen? (?:dunklen? )?Bart\b|\borange(?:farbene|n|r|s)? (?:Piloten)?[Bb]rille\b|\bt(?:u|ü)rkise[nrms]? (?:Hoodie|Kapuzenpullover)\b|\bmein(?:em|en)? (?:Porträt|Referenzfoto|Foto)\b|\bmy (?:portrait|reference photo)\b/i;

function numberedSections(article) {
	const headings = [...article.matchAll(/^## (\d+)\. `\/([^`]+)`:[^\r\n]*$/gm)];
	return headings.map((heading, index) => ({
		number: Number(heading[1]),
		command: heading[2],
		body: article.slice(heading.index, headings[index + 1]?.index ?? article.length)
	}));
}

function promptBlocks(section) {
	return [...section.matchAll(/```prompt\r?\n([\s\S]*?)\r?\n```/g)].map((match) => match[1].trim());
}

function followupImage(section) {
	return section.match(
		/!\[[^\]]+\]\((\/images\/blog\/ki-bildprompts\/followups\/(\d{2})-[a-z0-9-]+-followup\.webp)\)/
	);
}

test('all 86 short-prompt entries pair with an independent controlled counter-test', async () => {
	const sections = [];

	for (const file of articleFiles) {
		const article = await readFile(new URL(file, contentRoot), 'utf8');
		assert.match(article, /neuen Chat/i, `${file} needs the fresh-chat rule`);
		assert.match(
			article,
			/Ein-Wort-Ergebnis[^\r\n]+(?:nicht|keine)[^\r\n]+Referenz|(?:nicht|keine)[^\r\n]+Ein-Wort-Ergebnis[^\r\n]+Referenz/i,
			`${file} must separate the short result from the controlled reference`
		);
		for (const section of numberedSections(article)) sections.push({ ...section, file });
	}

	assert.equal(sections.length, 86);
	assert.deepEqual(
		sections.map(({ number }) => number).sort((a, b) => a - b),
		Array.from({ length: 86 }, (_, index) => index + 1)
	);

	for (const { body, command, file, number } of sections) {
		const label = `${file} #${number} /${command}`;
		assert.match(
			body,
			/\*\*Was der kontrollierte Prompt macht:\*\*\s+\S/,
			`${label} needs a concrete counter-test purpose`
		);
		assert.match(body, /\*\*Dafür hochladen:\*\*\s+\S/, `${label} needs explicit inputs`);
		assert.match(
			body,
			/\*\*Kopierbare kontrollierte Vorlage:\*\*/,
			`${label} needs the controlled template label`
		);

		const blocks = promptBlocks(body);
		assert.ok(blocks.length >= 2, `${label} needs short and controlled prompt blocks`);
		const controlledPrompt = blocks[1];
		assert.match(controlledPrompt, /^Nutze ausschließlich Bild 1\b/i, `${label} must start from Bild 1 only`);
		assert.doesNotMatch(controlledPrompt, /\bBild 2\b/i, `${label} still depends on Bild 2`);
		assert.doesNotMatch(controlledPrompt, hardcodedTestSubject, `${label} hardcodes the test portrait`);

		if (controlledPrompt.includes('[[')) {
			assert.match(
				body,
				/\*\*Für dieses Beispiel eingesetzt:\*\*\s+\S/,
				`${label} has placeholders but no documented demo values`
			);
		}

		if (blocks.slice(2).some((block) => !block.startsWith('/'))) {
			assert.match(
				body,
				/^#{2,3} (?:Mit dem Ergebnis weiterarbeiten|Bonus-Test: neun bewusst feminine Frisuren|Kontrollierte Variante)$/m,
				`${label} has an extra prompt without a clearly separated follow-up section`
			);
		}

		const image = followupImage(body);
		assert.ok(image, `${label} needs a follow-up result image`);
		assert.equal(Number(image[2]), number, `${label} uses the wrong numbered follow-up image`);
		const fileUrl = new URL(image[1].replace(/^\//, ''), staticRoot);
		await access(fileUrl);
		const dimensions = readImageDimensions(fileURLToPath(fileUrl));
		assert.equal(dimensions.format, 'webp', `${label} follow-up is not WebP`);
		assert.ok(dimensions.width >= 900 && dimensions.height >= 900, `${label} follow-up is too small`);
	}
});

test('the two confirmed collage problems get a visible style-integration correction', async () => {
	const article = await readFile(new URL('bildprompts-comics-retro.md', contentRoot), 'utf8');
	const sections = new Map(numberedSections(article).map((section) => [section.number, section.body]));

	assert.match(sections.get(64), /Holzschnitt|Druckraster/i);
	assert.match(sections.get(64), /Papier(?:farbe|ton|struktur)|gealterte[nr]? Papier/i);
	assert.match(sections.get(64), /Sättigung|entsättigt|monochrom/i);
	assert.match(sections.get(66), /Reise(?:foto|umgebung|landschaft)/i);
	assert.match(sections.get(66), /Korn|Körnung/i);
	assert.match(sections.get(66), /Studiohintergrund/i);
});

test('follow-up result callouts do not swallow later headings, prompts or images', async () => {
	for (const file of articleFiles) {
		const article = await readFile(new URL(file, contentRoot), 'utf8');
		const label = `${file} reading flow`;

		assert.doesNotMatch(article, /<\/div>\r?\n#{2,3} /, `${label} needs a blank line before headings`);
		assert.doesNotMatch(article, /<p><div|<p><p>|<p>```|<p>!<a/, `${label} contains swallowed Markdown`);
	}
});

test('color analysis evaluates the photo before applying recommendations near the face', async () => {
	const article = await readFile(new URL('bildprompts-portraet-verbessern.md', contentRoot), 'utf8');
	const section = numberedSections(article).find(({ number }) => number === 76);
	assert.ok(section);
	const controlledPrompt = promptBlocks(section.body)[1];

	assert.match(controlledPrompt, /(?:Eignung|geeignet|ungeeignet)/i);
	assert.match(controlledPrompt, /(?:Licht|Farbstich)/i);
	assert.match(controlledPrompt, /(?:Unsicherheit|Sicherheit|vorläufig)/i);
	assert.match(controlledPrompt, /schriftlich/i);
	assert.match(controlledPrompt, /(?:Kleidung|Stoff).{0,80}(?:Gesicht|gesichtsnah)/is);
	assert.doesNotMatch(controlledPrompt, /vier gleichberechtigte Farbvergleiche/i);
	assert.match(section.body, /76-color-analysis-applied-followup\.webp/);
});

test('hairstyle grid includes a separate playful feminine nine-style bonus', async () => {
	const article = await readFile(new URL('bildprompts-portraet-verbessern.md', contentRoot), 'utf8');
	const section = numberedSections(article).find(({ number }) => number === 77);
	assert.ok(section);

	assert.match(section.body, /^### Bonus-Test: neun bewusst feminine Frisuren$/m);
	assert.match(section.body, /3×3|3x3/);
	assert.match(section.body, /spielerisch|Gag|Spaß/i);
	assert.match(section.body, /77-hairstyle-grid-feminine-bonus\.webp/);
});

test('cover pack is a clean independent generation without an optional negative reference', async () => {
	const article = await readFile(new URL('bildprompts-portraet-verbessern.md', contentRoot), 'utf8');
	const section = numberedSections(article).find(({ number }) => number === 79);
	assert.ok(section);
	const controlledPrompt = promptBlocks(section.body)[1];

	assert.doesNotMatch(controlledPrompt, /Bild 2|Negativbeispiel|falls .*vorhanden/i);
});

test('article counter-tests stay byte-for-byte aligned with their paired library variants', async () => {
	const library = JSON.parse(await readFile(libraryUrl, 'utf8'));
	const byCommand = new Map(library.prompts.map((prompt) => [prompt.command, prompt]));
	let paired = 0;

	for (const file of articleFiles) {
		const article = await readFile(new URL(file, contentRoot), 'utf8');
		for (const section of numberedSections(article)) {
			const prompt = byCommand.get(`/${section.command}`);
			assert.ok(prompt, `${file} /${section.command} is missing from the library`);
			const image = followupImage(section.body);
			assert.ok(image);
			assert.equal(prompt.controlledPromptText, promptBlocks(section.body)[1], `/${section.command}`);
			assert.equal(prompt.controlledImage, image[1], `/${section.command}`);
			paired += 1;
		}
	}

	assert.equal(paired, 86);
});

test('the creator article remains image-led and removes the unproved eight-second motion prompt', async () => {
	const article = await readFile(new URL('bildprompts-creator-ki-video.md', contentRoot), 'utf8');

	assert.match(article, /^title: "Bildprompts für Creator und KI-Videos"$/m);
	assert.match(article, /^seoTitle: "KI-Bildprompts für Creator & KI-Videos"$/m);
	assert.match(article, /^slug: "bildprompts-creator-ki-video"$/m);
	assert.doesNotMatch(article, /Die Person bleibt dieselbe und bewegt sich ruhig vom Startbild zum Endbild/);
	assert.doesNotMatch(article, /acht Sekunden lange Filmszene/i);
});
