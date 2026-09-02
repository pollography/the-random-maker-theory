<script>
	import { siteConfig } from '$lib/config';
	import { CORE_TOPICS } from '$lib/data/core-topics.js';
	import { pageFAQs } from '$lib/data/pageFAQs';
	import BlogCard from './BlogCard.svelte';

	/** @type {{ posts: import('$lib/utils/posts').Post[], currentPage: number, totalPages: number, totalCount: number, showFaq: boolean }} */
	let { posts, currentPage, totalPages, totalCount, showFaq } = $props();

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

<section class="posts-section">
	{#if posts.length > 0}
		<div class="posts-grid">
			{#each posts as post (post.slug)}
				<BlogCard {post} />
			{/each}
		</div>
	{:else}
		<div class="empty-state">Keine Posts gefunden.</div>
	{/if}
</section>

<nav class="pagination" aria-label="Blogseiten">
	{#if currentPage > 1}<a href={pageHref(currentPage - 1)}>Zurück</a>{/if}
	{#each visiblePages as pageNumber}
		<a href={pageHref(pageNumber)} aria-current={pageNumber === currentPage ? 'page' : undefined}>{pageNumber}</a>
	{/each}
	{#if currentPage < totalPages}<a href={pageHref(currentPage + 1)}>Weiter</a>{/if}
</nav>

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
	.blog-title { margin: 0; color: var(--color-text); font-family: var(--font-display); font-size: clamp(2.5rem, 8vw, 3.5rem); font-weight: 400; line-height: var(--line-height-tight); }
	.blog-subtitle { margin: .5rem 0 0; color: var(--color-text-muted); font-family: var(--font-display); font-size: var(--font-size-lg); font-style: italic; line-height: var(--line-height-relaxed); }
	.blog-header-meta { display: flex; flex-direction: column; gap: 12px; padding-top: 8px; }
	.blog-intro { margin: 0; color: var(--color-text-muted); font-size: var(--font-size-base); line-height: 1.75; opacity: .8; }
	.blog-count { margin: 0; color: var(--color-text-dim); font-size: var(--font-size-sm); }
	.topic-nav, .pagination { display: flex; flex-wrap: wrap; gap: 8px; }
	.topic-nav { padding: 0 0 16px; }
	.topic-nav a, .pagination a { border: 1px solid var(--color-border-subtle); border-radius: var(--radius-full); color: var(--color-text-muted); padding: .5rem .875rem; text-decoration: none; }
	.topic-nav a:hover, .pagination a:hover, .pagination a[aria-current='page'] { border-color: var(--color-accent-honey); color: var(--color-accent-honey); }
	.posts-section { padding: 1.5rem 0; }
	.posts-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; }
	.empty-state { padding: 3rem; color: var(--color-text-muted); font-size: var(--font-size-lg); text-align: center; }
	.pagination { justify-content: center; padding: 1rem 0 2rem; }
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
</style>
