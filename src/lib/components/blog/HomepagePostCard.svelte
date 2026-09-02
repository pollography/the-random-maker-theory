<script>
	import { getImageSeo } from '$lib/utils/image-seo.js';

	let { post, featured = false } = $props();

	let thumbnailSrc = $derived(
		post.heroImageThumb || (post.heroImage ? post.heroImage.replace('.webp', '-thumb.webp') : null)
	);
	let imageSeo = $derived(getImageSeo(
		thumbnailSrc || post.heroImage,
		featured
			? '(max-width: 768px) calc(100vw - 32px), (max-width: 1200px) 52vw, 620px'
			: '(max-width: 768px) 132px, (max-width: 1200px) 16vw, 180px'
	));
	let formattedDate = $derived(new Date(post.date).toLocaleDateString('de-DE', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	}));

	/** @param {string | undefined} category */
	function getCategoryLabel(category) {
		switch (category) {
			case 'ki-news':
			case 'ki-tools': return 'KI & Tech';
			case 'diy':
			case 'maker': return 'Maker & DIY';
			case 'automation':
			case 'automatisierung': return 'Automatisierung';
			case 'photography':
			case 'fotografie': return 'Fotografie';
			case 'productivity':
			case 'produktivitaet': return 'Produktivität';
			default: return category || 'Artikel';
		}
	}
</script>

<a
	href="/blog/{post.slug}"
	class:featured
	class:without-image={!thumbnailSrc}
	class="post-card"
>
	{#if thumbnailSrc}
		<div class="post-image">
			<img
				src={thumbnailSrc}
				srcset={imageSeo.srcset}
				sizes={imageSeo.sizes}
				alt=""
				loading={featured ? 'eager' : 'lazy'}
				fetchpriority={featured ? 'high' : undefined}
				decoding={featured ? 'sync' : 'async'}
				width={imageSeo.width ?? 640}
				height={imageSeo.height ?? 360}
			/>
		</div>
	{/if}
	<div class="post-copy">
		<div class="post-meta">
			<span>{getCategoryLabel(post.category)}</span>
			<time datetime={post.date}>{formattedDate}</time>
		</div>
		<h3>{post.title}</h3>
		{#if featured && post.description}
			<p class="post-description">{post.description}</p>
		{/if}
		<span class="post-cta">Artikel lesen →</span>
	</div>
</a>

<style>
	.post-card {
		display: grid;
		grid-template-columns: minmax(132px, 36%) 1fr;
		min-width: 0;
		overflow: hidden;
		background: var(--color-surface);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-xl);
		color: inherit;
		text-decoration: none;
		transition: border-color var(--transition-normal), transform var(--transition-normal);
	}

	.post-card:hover {
		border-color: rgba(212, 137, 62, 0.38);
		transform: translateY(-2px);
	}

	.post-card.featured {
		grid-template-columns: 1fr;
		grid-template-rows: minmax(230px, 1fr) auto;
		min-height: 100%;
	}

	.post-card.without-image {
		grid-template-columns: 1fr;
		background:
			radial-gradient(circle at 88% 8%, rgba(58, 176, 162, 0.13), transparent 36%),
			radial-gradient(circle at 10% 90%, rgba(212, 137, 62, 0.15), transparent 42%),
			var(--color-surface);
	}

	.post-image {
		min-width: 0;
		overflow: hidden;
		background: var(--color-elevated);
	}

	.post-image img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-normal);
	}

	.post-card:hover .post-image img { transform: scale(1.025); }

	.post-copy {
		display: flex;
		min-width: 0;
		flex-direction: column;
		justify-content: center;
		padding: 18px;
	}

	.featured .post-copy { padding: clamp(22px, 4vw, 36px); }

	.post-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 10px;
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-text-dim);
	}

	.post-meta span { color: var(--color-accent-teal-foreground); }

	h3 {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(20px, 2.3vw, 27px);
		font-weight: 400;
		line-height: 1.15;
		letter-spacing: -0.015em;
		color: var(--color-text);
	}

	.featured h3 { font-size: clamp(30px, 4.5vw, 46px); }

	.post-description {
		display: -webkit-box;
		margin: 14px 0 0;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		font-size: var(--font-size-base);
		line-height: 1.65;
		color: var(--color-text-muted);
	}

	.post-cta {
		margin-top: 18px;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--color-accent-honey-foreground);
	}

	:global([data-theme='light']) .post-card {
		background: var(--gradient-card-bg);
		border-color: transparent;
		box-shadow: var(--shadow-neo);
	}

	@media (max-width: 768px) {
		.post-card.featured {
			grid-template-rows: minmax(190px, 48vw) auto;
		}

		.featured .post-copy { padding: 22px; }
	}

	@media (max-width: 420px) {
		.post-card:not(.featured) { grid-template-columns: 112px 1fr; }
		.post-copy { padding: 14px; }
		.post-meta time { display: none; }
		h3 { font-size: 19px; }
	}

	@media (prefers-reduced-motion: reduce) {
		.post-card,
		.post-image img { transition: none; }
		.post-card:hover,
		.post-card:hover .post-image img { transform: none; }
	}
</style>
