<script>
	import EpisodeCard from '$lib/components/podcast/EpisodeCard.svelte';
	import { getEpisodes } from '$lib/utils/episodes';
	import { siteConfig } from '$lib/config';

	let episodes = $state([]);

	async function load() {
		episodes = await getEpisodes();
	}

	load();
</script>

<svelte:head>
	<title>Zum Hören — Audio-Zusammenfassungen | TRMT</title>
	<meta name="description" content="Keine Zeit zum Lesen? Hör dir die Zusammenfassungen der Blog-Inhalte an. Perfekt für unterwegs." />
	<meta property="og:title" content="Zum Hören — Audio-Zusammenfassungen" />
	<meta property="og:description" content="Keine Zeit zum Lesen? Hör dir die Zusammenfassungen der Blog-Inhalte an. Perfekt für unterwegs." />
	<meta property="og:url" content="https://therandommakertheory.com/podcast" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://therandommakertheory.com/images/og/default.webp" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Zum Hören — TRMT Audio" />
	<meta name="twitter:description" content="Keine Zeit zum Lesen? Hör dir die Zusammenfassungen an. Perfekt für unterwegs." />
	<meta name="twitter:image" content="https://therandommakertheory.com/images/og/default.webp" />
	<link rel="canonical" href="https://therandommakertheory.com/podcast" />
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

<!-- Episodes List -->
<section style="padding: 2rem 0; display: flex; flex-direction: column; gap: 1.5rem;">
	{#if episodes.length > 0}
		{#each episodes as episode (episode.slug)}
			<div>
				<EpisodeCard {episode} />
			</div>
		{/each}
	{:else}
		<div style="text-align: center; padding: 3rem; color: var(--color-text-muted); font-size: var(--font-size-lg);">
			Noch keine Episoden vorhanden. Kommt bald!
		</div>
	{/if}
</section>

<style>
	.podcast-header {
		padding: 48px 0 24px;
		display: flex;
		flex-direction: column;
		gap: 16px;
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
</style>
