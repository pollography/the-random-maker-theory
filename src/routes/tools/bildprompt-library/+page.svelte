<script lang="ts">
	import PromptLibrary from '$lib/components/prompt-library/PromptLibrary.svelte';
	import promptData from '$lib/data/image-prompts.json';
	import { getPublicPrompts } from '$lib/utils/prompt-library.js';

	const prompts = getPublicPrompts(promptData);
	const categories = promptData.categories;
	const canonicalUrl = 'https://therandommakertheory.com/tools/bildprompt-library';
	const pageDescription = '123 getestete Bildprompts mit echten Ergebnissen, 87 Kurzprompts und 36 ausführlichen Vorlagen. Kostenlos suchen, filtern, kopieren und als PDF laden.';
	const collectionSchema = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: 'TRMT Bildprompt-Library',
		description: pageDescription,
		url: canonicalUrl,
		mainEntity: {
			'@type': 'ItemList',
			numberOfItems: prompts.length,
			itemListElement: prompts.map((prompt, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: `${prompt.command} – ${prompt.title}`,
				url: `https://therandommakertheory.com/blog/${prompt.articleSlug}`
			}))
		}
	});
</script>

<svelte:head>
	<title>123 Bildprompts mit Beispielen | Kostenlose Library | TRMT</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:title" content="123 Bildprompts mit echten Beispielen | TRMT" />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://therandommakertheory.com/images/blog/50-bildprompts-echt-getestet-1.webp" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="123 Bildprompts mit echten Beispielen | TRMT" />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content="https://therandommakertheory.com/images/blog/50-bildprompts-echt-getestet-1.webp" />
	<link rel="canonical" href={canonicalUrl} />
	{@html `<script type="application/ld+json">${collectionSchema}</script>`}
</svelte:head>

<section class="tool-hero">
	<div class="hero-copy">
		<h1>Bildprompt-Library</h1>
		<p>Ein Ausgangsbild, 123 echte Tests. Durchsuche 87 Kurzprompts und 36 ausführliche Vorlagen, kopiere deinen Favoriten und probiere ihn mit einem eigenen Bild aus.</p>
	</div>

	<div class="download-actions" aria-label="Kostenlose Prompt-Downloads">
		<a class="download-button" href="/downloads/trmt-bildprompt-cheatsheet.pdf" download>
			<svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
				<path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
			<span><strong>Kurzprompt-Cheat-Sheet</strong><small>87 Prompts · 6 Seiten</small></span>
		</a>
		<a class="download-button secondary" href="/downloads/trmt-ultimate-bildprompts-part-3.pdf" download>
			<svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
				<path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
			<span><strong>36 ausführliche Prompts</strong><small>Mit Ergebnissen · 12 Seiten</small></span>
		</a>
	</div>
</section>

<PromptLibrary {prompts} {categories} />

<section class="library-note">
	<div>
		<h2>Kurzer Prompt, überraschendes Ergebnis</h2>
		<p>Die Bilder zeigen echte Tests mit demselben Ausgangsporträt. Trotzdem sind Ein-Wort-Prompts kein fester Befehlssatz: Modell, Version und Ausgangsbild können das Ergebnis deutlich verändern.</p>
	</div>
	<nav class="guide-links" aria-label="Artikel zur Bildprompt-Serie">
		<a href="/blog/50-bildprompts-echt-getestet">50 Prompts im Test</a>
		<a href="/blog/ultimate-bildprompts-part-2">36 weitere Prompts</a>
		<a href="/blog/ein-foto-vier-slash-befehle-ki-bilder">Vier Slash-Prompts im Vergleich</a>
	</nav>
</section>

<style>
	.tool-hero {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 40px;
		padding: 48px 0 32px;
	}

	.hero-copy { max-width: 720px; }

	h1 {
		margin: 0;
		font-size: clamp(3rem, 8vw, 5.3rem);
		line-height: 0.95;
		letter-spacing: -0.035em;
	}

	.hero-copy p {
		max-width: 680px;
		margin: 18px 0 0;
		color: var(--color-text-muted);
		font-size: clamp(1rem, 2vw, 1.15rem);
		line-height: 1.7;
	}

	.download-button {
		display: inline-flex;
		min-width: 210px;
		align-items: center;
		gap: 12px;
		padding: 12px 15px;
		background: var(--color-accent-honey);
		border: 1px solid var(--color-accent-honey);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-glow-honey);
		color: var(--color-on-accent);
		text-decoration: none;
		transition: background var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
	}

	.download-actions {
		display: flex;
		align-items: stretch;
		gap: 10px;
		flex-direction: column;
	}

	.download-button.secondary {
		background: color-mix(in srgb, var(--color-accent-teal) 12%, var(--color-surface));
		border-color: color-mix(in srgb, var(--color-accent-teal) 42%, var(--color-border-soft));
		box-shadow: none;
		color: var(--color-text);
	}

	.download-button.secondary small { color: var(--color-text-muted); }
	.download-button.secondary:hover { background: color-mix(in srgb, var(--color-accent-teal) 18%, var(--color-surface)); }

	.download-button:hover {
		background: var(--color-accent-honey-hover);
		color: var(--color-on-accent);
		transform: translateY(-2px);
		box-shadow: 0 0 24px var(--color-accent-honey-glow);
	}

	.download-button:focus-visible { outline: 3px solid var(--color-accent-teal); outline-offset: 3px; }
	.download-button svg { width: 25px; height: 25px; flex: 0 0 auto; }
	.download-button span { display: flex; flex-direction: column; gap: 2px; }
	.download-button strong { font-size: 0.82rem; line-height: 1.1; }
	.download-button small {
		color: var(--color-on-accent);
		font-size: 0.67rem;
		font-weight: 650;
		opacity: 1;
	}

	.library-note {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 32px;
		margin-top: 48px;
		padding: 28px 30px;
		background: color-mix(in srgb, var(--color-accent-teal) 7%, var(--color-surface));
		border: 1px solid color-mix(in srgb, var(--color-accent-teal) 22%, var(--color-border-subtle));
		border-radius: var(--radius-lg);
	}

	.library-note div { max-width: 720px; }
	.library-note h2 { margin: 0; color: var(--color-text); font-size: 1.75rem; }
	.library-note p { margin: 8px 0 0; color: var(--color-text-muted); font-size: 0.88rem; line-height: 1.65; }
	.guide-links {
		display: flex;
		flex: 0 0 auto;
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
	}

	.guide-links a { color: var(--color-accent-honey); font-size: 0.78rem; font-weight: 800; }

	@media (max-width: 760px) {
		.tool-hero { align-items: stretch; flex-direction: column; gap: 22px; padding-top: 34px; }
		h1 { font-size: clamp(2.2rem, 10vw, 2.5rem); letter-spacing: -0.04em; }
		.download-actions { align-items: flex-start; }
		.download-button { align-self: flex-start; }
		.library-note { align-items: flex-start; flex-direction: column; padding: 24px; }
	}
</style>
