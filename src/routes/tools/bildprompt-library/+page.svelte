<script lang="ts">
	import PromptLibrary from '$lib/components/prompt-library/PromptLibrary.svelte';
	import promptData from '$lib/data/image-prompts.json';
	import { getPublicPrompts } from '$lib/utils/prompt-library.js';

	const prompts = getPublicPrompts(promptData);
	const categories = promptData.categories;
	const canonicalUrl = 'https://therandommakertheory.com/tools/bildprompt-library';
	const pageDescription = '87 kurze Bildprompts, echte Ergebnisse und direkte Copy-Buttons. Durchsuche die kostenlose TRMT Bildprompt-Library und lade das PDF-Cheat-Sheet herunter.';
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
	<title>87 Bildprompts mit Beispielen | Kostenlose Library | TRMT</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:title" content="87 Bildprompts mit echten Beispielen | TRMT" />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://therandommakertheory.com/images/blog/50-bildprompts-echt-getestet-1.webp" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="87 Bildprompts mit echten Beispielen | TRMT" />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content="https://therandommakertheory.com/images/blog/50-bildprompts-echt-getestet-1.webp" />
	<link rel="canonical" href={canonicalUrl} />
	{@html `<script type="application/ld+json">${collectionSchema}</script>`}
</svelte:head>

<section class="tool-hero">
	<div class="hero-copy">
		<h1>Bildprompt-Library</h1>
		<p>Ein Foto, ein kurzer Befehl und ein echtes Ergebnis. Durchsuche alle 87 getesteten Bildprompts, kopiere deinen Favoriten und probiere ihn mit einem eigenen Bild aus.</p>
	</div>

	<a class="download-button" href="/downloads/trmt-bildprompt-cheatsheet.pdf" download>
		<svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
			<path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
		<span><strong>PDF-Cheat-Sheet</strong><small>6 Seiten · kostenlos</small></span>
	</a>
</section>

<PromptLibrary {prompts} {categories} />

<section class="library-note">
	<div>
		<h2>Kurzer Prompt, überraschendes Ergebnis</h2>
		<p>Die Bilder zeigen echte Tests mit demselben Ausgangsporträt. Trotzdem sind Ein-Wort-Prompts kein fester Befehlssatz: Modell, Version und Ausgangsbild können das Ergebnis deutlich verändern.</p>
	</div>
	<a href="/blog/50-bildprompts-echt-getestet">Wie du die Ergebnisse weiterverwendest</a>
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
	.download-button small { font-size: 0.67rem; font-weight: 650; opacity: 0.72; }

	.library-note {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 32px;
		margin-top: 48px;
		padding: 28px 30px;
		background: color-mix(in srgb, var(--color-accent-teal) 7%, var(--color-surface));
		border-left: 3px solid var(--color-accent-teal);
		border-radius: var(--radius-lg);
	}

	.library-note div { max-width: 720px; }
	.library-note h2 { margin: 0; color: var(--color-text); font-size: 1.75rem; }
	.library-note p { margin: 8px 0 0; color: var(--color-text-muted); font-size: 0.88rem; line-height: 1.65; }
	.library-note > a { flex: 0 0 auto; color: var(--color-accent-honey); font-size: 0.78rem; font-weight: 800; }

	@media (max-width: 760px) {
		.tool-hero { align-items: stretch; flex-direction: column; gap: 22px; padding-top: 34px; }
		.download-button { align-self: flex-start; }
		.library-note { align-items: flex-start; flex-direction: column; padding: 24px; }
	}
</style>
