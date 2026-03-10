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
	<div class="episode-content">
		<!-- Episode Number -->
		<div class="episode-number">
			Episode #{episode.episodeNumber}
		</div>

		<!-- Title -->
		<h3 class="episode-title">
			{episode.title}
		</h3>

		<!-- Description -->
		<p class="episode-desc">
			{episode.description}
		</p>

		<!-- Date and Duration -->
		<div class="episode-meta">
			<time datetime={episode.date}>{formattedDate}</time>
			{#if episode.duration}
				<span>{episode.duration}</span>
			{/if}
		</div>
	</div>
</Card>

<style>
	.episode-content {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.episode-number {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--color-accent-honey);
		letter-spacing: -0.01em;
	}

	.episode-title {
		font-family: var(--font-sans);
		font-weight: 600;
		font-size: var(--font-size-lg);
		color: var(--color-text);
		line-height: var(--line-height-snug);
		letter-spacing: -0.02em;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.episode-desc {
		font-family: var(--font-sans);
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		line-height: var(--line-height-relaxed);
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.episode-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: var(--font-size-xs);
		color: var(--color-text-muted);
		padding-top: 4px;
		letter-spacing: -0.01em;
	}
</style>
