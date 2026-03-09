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
			desc: 'Was taugt wirklich? ChatGPT, Claude, Gemini, Midjourney, Leonardo AI und dutzende andere Tools im Praxistest. Dazu aktuelle KI-News, Vergleiche und Tutorials.',
			highlights: ['Tool-Reviews', 'KI-News', 'Prompt-Guides', 'Vergleiche'],
			tag: 'ki-tools'
		},
		{
			icon: '🔧',
			title: 'Maker & DIY',
			desc: 'Projekte zum Nachbauen mit Arduino, ESP32, Raspberry Pi und 3D-Drucker. Smart Home Sensoren, LED-Strips, eigene Gadgets. Alles mit Teileliste und Code.',
			highlights: ['Arduino-Projekte', 'ESP32', '3D-Druck', 'Smart Home'],
			tag: 'maker'
		},
		{
			icon: '⚡',
			title: 'Automatisierung',
			desc: 'Workflows bauen mit n8n, Make und Zapier. Shell-Scripts, Cron-Jobs, API-Anbindungen. Alles was repetitive Arbeit erspart und im Hintergrund laufen kann.',
			highlights: ['n8n-Workflows', 'API-Guides', 'Shell-Scripts', 'Cron-Jobs'],
			tag: 'automatisierung'
		},
		{
			icon: '📸',
			title: 'Fotografie',
			desc: 'KI trifft Bildbearbeitung. Lightroom AI Masking, Topaz Denoise, Luminar Neo, Generative Fill. Plus Gear-Reviews und Editing-Workflows fuer Fotografen.',
			highlights: ['Lightroom-KI', 'Editing-Workflows', 'Gear-Reviews', 'Topaz & Luminar'],
			tag: 'fotografie'
		},
		{
			icon: '🧠',
			title: 'Produktivität',
			desc: 'Obsidian als Second Brain, Notion-Setups, PARA-Methode, Fokus-Strategien. Systeme die funktionieren, auch wenn die Motivation mal fehlt.',
			highlights: ['Obsidian-Setups', 'Second Brain', 'Fokus-Hacks', 'Tool-Vergleiche'],
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
		<h2 class="intro-headline">Entdecken. Verstehen. Und alles <span class="intro-accent">Frei Schnauze.</span></h2>
		<p class="intro-text">
			Tech, KI-Tools, Maker-Projekte, Automatisierung und Produktivität. Aufbereitet und erklärt, so dass es hängen bleibt. Für alle Neugierigen, die mehr wissen wollen!
		</p>
		<div class="article-counter">
			<span class="counter-number">{posts.length}</span>
			<span class="counter-text">Artikel online</span>
			<span class="counter-sub">und es werden mehr</span>
		</div>
	</div>
</section>

<!-- ═══════ 5 CONTENT-SÄULEN ═══════ -->
<section class="section pillars-section">
	<div class="section-header">
		<h2 class="section-title">Was dich hier erwartet</h2>
	</div>
	<div class="pillars-list">
		{#each pillars as pillar, i}
			<a href="/blog?tag={pillar.tag}" class="pillar-row" class:pillar-row-reverse={i % 2 !== 0}>
				<div class="pillar-icon-col">
					<span class="pillar-icon-large">{pillar.icon}</span>
				</div>
				<div class="pillar-content">
					<h3 class="pillar-title">{pillar.title}</h3>
					<p class="pillar-desc">{pillar.desc}</p>
					<div class="pillar-highlights">
						{#each pillar.highlights as tag}
							<span class="pillar-tag">{tag}</span>
						{/each}
					</div>
				</div>
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
		padding: 120px 0 60px;
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
		padding: 80px 0 60px;
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
		color: var(--color-text);
		margin: 0 0 20px;
		letter-spacing: -0.01em;
		opacity: 0.95;
	}

	.intro-accent {
		color: var(--color-accent-honey);
	}

	.intro-text {
		font-size: var(--font-size-md);
		color: var(--color-text-muted);
		line-height: 1.75;
		margin: 0 0 40px;
	}

	/* ── ARTICLE COUNTER ── */
	.article-counter {
		display: inline-flex;
		align-items: baseline;
		gap: 10px;
		padding: 12px 28px;
		background: var(--color-surface);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-full);
	}

	.counter-number {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: var(--font-size-3xl);
		color: var(--color-accent-honey);
		line-height: 1;
	}

	.counter-text {
		font-family: var(--font-sans);
		font-weight: 600;
		font-size: var(--font-size-base);
		color: var(--color-text);
	}

	.counter-sub {
		font-size: var(--font-size-sm);
		color: var(--color-text-dim);
		font-style: italic;
	}

	/* ── PILLARS (Staggered List) ── */
	.pillars-section {
		padding: 64px 0 48px;
	}

	.pillars-list {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.pillar-row {
		display: grid;
		grid-template-columns: 80px 1fr;
		gap: 24px;
		align-items: start;
		padding: 32px;
		background: var(--color-surface);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-xl);
		text-decoration: none;
		transition: all 0.25s ease;
	}

	.pillar-row:hover {
		border-color: var(--color-accent-honey-subtle);
		transform: translateY(-2px);
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
	}

	.pillar-row-reverse {
		margin-left: 60px;
	}

	:global([data-theme='light']) .pillar-row {
		background: var(--gradient-card-bg);
		border: none;
		box-shadow: var(--shadow-neo);
	}

	.pillar-icon-col {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pillar-icon-large {
		font-size: 3rem;
	}

	.pillar-content {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.pillar-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: var(--font-size-xl);
		color: var(--color-text);
		margin: 0;
	}

	.pillar-desc {
		font-size: var(--font-size-base);
		color: var(--color-text-muted);
		line-height: 1.7;
		margin: 0;
	}

	.pillar-highlights {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 4px;
	}

	.pillar-tag {
		font-size: var(--font-size-xs);
		font-family: var(--font-mono);
		color: var(--color-accent-teal);
		background: var(--color-accent-teal-subtle);
		padding: 3px 10px;
		border-radius: var(--radius-full);
		letter-spacing: 0.02em;
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
	@media (max-width: 768px) {
		.hero { padding: 80px 0 40px; }
		.intro-section { padding: 60px 0 40px; }
		.posts-grid { grid-template-columns: 1fr; }
		.pillar-row {
			grid-template-columns: 60px 1fr;
			padding: 24px;
			gap: 16px;
		}
		.pillar-row-reverse {
			margin-left: 0;
		}
		.pillar-icon-large { font-size: 2.25rem; }
		.pillar-title { font-size: var(--font-size-lg); }
		.counter-number { font-size: var(--font-size-2xl); }
	}

	@media (max-width: 480px) {
		.pillar-row {
			grid-template-columns: 1fr;
			text-align: center;
		}
		.pillar-icon-col { justify-content: center; }
		.pillar-highlights { justify-content: center; }
	}
</style>
