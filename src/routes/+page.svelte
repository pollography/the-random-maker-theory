<script>
	import { getPosts } from '$lib/utils/posts';
	import { getLatestEpisode } from '$lib/utils/episodes';
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import EpisodeCard from '$lib/components/podcast/EpisodeCard.svelte';
	import NewsletterSignup from '$lib/components/NewsletterSignup.svelte';
	import { siteConfig } from '$lib/config';

	let posts = $state([]);
	let latestEpisode = $state(null);

	async function load() {
		posts = await getPosts();
		latestEpisode = await getLatestEpisode();
	}

	load();
</script>

<svelte:head>
	<title>The Random Maker Theory — Tech, KI, Maker & Produktivität</title>
	<meta name="description" content="Dein wöchentliches Tech-Update: KI-Tools, Maker-Projekte, Produktivität und Tutorials. Erkunden. Testen. Bauen. Ohne Bullshit." />
	<meta name="keywords" content="Tech Blog deutsch, KI News, KI Tools, Maker Projekte, Smart Home, Produktivität, ChatGPT Tutorial, Arduino, 3D Druck, Fotografie, Automatisierung" />

	<!-- OpenGraph -->
	<meta property="og:title" content="The Random Maker Theory — Tech, KI, Maker & Produktivität" />
	<meta property="og:description" content="Tech, KI, Maker-Projekte & Produktivität — erklärt so, dass du es verstehst. Jeden Donnerstag neu." />
	<meta property="og:image" content="https://therandommakertheory.com/images/og/default.webp" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://therandommakertheory.com" />
	<meta property="og:locale" content="de_DE" />
	<meta property="og:site_name" content="The Random Maker Theory" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="The Random Maker Theory" />
	<meta name="twitter:description" content="Tech, KI, Maker & Produktivität — ohne Bullshit. Jeden Donnerstag neu." />
	<meta name="twitter:image" content="https://therandommakertheory.com/images/og/default.webp" />

	<!-- Canonical -->
	<link rel="canonical" href="https://therandommakertheory.com" />

	<!-- JSON-LD Schema -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "The Random Maker Theory",
		"alternateName": "TRMT",
		"url": "https://therandommakertheory.com",
		"description": "Tech, KI, Maker-Projekte & Produktivität. Erkunden. Testen. Bauen.",
		"inLanguage": "de-DE",
		"publisher": {
			"@type": "Organization",
			"name": "The Random Maker Theory",
			"url": "https://therandommakertheory.com"
		}
	})}</script>`}
</svelte:head>

<!-- Hero Section -->
<section class="hero">
	<div class="hero-badge">Tech, KI, Maker & Produktivität</div>
	<h1 class="hero-title">The Random<br/>Maker Theory</h1>
	<p class="hero-subtitle">Erkunden. Testen. Bauen. Jeden Donnerstag neu.</p>
	<div class="hero-actions">
		<a href="/blog" class="btn-honey">Zum Blog</a>
		<a href="/podcast" class="btn-teal">Zum Podcast</a>
	</div>
</section>

<!-- Latest Blog Posts -->
<section class="section">
	<div class="section-header">
		<h2 class="section-title">Neueste Posts</h2>
		<a href="/blog" class="section-link">Alle ansehen &rarr;</a>
	</div>
	<div class="posts-grid">
		{#each posts.slice(0, 3) as post (post.slug)}
			<BlogCard {post} />
		{/each}
	</div>
</section>

<!-- Latest Podcast Episode -->
{#if latestEpisode}
	<section class="section">
		<div class="section-header">
			<h2 class="section-title">Neueste Episode</h2>
			<a href="/podcast" class="section-link">Alle Episoden &rarr;</a>
		</div>
		<div class="episode-wrap">
			<EpisodeCard episode={latestEpisode} />
		</div>
	</section>
{/if}

<!-- About Card -->
<section class="about-card">
	<h2 class="about-title">Über TRMT</h2>
	<p class="about-text">
		The Random Maker Theory ist dein wöchentliches Update zu Tech, KI, Maker-Projekten und Produktivität. Ich erkläre komplexe Themen verständlich, ohne Bullshit.
	</p>
	<a href="/about" class="section-link">Mehr über mich &rarr;</a>
</section>

<!-- Newsletter Signup -->
<NewsletterSignup />

<style>
	.hero {
		text-align: center;
		padding: 80px 0 64px;
	}

	.hero-badge {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--color-accent-teal);
		letter-spacing: var(--letter-spacing-wider);
		text-transform: uppercase;
		margin-bottom: 24px;
		padding: 6px 16px;
		border: 1px solid var(--color-accent-teal-subtle);
		border-radius: var(--radius-full);
		background: var(--color-accent-teal-subtle);
	}

	.hero-title {
		font-family: var(--font-display);
		font-weight: var(--font-weight-extrabold);
		font-size: clamp(40px, 7vw, 72px);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-tight);
		color: var(--color-text);
		margin: 0 0 24px;
	}

	.hero-subtitle {
		font-size: var(--font-size-lg);
		color: var(--color-text-muted);
		max-width: 480px;
		margin: 0 auto 40px;
		line-height: var(--line-height-relaxed);
	}

	.hero-actions {
		display: flex;
		gap: 16px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn-honey, .btn-teal {
		display: inline-flex;
		align-items: center;
		padding: 14px 28px;
		border-radius: var(--radius-lg);
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-base);
		text-decoration: none;
		transition: all var(--transition-normal);
		border: none;
	}

	.btn-honey {
		background: var(--color-accent-honey);
		color: var(--color-on-accent);
	}
	.btn-honey:hover {
		background: var(--color-accent-honey-hover);
		box-shadow: var(--shadow-glow-honey);
		transform: translateY(-1px);
	}

	.btn-teal {
		background: var(--color-accent-teal);
		color: var(--color-on-accent);
	}
	.btn-teal:hover {
		background: var(--color-accent-teal-hover);
		box-shadow: var(--shadow-glow-teal);
		transform: translateY(-1px);
	}

	.section { padding: 48px 0; }

	.section-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 32px;
	}

	.section-title {
		font-family: var(--font-display);
		font-weight: var(--font-weight-bold);
		font-size: var(--font-size-2xl);
		color: var(--color-text);
		margin: 0;
	}

	.section-link {
		color: var(--color-accent-honey);
		text-decoration: none;
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-base);
		transition: color var(--transition-normal);
	}
	.section-link:hover { color: var(--color-accent-honey-hover); }

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}

	@media (max-width: 768px) {
		.posts-grid { grid-template-columns: 1fr; }
	}

	.episode-wrap { max-width: 640px; }

	.about-card {
		margin-top: 32px;
		padding: 48px;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-card);
	}

	:global([data-theme='light']) .about-card {
		background: var(--gradient-card-bg);
		border: none;
		box-shadow: var(--shadow-neo);
	}

	.about-title {
		font-family: var(--font-display);
		font-weight: var(--font-weight-bold);
		font-size: var(--font-size-2xl);
		color: var(--color-text);
		margin: 0 0 16px;
	}

	.about-text {
		color: var(--color-text-muted);
		font-size: var(--font-size-md);
		line-height: var(--line-height-relaxed);
		margin: 0 0 24px;
	}
</style>
