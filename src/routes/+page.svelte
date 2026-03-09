<script>
	import { getPosts } from '$lib/utils/posts';
	import { getLatestEpisode } from '$lib/utils/episodes';
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import EpisodeCard from '$lib/components/podcast/EpisodeCard.svelte';
	import NewsletterSignup from '$lib/components/NewsletterSignup.svelte';
	import { siteConfig } from '$lib/config';

	let posts = $state([]);
	let latestEpisode = $state(null);
	let scrollY = $state(0);

	async function load() {
		posts = await getPosts();
		latestEpisode = await getLatestEpisode();
	}

	load();

	const pillars = [
		{
			icon: '🤖',
			title: 'KI & Tech',
			desc: 'Tool-Reviews, News, Tutorials. Was wirklich funktioniert.',
			tag: 'ki-tools'
		},
		{
			icon: '🔧',
			title: 'Maker & DIY',
			desc: 'Arduino, ESP32, 3D-Druck, Home Assistant. Hands-on.',
			tag: 'maker'
		},
		{
			icon: '⚡',
			title: 'Automatisierung',
			desc: 'n8n, Workflows, Scripting. Weniger Arbeit, mehr Output.',
			tag: 'automatisierung'
		},
		{
			icon: '📸',
			title: 'Fotografie',
			desc: 'KI in der Bildbearbeitung. Lightroom, Luminar, Topaz.',
			tag: 'fotografie'
		},
		{
			icon: '🧠',
			title: 'Produktivität',
			desc: 'Obsidian, ADHD-Hacks, Second Brain. Systeme statt Disziplin.',
			tag: 'produktivitaet'
		}
	];
</script>

<svelte:window bind:scrollY={scrollY} />

<svelte:head>
	<title>The Random Maker Theory — Tech, KI, Maker & Produktivität</title>
	<meta name="description" content="Tech, KI-Tools, Maker-Projekte & Produktivität. News, Reviews, Tutorials und Projekte. Selbst getestet, ehrlich aufbereitet, frei Schnauze geschrieben." />
	<meta name="keywords" content="Tech Blog deutsch, KI News, KI Tools, Maker Projekte, Smart Home, Produktivität, ChatGPT Tutorial, Arduino, 3D Druck, Fotografie, Automatisierung" />

	<!-- OpenGraph -->
	<meta property="og:title" content="The Random Maker Theory — Tech, KI, Maker & Produktivität" />
	<meta property="og:description" content="Tech, KI, Maker-Projekte & Produktivität. Content, den ich selbst lese." />
	<meta property="og:image" content="https://therandommakertheory.com/images/og/default.webp" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://therandommakertheory.com" />
	<meta property="og:locale" content="de_DE" />
	<meta property="og:site_name" content="The Random Maker Theory" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="The Random Maker Theory" />
	<meta name="twitter:description" content="Tech, KI, Maker & Produktivität. Content, den ich selbst lese." />
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
		"description": "Tech, KI, Maker-Projekte & Produktivität. Content, den ich selbst lese.",
		"inLanguage": "de-DE",
		"publisher": {
			"@type": "Organization",
			"name": "The Random Maker Theory",
			"url": "https://therandommakertheory.com"
		}
	})}</script>`}
</svelte:head>

<!-- ═══════ HERO ═══════ -->
<section class="hero">
	<div class="hero-badge">News · Reviews · Tutorials · Projekte</div>
	<h1 class="hero-title">
		The <em class="hero-accent">Random</em> Maker Theory
	</h1>
	<p class="hero-subtitle">Content, den ich <em class="hero-accent">selbst</em> lese.</p>
	<div class="hero-actions">
		<a href="/blog" class="btn-honey">Zum Blog</a>
		<a href="/podcast" class="btn-teal">Zum Hoeren</a>
	</div>
	<div class="scroll-hint" class:hidden={scrollY > 100}>
		<span class="scroll-arrow">↓</span>
	</div>
</section>

<!-- ═══════ INTRO ═══════ -->
<section class="intro-section">
	<div class="intro-inner">
		<h2 class="intro-headline">Entdecken. Verstehen. Und alles Frei Schnauze.</h2>
		<p class="intro-text">
			Tech, KI-Tools, Maker-Projekte, Automatisierung und Produktivität. Aufbereitet und erklärt, so dass es hängen bleibt. Für alle Neugierigen, die mehr wissen wollen!
		</p>
		<div class="intro-stats">
			<div class="stat">
				<span class="stat-number">{posts.length}</span>
				<span class="stat-label">Artikel</span>
			</div>
		</div>
	</div>
</section>

<!-- ═══════ 5 CONTENT-SÄULEN ═══════ -->
<section class="section">
	<div class="section-header">
		<h2 class="section-title">Was dich hier erwartet</h2>
	</div>
	<div class="pillars-grid">
		{#each pillars as pillar}
			<a href="/blog?tag={pillar.tag}" class="pillar-card">
				<span class="pillar-icon">{pillar.icon}</span>
				<h3 class="pillar-title">{pillar.title}</h3>
				<p class="pillar-desc">{pillar.desc}</p>
			</a>
		{/each}
	</div>
</section>

<!-- ═══════ NEUESTE POSTS ═══════ -->
<section class="section">
	<div class="section-header">
		<h2 class="section-title">Neueste Posts</h2>
		<a href="/blog" class="section-link">Alle ansehen →</a>
	</div>
	<div class="posts-grid">
		{#each posts.slice(0, 6) as post (post.slug)}
			<BlogCard {post} />
		{/each}
	</div>
</section>

<!-- ═══════ NEUESTE EPISODE ═══════ -->
{#if latestEpisode}
	<section class="section">
		<div class="section-header">
			<h2 class="section-title">Neueste Episode</h2>
			<a href="/podcast" class="section-link">Alle Episoden →</a>
		</div>
		<div class="episode-wrap">
			<EpisodeCard episode={latestEpisode} />
		</div>
	</section>
{/if}

<!-- ═══════ NEWSLETTER ═══════ -->
<NewsletterSignup />

<style>
	/* ── HERO ── */
	.hero {
		text-align: center;
		padding: 100px 0 80px;
		position: relative;
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
		font-weight: 400;
		font-size: clamp(44px, 8vw, 80px);
		line-height: 1.05;
		letter-spacing: -0.02em;
		color: var(--color-text);
		margin: 0 0 20px;
		opacity: 0.95;
	}

	.hero-accent {
		color: var(--color-accent-honey);
		font-style: italic;
	}

	.hero-subtitle {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--font-size-xl);
		color: var(--color-text-muted);
		max-width: 480px;
		margin: 0 auto 40px;
		line-height: var(--line-height-relaxed);
		letter-spacing: 0.02em;
	}

	.hero-actions {
		display: flex;
		gap: 16px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.scroll-hint {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		transition: opacity 0.4s ease;
	}
	.scroll-hint.hidden { opacity: 0; }

	.scroll-arrow {
		display: inline-block;
		color: var(--color-text-dim);
		font-size: 1.25rem;
		animation: bounce 2s infinite;
	}

	@keyframes bounce {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(6px); }
	}

	/* ── BUTTONS ── */
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

	/* ── INTRO SECTION ── */
	.intro-section {
		padding: 40px 0 60px;
	}

	.intro-inner {
		max-width: 680px;
		margin: 0 auto;
		text-align: center;
	}

	.intro-headline {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(24px, 4vw, 36px);
		color: var(--color-accent-honey);
		margin: 0 0 20px;
		letter-spacing: -0.01em;
		opacity: 0.95;
	}

	.intro-text {
		font-size: var(--font-size-md);
		color: var(--color-text-muted);
		line-height: 1.75;
		margin: 0 0 32px;
	}

	.intro-stats {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 32px;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.stat-number {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: var(--font-size-2xl);
		color: var(--color-text);
		opacity: 0.95;
	}

	.stat-label {
		font-size: var(--font-size-sm);
		color: var(--color-text-dim);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.stat-divider {
		width: 1px;
		height: 40px;
		background: var(--color-border-subtle);
	}

	/* ── PILLARS GRID ── */
	.pillars-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 16px;
	}

	.pillar-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 24px 16px;
		background: var(--color-surface);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-lg);
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.pillar-card:hover {
		border-color: var(--color-accent-honey-subtle);
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
	}

	:global([data-theme='light']) .pillar-card {
		background: var(--gradient-card-bg);
		border: none;
		box-shadow: var(--shadow-neo);
	}

	.pillar-icon {
		font-size: 2rem;
		margin-bottom: 12px;
	}

	.pillar-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: var(--font-size-md);
		color: var(--color-text);
		margin: 0 0 6px;
	}

	.pillar-desc {
		font-size: var(--font-size-sm);
		color: var(--color-text-dim);
		line-height: 1.5;
		margin: 0;
	}

	/* ── SECTIONS ── */
	.section { padding: 48px 0; }

	.section-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 32px;
	}

	.section-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: var(--font-size-2xl);
		color: var(--color-text);
		margin: 0;
		font-style: normal;
	}

	.section-link {
		color: var(--color-accent-honey);
		text-decoration: none;
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-base);
		transition: color var(--transition-normal);
	}
	.section-link:hover { color: var(--color-accent-honey-hover); }

	/* ── POSTS GRID ── */
	.posts-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}

	.episode-wrap { max-width: 640px; }

	/* ── RESPONSIVE ── */
	@media (max-width: 1024px) {
		.pillars-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 768px) {
		.hero { padding: 64px 0 56px; }
		.posts-grid { grid-template-columns: 1fr; }
		.pillars-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.intro-stats { gap: 20px; }
		.stat-number { font-size: var(--font-size-xl); }
	}

	@media (max-width: 480px) {
		.pillars-grid {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
