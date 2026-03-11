<script>
	import EpisodeCard from '$lib/components/podcast/EpisodeCard.svelte';
	import { getEpisodes } from '$lib/utils/episodes';
	import { siteConfig } from '$lib/config';
	import { pageFAQs } from '$lib/data/pageFAQs';

	const faqs = pageFAQs.podcast;
	const faqSchema = JSON.stringify({
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": faqs.map(faq => ({
			"@type": "Question",
			"name": faq.q,
			"acceptedAnswer": { "@type": "Answer", "text": faq.a }
		}))
	});

	let episodes = $state([]);

	async function load() {
		episodes = await getEpisodes();
	}

	load();
</script>

<svelte:head>
	<title>Podcast — Audio-Zusammenfassungen zum Hören | TRMT</title>
	<meta name="description" content="Der TRMT Podcast: Audio-Zusammenfassungen der Blog-Artikel. KI-Tools, Maker-Projekte und Tech-Themen zum Hören. Perfekt für unterwegs." />
	<meta name="keywords" content="podcast, TRMT, Audio, Zusammenfassungen, Tech Blog deutsch" />
	<meta property="og:title" content="Podcast — Audio-Zusammenfassungen | TRMT" />
	<meta property="og:description" content="Keine Zeit zum Lesen? Hör dir die Zusammenfassungen der Blog-Inhalte an. Perfekt für unterwegs." />
	<meta property="og:url" content="https://therandommakertheory.com/podcast" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://therandommakertheory.com/images/og/default.webp" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Zum Hören — TRMT Audio" />
	<meta name="twitter:description" content="Keine Zeit zum Lesen? Hör dir die Zusammenfassungen an. Perfekt für unterwegs." />
	<meta name="twitter:image" content="https://therandommakertheory.com/images/og/default.webp" />
	<link rel="canonical" href="https://therandommakertheory.com/podcast" />
	{@html `<script type="application/ld+json">${faqSchema}</script>`}
</svelte:head>

<!-- Header -->
<section class="podcast-header">
	<div>
		<h1 class="podcast-title">Zum Hören</h1>
		<p class="podcast-subtitle">
			Keine Zeit zum Lesen? Hier findest du Audio-Zusammenfassungen der Blog-Inhalte. Perfekt für unterwegs, beim Autofahren oder nebenbei.
		</p>
		<p class="podcast-intro">
			Jede Episode fasst einen Blog-Artikel in wenigen Minuten zusammen. Die wichtigsten Punkte, Empfehlungen und Einschätzungen als Audio, damit du auch im Auto, beim Sport oder beim Kochen auf dem Laufenden bleibst. Die Zusammenfassungen werden KI-gestützt generiert und von mir geprüft. Kein Füll-Gelaber, nur das Wesentliche. Verfügbar hier direkt im Browser und auf Spotify.
		</p>
	</div>

	<!-- Spotify Subscribe Button -->
	<div style="padding-top: 0.5rem;">
		<a
			href={siteConfig.social.spotify}
			target="_blank"
			rel="noreferrer"
			class="spotify-btn"
		>
			🎧 Auf Spotify anhören
		</a>
	</div>
</section>

<!-- Episodes Grid -->
<section class="episodes-section">
	{#if episodes.length > 0}
		<div class="episodes-grid">
			{#each episodes as episode (episode.slug)}
				<EpisodeCard {episode} />
			{/each}
		</div>
	{:else}
		<div style="text-align: center; padding: 3rem; color: var(--color-text-muted); font-size: var(--font-size-lg);">
			Noch keine Episoden vorhanden. Kommt bald!
		</div>
	{/if}
</section>

<!-- FAQ Section -->
<section class="faq-section">
	<h2 class="faq-heading">Häufige Fragen zum TRMT Podcast</h2>
	<div class="faq-list">
		{#each faqs as faq, i}
			<details class="faq-item" class:faq-item-teal={i % 3 === 1}>
				<summary class="faq-question">
					<span class="faq-q-text">{faq.q}</span>
					<span class="faq-chevron">›</span>
				</summary>
				<div class="faq-answer">
					<p>{faq.a}</p>
				</div>
			</details>
		{/each}
	</div>
</section>

<style>
	.podcast-header {
		padding: 48px 0 32px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.episodes-section {
		padding: 2rem 0 3rem;
	}

	.episodes-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 24px;
	}

	@media (max-width: 768px) {
		.episodes-grid { grid-template-columns: 1fr; }
	}

	.podcast-title {
		font-size: clamp(2.5rem, 8vw, 3.5rem);
		font-family: var(--font-display);
		font-weight: 400;
		line-height: var(--line-height-tight);
		margin: 0;
		color: var(--color-text);
		opacity: 0.95;
	}

	.podcast-subtitle {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--font-size-lg);
		color: var(--color-text-muted);
		margin: 0.5rem 0 0 0;
		line-height: var(--line-height-relaxed);
	}

	.podcast-intro {
		font-size: var(--font-size-base);
		color: var(--color-text-muted);
		line-height: 1.75;
		margin: 0;
		max-width: 720px;
		opacity: 0.8;
	}

	:global(.spotify-btn) {
		display: inline-block;
		padding: 0.875rem 1.75rem;
		background-color: var(--color-accent-teal);
		color: #ffffff !important;
		border-radius: var(--radius-lg);
		font-weight: var(--font-weight-semibold);
		text-decoration: none;
		transition: all var(--transition-normal);
		box-shadow: var(--shadow-card);
		border: none;
		cursor: pointer;
		font-family: var(--font-sans);
	}

	:global(.spotify-btn:hover) {
		background-color: var(--color-accent-teal-hover);
		box-shadow: 0 0 20px rgba(58, 176, 162, 0.4), 0 0 40px rgba(58, 176, 162, 0.15), 0 4px 12px rgba(0, 0, 0, 0.2);
		transform: translateY(-2px);
		color: #ffffff !important;
	}

	/* ── FAQ ── */
	.faq-section {
		padding: 48px 0 48px;
	}

	.faq-heading {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(24px, 4vw, 32px);
		color: var(--color-text);
		margin: 0 0 24px;
		opacity: 0.95;
	}

	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.faq-item {
		background: rgba(26, 26, 26, 0.6);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition: all 0.2s ease;
	}

	.faq-item:hover { border-color: rgba(212, 137, 62, 0.3); }
	.faq-item-teal:hover { border-color: rgba(58, 176, 162, 0.3); }

	.faq-item[open] {
		background: rgba(212, 137, 62, 0.03);
		border-color: rgba(212, 137, 62, 0.2);
	}

	.faq-item-teal[open] {
		background: rgba(58, 176, 162, 0.03);
		border-color: rgba(58, 176, 162, 0.2);
	}

	.faq-question {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 18px 24px;
		cursor: pointer;
		list-style: none;
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-base);
		color: var(--color-text);
		line-height: 1.5;
	}

	.faq-question::-webkit-details-marker { display: none; }
	.faq-question::marker { display: none; content: ''; }

	.faq-chevron {
		flex-shrink: 0;
		font-size: 1.25rem;
		color: var(--color-accent-honey);
		transition: transform 0.2s ease;
		font-weight: 700;
	}

	.faq-item[open] .faq-chevron { transform: rotate(90deg); }
	.faq-item-teal .faq-chevron { color: var(--color-accent-teal); }

	.faq-answer { padding: 0 24px 18px; }

	.faq-answer p {
		margin: 0;
		font-size: var(--font-size-base);
		color: var(--color-text-muted);
		line-height: 1.75;
	}

	:global([data-theme='light']) .faq-item {
		background: var(--gradient-card-bg);
		border: none;
		box-shadow: var(--shadow-neo);
	}

	:global([data-theme='light']) .faq-item[open] { background: rgba(212, 137, 62, 0.04); }
	:global([data-theme='light']) .faq-item-teal[open] { background: rgba(58, 176, 162, 0.04); }
</style>
