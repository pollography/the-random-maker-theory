<script>
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import { siteConfig } from '$lib/config';
	import { getTagDescription } from '$lib/data/tagDescriptions';

	let { data } = $props();
	let tagInfo = $derived(getTagDescription(data.tag));
</script>

<svelte:head>
	<title>{tagInfo.title} — Artikel & Guides | {siteConfig.name}</title>
	<meta name="description" content={tagInfo.metaDesc} />
	<meta property="og:title" content="{tagInfo.title} — {siteConfig.name}" />
	<meta property="og:description" content={tagInfo.metaDesc} />
	<meta property="og:url" content="https://therandommakertheory.com/tags/{data.tag}" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://therandommakertheory.com/images/og/default.webp" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{tagInfo.title} — {siteConfig.name}" />
	<meta name="twitter:description" content={tagInfo.metaDesc} />
	<link rel="canonical" href="https://therandommakertheory.com/tags/{data.tag}" />
</svelte:head>

<!-- Tag Header mit SEO-Content -->
<section class="tag-header">
	<div class="tag-icon">{tagInfo.icon}</div>
	<h1 class="tag-title">
		{tagInfo.title}
	</h1>
	<p class="tag-intro">
		{tagInfo.intro}
	</p>
	<div class="tag-meta">
		<span class="tag-count">{data.posts.length} {data.posts.length === 1 ? 'Artikel' : 'Artikel'}</span>
		<a href="/blog" class="tag-back">← Alle Themen</a>
	</div>
</section>

<!-- Posts Grid -->
<section class="tag-posts">
	<div class="tag-grid">
		{#each data.posts as post (post.slug)}
			<BlogCard {post} />
		{/each}
	</div>

	{#if data.posts.length === 0}
		<div class="tag-empty">
			<p>Noch keine Artikel mit diesem Tag. Kommt bald!</p>
			<a href="/blog" class="tag-empty-link">
				← Zurück zum Blog
			</a>
		</div>
	{/if}
</section>

<style>
	.tag-header {
		padding: 48px 0 32px;
		max-width: 720px;
	}

	.tag-icon {
		font-size: 3rem;
		margin-bottom: 16px;
	}

	.tag-title {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(32px, 6vw, 48px);
		color: var(--color-text);
		margin: 0 0 20px;
		line-height: 1.1;
		opacity: 0.95;
	}

	.tag-intro {
		font-size: var(--font-size-md);
		color: var(--color-text-muted);
		line-height: 1.75;
		margin: 0 0 24px;
	}

	.tag-meta {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.tag-count {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--color-accent-teal);
		background: var(--color-accent-teal-subtle);
		padding: 4px 12px;
		border-radius: var(--radius-full);
	}

	.tag-back {
		font-size: var(--font-size-sm);
		color: var(--color-accent-honey);
		text-decoration: none;
		font-weight: var(--font-weight-semibold);
		transition: all var(--transition-normal);
	}

	.tag-back:hover {
		color: var(--color-accent-honey-hover);
		text-shadow: 0 0 12px rgba(212, 137, 62, 0.4);
	}

	.tag-posts {
		padding: 32px 0 48px;
	}

	.tag-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}

	.tag-empty {
		text-align: center;
		padding: 48px;
	}

	.tag-empty p {
		color: var(--color-text-muted);
		font-size: var(--font-size-lg);
		margin: 0 0 16px;
	}

	.tag-empty-link {
		color: var(--color-accent-honey);
		text-decoration: none;
		font-weight: var(--font-weight-semibold);
		transition: color var(--transition-normal);
	}

	.tag-empty-link:hover {
		color: var(--color-accent-honey-hover);
	}

	@media (max-width: 1024px) {
		.tag-grid { grid-template-columns: repeat(2, 1fr); }
	}

	@media (max-width: 768px) {
		.tag-grid { grid-template-columns: 1fr; }
		.tag-header { padding: 32px 0 24px; }
	}
</style>
