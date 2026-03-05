<script>
	import EpisodeCard from '$lib/components/podcast/EpisodeCard.svelte';
	import { getEpisodes } from '$lib/utils/episodes';
	import { siteConfig } from '$lib/config';

	let episodes = [];

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
<section class="py-12 space-y-4">
	<h1 class="text-5xl md:text-6xl font-display font-extrabold">Podcast</h1>
	<p class="text-xl text-text-muted">{siteConfig.podcast.showDescription}</p>

	<!-- Spotify Subscribe -->
	<div class="pt-4">
		<a
			href={siteConfig.social.spotify}
			target="_blank"
			rel="noreferrer"
			class="inline-block px-6 py-3 bg-teal text-on-accent rounded-lg font-semibold hover:bg-teal-hover transition-colors"
		>
			🎙️ Auf Spotify anhören
		</a>
	</div>
</section>

<!-- Episodes List -->
<section class="py-8 space-y-6">
	{#each episodes as episode (episode.slug)}
		<div>
			<EpisodeCard {episode} />
		</div>
	{/each}

	{#if episodes.length === 0}
		<div class="text-center py-12">
			<p class="text-text-muted text-lg">Keine Episoden gefunden.</p>
		</div>
	{/if}
</section>
