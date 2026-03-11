<script>
	let { podcastUrl = '', videoUrl = '', podcastSlug = '' } = $props();

	let hasPodcast = $derived(!!podcastUrl || !!podcastSlug);
	let hasVideo = $derived(!!videoUrl);
	let hasAny = $derived(hasPodcast || hasVideo);

	let podcastHref = $derived(podcastUrl || (podcastSlug ? `/podcast/${podcastSlug}` : ''));

	// YouTube Video ID extrahieren fuer Embed
	let youtubeId = $derived(() => {
		if (!videoUrl) return '';
		const match = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
		return match ? match[1] : '';
	});

	let showEmbed = $state(false);
</script>

{#if hasAny}
	<aside class="media-banner">
		<div class="media-banner-header">
			<span class="media-banner-icon">🎧</span>
			<span class="media-banner-title">Lieber hören oder schauen?</span>
		</div>

		<div class="media-banner-links">
			{#if hasPodcast}
				<a href={podcastHref} class="media-link media-link-podcast" target={podcastUrl ? '_blank' : undefined} rel={podcastUrl ? 'noreferrer' : undefined}>
					<svg class="media-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
						<path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
						<line x1="12" y1="19" x2="12" y2="23"/>
						<line x1="8" y1="23" x2="16" y2="23"/>
					</svg>
					Podcast anhören
				</a>
			{/if}
			{#if hasVideo}
				{#if youtubeId() && !showEmbed}
					<button class="media-link media-link-video" onclick={() => showEmbed = true}>
						<svg class="media-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polygon points="5 3 19 12 5 21 5 3"/>
						</svg>
						Video anzeigen
					</button>
				{:else if !youtubeId()}
					<a href={videoUrl} class="media-link media-link-video" target="_blank" rel="noreferrer">
						<svg class="media-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polygon points="5 3 19 12 5 21 5 3"/>
						</svg>
						Video schauen
					</a>
				{/if}
			{/if}
		</div>

		<!-- YouTube Inline Embed -->
		{#if showEmbed && youtubeId()}
			<div class="video-embed-wrap">
				<div class="video-embed">
					<iframe
						src="https://www.youtube.com/embed/{youtubeId()}?autoplay=1"
						title="Video"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>
			</div>
		{/if}

		<p class="media-banner-note">
			KI-generierte Zusammenfassungen per NotebookLM. Erstellt als barrierefreie Alternative zum Lesen.
		</p>
	</aside>
{/if}

<style>
	.media-banner {
		background: var(--color-surface);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-xl);
		padding: 1.5rem 2rem;
		margin-bottom: 2.5rem;
		text-align: center;
	}

	.media-banner-header {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.media-banner-icon {
		font-size: 1.25rem;
	}

	.media-banner-title {
		font-family: var(--font-display);
		font-size: var(--font-size-lg);
		font-weight: 600;
		color: var(--color-text);
	}

	.media-banner-links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.media-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1.25rem;
		border-radius: var(--radius-lg);
		font-size: var(--font-size-sm);
		font-weight: 600;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.media-link-icon {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
	}

	.media-link-podcast {
		background: rgba(212, 137, 62, 0.1);
		color: var(--color-accent-honey);
		border: 1px solid rgba(212, 137, 62, 0.25);
	}

	.media-link-podcast:hover {
		background: rgba(212, 137, 62, 0.18);
		border-color: rgba(212, 137, 62, 0.4);
	}

	.media-link-video {
		background: rgba(58, 176, 162, 0.1);
		color: var(--color-accent-teal);
		border: 1px solid rgba(58, 176, 162, 0.25);
	}

	.media-link-video:hover {
		background: rgba(58, 176, 162, 0.18);
		border-color: rgba(58, 176, 162, 0.4);
	}

	/* Video Embed */
	.video-embed-wrap {
		margin: 1rem 0;
	}

	.video-embed {
		position: relative;
		width: 100%;
		padding-bottom: 56.25%;
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: rgba(0, 0, 0, 0.3);
	}

	.video-embed iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: none;
		border-radius: var(--radius-lg);
	}

	.media-banner-note {
		font-size: var(--font-size-xs);
		color: var(--color-text-dim);
		font-style: italic;
		margin: 0;
		line-height: 1.5;
	}

	:global([data-theme='light']) .media-banner {
		background: var(--gradient-card-bg);
		box-shadow: var(--shadow-neo);
		border: none;
	}

	@media (max-width: 480px) {
		.media-banner {
			padding: 1.25rem 1.25rem;
		}

		.media-banner-links {
			flex-direction: column;
		}

		.media-link {
			justify-content: center;
		}
	}
</style>
