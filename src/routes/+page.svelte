<script>
	import { getPosts } from '$lib/utils/posts';
	import { getLatestEpisode } from '$lib/utils/episodes';
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import EpisodeCard from '$lib/components/podcast/EpisodeCard.svelte';
	import NewsletterSignup from '$lib/components/NewsletterSignup.svelte';
	import { siteConfig } from '$lib/config';

	/** @type {any[]} */
	let posts = $state([]);
	/** @type {any} */
	let latestEpisode = $state(null);
	let scrollY = $state(0);

	// Count-up animation
	let displayCount = $state(0);
	/** @type {HTMLDivElement | null} */
	let counterRef = $state(null);
	let hasAnimated = false;

	async function load() {
		posts = await getPosts();
		latestEpisode = await getLatestEpisode();
	}

	load();

	$effect(() => {
		if (!counterRef) return;
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !hasAnimated && posts.length > 0) {
					hasAnimated = true;
					animateCount(posts.length);
				}
			});
		}, { threshold: 0.5 });
		observer.observe(counterRef);
		return () => observer.disconnect();
	});

	/** @param {number} target */
	function animateCount(target) {
		const duration = 1200;
		const start = performance.now();
		/** @param {number} now */
		function tick(now) {
			const elapsed = now - start;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			displayCount = Math.round(eased * target);
			if (progress < 1) requestAnimationFrame(tick);
		}
		requestAnimationFrame(tick);
	}

	const pillars = [
		{
			icon: '🤖',
			title: 'KI & Tech',
			category: 'Reviews · News · Tutorials',
			desc: 'Was taugt wirklich? ChatGPT, Claude, Gemini, Midjourney, Leonardo AI und dutzende andere KI-Tools im ehrlichen Praxistest. Keine gesponserten Lobeshymnen, sondern echte Erfahrung nach Wochen der Nutzung. Dazu aktuelle KI-News, wenn was Relevantes passiert. Vergleiche zwischen Tools, Prompt-Engineering Guides und Tutorials, die auch Einsteiger abholen. Von Text-KI über Bildgenerierung bis Audio und Video: hier erfährst du, was sich lohnt und was nur Hype ist.',
			highlights: ['Tool-Reviews', 'KI-News', 'Prompt-Guides', 'Vergleiche', 'Tutorials'],
			tag: 'ki-tools'
		},
		{
			icon: '🔧',
			title: 'Maker & DIY',
			category: 'Projekte · Anleitungen · Hardware',
			desc: 'Projekte zum Nachbauen mit Arduino, ESP32, Raspberry Pi und 3D-Drucker. Von smarten Sensoren fürs Terrarium über LED-Strips mit WLED bis zum eigenen Wetterstation-Dashboard. Jedes Projekt kommt mit Teileliste, Schaltplan und vollständigem Code. Dazu Grundlagen-Tutorials für Einsteiger, die noch nie gelötet haben. 3D-Druck Guides mit Slicer-Settings, Material-Tipps und Design-Workflows. Basteln mit Hirn statt Pinterest-Deko.',
			highlights: ['Arduino', 'ESP32', '3D-Druck', 'Smart Home', 'Raspberry Pi'],
			tag: 'maker'
		},
		{
			icon: '⚡',
			title: 'Automatisierung',
			category: 'Workflows · Scripts · DevOps',
			desc: 'Workflows bauen mit n8n, Make und Zapier. Alles was du einmal einrichtest und nie wieder anfassen musst. Shell-Scripts für den Alltag, Cron-Jobs die im Hintergrund laufen, API-Anbindungen zwischen Tools. Vom simplen Backup-Script bis zur kompletten Content-Pipeline. Dazu Docker-Setups, Self-Hosting Guides und Server-Konfiguration. Repetitive Arbeit ist Zeitverschwendung: automatisiere oder lass es sein.',
			highlights: ['n8n-Workflows', 'API-Guides', 'Shell-Scripts', 'Docker', 'Self-Hosting'],
			tag: 'automatisierung'
		},
		{
			icon: '📸',
			title: 'Fotografie',
			category: 'KI-Editing · Gear · Workflows',
			desc: 'Wo KI auf Bildbearbeitung trifft. Lightroom AI Masking, Topaz Photo AI, Luminar Neo, Generative Fill in Photoshop. Ehrliche Tool-Reviews nach Monaten echter Nutzung, nicht nach 5 Minuten Ausprobieren. Dazu Editing-Workflows die wirklich Zeit sparen, Gear-Reviews von Kameras und Objektiven, und Tipps für Fotografen die ihre Arbeit mit KI-Tools aufwerten wollen, ohne dass es fake aussieht.',
			highlights: ['Lightroom-KI', 'Editing-Workflows', 'Gear-Reviews', 'Topaz & Luminar', 'Photoshop KI'],
			tag: 'fotografie'
		},
		{
			icon: '🧠',
			title: 'Produktivität',
			category: 'Systeme · Tools · Mindset',
			desc: 'Obsidian als Second Brain, Notion-Setups die man tatsächlich nutzt, PARA-Methode in der Praxis. Systeme die funktionieren, auch wenn die Motivation mal komplett fehlt. Fokus-Strategien für Leute mit ADHS-Brain, Tool-Vergleiche zwischen Notion, Obsidian, Logseq und Co. Dazu Tipps für digitale Ordnung, Journaling-Workflows und alles was hilft, den eigenen Kopf zu entlasten und trotzdem nichts zu vergessen.',
			highlights: ['Obsidian', 'Second Brain', 'PARA-Methode', 'Fokus-Hacks', 'Notion'],
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
		<a href="/podcast" class="btn-teal">Zum Hören</a>
	</div>
	<div class="scroll-hint" class:hidden={scrollY > 100}>
		<span class="scroll-arrow">↓</span>
	</div>
</section>

<!-- ═══════ INTRO ═══════ -->
<section class="intro-section">
	<div class="intro-inner">
		<div class="article-counter" bind:this={counterRef}>
			<span class="counter-number">{displayCount}</span>
			<span class="counter-label">Artikel online</span>
			<span class="counter-sub">+ wöchentlich neue</span>
		</div>
		<h2 class="intro-headline">Entdecken. Verstehen. Und alles <span class="intro-accent">Frei Schnauze.</span></h2>
		<p class="intro-text">
			Tech, KI-Tools, Maker-Projekte, Automatisierung und Produktivität. Aufbereitet und erklärt, so dass es hängen bleibt. Für alle Neugierigen, die mehr wissen wollen!
		</p>
	</div>
</section>

<!-- ═══════ 5 CONTENT-SÄULEN ═══════ -->
<section class="section pillars-section">
	<div class="section-header">
		<h2 class="section-title">Was dich hier erwartet</h2>
	</div>
	<div class="pillars-list">
		{#each pillars as pillar, i}
			<a href="/tags/{pillar.tag}" class="pillar-card" class:pillar-honey={i % 2 === 0} class:pillar-teal={i % 2 !== 0}>
				<div class="pillar-icon-col">
					<span class="pillar-icon-large">{pillar.icon}</span>
				</div>
				<div class="pillar-content">
					<span class="pillar-category">{pillar.category}</span>
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
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		padding: 40px 0 80px;
		margin-top: -56px;
		padding-top: 56px;
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
		box-shadow: 0 0 20px rgba(212, 137, 62, 0.4), 0 0 40px rgba(212, 137, 62, 0.15), 0 4px 12px rgba(0, 0, 0, 0.2);
		transform: translateY(-2px);
	}

	.btn-teal {
		background: var(--color-accent-teal);
		color: var(--color-on-accent);
	}
	.btn-teal:hover {
		background: var(--color-accent-teal-hover);
		box-shadow: 0 0 20px rgba(58, 176, 162, 0.4), 0 0 40px rgba(58, 176, 162, 0.15), 0 4px 12px rgba(0, 0, 0, 0.2);
		transform: translateY(-2px);
	}

	/* ── INTRO SECTION ── */
	.intro-section {
		padding: 100px 0 80px;
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
		margin: 0;
	}

	/* ── ARTICLE COUNTER (V5 Honey Glow) ── */
	.article-counter {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 32px 52px;
		margin: 0 0 32px;
		background: var(--color-surface);
		border: 1px solid rgba(212, 137, 62, 0.15);
		border-radius: var(--radius-xl);
		box-shadow: 0 0 30px rgba(212, 137, 62, 0.05);
		transition: all 0.3s ease;
	}

	.article-counter:hover {
		border-color: rgba(212, 137, 62, 0.3);
		box-shadow: 0 0 40px rgba(212, 137, 62, 0.1), 0 0 60px rgba(212, 137, 62, 0.05);
	}

	.counter-number {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: 4rem;
		color: var(--color-accent-honey);
		line-height: 1;
		text-shadow: 0 0 20px rgba(212, 137, 62, 0.2);
	}

	.counter-label {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.15rem;
		color: var(--color-text-muted);
	}

	.counter-sub {
		font-family: var(--font-sans);
		font-size: 0.75rem;
		color: var(--color-text-dim);
		margin-top: 4px;
	}

	/* ── PILLARS (C+D Hybrid: Teal Category + Alternating Colors) ── */
	.pillars-section {
		padding: 64px 0 48px;
	}

	.pillars-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.pillar-card {
		display: grid;
		grid-template-columns: 64px 1fr;
		gap: 24px;
		align-items: start;
		padding: 32px;
		background: var(--color-surface);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-xl);
		text-decoration: none;
		transition: all 0.25s ease;
		color: inherit;
	}

	/* Alternating subtle backgrounds */
	.pillar-honey {
		background: rgba(212, 137, 62, 0.03);
		border-color: rgba(212, 137, 62, 0.08);
	}

	.pillar-teal {
		background: rgba(58, 176, 162, 0.03);
		border-color: rgba(58, 176, 162, 0.08);
	}

	/* Hover: lift + deep shadow + darker surface (same as current cards) */
	.pillar-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35), 0 4px 12px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.25);
		border-color: rgba(212, 137, 62, 0.2);
	}

	:global([data-theme='light']) .pillar-card {
		background: var(--gradient-card-bg);
		border: none;
		box-shadow: var(--shadow-neo);
	}

	:global([data-theme='light']) .pillar-honey {
		background: rgba(212, 137, 62, 0.04);
	}

	:global([data-theme='light']) .pillar-teal {
		background: rgba(58, 176, 162, 0.04);
	}

	:global([data-theme='light']) .pillar-card:hover {
		background: rgba(0, 0, 0, 0.04);
		box-shadow: 12px 12px 24px rgba(160, 145, 125, 0.5), -6px -6px 12px rgba(245, 238, 225, 0.6);
		border-color: rgba(196, 133, 76, 0.3);
	}

	.pillar-icon-col {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 4px;
	}

	.pillar-icon-large {
		font-size: 2.5rem;
	}

	.pillar-content {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.pillar-category {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--color-accent-teal);
		text-transform: uppercase;
		letter-spacing: 0.12em;
	}

	.pillar-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: var(--font-size-lg);
		color: var(--color-text);
		letter-spacing: var(--letter-spacing-tighter);
		margin: 0;
	}

	.pillar-desc {
		font-size: var(--font-size-base);
		color: var(--color-text-muted);
		line-height: 1.75;
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
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(28px, 4vw, 36px);
		color: var(--color-text);
		margin: 0;
		font-style: normal;
		opacity: 0.95;
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
		.posts-grid { grid-template-columns: repeat(2, 1fr); }
	}

	@media (max-width: 768px) {
		.hero { min-height: 100svh; padding: 56px 0 60px; margin-top: -56px; }
		.intro-section { padding: 80px 0 60px; }
		.posts-grid { grid-template-columns: 1fr; }
		.pillar-card {
			grid-template-columns: 48px 1fr;
			padding: 24px;
			gap: 16px;
		}
		.pillar-icon-large { font-size: 2rem; }
		.pillar-title { font-size: var(--font-size-lg); }
		.counter-number { font-size: 3rem; }
		.article-counter { padding: 24px 36px; }
	}

	@media (max-width: 480px) {
		.pillar-card {
			grid-template-columns: 1fr;
			text-align: center;
		}
		.pillar-icon-col { justify-content: center; }
		.pillar-highlights { justify-content: center; }
	}
</style>
