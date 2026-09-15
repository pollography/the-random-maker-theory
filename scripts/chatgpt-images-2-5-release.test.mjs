import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const articlePath = join(root, 'src/content/blog/chatgpt-images-2-5-fotos-bearbeiten.md');
const componentPath = join(root, 'src/lib/components/blog/Images25Comparison.svelte');
const behaviorPath = join(root, 'src/lib/utils/before-after.js');
const routePath = join(root, 'src/routes/blog/[slug]/+page.svelte');
const imagesRoot = join(root, 'static/images/blog');

const expectedImages = [
  ['chatgpt-images-2-5-thumbnail-v3.webp', 'B8B38E05A906515E8B651EFA8EAD02EBFC62EB641030079DF7E02A9A6A07D071', 1600],
  ['chatgpt-images-2-5-thumbnail-v3-thumb.webp', 'EB7498C988F337A117A3E92266AE388346EF9D4F26F52E6D11934A0F2200597C', 400],
  ['chatgpt-images-2-5-altes-foto-original.webp', '27472F560A9E9C93138EEFEF035D99A61454E60E0B117E2272191893C2643C5E', 1400],
  ['chatgpt-images-2-5-maker-outfit.webp', '6E07D362653150E503D2B285BDACDF3BE03DE70F8815054B3BD5CABDAC18E7AF', 1400]
];

test('only the approved Images 2.5 article is publication-ready with the current hero pair', () => {
  assert.equal(existsSync(articlePath), true, 'approved article is not in the real blog tree');
  const article = readFileSync(articlePath, 'utf8');
  assert.match(article, /^slug: "chatgpt-images-2-5-fotos-bearbeiten"$/m);
  assert.match(article, /^date: "2026-09-15"$/m, 'public date must be the actual release day');
  assert.match(article, /^draft: false$/m);
  assert.match(article, /^heroImage: "\/images\/blog\/chatgpt-images-2-5-thumbnail-v3.webp"$/m);
  assert.match(article, /^heroImageThumb: "\/images\/blog\/chatgpt-images-2-5-thumbnail-v3-thumb.webp"$/m);
  assert.match(article, /Teststatus: kreativ gelungen, aber nicht 1:1 freigegeben/);
  assert.match(article, /keine konkrete Modellkennung/);
  assert.doesNotMatch(article, /^# /m, 'the route already owns the one public H1');
});

test('the real blog route shows the proven comparison and scopes readable typography to this article', () => {
  const route = readFileSync(routePath, 'utf8');
  assert.match(route, /Images25Comparison/);
  assert.match(route, /data\.post\.slug === 'chatgpt-images-2-5-fotos-bearbeiten'/);
  assert.match(route, /class:images25/);
  assert.match(route, /\.images25 \.article-title[\s\S]*?font-family: var\(--font-sans\)/);
  assert.match(route, /\.images25 :global\(\.prose h2\)[\s\S]*?font-family: var\(--font-sans\)/);
  assert.match(route, /Illustration eines Foto-Edits mit neuem Hintergrund/);
  assert.match(route, /chatgpt-images-2-5-altes-foto-original\.webp/, 'structured article images include the actual before evidence');
  assert.match(route, /chatgpt-images-2-5-maker-outfit\.webp/, 'structured article images include the actual after evidence');
});

test('comparison renders direct dragging, accessible alternatives, fixed evidence and honest drift notes', () => {
  assert.equal(existsSync(componentPath), true, 'missing production comparison component');
  const component = readFileSync(componentPath, 'utf8');
  assert.match(component, /data-before-after-stage/);
  assert.match(component, /data-before-after-edited/);
  assert.match(component, /data-before-after-range/);
  assert.equal((component.match(/draggable="false"/g) ?? []).length, 2);
  assert.match(component, /data-before-after-value="100"/);
  assert.match(component, /data-before-after-value="0"/);
  assert.match(component, /Fester Vorher-Nachher-Vergleich/);
  assert.match(component, /Nicht pixelgleich/);
  assert.match(component, /aria-label="Anteil von Original und Maker-Outfit"/);
});

test('comparison behavior clamps broken values and prevents browser-native image dragging', async () => {
  assert.equal(existsSync(behaviorPath), true, 'missing reusable comparison behavior');
  const source = readFileSync(behaviorPath, 'utf8');
  const behavior = await import(`${pathToFileURL(behaviorPath).href}?release=${Date.now()}`);
  assert.equal(behavior.normalizeCompareValue('broken'), 50);
  assert.equal(behavior.normalizeCompareValue(-20), 0);
  assert.equal(behavior.normalizeCompareValue(120), 100);
  assert.equal(behavior.compareValueFromPointer(0, 0, 0), 50);
  assert.match(source, /dragstart/);
  assert.match(source, /pointercancel/);
  assert.match(source, /pointermove/);
});

test('the public assets are the exact reviewed images, not other private archive photos', () => {
  for (const [name, hash, width] of expectedImages) {
    const path = join(imagesRoot, name);
    assert.equal(existsSync(path), true, `missing reviewed public image ${name}`);
    const bytes = readFileSync(path);
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', `invalid WebP ${name}`);
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP', `invalid WebP ${name}`);
    assert.equal(createHash('sha256').update(bytes).digest('hex').toUpperCase(), hash, `different image ${name}`);
    assert.ok(width >= 400, `unexpected small image ${name}`);
  }
});
