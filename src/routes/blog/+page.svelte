<script>
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import { getPosts } from '$lib/utils/posts';
	import { siteConfig } from '$lib/config';

	const POSTS_PER_PAGE = 9;

	let allPosts = $state([]);
	let currentPage = $state(1);

	let totalPages = $derived(Math.ceil(allPosts.length / POSTS_PER_PAGE));
	let paginatedPosts = $derived(allPosts.slice(0, currentPage * POSTS_PER_PAGE));
	let hasMore = $derived(currentPage < totalPages);

	async function load() {
		allPosts = await getPosts();
	}

	function loadMore() {
		currentPage++;
		// Scroll bleibt wo es ist, neue Cards laden unten nach
	}

	load();
</script>

<svelte:head>
	<title>Blog — Tech, KI, Maker & Produktivität | TRMT</title>
	<meta name="description" content="Alle Blog-Posts: KI-Tool-Reviews, Maker-Projekte, Smart Home Tutorials, Automatisierung und Produktivitäts-Hacks. Wöchentlich neue Artikel." />
	<meta property="og:title" content="Blog — The Random Maker Theory" />
	<meta property="og:description" content="KI-Tool-Reviews, Maker-Projekte, Smart Home Tutorials und Produktivitäts-Hacks. Wöchentlich neu." />
	<meta property="og:url" content="https://therandommakertheory.com/blog" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://therandommakertheory.com/images/og/default.webp" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Blog — TRMT" />
	<meta name="twitter:description" content="KI-Tool-Reviews, Maker-Projekte, Smart Home Tutorials und Produktivitäts-Hacks." />
	<meta name="twitter:image" content="https://therandommakertheory.com/images/og/default.webp" />
	<link rel="canonical" href="https://therandommakertheory.com/blog" />
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		"name": "Blog — The Random Maker Theory",
		"description": "Alle Blog-Posts zu Tech, KI, Maker-Projekten und Produktivität.",
		"url": "https://therandommakertheory.com/blog",
		"isPartOf": { "@type": "WebSite", "name": "The Random Maker Theory", "url": "https://therandommakertheory.com" }
	})}</script>`}
</svelte:head>

<!-- Header -->
<section class="blog-header">
	<div>
		<h1 class="blog-title">Blog</h1>
		<p class="blog-subtitle">
			Tech, KI, Maker-Projekte & Produktivität — neu jede Woche.
		</p>
	</div>
	<p class="blog-intro">
		Ehrliche Reviews, Praxis-Tutorials und Maker-Projekte zum Nachbauen. Von KI-Tools wie ChatGPT, Claude und Midjourney über Arduino- und ESP32-Projekte bis zu Automatisierung mit n8n und Produktivitäts-Systemen mit Obsidian. Alles getestet, alles nachvollziehbar, alles frei Schnauze. Keine gesponserten Bestenlisten, keine aufgeblähten Listicles. Wenn was gut ist, sag ich das. Wenn was kacke ist, auch.
	</p>
	{#if allPosts.length > 0}
		<p class="blog-count">
			{allPosts.length} Artikel online
		</p>
	{/if}
</section>

<!-- Posts Grid -->
<section style="padding: 2rem 0;">
	<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
		{#each paginatedPosts as post (post.slug)}
			<BlogCard {post} />
		{/each}
	</div>

	{#if allPosts.length === 0}
		<div style="text-align: center; padding: 3rem; color: var(--color-text-muted); font-size: var(--font-size-lg);">
			Keine Posts gefunden.
		</div>
	{/if}

	<!-- Load More -->
	{#if hasMore}
		<div class="load-more-container">
			<button class="load-more-btn" onclick={loadMore}>
				Mehr laden
				<span class="load-more-count">({paginatedPosts.length} von {allPosts.length})</span>
			</button>
		</div>
	{/if}
</section>

<style>
	.blog-header {
		padding: 48px 0 24px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.blog-title {
		font-size: clamp(2.5rem, 8vw, 3.5rem);
		font-family: var(--font-display);
		font-weight: 400;
		line-height: var(--line-height-tight);
		margin: 0;
		color: var(--color-text);
		opacity: 0.95;
	}

	.blog-subtitle {
		font-size: var(--font-size-lg);
		color: var(--color-text-muted);
		margin: 0.5rem 0 0 0;
		line-height: var(--line-height-relaxed);
	}

	.blog-intro {
		font-size: var(--font-size-base);
		color: var(--color-text-muted);
		line-height: 1.75;
		margin: 0;
		max-width: 720px;
		opacity: 0.8;
	}

	.blog-count {
		font-size: var(--font-size-sm);
		color: var(--color-text-dim);
		margin: 0;
	}

	.load-more-container {
		display: flex;
		justify-content: center;
		padding: 3rem 0 1rem;
	}

	.load-more-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.875rem 2rem;
		background: transparent;
		border: 1px solid var(--color-accent-honey);
		color: var(--color-accent-honey);
		font-family: var(--font-sans);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all var(--transition-normal);
	}

	.load-more-btn:hover {
		background: var(--color-accent-honey);
		color: var(--color-on-accent, #111);
		transform: translateY(-2px);
		box-shadow: 0 0 20px rgba(212, 137, 62, 0.4), 0 0 40px rgba(212, 137, 62, 0.15), 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.load-more-count {
		font-size: var(--font-size-sm);
		opacity: 0.7;
		font-weight: var(--font-weight-normal);
	}
</style>
