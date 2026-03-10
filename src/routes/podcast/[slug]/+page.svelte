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
	<title>{data.episode.title} | TRMT</title>
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

	<!-- Transcript -->
	{#if data.episode.transcript}
		<div class="transcript-section">
			<h2 class="transcript-heading">Transkript</h2>
			<div class="transcript-content">
				<p class="transcript-note">Automatisch generierte Zusammenfassung der Episode. Basierend auf dem zugehörigen Blog-Artikel.</p>
				{#each data.episode.transcript as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Blog Article Link -->
	{#if data.episode.blogSlug}
		<div class="blog-link-section">
			<div class="blog-link-card">
				<span class="blog-link-label">Vollständiger Artikel</span>
				<a href="/blog/{data.episode.blogSlug}" class="blog-link">
					Den kompletten Blog-Artikel lesen →
				</a>
				<p class="blog-link-hint">Dort findest du alle Details, Screenshots, Code-Beispiele und Links.</p>
			</div>
		</div>
	{/if}

	<!-- Links -->
	<div class="mt-12 pt-8 border-t border-border-subtle space-y-4">
		<h3 class="font-display font-bold text-lg">Links</h3>
		<div class="space-y-2">
			{#if data.episode.blogSlug}
				<p>
					<a href="/blog/{data.episode.blogSlug}" class="text-honey hover:text-honey-hover font-semibold">
						Blog-Artikel lesen
					</a>
				</p>
			{/if}
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

	/* ── TRANSCRIPT ── */
	.transcript-section {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid var(--color-border-subtle);
	}

	.transcript-heading {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(1.5rem, 3vw, 2rem);
		color: var(--color-text);
		margin: 0 0 1.5rem;
		opacity: 0.95;
	}

	.transcript-content {
		background: var(--color-surface);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-xl);
		padding: 2rem;
	}

	.transcript-note {
		font-size: var(--font-size-sm);
		color: var(--color-text-dim);
		font-style: italic;
		margin: 0 0 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-border-subtle);
	}

	.transcript-content p {
		font-size: var(--font-size-base);
		color: var(--color-text-muted);
		line-height: 1.85;
		margin: 0 0 1rem;
	}

	.transcript-content p:last-child {
		margin-bottom: 0;
	}

	/* ── BLOG LINK CARD ── */
	.blog-link-section {
		margin-top: 2.5rem;
	}

	.blog-link-card {
		background: rgba(212, 137, 62, 0.05);
		border: 1px solid rgba(212, 137, 62, 0.2);
		border-radius: var(--radius-xl);
		padding: 1.5rem 2rem;
		text-align: center;
		transition: all 0.2s ease;
	}

	.blog-link-card:hover {
		border-color: rgba(212, 137, 62, 0.35);
		background: rgba(212, 137, 62, 0.08);
	}

	.blog-link-label {
		display: block;
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--color-accent-teal);
		text-transform: uppercase;
		letter-spacing: 0.12em;
		margin-bottom: 0.5rem;
	}

	.blog-link {
		display: inline-block;
		font-family: var(--font-display);
		font-size: var(--font-size-lg);
		font-weight: 600;
		color: var(--color-accent-honey);
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.blog-link:hover {
		color: var(--color-accent-honey-hover);
		text-shadow: 0 0 12px rgba(212, 137, 62, 0.4);
	}

	.blog-link-hint {
		font-size: var(--font-size-sm);
		color: var(--color-text-dim);
		margin: 0.5rem 0 0;
	}

	:global([data-theme='light']) .blog-link-card {
		background: rgba(212, 137, 62, 0.04);
		box-shadow: var(--shadow-neo);
		border: none;
	}

	:global([data-theme='light']) .transcript-content {
		background: var(--gradient-card-bg);
		box-shadow: var(--shadow-neo);
		border: none;
	}
</style>
