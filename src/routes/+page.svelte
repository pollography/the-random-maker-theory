<script>
	import HomepagePostCard from '$lib/components/blog/HomepagePostCard.svelte';
	import EpisodeCard from '$lib/components/podcast/EpisodeCard.svelte';
	import NewsletterSignup from '$lib/components/NewsletterSignup.svelte';
	import { pageFAQs } from '$lib/data/pageFAQs';
	import { buildImageObject } from '$lib/utils/image-rights.js';
	import { getImageSeo } from '$lib/utils/image-seo.js';

	/** @type {{ data: { posts: any[]; latestEpisode: any; totalCount: number } }} */
	let { data } = $props();

	const posts = $derived(data.posts);
	const latestEpisode = $derived(data.latestEpisode);
	const totalCount = $derived(data.totalCount);

	const faqs = pageFAQs.home;
	const faqSchema = JSON.stringify({
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": faqs.map(faq => ({
			"@type": "Question",
			"name": faq.q,
			"acceptedAnswer": { "@type": "Answer", "text": faq.a }
		}))
	});

	let videoLoaded = $state(false);
	let videoPosterReady = $state(false);
	/** @type {HTMLButtonElement | null} */
	let videoPosterRef = $state(null);

	$effect(() => {
		if (!videoPosterRef || videoPosterReady) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries.some((entry) => entry.isIntersecting)) {
				videoPosterReady = true;
				observer.disconnect();
			}
		}, { rootMargin: '200px' });
		observer.observe(videoPosterRef);
		return () => observer.disconnect();
	});

	const pillars = [
		{
			title: 'KI & Tech',
			short: 'Tools · Tests · Trends',
			tag: 'ki-tools',
			image: '/images/homepage/topics/ki-tech.webp'
		},
		{
			title: 'Maker & DIY',
			short: 'Bauen · Drucken · Löten',
			tag: 'maker',
			image: '/images/homepage/topics/maker-diy.webp'
		},
		{
			title: 'Automatisierung',
			short: 'Workflows · Scripts · APIs',
			tag: 'automatisierung',
			image: '/images/homepage/topics/automatisierung.webp'
		},
		{
			title: 'Fotografie',
			short: 'Editing · Gear · Ideen',
			tag: 'fotografie',
			image: '/images/homepage/topics/fotografie.webp'
		},
		{
			title: 'Produktivität',
			short: 'Systeme · Fokus · Ordnung',
			tag: 'produktivitaet',
			image: '/images/homepage/topics/produktivitaet.webp'
		}
	].map((pillar) => ({
		...pillar,
		imageSeo: getImageSeo(
			pillar.image,
			'(max-width: 768px) 42vw, (max-width: 1024px) 30vw, 220px'
		)
	}));
</script>

<svelte:head>
	<title>TRMT — Tech, KI, Maker & Produktivität | Blog</title>
	<meta name="description" content="TRMT — Dein deutsches Tech-Magazin für KI-Tools, Maker-Projekte, Smart Home, Automatisierung und Produktivität. Reviews, Tutorials und News. Wöchentlich neu." />
	<meta name="keywords" content="Tech Blog deutsch, KI News, KI Tools, Maker Projekte, Smart Home, Produktivität, ChatGPT Tutorial, Arduino, 3D Druck, Fotografie, Automatisierung" />

	<!-- OpenGraph -->
	<meta property="og:title" content="The Random Maker Theory — Tech, KI, Maker & Produktivität" />
	<meta property="og:description" content="Dein deutsches Tech-Magazin: KI-Tools, Maker-Projekte, Smart Home und Produktivität. Reviews, Tutorials, News." />
	<meta property="og:image" content="https://therandommakertheory.com/images/og/default.webp" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://therandommakertheory.com" />
	<meta property="og:locale" content="de_DE" />
	<meta property="og:site_name" content="The Random Maker Theory" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="The Random Maker Theory" />
	<meta name="twitter:description" content="Dein deutsches Tech-Magazin: KI-Tools, Maker-Projekte, Smart Home und Produktivität. Reviews, Tutorials, News." />
	<meta name="twitter:image" content="https://therandommakertheory.com/images/og/default.webp" />

	<!-- Canonical + hreflang -->
	<link rel="canonical" href="https://therandommakertheory.com" />
	<link rel="alternate" hreflang="de" href="https://therandommakertheory.com" />
	<link rel="alternate" hreflang="x-default" href="https://therandommakertheory.com" />

	<!-- FAQPage Schema -->
	{@html `<script type="application/ld+json">${faqSchema}</script>`}

	<!-- JSON-LD Schema -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "The Random Maker Theory",
		"alternateName": "TRMT",
		"url": "https://therandommakertheory.com",
		"description": "Dein deutsches Tech-Magazin: KI-Tools, Maker-Projekte, Smart Home, Automatisierung und Produktivität.",
		"image": buildImageObject('/images/og/default.webp', 'The Random Maker Theory'),
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
	<p class="hero-promise">Entdecken. Verstehen. Und alles <em class="hero-accent">Frei Schnauze.</em></p>
	<div class="hero-intro">
		<p class="hero-intro-line">Tech, KI-Tools, Maker-Projekte, Automatisierung und Produktivität.</p>
		<p class="hero-intro-line">Aufbereitet und erklärt, so dass es hängen bleibt. Für alle Neugierigen, die mehr wissen wollen!</p>
	</div>
	<div class="hero-actions">
		<a href="#latest-posts" class="btn-metallic btn-honey"><span>Neue Beiträge</span></a>
		<a href="#topics" class="btn-metallic btn-teal"><span>Themen entdecken</span></a>
	</div>
	<div class="hero-counter">
		<span class="counter-number">{totalCount}</span>
		<span class="counter-sep">·</span>
		<span class="counter-label">Artikel & Episoden</span>
	</div>
</section>

<!-- ═══════ THEMEN ═══════ -->
<section class="section topics-section" id="topics" aria-labelledby="topics-title">
	<div class="section-header topics-header">
		<h2 class="section-title" id="topics-title">Womit willst du anfangen?</h2>
	</div>
	<div class="topics-grid">
		{#each pillars as pillar}
			<a href="/tags/{pillar.tag}" class="topic-card">
				<div class="topic-image">
					<img
						src={pillar.image}
						srcset={pillar.imageSeo.srcset}
						sizes={pillar.imageSeo.sizes}
						alt=""
						loading="lazy"
						decoding="async"
						width={pillar.imageSeo.width ?? 512}
						height={pillar.imageSeo.height ?? 512}
					/>
				</div>
				<div class="topic-copy">
					<h3>{pillar.title}</h3>
					<p>{pillar.short}</p>
				</div>
			</a>
		{/each}
	</div>
</section>

<!-- ═══════ HANDVERLESENE POSTS ═══════ -->
<section class="section posts-section" id="latest-posts" aria-labelledby="latest-posts-title">
	<div class="section-header">
		<h2 class="section-title" id="latest-posts-title">Neu & handverlesen</h2>
		<a href="/blog" class="section-link">Alle Beiträge ansehen →</a>
	</div>
	{#if posts[0]}
		<div class="editorial-posts">
			<HomepagePostCard post={posts[0]} featured />
			<div class="secondary-posts">
				{#each posts.slice(1) as post (post.slug)}
					<HomepagePostCard {post} />
				{/each}
			</div>
		</div>
	{/if}
</section>

<!-- ═══════ BOTTOM SECTIONS ═══════ -->
<div class="bottom-sections">
	<!-- Neuestes Video -->
	<section class="bottom-card video-card">
		<div class="bottom-card-header">
			<h2 class="bottom-card-title">Neuestes Video</h2>
			<a href="https://www.youtube.com/@therandommakertheory" target="_blank" rel="noopener" class="section-link">YouTube →</a>
		</div>
		<div class="video-embed">
			{#if videoLoaded}
				<iframe
					src="https://www.youtube-nocookie.com/embed/KWIH_InMQZ8?autoplay=1"
					title="Prompt Engineering: So holst du ALLES aus ChatGPT, Claude & Gemini | TRMT #002"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			{:else}
				<button
					type="button"
					class="video-facade"
					bind:this={videoPosterRef}
					aria-label="Video abspielen: Prompt Engineering: So holst du ALLES aus ChatGPT, Claude & Gemini"
					onmouseenter={() => (videoPosterReady = true)}
					onfocus={() => (videoPosterReady = true)}
					onclick={() => (videoLoaded = true)}
				>
					<div class="video-poster">
						{#if videoPosterReady}
							<img
								src="/images/video/prompt-engineering-trmt-002.webp"
								alt=""
								width="1280"
								height="720"
								decoding="async"
							/>
						{/if}
					</div>
					<span class="video-play" aria-hidden="true">▶</span>
				</button>
			{/if}
		</div>
		<p class="video-title">Prompt Engineering: So holst du ALLES aus ChatGPT, Claude & Gemini</p>
	</section>

	<!-- Podcast + Newsletter nebeneinander -->
	<div class="bottom-grid">
		{#if latestEpisode}
			<section class="bottom-card">
				<div class="bottom-card-header">
					<h2 class="bottom-card-title">Neu zum Anhören</h2>
					<a href="/podcast" class="section-link">Alle Folgen →</a>
				</div>
				<EpisodeCard episode={latestEpisode} />
			</section>
		{/if}

		<section class="bottom-card newsletter-card-wrap">
			<NewsletterSignup />
		</section>
	</div>

	<!-- FAQ -->
	<section class="bottom-card faq-card">
		<h2 class="bottom-card-title" style="margin-bottom: 24px;">Häufige Fragen</h2>
	<div class="faq-list">
		{#each faqs as faq, i}
			<details class="faq-item" class:faq-item-teal={i % 3 === 1}>
				<summary class="faq-question">
					<span class="faq-q-text">{faq.q}</span>
					<span class="faq-chevron">›</span>
				</summary>
				<div class="faq-answer">
					<p>{faq.a}</p>
				</div>
			</details>
		{/each}
	</div>
	</section>
</div>

<style>
	/* ── HERO ── */
	.hero {
		text-align: center;
		min-height: clamp(520px, 66svh, 680px);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		padding: 88px 0 48px;
		margin-top: -56px;
	}

	.hero-badge {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--color-accent-teal-foreground);
		letter-spacing: var(--letter-spacing-wider);
		text-transform: uppercase;
		margin-bottom: 18px;
		padding: 6px 16px;
		border: 1px solid var(--color-accent-teal-subtle);
		border-radius: var(--radius-full);
		background: var(--color-accent-teal-subtle);
	}

	.hero-title {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(44px, 7vw, 76px);
		line-height: 1.05;
		letter-spacing: -0.02em;
		color: var(--color-text);
		margin: 0 0 16px;
		opacity: 0.95;
	}

	.hero-accent {
		color: var(--color-accent-honey-foreground);
		font-style: italic;
		transition: all 0.4s ease;
	}

	.hero-title:hover .hero-accent {
		text-shadow:
			0 0 12px rgba(212, 137, 62, 0.6),
			0 0 30px rgba(212, 137, 62, 0.3),
			0 0 60px rgba(212, 137, 62, 0.12);
		color: hsl(38 85% 58%);
	}

	.hero-promise {
		font-family: var(--font-display);
		font-size: clamp(26px, 3.4vw, 38px);
		font-weight: 400;
		line-height: 1.15;
		letter-spacing: -0.01em;
		color: var(--color-text);
		margin: 0 0 12px;
	}

	.hero-intro {
		max-width: 720px;
		margin: 0 0 28px;
		font-size: var(--font-size-md);
		line-height: 1.65;
		color: var(--color-text-muted);
	}

	.hero-intro-line { margin: 0; }

	.hero-actions {
		display: flex;
		gap: 16px;
		justify-content: center;
		flex-wrap: wrap;
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

	/* ── HERO COUNTER (below buttons) ── */
	.hero-counter {
		display: inline-flex;
		align-items: baseline;
		gap: 8px;
		margin-top: 24px;
	}

	.counter-sep {
		color: var(--color-text-dim);
		font-size: 1rem;
	}

	/* ── COUNTER (inline in hero) ── */
	.counter-number {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: 1.125rem;
		color: var(--color-accent-honey-foreground);
		line-height: 1;
	}

	.counter-label {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 0.9375rem;
		color: var(--color-text-dim);
	}

	/* ── SECTIONS ── */
	.section { padding: 42px 0 50px; }

	.section-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 24px;
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
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		color: var(--color-accent-honey-foreground);
		text-decoration: none;
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-base);
		transition: all var(--transition-normal);
		padding: 6px 14px;
		border-radius: var(--radius-md);
	}
	.section-link:hover {
		color: var(--color-accent-honey-foreground);
		text-shadow: 0 0 12px rgba(212, 137, 62, 0.4);
		transform: translateX(2px);
	}

	/* ── TOPIC NAVIGATOR ── */
	.topics-section,
	.posts-section { scroll-margin-top: 76px; }

	.topics-section { padding-top: 22px; }
	.topics-header { margin-bottom: 20px; }

	.topics-grid {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 12px;
	}

	.topic-card {
		min-width: 0;
		overflow: hidden;
		background: var(--color-surface);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-xl);
		color: inherit;
		text-decoration: none;
		transition: border-color var(--transition-normal), transform var(--transition-normal);
		scroll-snap-align: start;
	}

	.topic-card:hover {
		border-color: rgba(58, 176, 162, 0.42);
		transform: translateY(-2px);
	}

	.topic-image {
		aspect-ratio: 1;
		overflow: hidden;
		background: var(--color-elevated);
	}

	.topic-image img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-normal);
	}

	.topic-card:hover img { transform: scale(1.025); }

	.topic-copy { padding: 14px 14px 16px; }

	.topic-copy h3 {
		margin: 0 0 5px;
		font-family: var(--font-display);
		font-size: clamp(19px, 2vw, 23px);
		font-weight: 400;
		line-height: 1.1;
		color: var(--color-text);
	}

	.topic-copy p {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		line-height: 1.45;
		color: var(--color-text-dim);
	}

	:global([data-theme='light']) .topic-card {
		background: var(--gradient-card-bg);
		border-color: transparent;
		box-shadow: var(--shadow-neo);
	}

	/* ── EDITORIAL POSTS ── */
	.editorial-posts {
		display: grid;
		grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr);
		gap: 18px;
	}

	.secondary-posts {
		display: grid;
		grid-template-rows: repeat(3, minmax(0, 1fr));
		gap: 12px;
	}

	/* ── BOTTOM SECTIONS ── */
	.bottom-sections {
		padding: 48px 0;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.bottom-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
		align-items: stretch;
	}

	.bottom-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-xl);
		padding: 32px;
		display: flex;
		flex-direction: column;
	}

	.bottom-card-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.bottom-card-title {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(22px, 3vw, 28px);
		color: var(--color-text);
		margin: 0;
		opacity: 0.95;
	}

	.newsletter-card-wrap {
		padding: 0;
		background: transparent;
		border: none;
		display: flex;
		flex-direction: column;
	}

	.newsletter-card-wrap :global(.newsletter-wrap) {
		margin-top: 0;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.newsletter-card-wrap :global(.newsletter-card) {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border-radius: var(--radius-xl);
	}

	/* Podcast card in bottom-grid: volle Hoehe */
	.bottom-grid .bottom-card :global(.card) {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.faq-card {
		max-width: 100%;
	}

	/* ── VIDEO EMBED ── */
	.video-card {
		overflow: hidden;
	}

	.video-embed {
		position: relative;
		width: 100%;
		padding-bottom: 56.25%; /* 16:9 */
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

	.video-facade {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 0;
		border: none;
		border-radius: var(--radius-lg);
		background: transparent;
		cursor: pointer;
	}

	.video-facade img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.video-poster {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at 50% 44%, rgba(58, 176, 162, 0.18), transparent 34%),
			radial-gradient(circle at 48% 56%, rgba(212, 137, 62, 0.18), transparent 45%),
			var(--color-elevated);
	}

	.video-play {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: grid;
		place-items: center;
		width: 64px;
		height: 64px;
		padding-left: 4px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.72);
		color: white;
		font-size: 1.5rem;
		transition: transform var(--transition-normal), background var(--transition-normal);
	}

	.video-facade:hover .video-play {
		transform: translate(-50%, -50%) scale(1.08);
		background: var(--color-accent-honey);
	}

	.video-facade:focus-visible {
		outline: 3px solid var(--color-focus);
		outline-offset: -3px;
	}

	.video-title {
		margin: 16px 0 0;
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(18px, 2.5vw, 22px);
		color: var(--color-accent-honey-foreground);
		line-height: 1.3;
		font-style: italic;
	}

	/* ── FAQ SECTION ── */

	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.faq-item {
		background: rgba(26, 26, 26, 0.6);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition: all 0.2s ease;
	}

	.faq-item:hover {
		border-color: rgba(212, 137, 62, 0.3);
	}

	.faq-item-teal:hover {
		border-color: rgba(58, 176, 162, 0.3);
	}

	.faq-item[open] {
		background: rgba(212, 137, 62, 0.03);
		border-color: rgba(212, 137, 62, 0.2);
	}

	.faq-item-teal[open] {
		background: rgba(58, 176, 162, 0.03);
		border-color: rgba(58, 176, 162, 0.2);
	}

	.faq-question {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 18px 24px;
		cursor: pointer;
		list-style: none;
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-base);
		color: var(--color-text);
		line-height: 1.5;
	}

	.faq-question::-webkit-details-marker { display: none; }
	.faq-question::marker { display: none; content: ''; }

	.faq-chevron {
		flex-shrink: 0;
		font-size: 1.25rem;
		color: var(--color-accent-honey-foreground);
		transition: transform 0.2s ease;
		font-weight: 700;
	}

	.faq-item[open] .faq-chevron {
		transform: rotate(90deg);
	}

	.faq-item-teal .faq-chevron {
		color: var(--color-accent-teal-foreground);
	}

	.faq-answer {
		padding: 0 24px 18px;
	}

	.faq-answer p {
		margin: 0;
		font-size: var(--font-size-base);
		color: var(--color-text-muted);
		line-height: 1.75;
	}

	:global([data-theme='light']) .faq-item {
		background: var(--gradient-card-bg);
		border: none;
		box-shadow: var(--shadow-neo);
	}

	:global([data-theme='light']) .faq-item[open] {
		background: rgba(212, 137, 62, 0.04);
	}

	:global([data-theme='light']) .faq-item-teal[open] {
		background: rgba(58, 176, 162, 0.04);
	}

	/* ── LIGHT MODE CLAYMORPHISM ── */
	:global([data-theme='light']) .bottom-card {
		background: var(--gradient-card-bg);
		border: none;
		box-shadow: var(--shadow-neo);
	}

	:global([data-theme='light']) .bottom-card:hover {
		box-shadow: 12px 12px 24px rgba(160, 145, 125, 0.45), -6px -6px 12px rgba(245, 238, 225, 0.6);
	}

	:global([data-theme='light']) .hero-counter {
		background: var(--gradient-card-bg);
		border: none;
		box-shadow: 6px 6px 14px rgba(160, 145, 125, 0.35), -4px -4px 10px rgba(245, 238, 225, 0.5);
	}

	:global([data-theme='light']) .hero-badge {
		background: var(--gradient-card-bg);
		border: none;
		box-shadow: 4px 4px 10px rgba(160, 145, 125, 0.3), -3px -3px 8px rgba(245, 238, 225, 0.45);
		color: var(--color-accent-teal-foreground);
	}

	:global([data-theme='light']) .newsletter-card-wrap :global(.newsletter-card) {
		box-shadow: var(--shadow-neo);
	}

	:global([data-theme='light']) .section-link {
		background: var(--gradient-card-bg);
		box-shadow: 4px 4px 8px rgba(160, 145, 125, 0.25), -2px -2px 6px rgba(245, 238, 225, 0.4);
		border-radius: var(--radius-lg);
	}

	:global([data-theme='light']) .section-link:hover {
		box-shadow: 6px 6px 14px rgba(160, 145, 125, 0.4), -4px -4px 10px rgba(245, 238, 225, 0.55);
	}

	:global([data-theme='light']) .btn-honey {
		box-shadow: 6px 6px 14px rgba(160, 145, 125, 0.4), -4px -4px 10px rgba(245, 238, 225, 0.5);
	}

	:global([data-theme='light']) .btn-teal {
		box-shadow: 6px 6px 14px rgba(160, 145, 125, 0.4), -4px -4px 10px rgba(245, 238, 225, 0.5);
	}

	:global([data-theme='light']) .btn-honey:hover,
	:global([data-theme='light']) .btn-teal:hover {
		box-shadow: 8px 8px 20px rgba(160, 145, 125, 0.5), -6px -6px 14px rgba(245, 238, 225, 0.6);
	}

	:global([data-theme='light']) .hero-title:hover .hero-accent {
		text-shadow:
			0 0 10px rgba(196, 133, 76, 0.4),
			0 0 25px rgba(196, 133, 76, 0.2);
		color: hsl(38 80% 48%);
	}

	/* ── RESPONSIVE ── */
	@media (max-width: 1024px) {
		.topics-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
		.editorial-posts { grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr); }
	}

	@media (max-width: 768px) {
		.hero { min-height: auto; padding: 94px 0 44px; margin-top: -56px; }
		.hero-intro { max-width: 600px; font-size: var(--font-size-base); }
		.bottom-grid { grid-template-columns: 1fr; }
		.bottom-card { padding: 24px; }
		.topics-grid {
			grid-template-columns: none;
			grid-auto-flow: column;
			grid-auto-columns: minmax(156px, 42vw);
			overflow-x: auto;
			overflow-y: hidden;
			scroll-snap-type: x mandatory;
			overscroll-behavior-inline: contain;
			scrollbar-width: thin;
			padding: 4px 2px 16px;
		}
		.editorial-posts {
			grid-template-columns: 1fr;
		}
		.secondary-posts { grid-template-rows: none; }
		.hero-counter { margin-top: 24px; }
	}

	@media (max-width: 480px) {
		.hero-badge { font-size: 0.68rem; }
		.hero-title { font-size: clamp(42px, 11vw, 50px); }
		.hero-promise { font-size: 25px; }
		.hero-actions { width: 100%; gap: 10px; }
		.hero-actions a { flex: 1 1 150px; justify-content: center; padding-inline: 16px; }
		.section-header { align-items: center; gap: 12px; }
		.section-link { font-size: var(--font-size-sm); text-align: right; }
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-accent,
		.btn-honey,
		.btn-teal,
		.section-link,
		.video-play,
		.faq-item,
		.faq-chevron {
			transition: none;
		}

		.topic-card {
			transition: none;
		}

		.topic-card img {
			transition: none;
		}
		.btn-honey:hover,
		.btn-teal:hover,
		.topic-card:hover,
		.topic-card:hover img,
		.section-link:hover,
		.video-facade:hover .video-play {
			transform: none;
		}
	}
</style>
