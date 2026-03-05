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
	<title>Podcast — {siteConfig.name}</title>
	<meta name="description" content="Höre alle Episoden von {siteConfig.podcast.showName}" />
</svelte:head>

<!-- Header -->
<section style="padding: 3rem 0; display: flex; flex-direction: column; gap: 1.5rem;">
	<div>
		<h1 style="font-size: clamp(2.5rem, 8vw, 3.5rem); font-family: var(--font-display); font-weight: var(--font-weight-extrabold); line-height: var(--line-height-tight); margin: 0; color: var(--color-text);">
			Podcast
		</h1>
		<p style="font-size: var(--font-size-lg); color: var(--color-text-muted); margin: 0.5rem 0 0 0; line-height: var(--line-height-relaxed);">
			{siteConfig.podcast.showDescription}
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
			🎙️ Auf Spotify anhören
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
			Keine Episoden gefunden.
		</div>
	{/if}
</section>

<style>
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
		box-shadow: var(--shadow-glow-teal);
		color: #ffffff !important;
	}
</style>
