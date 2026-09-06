<script>
	import { onMount, tick, untrack } from 'svelte';
	import { siteConfig } from '$lib/config';
	import { CORE_TOPICS } from '$lib/data/core-topics.js';
	import { pageFAQs } from '$lib/data/pageFAQs';
	import { createBlogFeedLoader } from '$lib/utils/blog-feed.js';
	import BlogCard from './BlogCard.svelte';

	/** @type {{ posts: import('$lib/utils/posts').Post[], currentPage: number, totalPages: number, totalCount: number, showFaq: boolean }} */
	let { posts, currentPage, totalPages, totalCount, showFaq } = $props();
	let visiblePosts = $state(untrack(() => [...posts]));
	let nextPage = $state(untrack(() => (currentPage === 1 && totalPages > 1 ? 2 : null)));
	let isLoading = $state(false);
	let loadFailed = $state(false);
	let liveMessage = $state('');
	let sentinel = $state();
	const renderedPosts = $derived(currentPage === 1 ? visiblePosts : posts);
	const visibleCount = $derived(renderedPosts.length);

	const faqs = pageFAQs.blog;
	const pagePath = $derived(currentPage === 1 ? '/blog' : `/blog/seite/${currentPage}`);
	const canonicalUrl = $derived(`${siteConfig.url}${pagePath}`);
	const pageTitle = $derived(
		currentPage === 1
			? 'Blog — Tech, KI, Maker & Produktivität | TRMT'
			: `Blog – Seite ${currentPage} | TRMT`
	);
	const pageDescription = $derived(
		currentPage === 1
			? 'Alle Blog-Posts: KI-Tool-Reviews, Maker-Projekte, Smart Home Tutorials, Automatisierung und Produktivitäts-Hacks. Wöchentlich neue Artikel.'
			: `TRMT Blog, Seite ${currentPage}: Artikel zu KI, Tech, Maker-Projekten und Produktivität.`
	);
	const visiblePages = $derived(Array.from({ length: totalPages }, (_, index) => index + 1));
	/** @param {number} pageNumber */
	const pageHref = (pageNumber) => (pageNumber === 1 ? '/blog' : `/blog/seite/${pageNumber}`);
	const feedState = {
		get visiblePosts() { return visiblePosts; },
		set visiblePosts(value) { visiblePosts = value; },
		get nextPage() { return nextPage; },
		set nextPage(value) { nextPage = value; },
		get isLoading() { return isLoading; },
		set isLoading(value) { isLoading = value; },
		get loadFailed() { return loadFailed; },
		set loadFailed(value) { loadFailed = value; },
		get liveMessage() { return liveMessage; },
		set liveMessage(value) { liveMessage = value; }
	};
	const loadFeedPage = createBlogFeedLoader(feedState, (pageNumber) =>
		fetch(`/api/blog/seite/${pageNumber}`)
	);

	async function loadNextPage() {
		await loadFeedPage();
		await tick();

		if (
			!loadFailed &&
			nextPage !== null &&
			sentinel &&
			sentinel.getBoundingClientRect().top <= window.innerHeight + 800
		) {
			void loadNextPage();
		}
	}

	function retryFeed() {
		void loadNextPage();
	}

	onMount(() => {
		if (currentPage !== 1 || nextPage === null || typeof IntersectionObserver === 'undefined') {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting) && !loadFailed) {
					void loadNextPage();
				}
			},
			{ rootMargin: '800px 0px' }
		);

		if (sentinel) observer.observe(sentinel);
		return () => observer.disconnect();
	});
	const faqSchema = $derived(JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.q,
			acceptedAnswer: { '@type': 'Answer', text: faq.a }
		}))
	}));
	const collectionPageSchema = $derived(JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: pageTitle,
		url: canonicalUrl,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: posts.map((post, index) => ({
				'@type': 'ListItem',
				position: (currentPage - 1) * 12 + index + 1,
				url: `${siteConfig.url}/blog/${post.slug}`,
				name: post.title
			}))
		}
	}));
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={`${siteConfig.url}/images/og/default.webp`} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={`${siteConfig.url}/images/og/default.webp`} />
	<link rel="canonical" href={canonicalUrl} />
	<link rel="alternate" hreflang="de" href={canonicalUrl} />
	<link rel="alternate" hreflang="x-default" href={canonicalUrl} />
	{@html `<script type="application/ld+json">${collectionPageSchema}</script>`}
	{#if showFaq}
		{@html `<script type="application/ld+json">${faqSchema}</script>`}
	{/if}
</svelte:head>

<section class="blog-header">
	<div class="blog-header-copy">
		<h1 class="blog-title">{currentPage === 1 ? 'Blog' : `Blog – Seite ${currentPage}`}</h1>
		<p class="blog-subtitle">Tech, KI, Maker-Projekte & Produktivität — neu jede Woche.</p>
	</div>
	<div class="blog-header-meta">
		<p class="blog-intro">
			Ehrliche Reviews, Praxis-Tutorials und Maker-Projekte zum Nachbauen. Keine gesponserten Bestenlisten, keine aufgeblähten Listicles. Wenn was gut ist, sag ich das. Wenn was kacke ist, auch.
		</p>
		<p class="blog-count">{totalCount} Artikel online</p>
	</div>
</section>

<nav class="topic-nav" aria-label="Blogthemen">
	{#each CORE_TOPICS as topic}
		<a href={`/tags/${topic.slug}`}>{topic.name}</a>
	{/each}
</nav>

<section class="posts-section" aria-busy={isLoading}>
	{#if renderedPosts.length > 0}
		<div class="posts-grid">
			{#each renderedPosts as post (post.slug)}
				<BlogCard {post} />
			{/each}
		</div>
	{:else}
		<div class="empty-state">Keine Posts gefunden.</div>
	{/if}
</section>

{#if currentPage === 1}
	<div class="feed-status">
		<div class="feed-sentinel" bind:this={sentinel} aria-hidden="true"></div>
		{#if isLoading}
			<p class="feed-message"><span class="feed-spinner" aria-hidden="true"></span>Weitere Artikel kommen …</p>
		{:else if loadFailed}
			<p class="feed-message">Das Nachladen hat gerade nicht geklappt.</p>
			<button class="retry-button" type="button" onclick={retryFeed}>Erneut versuchen</button>
		{:else if nextPage === null}
			<p class="feed-complete">Alle Artikel geladen · {visibleCount} insgesamt</p>
		{/if}
		<p class="sr-only" aria-live="polite">{liveMessage}</p>
	</div>
	{#if totalPages > 1}
		<noscript><a class="no-script-next" href={pageHref(2)}>Weitere Artikel auf Seite 2</a></noscript>
	{/if}
{/if}

{#if currentPage > 1}
	<nav class="pagination" aria-label="Blogseiten">
		{#if currentPage > 1}<a href={pageHref(currentPage - 1)}>Zurück</a>{/if}
		{#each visiblePages as pageNumber}
			<a href={pageHref(pageNumber)} aria-current={pageNumber === currentPage ? 'page' : undefined}>{pageNumber}</a>
		{/each}
		{#if currentPage < totalPages}<a href={pageHref(currentPage + 1)}>Weiter</a>{/if}
	</nav>
{/if}

{#if showFaq}
	<section class="faq-section">
		<h2 class="faq-heading">Häufige Fragen zum TRMT Blog</h2>
		<div class="faq-list">
			{#each faqs as faq, index}
				<details class="faq-item" class:faq-item-teal={index % 3 === 1}>
					<summary class="faq-question"><span>{faq.q}</span><span class="faq-chevron">›</span></summary>
					<div class="faq-answer"><p>{faq.a}</p></div>
				</details>
			{/each}
		</div>
	</section>
{/if}

<style>
	.blog-header { display: grid; grid-template-columns: minmax(0, 1fr) minmax(280px, 360px); align-items: start; gap: 24px; padding: 36px 0 16px; }
	.blog-title { margin: 0; color: var(--color-text); font-family: var(--font-display); font-size: clamp(2.5rem, 6vw, 3.5rem); font-weight: 400; line-height: var(--line-height-tight); }
	.blog-subtitle { margin: .5rem 0 0; color: var(--color-text-muted); font-family: var(--font-display); font-size: var(--font-size-lg); font-style: italic; line-height: var(--line-height-relaxed); }
	.blog-header-meta { display: flex; flex-direction: column; gap: 12px; padding-top: 8px; }
	.blog-intro { margin: 0; color: var(--color-text-muted); font-size: var(--font-size-base); line-height: 1.75; opacity: .8; }
	.blog-count { margin: 0; color: var(--color-text-dim); font-size: var(--font-size-sm); }
	.topic-nav, .pagination { display: flex; flex-wrap: wrap; gap: 8px; }
	.topic-nav { padding: 0 0 16px; }
	.topic-nav a, .pagination a { align-items: center; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-full); color: var(--color-text-muted); display: inline-flex; min-height: 44px; padding: .375rem .875rem; text-decoration: none; }
	.topic-nav a:hover, .pagination a:hover, .pagination a[aria-current='page'] { border-color: var(--color-accent-honey); color: var(--color-accent-honey); }
	.posts-section { padding: 1.5rem 0; }
	.posts-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; }
	.empty-state { padding: 3rem; color: var(--color-text-muted); font-size: var(--font-size-lg); text-align: center; }
	.pagination { justify-content: center; padding: 1rem 0 2rem; }
	.feed-status { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 12px; min-height: 82px; padding: 18px 0 28px; text-align: center; }
	.feed-sentinel { width: 100%; height: 1px; }
	.feed-message, .feed-complete { margin: 0; color: var(--color-text-dim); font-size: var(--font-size-sm); }
	.feed-spinner { display: inline-block; width: 10px; height: 10px; margin-right: 8px; border: 2px solid var(--color-border-subtle); border-top-color: var(--color-accent-honey); border-radius: 50%; animation: feed-spin .7s linear infinite; }
	.retry-button, .no-script-next { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: .5rem 1rem; border: 1px solid var(--color-accent-honey); border-radius: var(--radius-full); background: transparent; color: var(--color-accent-honey); cursor: pointer; font: inherit; font-weight: var(--font-weight-semibold); text-decoration: none; }
	.retry-button:hover, .retry-button:focus-visible, .no-script-next:hover, .no-script-next:focus-visible { background: var(--color-accent-honey); color: var(--color-on-accent); }
	.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
	@keyframes feed-spin { to { transform: rotate(360deg); } }
	.faq-section { max-width: 800px; padding: 48px 0 24px; }
	.faq-heading { margin: 0 0 24px; color: var(--color-text); font-family: var(--font-display); font-size: clamp(24px, 4vw, 32px); font-weight: 400; }
	.faq-list { display: flex; flex-direction: column; gap: 8px; }
	.faq-item { overflow: hidden; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); background: var(--color-surface); }
	.faq-question { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 24px; color: var(--color-text); cursor: pointer; font-weight: var(--font-weight-semibold); list-style: none; }
	.faq-question::-webkit-details-marker { display: none; }
	.faq-chevron { color: var(--color-accent-honey); font-size: 1.25rem; font-weight: 700; }
	.faq-item-teal .faq-chevron { color: var(--color-accent-teal); }
	.faq-answer { padding: 0 24px 18px; }
	.faq-answer p { margin: 0; color: var(--color-text-muted); line-height: 1.75; }
	@media (max-width: 1024px) { .posts-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
	@media (max-width: 768px) { .blog-header { display: flex; flex-direction: column; gap: 16px; padding-top: 32px; } .posts-grid { grid-template-columns: 1fr; } .faq-question { padding: 16px 20px; } .faq-answer { padding: 0 20px 16px; } }
	@media (prefers-reduced-motion: reduce) { .feed-spinner { animation: none; } }
</style>
