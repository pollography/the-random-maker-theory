<!-- Podcast Episode Card -->

<script>
	import Card from '../design-system/Card.svelte';

	let { episode } = $props();

	let formattedDate = $derived(new Date(episode.date).toLocaleDateString('de-DE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}));
</script>

<Card href="/podcast/{episode.slug}" variant="interactive">
	<div class="space-y-3">
		<!-- Episode Number -->
		<div class="text-xs font-mono text-honey">
			Episode #{episode.episodeNumber}
		</div>

		<!-- Title -->
		<h3 class="font-display font-bold text-lg text-text line-clamp-2">
			{episode.title}
		</h3>

		<!-- Description -->
		<p class="text-text-muted text-sm line-clamp-2">
			{episode.description}
		</p>

		<!-- Date and Duration -->
		<div class="flex items-center justify-between text-xs text-text-muted pt-2">
			<time datetime={episode.date}>{formattedDate}</time>
			{#if episode.duration}
				<span>{episode.duration}</span>
			{/if}
		</div>
	</div>
</Card>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
