<script>
	import { siteConfig } from '$lib/config';

	let { data } = $props();

	let formattedDate = $derived(new Date(data.episode.date).toLocaleDateString('de-DE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}));
</script>

<svelte:head>
	<title>{data.episode.title} — {siteConfig.name}</title>
	<meta name="description" content={data.episode.description} />
	<meta property="og:title" content={data.episode.title} />
	<meta property="og:description" content={data.episode.description} />
</svelte:head>

<article class="max-w-3xl mx-auto py-12">
	<!-- Header -->
	<header class="mb-12 space-y-4">
		<div class="text-honey font-mono text-sm font-semibold">
			Episode #{data.episode.episodeNumber}
		</div>
		<h1 class="text-5xl font-display font-extrabold">
			{data.episode.title}
		</h1>
		<div class="flex flex-wrap items-center gap-4 text-text-muted text-sm">
			<time datetime={data.episode.date}>{formattedDate}</time>
			{#if data.episode.duration}
				<span>·</span>
				<span>{data.episode.duration}</span>
			{/if}
		</div>
	</header>

	<!-- Audio Player -->
	{#if data.episode.audioUrl}
		<div class="mb-8">
			<audio controls class="w-full">
				<source src={data.episode.audioUrl} type="audio/mpeg" />
				Dein Browser unterstützt das Audio-Element nicht.
			</audio>
		</div>
	{/if}

	<!-- Description -->
	<div class="prose prose-invert max-w-none mb-8">
		<p>{data.episode.description}</p>
	</div>

	<!-- Content / Show Notes -->
	{#if data.content}
		<div class="prose prose-invert max-w-none">
			<data.content />
		</div>
	{/if}

	<!-- Links -->
	<div class="mt-12 pt-8 border-t border-border-subtle space-y-4">
		<h3 class="font-display font-bold text-lg">Links</h3>
		<div class="space-y-2">
			{#if data.episode.audioUrl}
				<p>
					<a href={data.episode.audioUrl} class="text-honey hover:text-honey-hover font-semibold">
						Audio herunterladen
					</a>
				</p>
			{/if}
			{#if data.episode.videoUrl}
				<p>
					<a href={data.episode.videoUrl} target="_blank" rel="noreferrer" class="text-honey hover:text-honey-hover font-semibold">
						Video ansehen
					</a>
				</p>
			{/if}
		</div>
	</div>
</article>

<style>
	:global(.prose code) {
		background-color: var(--color-surface-raised);
		color: var(--color-text);
		padding: 0.25rem 0.5rem;
		border-radius: 0.375rem;
	}

	:global(.prose a) {
		color: var(--color-accent-honey);
	}

	:global(.prose a:hover) {
		color: var(--color-accent-honey-hover);
	}

	audio {
		border-radius: var(--radius-lg);
		background-color: var(--color-surface-raised);
	}
</style>
