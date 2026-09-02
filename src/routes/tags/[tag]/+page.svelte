<script>
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import { siteConfig } from '$lib/config';
	import { CORE_TOPICS } from '$lib/data/core-topics';
	import { getTagDescription } from '$lib/data/tagDescriptions';
	import { tagFAQs } from '$lib/data/tagFAQs';

	let { data } = $props();
	const tagFAQsBySlug = /** @type {Record<string, { q: string; a: string }[]>} */ (tagFAQs);
	let isCoreTopic = $derived(data.isCoreTopic);
	let tagInfo = $derived(getTagDescription(data.tag));
	let topicName = $derived(data.topic?.name ?? tagInfo.title);
	let faqs = $derived(isCoreTopic ? tagFAQsBySlug[data.tag] || [] : []);
	let canonicalUrl = $derived(`${siteConfig.url}/tags/${data.tag}`);
	let pageTitle = $derived(isCoreTopic
		? `${topicName}: Artikel, Guides und Projekte | TRMT`
		: `${tagInfo.title} — Artikel & Guides | TRMT`);
	let pageDescription = $derived(isCoreTopic
		? `${topicName} bei TRMT: ${tagInfo.metaDesc}`
		: tagInfo.metaDesc);
	let visiblePosts = $derived(isCoreTopic ? [...data.starterPosts, ...data.remainingPosts] : data.posts);
	let relatedTopics = $derived(isCoreTopic ? CORE_TOPICS.filter((topic) => topic.slug !== data.tag) : []);

	let breadcrumbSchema = $derived(isCoreTopic ? JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		'@id': `${canonicalUrl}#breadcrumb`,
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Startseite', item: siteConfig.url },
			{ '@type': 'ListItem', position: 2, name: topicName, item: canonicalUrl }
		]
	}) : null);
	let collectionPageSchema = $derived(isCoreTopic ? JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		'@id': `${canonicalUrl}#collection`,
		url: canonicalUrl,
		name: pageTitle,
		mainEntity: {
			'@type': 'ItemList',
			'@id': `${canonicalUrl}#items`,
			numberOfItems: visiblePosts.length,
			itemListElement: visiblePosts.map((post, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				item: { '@id': `${siteConfig.url}/blog/${post.slug}` }
			}))
		}
	}) : null);
	let faqSchema = $derived(isCoreTopic && faqs.length > 0 ? JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		'@id': `${canonicalUrl}#faq`,
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.q,
			acceptedAnswer: { '@type': 'Answer', text: faq.a }
		}))
	}) : null);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta name="keywords" content={`${data.tag}, ${tagInfo.title}, TRMT, Tech Blog`} />
	<meta name="robots" content={isCoreTopic ? 'index,follow' : 'noindex,follow'} />
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

	{#if isCoreTopic}
		{@html `<script type="application/ld+json">${breadcrumbSchema}</script>`}
		{@html `<script type="application/ld+json">${collectionPageSchema}</script>`}
		{#if faqSchema}
			{@html `<script type="application/ld+json">${faqSchema}</script>`}
		{/if}
	{/if}
</svelte:head>

{#if isCoreTopic}
	<nav class="breadcrumb" aria-label="Breadcrumb">
		<a href="/">Startseite</a>
		<span aria-hidden="true">/</span>
		<span aria-current="page">{topicName}</span>
	</nav>
{/if}

<section class="tag-header" class:core-hub={isCoreTopic}>
	{#if isCoreTopic}
		<div class="tag-header-copy">
			<p class="eyebrow">Thema</p>
			<h1 class="tag-title">{topicName}</h1>
			<p class="tag-intro">{tagInfo.intro}</p>
		</div>
		<div class="tag-header-meta">
			<span class="tag-count">{data.posts.length} {data.posts.length === 1 ? 'Artikel' : 'Artikel'}</span>
			<a href="/blog" class="tag-back">Alle Beiträge</a>
		</div>
	{:else}
		<div class="tag-icon" aria-hidden="true">{tagInfo.icon}</div>
		<div>
			<h1 class="tag-title">{tagInfo.title}</h1>
			<p class="tag-intro">{tagInfo.intro}</p>
			<div class="tag-header-meta">
				<span class="tag-count">{data.posts.length} {data.posts.length === 1 ? 'Artikel' : 'Artikel'}</span>
				<a href="/blog" class="tag-back">Alle Beiträge</a>
			</div>
		</div>
	{/if}
</section>

{#if isCoreTopic}
	<section class="tag-posts starter-posts" aria-labelledby="starter-heading">
		<div class="section-heading">
			<h2 id="starter-heading">Hier anfangen</h2>
			<p>Drei redaktionell ausgewählte Einstiege in dieses Thema.</p>
		</div>
		<div class="tag-grid">
			{#each data.starterPosts as post (post.slug)}
				<BlogCard {post} />
			{/each}
		</div>
	</section>

	{#if data.remainingPosts.length > 0}
		<section class="tag-posts" aria-labelledby="all-posts-heading">
			<div class="section-heading"><h2 id="all-posts-heading">Alle Artikel</h2></div>
			<div class="tag-grid">
				{#each data.remainingPosts as post (post.slug)}
					<BlogCard {post} />
				{/each}
			</div>
		</section>
	{/if}

	<section class="related-topics" aria-labelledby="related-topics-heading">
		<h2 id="related-topics-heading">Weitere Themen</h2>
		<nav aria-label="Weitere Kernthemen" class="related-topic-links">
			{#each relatedTopics as topic (topic.slug)}
				<a href={`/tags/${topic.slug}`}>{topic.name}</a>
			{/each}
		</nav>
	</section>
{:else}
	<section class="tag-posts">
		<div class="tag-grid">
			{#each data.posts as post (post.slug)}
				<BlogCard {post} />
			{/each}
		</div>
	</section>
{/if}

{#if isCoreTopic && faqs.length > 0}
	<section class="faq-section" aria-labelledby="faq-heading">
		<h2 id="faq-heading" class="faq-heading">Häufige Fragen zu {topicName}</h2>
		<div class="faq-list">
			{#each faqs as faq, index}
				<details class="faq-item" class:faq-item-teal={index % 3 === 1}>
					<summary class="faq-question"><span>{faq.q}</span><span class="faq-chevron" aria-hidden="true">›</span></summary>
					<div class="faq-answer"><p>{faq.a}</p></div>
				</details>
			{/each}
		</div>
	</section>
{/if}

<style>
	.breadcrumb { align-items: center; display: flex; gap: 8px; padding-top: 16px; color: var(--color-text-muted); font-size: var(--font-size-sm); }
	.breadcrumb a, .tag-back, .related-topic-links a { align-items: center; color: var(--color-accent-honey); display: inline-flex; font-weight: var(--font-weight-semibold); min-height: 44px; text-decoration: none; }
	.breadcrumb a:hover, .tag-back:hover, .related-topic-links a:hover { color: var(--color-accent-honey-hover); }
	.tag-header { display: flex; gap: 20px; max-width: 760px; padding: 40px 0 24px; }
	.tag-header.core-hub { display: grid; grid-template-columns: minmax(0, 1fr) minmax(180px, 240px); align-items: end; gap: 32px; max-width: none; padding-top: 24px; }
	.tag-header-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 16px; }
	.core-hub .tag-header-meta { align-content: end; flex-direction: column; align-items: flex-start; padding-bottom: 4px; }
	.eyebrow { color: var(--color-accent-teal); font-family: var(--font-mono); font-size: var(--font-size-sm); letter-spacing: .08em; margin: 0 0 12px; text-transform: uppercase; }
	.tag-icon { font-size: 2.25rem; line-height: 1; padding-top: 8px; }
	.tag-title { color: var(--color-text); font-family: var(--font-display); font-size: clamp(2.5rem, 6vw, 3.5rem); font-weight: 400; line-height: 1.1; margin: 0 0 16px; }
	.tag-intro { color: var(--color-text-muted); font-size: var(--font-size-md); line-height: 1.75; margin: 0 0 20px; max-width: 760px; }
	.tag-count { background: var(--color-accent-teal-subtle); border-radius: var(--radius-full); color: var(--color-accent-teal); font-family: var(--font-mono); font-size: var(--font-size-sm); padding: 4px 12px; white-space: nowrap; }
	.tag-posts { padding: 32px 0 16px; }
	.starter-posts { border-top: 1px solid var(--color-border); }
	.section-heading { align-items: baseline; display: flex; flex-wrap: wrap; gap: 12px 20px; margin-bottom: 20px; }
	.section-heading h2, .related-topics h2 { color: var(--color-text); font-family: var(--font-display); font-size: clamp(1.6rem, 3vw, 2.25rem); font-weight: 400; margin: 0; }
	.section-heading p { color: var(--color-text-muted); margin: 0; }
	.tag-grid { display: grid; gap: 24px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
	.related-topics { border-top: 1px solid var(--color-border); padding: 40px 0; }
	.related-topic-links { display: flex; flex-wrap: wrap; gap: 10px 20px; margin-top: 18px; }
	.related-topic-links a { border-bottom: 1px solid transparent; min-height: 44px; padding: 10px 0; }
	.related-topic-links a:hover { border-color: currentColor; }
	.faq-section { max-width: 800px; padding: 32px 0 64px; }
	.faq-heading { border-top: 1px solid var(--color-border); color: var(--color-accent-honey); font-family: var(--font-display); font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 400; margin: 0 0 24px; padding-top: 32px; }
	.faq-list { display: flex; flex-direction: column; gap: 10px; }
	.faq-item { background: var(--color-surface); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); overflow: hidden; }
	.faq-question { align-items: center; cursor: pointer; display: flex; font-weight: var(--font-weight-semibold); gap: 16px; justify-content: space-between; list-style: none; padding: 18px 24px; }
	.faq-question::-webkit-details-marker { display: none; }
	.faq-chevron { color: var(--color-accent-honey); font-size: 1.25rem; font-weight: 700; }
	.faq-item-teal .faq-chevron { color: var(--color-accent-teal); }
	.faq-answer { color: var(--color-text-muted); line-height: 1.75; padding: 0 24px 18px; }
	.faq-answer p { margin: 0; }
	@media (max-width: 1024px) { .tag-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
	@media (max-width: 768px) {
		.tag-header.core-hub { grid-template-columns: 1fr; gap: 16px; }
		.core-hub .tag-header-meta { align-items: flex-start; flex-direction: row; }
		.tag-grid { grid-template-columns: 1fr; }
		.tag-header { padding-top: 32px; }
		.faq-question { padding: 16px 20px; }
		.faq-answer { padding: 0 20px 16px; }
	}
</style>
