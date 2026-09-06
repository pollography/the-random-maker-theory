import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const routesRoot = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(routesRoot, '..', '..');
/** @param {...string} parts */
const read = (...parts) => readFile(join(projectRoot, ...parts), 'utf8');

test('homepage merges its positioning into the hero and removes the old subtitle', async () => {
	const page = await read('src', 'routes', '+page.svelte');
	assert.doesNotMatch(page, /Content, den ich/);
	assert.match(page, /Entdecken\. Verstehen\. Und alles/);
	assert.match(page, /Tech, KI-Tools, Maker-Projekte, Automatisierung und Produktivität/);
	assert.equal((page.match(/class="hero-intro-line"/g) ?? []).length, 2);
	assert.match(page, /href="\/blog"[^>]*>\s*<span>Zum Blog<\/span>/);
	assert.doesNotMatch(page, /href="#topics"|Themen wählen/);
});

test('homepage exposes five concise topic links without emoji pillar copy', async () => {
	const page = await read('src', 'routes', '+page.svelte');
	assert.match(page, /id="topics"/);
	assert.doesNotMatch(page, /Womit willst du anfangen\?/);
	assert.match(page, /<h2 id="topics-label" class="sr-only">Themen<\/h2>/);
	assert.match(page, /import \{ CORE_TOPICS \} from '\$lib\/data\/core-topics\.js';/);
	assert.match(page, /const topics = CORE_TOPICS\.map\(/);
	assert.match(page, /href="\/tags\/\{topic\.slug\}"/);
	assert.match(page, /getImageSeo\(\s*topic\.image/);
	assert.match(page, /srcset=\{topic\.imageSeo\.srcset\}/);
	assert.doesNotMatch(page, /const pillars = \[/);
	assert.doesNotMatch(page, /topic\.desc|topic\.highlights|topic\.icon/);
});

test('homepage presents one wide lead and three full-width-image cards directly after topics', async () => {
	const [page, card] = await Promise.all([
		read('src', 'routes', '+page.svelte'),
		read('src', 'lib', 'components', 'blog', 'HomepagePostCard.svelte')
	]);
	assert.match(page, /id="latest-posts"/);
	assert.match(page, /Das Neueste aus der Werkstatt/);
	assert.match(page, /<HomepagePostCard post=\{posts\[0\]\} featured/);
	assert.match(page, /posts\.slice\(1\)/);
	assert.match(page, /\.topics-section,[\s\S]*?\.posts-section\s*\{\s*scroll-margin-top:\s*76px/);
	assert.match(card, /featured = false/);
	assert.match(card, /loading=\{featured \? 'eager' : 'lazy'\}/);
	assert.match(card, /href="\/blog\/\{post\.slug\}"/);
	assert.match(card, /\.post-card:not\(\.featured\)[\s\S]*grid-template-columns:\s*1fr/);
	assert.match(card, /\.post-image\s*\{[^}]*aspect-ratio:\s*16 \/ 9/);
});

test('homepage keeps real video, podcast and direct newsletter actions below the editorial context', async () => {
	const [page, newsletter] = await Promise.all([
		read('src', 'routes', '+page.svelte'),
		read('src', 'lib', 'components', 'NewsletterSignup.svelte')
	]);
	assert.match(page, /<LiteYouTubePlayer/);
	assert.match(page, /<SpotifyEpisodePlayer/);
	assert.ok(page.indexOf('class="homepage-context"') < page.indexOf('<LiteYouTubePlayer'));
	assert.match(page, /<NewsletterSignup/);
	assert.match(newsletter, /type="email"/);
	assert.match(newsletter, /'Eintragen'/);
});
