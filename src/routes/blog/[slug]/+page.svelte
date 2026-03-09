<script>
	import TagList from '$lib/components/shared/TagList.svelte';
	import { siteConfig } from '$lib/config';

	let { data } = $props();

	let formattedDate = $derived(new Date(data.post.date).toLocaleDateString('de-DE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}));

	let scrollProgress = $state(0);

	function handleScroll() {
		const scrollTop = window.scrollY;
		const docHeight = document.documentElement.scrollHeight - window.innerHeight;
		scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
	}
</script>

<svelte:window onscroll={handleScroll} />

<svelte:head>
	<title>{data.post.title} — {siteConfig.name}</title>
	<meta name="description" content={data.post.description} />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.description} />
	{#if data.post.heroImage}
		<meta property="og:image" content={`https://therandommakertheory.com${data.post.heroImage}`} />
		<meta name="twitter:image" content={`https://therandommakertheory.com${data.post.heroImage}`} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
	<meta name="twitter:title" content={data.post.title} />
	<meta name="twitter:description" content={data.post.description} />
</svelte:head>

<!-- Reading Progress Bar -->
<div
	class="progress-bar"
	style="width: {scrollProgress}%; background: linear-gradient(90deg, var(--color-accent-honey), var(--color-accent-teal));"
></div>

<article class="article-container">
	<!-- Metadata -->
	<header class="article-header">
		<div>
			<h1 style="font-size: clamp(2rem, 6vw, 3.5rem); font-family: var(--font-display); font-weight: var(--font-weight-extrabold); line-height: var(--line-height-tight); margin: 0 0 1.5rem 0; color: var(--color-text);">
				{data.post.title}
			</h1>
			<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; color: var(--color-text-muted); font-size: var(--font-size-sm);">
				<time datetime={data.post.date}>{formattedDate}</time>
				{#if data.post.readingTime}
					<span>·</span>
					<span>{data.post.readingTime} min Lesezeit</span>
				{/if}
			</div>
		</div>

		<!-- Tags -->
		{#if data.post.tags && data.post.tags.length > 0}
			<div style="padding-top: 1.5rem;">
				<TagList tags={data.post.tags} />
			</div>
		{/if}
	</header>

	<!-- Hero Image -->
	{#if data.post.heroImage}
		<div class="hero-image">
			<img src={data.post.heroImage} alt={data.post.title} loading="eager" width="1200" height="675" />
		</div>
	{/if}

	<!-- Content -->
	<div class="prose prose-invert max-w-none article-content">
		{#if data.content}
			<data.content />
		{/if}
	</div>
</article>

<style>
	.progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		height: 3px;
		z-index: var(--z-sticky);
		transition: width 0.1s ease-out;
	}

	.article-container {
		max-width: 48rem;
		margin: 0 auto;
		padding: 3rem 1rem;
	}

	.article-header {
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--color-border);
	}

	.article-content {
		color: var(--color-text-muted, hsl(0 0% 78%));
		line-height: 1.8;
		font-size: 1.0625rem;
		max-width: 65ch;
	}

	:global(.prose code) {
		background-color: var(--color-surface-raised);
		color: var(--color-text);
		padding: 0.25rem 0.5rem;
		border-radius: 0.375rem;
		font-family: var(--font-mono);
		font-size: 0.875em;
	}

	:global(.prose pre) {
		background-color: var(--color-surface-raised);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 1rem;
		overflow-x: auto;
	}

	:global(.prose pre code) {
		background-color: transparent;
		padding: 0;
		border-radius: 0;
	}

	:global(.prose a) {
		color: var(--color-accent-honey);
		text-decoration: none;
		transition: color var(--transition-normal);
	}

	:global(.prose a:hover) {
		color: var(--color-accent-honey-hover);
		text-decoration: underline;
	}

	:global(.prose blockquote) {
		border-left: 3px solid var(--color-accent-honey);
		padding-left: 1.5rem;
		color: var(--color-text-muted);
		font-style: italic;
		margin-left: 0;
	}

	:global(.prose h1),
	:global(.prose h2),
	:global(.prose h3),
	:global(.prose h4) {
		font-family: var(--font-display);
		color: var(--color-text);
		margin-top: 2.5rem;
		margin-bottom: 1rem;
	}

	:global(.prose h2) {
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--color-border-subtle, hsla(0, 0%, 100%, 0.06));
	}

	:global(.prose h3) {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
	}

	:global(.prose p) {
		margin-bottom: 1.5rem;
	}

	:global(.prose ul),
	:global(.prose ol) {
		margin-bottom: 1.5rem;
		padding-left: 2rem;
	}

	:global(.prose li) {
		margin-bottom: 0.625rem;
		line-height: 1.7;
	}

	:global(.prose strong) {
		color: var(--color-text);
		font-weight: 600;
	}

	:global(.prose img) {
		border-radius: var(--radius-lg);
		margin: 2rem 0;
		max-width: 100%;
		height: auto;
	}

	:global(.prose hr) {
		border: none;
		border-top: 1px solid var(--color-border-subtle, hsla(0, 0%, 100%, 0.06));
		margin: 2.5rem 0;
	}

	.hero-image {
		margin-bottom: 2.5rem;
		border-radius: var(--radius-xl);
		overflow: hidden;
	}

	.hero-image img {
		width: 100%;
		height: auto;
		display: block;
	}

	@media (max-width: 768px) {
		.article-container {
			padding: 2rem 1rem;
		}

		.article-header {
			margin-bottom: 2rem;
			padding-bottom: 1.5rem;
		}
	}
</style>
