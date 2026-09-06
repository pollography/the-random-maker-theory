<script>
	import HomepagePostCard from '$lib/components/blog/HomepagePostCard.svelte';
	import LiteYouTubePlayer from '$lib/components/media/LiteYouTubePlayer.svelte';
	import SpotifyEpisodePlayer from '$lib/components/media/SpotifyEpisodePlayer.svelte';
	import NewsletterSignup from '$lib/components/NewsletterSignup.svelte';
	import { CORE_TOPICS } from '$lib/data/core-topics.js';
	import { pageFAQs } from '$lib/data/pageFAQs';
	import { buildImageObject } from '$lib/utils/image-rights.js';
	import { getImageSeo } from '$lib/utils/image-seo.js';

	/** @type {{ data: { posts: any[]; latestVideo: any; latestAudio: any; totalCount: number } }} */
	let { data } = $props();

	const posts = $derived(data.posts);
	const latestVideo = $derived(data.latestVideo);
	const latestAudio = $derived(data.latestAudio);
	const totalCount = $derived(data.totalCount);

	/** @param {string | undefined} url */
	function getYouTubeId(url) {
		return url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1] ?? '';
	}

	const videoPosters = {
		'l-PP-PrOdAs': '/images/video/ki-bildbearbeitung-trmt-003.webp',
		KWIH_InMQZ8: '/images/video/prompt-engineering-trmt-002.webp'
	};
	const videoId = $derived(getYouTubeId(latestVideo?.videoUrl));
	const videoPoster = $derived(videoPosters[videoId] ?? '/images/video/prompt-engineering-trmt-002.webp');

	const topics = CORE_TOPICS.map((topic) => ({
		...topic,
		imageSeo: getImageSeo(topic.image, '(max-width: 768px) 72vw, (max-width: 1024px) 28vw, 224px')
	}));

	const faqs = pageFAQs.home;
	const faqSchema = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.q,
			acceptedAnswer: { '@type': 'Answer', text: faq.a }
		}))
	});
</script>

<svelte:head>
	<title>TRMT — Tech, KI, Maker & Produktivität | Blog</title>
	<meta name="description" content="TRMT — Dein deutsches Tech-Magazin für KI-Tools, Maker-Projekte, Smart Home, Automatisierung und Produktivität. Reviews, Tutorials und News. Wöchentlich neu." />
	<meta name="keywords" content="Tech Blog deutsch, KI News, KI Tools, Maker Projekte, Smart Home, Produktivität, ChatGPT Tutorial, Arduino, 3D Druck, Fotografie, Automatisierung" />
	<meta property="og:title" content="The Random Maker Theory — Tech, KI, Maker & Produktivität" />
	<meta property="og:description" content="Dein deutsches Tech-Magazin: KI-Tools, Maker-Projekte, Smart Home und Produktivität. Reviews, Tutorials, News." />
	<meta property="og:image" content="https://therandommakertheory.com/images/og/default.webp" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://therandommakertheory.com" />
	<meta property="og:locale" content="de_DE" />
	<meta property="og:site_name" content="The Random Maker Theory" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="The Random Maker Theory" />
	<meta name="twitter:description" content="Dein deutsches Tech-Magazin: KI-Tools, Maker-Projekte, Smart Home und Produktivität. Reviews, Tutorials, News." />
	<meta name="twitter:image" content="https://therandommakertheory.com/images/og/default.webp" />
	<link rel="canonical" href="https://therandommakertheory.com" />
	<link rel="alternate" hreflang="de" href="https://therandommakertheory.com" />
	<link rel="alternate" hreflang="x-default" href="https://therandommakertheory.com" />
	{@html `<script type="application/ld+json">${faqSchema}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'The Random Maker Theory',
		alternateName: 'TRMT',
		url: 'https://therandommakertheory.com',
		description: 'Dein deutsches Tech-Magazin: KI-Tools, Maker-Projekte, Smart Home, Automatisierung und Produktivität.',
		image: buildImageObject('/images/og/default.webp', 'The Random Maker Theory'),
		inLanguage: 'de-DE',
		publisher: {
			'@type': 'Organization',
			name: 'The Random Maker Theory',
			url: 'https://therandommakertheory.com'
		}
	})}</script>`}
</svelte:head>

<section class="hero">
	<div class="hero-badge">News · Reviews · Tutorials · Projekte</div>
	<h1 class="hero-title">The <em class="hero-accent">Random</em> Maker Theory</h1>
	<p class="hero-promise">Entdecken. Verstehen. Und alles <em class="hero-accent">Frei Schnauze.</em></p>
	<div class="hero-intro">
		<p class="hero-intro-line">Tech, KI-Tools, Maker-Projekte, Automatisierung und Produktivität.</p>
		<p class="hero-intro-line">Aufbereitet und erklärt, so dass es hängen bleibt. Für alle Neugierigen, die mehr wissen wollen!</p>
	</div>
	<a href="/blog" class="btn-honey"><span>Zum Blog</span></a>
	<div class="hero-counter">
		<span class="counter-number">{totalCount}</span>
		<span class="counter-sep">·</span>
		<span class="counter-label">Artikel & Episoden</span>
	</div>
</section>

<section class="section topics-section" id="topics" aria-labelledby="topics-label">
	<h2 id="topics-label" class="sr-only">Themen</h2>
	<div class="topics-grid">
		{#each topics as topic}
			<a href="/tags/{topic.slug}" class="topic-card">
				<div class="topic-image">
					<img
						src={topic.image}
						srcset={topic.imageSeo.srcset}
						sizes={topic.imageSeo.sizes}
						alt=""
						loading="lazy"
						decoding="async"
						width={topic.imageSeo.width ?? 1200}
						height={topic.imageSeo.height ?? 675}
					/>
				</div>
				<div class="topic-copy">
					<h3>{topic.name}</h3>
					<p>{topic.short}</p>
				</div>
			</a>
		{/each}
	</div>
</section>

<section class="section posts-section" id="latest-posts" aria-labelledby="latest-posts-title">
	<div class="section-header">
		<h2 class="section-title" id="latest-posts-title">Das Neueste aus der Werkstatt</h2>
		<a href="/blog" class="section-link">Alle Beiträge →</a>
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
	<div class="homepage-context">
		<p>
			Bei TRMT findest du praktische Artikel, nachvollziehbare Anleitungen und persönliche Einordnungen rund um <a href="/tags/ki-tools"><strong>KI-Tools</strong></a>, Tech und digitale Workflows. In <a href="/tags/maker"><strong>Maker &amp; DIY</strong></a> geht es um ESP32, 3D-Druck und Smart Home; bei <a href="/tags/automatisierung"><strong>Automatisierung</strong></a> um n8n, Skripte und verbundene Tools. <a href="/tags/fotografie"><strong>Fotografie</strong></a> bündelt Bildbearbeitung, KI-Workflows und Technik aus der Praxis. Unter <a href="/tags/produktivitaet"><strong>Produktivität</strong></a> findest du Systeme für Wissen, Fokus und digitale Ordnung. Wähle ein Thema oder spring direkt ins vollständige Blogarchiv - alle Beiträge bleiben frei zugänglich und lassen sich ohne Anmeldung lesen.
		</p>
	</div>
</section>

<div class="bottom-sections">
	{#if latestVideo && videoId}
		<section class="bottom-card video-card">
			<div class="bottom-card-header">
				<div>
					<p class="media-eyebrow media-eyebrow--video">Neuestes Video</p>
					<h2 class="bottom-card-title">{latestVideo.title}</h2>
				</div>
			</div>
			<LiteYouTubePlayer
				{videoId}
				title={latestVideo.title}
				poster={videoPoster}
				youtubeUrl={latestVideo.videoUrl}
			/>
		</section>
	{/if}

	<div class="bottom-grid">
		{#if latestAudio}
			<section class="bottom-card podcast-card">
				<div class="bottom-card-header">
					<div>
						<p class="media-eyebrow">Podcast</p>
						<h2 class="bottom-card-title">Direkt anhören</h2>
					</div>
				</div>
				<SpotifyEpisodePlayer
					title={latestAudio.title}
					description={latestAudio.description}
					duration={latestAudio.duration}
					audioUrl={latestAudio.audioUrl}
					spotifyUrl={latestAudio.audioUrl}
				/>
			</section>
		{/if}

		<section class="bottom-card newsletter-card">
			<NewsletterSignup />
		</section>
	</div>

	<section class="bottom-card faq-card">
		<h2 class="bottom-card-title faq-title">Häufige Fragen</h2>
		<div class="faq-list">
			{#each faqs as faq, index}
				<details class="faq-item" class:faq-item-teal={index % 3 === 1}>
					<summary class="faq-question"><span>{faq.q}</span><span class="faq-chevron">›</span></summary>
					<div class="faq-answer"><p>{faq.a}</p></div>
				</details>
			{/each}
		</div>
	</section>
</div>

<style>
	.hero { display: flex; flex-direction: column; align-items: center; padding: 46px 0 24px; text-align: center; }
	.hero-badge { display: inline-block; margin-bottom: 14px; padding: 5px 16px; border: 1px solid var(--color-accent-teal-subtle); border-radius: var(--radius-full); background: var(--color-accent-teal-subtle); color: var(--color-accent-teal-foreground); font-family: var(--font-mono); font-size: var(--font-size-sm); letter-spacing: var(--letter-spacing-wider); text-transform: uppercase; }
	.hero-title { margin: 0 0 8px; color: var(--color-text); font-family: var(--font-display); font-size: clamp(44px, 6vw, 68px); font-weight: 400; letter-spacing: -.025em; line-height: 1.02; }
	.hero-accent { color: var(--color-accent-honey-foreground); font-style: italic; }
	.hero-promise { margin: 0 0 10px; color: var(--color-text); font-family: var(--font-display); font-size: clamp(26px, 3.2vw, 36px); line-height: 1.15; }
	.hero-intro { max-width: 730px; margin: 0 0 20px; color: var(--color-text-muted); font-size: var(--font-size-md); line-height: 1.5; }
	.hero-intro-line { margin: 0; }
	.btn-honey { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 12px 30px; border-radius: var(--radius-lg); background: var(--color-accent-honey); color: var(--color-on-accent); font-weight: var(--font-weight-semibold); text-decoration: none; transition: transform var(--transition-normal), box-shadow var(--transition-normal), background var(--transition-normal); }
	.btn-honey:hover { background: var(--color-accent-honey-hover); box-shadow: 0 10px 28px rgba(212, 137, 62, .22); transform: translateY(-2px); }
	.hero-counter { display: inline-flex; align-items: baseline; gap: 8px; margin-top: 13px; }
	.counter-number { color: var(--color-accent-honey-foreground); font-family: var(--font-display); font-size: 1.125rem; }
	.counter-sep, .counter-label { color: var(--color-text-dim); }
	.counter-label { font-family: var(--font-display); font-size: .9375rem; font-style: italic; }

	.section { padding: 28px 0 42px; }
	.topics-section,
	.posts-section { scroll-margin-top: 76px; }
	.topics-section { padding-top: 8px; }
	.section-header { display: flex; align-items: baseline; justify-content: space-between; gap: 24px; margin-bottom: 20px; }
	.section-title { margin: 0; color: var(--color-text); font-family: var(--font-display); font-size: clamp(28px, 4vw, 38px); font-weight: 400; line-height: 1.08; }
	.section-link { display: inline-flex; align-items: center; min-height: 44px; color: var(--color-accent-honey-foreground); font-size: var(--font-size-base); font-weight: var(--font-weight-semibold); text-decoration: none; white-space: nowrap; }
	.section-link:hover { color: var(--color-text); }
	.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }

	.topics-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: clamp(12px, 1.7vw, 22px); }
	.topic-card { min-width: 0; overflow: hidden; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-xl); background: var(--color-surface); color: inherit; text-decoration: none; transition: border-color var(--transition-normal), transform var(--transition-normal); }
	.topic-card:hover { border-color: rgba(58, 176, 162, .46); transform: translateY(-2px); }
	.topic-image { overflow: hidden; aspect-ratio: 16 / 9; background: var(--color-elevated); }
	.topic-image img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-normal); }
	.topic-card:hover img { transform: scale(1.025); }
	.topic-copy { padding: 13px 14px 15px; }
	.topic-copy h3 { margin: 0 0 6px; color: var(--color-text); font-family: var(--font-display); font-size: clamp(19px, 1.8vw, 24px); font-weight: 400; line-height: 1.1; }
	.topic-copy p { margin: 0; color: var(--color-text-dim); font-family: var(--font-mono); font-size: clamp(.62rem, .82vw, .72rem); line-height: 1.45; }

	.editorial-posts { display: grid; gap: 20px; }
	.secondary-posts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: stretch; gap: 18px; }
	.homepage-context { max-width: 920px; margin: 34px auto 0; color: var(--color-text-muted); font-size: var(--font-size-base); line-height: 1.75; }
	.homepage-context p { margin: 0; }
	.homepage-context a { color: var(--color-text); text-decoration-color: var(--color-accent-teal-foreground); text-underline-offset: 3px; }
	.homepage-context a:hover { color: var(--color-accent-teal-foreground); }

	.bottom-sections { display: flex; flex-direction: column; gap: 24px; padding: 30px 0 52px; }
	.bottom-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; align-items: stretch; }
	.bottom-card { min-width: 0; padding: clamp(22px, 3vw, 32px); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-xl); background: var(--color-surface); }
	.bottom-card-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
	.bottom-card-title { max-width: 920px; margin: 0; color: var(--color-text); font-family: var(--font-display); font-size: clamp(23px, 3vw, 32px); font-weight: 400; line-height: 1.15; }
	.media-eyebrow { margin: 0 0 7px; color: var(--color-accent-teal-foreground); font-family: var(--font-mono); font-size: .72rem; font-weight: var(--font-weight-semibold); letter-spacing: .13em; text-transform: uppercase; }
	.media-eyebrow--video { color: #f05a63; }
	.newsletter-card { display: flex; padding: 0; overflow: hidden; }
	.newsletter-card :global(.newsletter-wrap) { width: 100%; margin-top: 0; }
	.newsletter-card :global(.newsletter-card) { height: 100%; border: 0; border-radius: 0; box-shadow: none; }
	.faq-title { margin-bottom: 24px; }
	.faq-list { display: flex; flex-direction: column; gap: 8px; }
	.faq-item { overflow: hidden; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); background: rgba(26, 26, 26, .6); }
	.faq-question { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 24px; color: var(--color-text); cursor: pointer; font-weight: var(--font-weight-semibold); line-height: 1.5; list-style: none; }
	.faq-question::-webkit-details-marker { display: none; }
	.faq-chevron { flex-shrink: 0; color: var(--color-accent-honey-foreground); font-size: 1.25rem; font-weight: 700; transition: transform var(--transition-normal); }
	.faq-item-teal .faq-chevron { color: var(--color-accent-teal-foreground); }
	.faq-item[open] .faq-chevron { transform: rotate(90deg); }
	.faq-answer { padding: 0 24px 18px; }
	.faq-answer p { margin: 0; color: var(--color-text-muted); line-height: 1.75; }

	:global([data-theme='light']) .topic-card,
	:global([data-theme='light']) .bottom-card { border-color: transparent; background: var(--gradient-card-bg); box-shadow: var(--shadow-neo); }
	:global([data-theme='light']) .faq-item { border: 0; background: var(--gradient-card-bg); box-shadow: var(--shadow-neo); }

	@media (max-width: 900px) {
		.topics-grid { grid-auto-flow: column; grid-auto-columns: minmax(200px, 38vw); grid-template-columns: none; overflow-x: auto; overflow-y: hidden; padding: 3px 3px 10px; scroll-snap-type: x mandatory; overscroll-behavior-inline: contain; }
		.topic-card { scroll-snap-align: start; }
		.secondary-posts { grid-template-columns: 1fr 1fr; }
		.secondary-posts :global(.post-card:last-child) { grid-column: 1 / -1; }
	}

	@media (max-width: 768px) {
		.hero { padding-top: 54px; }
		.hero-badge { display: none; }
		.hero-intro { font-size: .92rem; }
		.bottom-grid, .secondary-posts { grid-template-columns: 1fr; }
		.secondary-posts :global(.post-card:last-child) { grid-column: auto; }
	}

	@media (max-width: 480px) {
		.hero-title { font-size: clamp(37px, 10.5vw, 44px); }
		.hero-promise { font-size: 21px; }
		.topics-grid { grid-auto-columns: minmax(218px, 76vw); }
		.section-header { align-items: flex-end; gap: 12px; }
		.section-link { font-size: var(--font-size-sm); }
		.bottom-card { padding: 20px; }
		.newsletter-card { padding: 0; }
	}

	@media (prefers-reduced-motion: reduce) {
		.btn-honey, .faq-chevron { transition: none; }
		.topic-card { transition: none; }
		.topic-image img { transition: none; }
		.btn-honey:hover, .topic-card:hover, .topic-card:hover img { transform: none; }
	}
</style>
