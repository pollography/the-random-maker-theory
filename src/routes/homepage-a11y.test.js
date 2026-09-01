import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const routesRoot = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(routesRoot, '..', '..');
/** @param {...string} parts */
const read = (...parts) => readFile(join(projectRoot, ...parts), 'utf8');

/** @param {string} hex */
function relativeLuminance(hex) {
	const channels = hex.match(/[\da-f]{2}/gi)?.map((value) => parseInt(value, 16) / 255) ?? [];
	const [red, green, blue] = channels.map((value) =>
		value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
	);
	return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

/** @param {string} foreground @param {string} background */
function contrastRatio(foreground, background) {
	const values = [relativeLuminance(foreground), relativeLuminance(background)].sort((a, b) => b - a);
	return (values[0] + 0.05) / (values[1] + 0.05);
}

test('layout exposes a keyboard skip link and focusable main target', async () => {
	const layout = await read('src', 'routes', '+layout.svelte');
	assert.match(layout, /href="#main-content"/);
	assert.match(layout, /<main[^>]*id="main-content"/);
	assert.match(layout, /<main[^>]*tabindex="-1"/);
});

test('newsletter gives each input a real label and announces every request state', async () => {
	const source = await read('src', 'lib', 'components', 'NewsletterSignup.svelte');
	assert.match(source, /\$props\.id\(\)/);
	assert.match(source, /<label[^>]*for=\{emailId\}[^>]*>\s*E-Mail-Adresse\s*<\/label>/);
	assert.match(source, /id=\{emailId\}/);
	assert.match(source, /autocomplete="email"/);
	assert.match(source, /aria-busy=\{status === 'loading'\}/);
	assert.match(source, /Wird angemeldet…/);
	assert.match(source, /role="status"/);
	assert.match(source, /aria-live="polite"/);
	assert.match(source, /role="alert"/);
	assert.match(source, /\.newsletter-input:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--color-focus\)[^}]*outline-offset:/);
});

test('navigation exposes current page and a controllable mobile disclosure', async () => {
	const source = await read('src', 'lib', 'components', 'layout', 'Header.svelte');
	assert.match(source, /function isActive\(path\)/);
	assert.match(source, /startsWith\(`\$\{path\}\/`\)/);
	assert.doesNotMatch(source, /path === '\/tools'/);
	assert.match(source, /aria-current=\{[^}]*\? 'page' : undefined\}/);
	assert.match(source, /aria-controls="mobile-navigation"/);
	assert.match(source, /Menü öffnen/);
	assert.match(source, /Menü schließen/);
	assert.match(source, /event\.key === 'Escape'/);
	assert.match(source, /burgerButton\?\.focus\(\)/);
	assert.match(source, /composedPath\(\)/);
});

test('theme action is German, stateful, and at least 44px', async () => {
	const source = await read('src', 'lib', 'components', 'design-system', 'ThemeToggle.svelte');
	assert.doesNotMatch(source, /Toggle theme|Switch to/);
	assert.match(source, /Helles Design aktivieren/);
	assert.match(source, /Dunkles Design aktivieren/);
	assert.match(source, /aria-pressed=/);
	assert.match(source, /width:\s*44px/);
	assert.match(source, /height:\s*44px/);
});

test('focus and reduced motion are explicit without a global animation kill', async () => {
	const [css, page, header, layout] = await Promise.all([
		read('src', 'app.css'),
		read('src', 'routes', '+page.svelte'),
		read('src', 'lib', 'components', 'layout', 'Header.svelte'),
		read('src', 'routes', '+layout.svelte')
	]);
	assert.match(css, /:focus-visible/);
	assert.match(css, /outline:/);
	assert.match(css, /outline-offset:/);
	assert.match(css, /prefers-reduced-motion:\s*reduce/);
	assert.doesNotMatch(css, /0\.01ms/);
	assert.match(page, /typeof window\.matchMedia === 'function'/);
	assert.match(page, /matchMedia\('\(prefers-reduced-motion: reduce\)'\)\.matches/);
	assert.match(page, /\.video-facade:focus-visible\s*\{[^}]*outline:\s*3px solid var\(--color-focus\)/);
	assert.doesNotMatch(page, /class="scroll-hint"/);
	assert.match(page, /@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?\.topic-card\s*\{[^}]*transition:\s*none/);
	assert.match(header, /@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?\.nav-mobile\s*\{[^}]*animation:\s*none/);
	assert.doesNotMatch(layout, /:global\(html\)\s*\{[^}]*scroll-behavior:\s*smooth/);
});

test('neutral text tokens meet 4.5 to 1 in both themes', async () => {
	const [tokens, page, header, footer, toggle, newsletter] = await Promise.all([
		read('src', 'lib', 'design-system', 'tokens.css'),
		read('src', 'routes', '+page.svelte'),
		read('src', 'lib', 'components', 'layout', 'Header.svelte'),
		read('src', 'lib', 'components', 'layout', 'Footer.svelte'),
		read('src', 'lib', 'components', 'design-system', 'ThemeToggle.svelte'),
		read('src', 'lib', 'components', 'NewsletterSignup.svelte')
	]);
	assert.match(tokens, /--color-text-muted:\s*#9a9186/);
	assert.match(tokens, /--color-text-dim:\s*#8d857b/);
	assert.match(tokens, /\[data-theme='light'\][\s\S]*--color-text-muted:\s*#5a534b/);
	assert.match(tokens, /\[data-theme='light'\][\s\S]*--color-text-dim:\s*#625c56/);
	for (const token of [
		'--color-accent-honey-foreground:',
		'--color-accent-teal-foreground:',
		'--color-danger-foreground:',
		'--color-focus:'
	]) assert.equal(tokens.split(token).length - 1, 2, `${token} must exist in both themes`);
	assert.match(page, /var\(--color-accent-(honey|teal)-foreground\)/);
	assert.match(header, /var\(--color-accent-honey-foreground\)/);
	assert.match(footer, /var\(--color-accent-honey-foreground\)/);
	assert.match(toggle, /var\(--color-accent-honey-foreground\)/);
	assert.match(newsletter, /var\(--color-(accent-teal|danger)-foreground\)/);
});

test('blog and podcast accent text uses semantic foreground tokens', async () => {
	const [blogCard, episodeCard] = await Promise.all([
		read('src', 'lib', 'components', 'blog', 'BlogCard.svelte'),
		read('src', 'lib', 'components', 'podcast', 'EpisodeCard.svelte')
	]);
	assert.match(blogCard, /\.card-accent\s*\{[^}]*color:\s*var\(--color-accent-honey-foreground\)/);
	assert.match(episodeCard, /\.episode-number\s*\{[^}]*color:\s*var\(--color-accent-honey-foreground\)/);
	assert.match(episodeCard, /\.episode-duration\s*\{[^}]*color:\s*var\(--color-accent-teal-foreground\)/);
	for (const [foreground, surface] of [
		['#d4893e', '#1a1a1a'],
		['#3ab0a2', '#1a1a1a'],
		['#6d421e', '#e5ddcf'],
		['#155f57', '#e5ddcf']
	]) {
		assert.ok(contrastRatio(foreground, surface) >= 4.5, `${foreground} on ${surface}`);
	}
});

test('card lift and blog thumbnail zoom respect reduced motion locally', async () => {
	const [card, blogCard] = await Promise.all([
		read('src', 'lib', 'components', 'design-system', 'Card.svelte'),
		read('src', 'lib', 'components', 'blog', 'BlogCard.svelte')
	]);
	assert.match(card, /@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?\.card\s*\{[^}]*transition:\s*none/);
	assert.match(card, /@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?\.card\.interactive:hover\s*\{[^}]*transform:\s*none/);
	assert.match(blogCard, /@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?\.card-thumbnail img\s*\{[^}]*transition:\s*none/);
	assert.match(blogCard, /@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?:global\(\.card:hover\) \.card-thumbnail img\s*\{[^}]*transform:\s*none/);
});

test('small navigation and section links expose 44px targets', async () => {
	const [header, footer, page] = await Promise.all([
		read('src', 'lib', 'components', 'layout', 'Header.svelte'),
		read('src', 'lib', 'components', 'layout', 'Footer.svelte'),
		read('src', 'routes', '+page.svelte')
	]);
	assert.match(header, /\.nav-link\s*\{[\s\S]*?min-height:\s*44px/);
	assert.match(header, /\.nav-link\s*\{[\s\S]*?min-width:\s*44px/);
	assert.match(footer, /\.footer-link\)[^{]*\{[\s\S]*?min-height:\s*44px/);
	assert.match(footer, /\.footer-link\)[^{]*\{[\s\S]*?min-width:\s*44px/);
	assert.match(page, /\.section-link\s*\{[\s\S]*?min-height:\s*44px/);
});
