<script>
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import { siteConfig } from '$lib/config';
	import { getTagDescription } from '$lib/data/tagDescriptions';
	import { tagFAQs } from '$lib/data/tagFAQs';

	let { data } = $props();
	let tagInfo = $derived(getTagDescription(data.tag));
	let faqs = $derived(tagFAQs[data.tag] || []);

	// FAQPage Schema.org JSON-LD
	let faqSchema = $derived(faqs.length > 0 ? JSON.stringify({
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": faqs.map(faq => ({
			"@type": "Question",
			"name": faq.q,
			"acceptedAnswer": {
				"@type": "Answer",
				"text": faq.a
			}
		}))
	}) : null);
</script>

<svelte:head>
	<title>{tagInfo.title} — Artikel & Guides | TRMT</title>
	<meta name="description" content={tagInfo.metaDesc} />
	<meta property="og:title" content="{tagInfo.title} | TRMT" />
	<meta property="og:description" content={tagInfo.metaDesc} />
	<meta property="og:url" content="https://therandommakertheory.com/tags/{data.tag}" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://therandommakertheory.com/images/og/default.webp" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{tagInfo.title} | TRMT" />
	<meta name="twitter:description" content={tagInfo.metaDesc} />
	<link rel="canonical" href="https://therandommakertheory.com/tags/{data.tag}" />

	<!-- FAQPage Schema.org für Featured Snippets -->
	{#if faqSchema}
		{@html `<script type="application/ld+json">${faqSchema}</script>`}
	{/if}
</svelte:head>

<!-- Tag Header mit SEO-Content -->
<section class="tag-header">
	<div class="tag-icon">{tagInfo.icon}</div>
	<h1 class="tag-title">
		{tagInfo.title}
	</h1>
	<p class="tag-intro">
		{tagInfo.intro}
	</p>
	<div class="tag-meta">
		<span class="tag-count">{data.posts.length} {data.posts.length === 1 ? 'Artikel' : 'Artikel'}</span>
		<a href="/blog" class="tag-back">← Alle Themen</a>
	</div>
</section>

<!-- Posts Grid -->
<section class="tag-posts">
	<div class="tag-grid">
		{#each data.posts as post (post.slug)}
			<BlogCard {post} />
		{/each}
	</div>

	{#if data.posts.length === 0}
		<div class="tag-empty">
			<p>Noch keine Artikel mit diesem Tag. Kommt bald!</p>
			<a href="/blog" class="tag-empty-link">
				← Zurück zum Blog
			</a>
		</div>
	{/if}
</section>

<!-- FAQ-Sektion für SEO -->
{#if faqs.length > 0}
	<section class="faq-section">
		<h2 class="faq-heading">Häufige Fragen zu {tagInfo.title}</h2>
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
{/if}

<style>
	.tag-header {
		padding: 48px 0 32px;
		max-width: 720px;
	}

	.tag-icon {
		font-size: 3rem;
		margin-bottom: 16px;
	}

	.tag-title {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(32px, 6vw, 48px);
		color: var(--color-text);
		margin: 0 0 20px;
		line-height: 1.1;
		opacity: 0.95;
	}

	.tag-intro {
		font-size: var(--font-size-md);
		color: var(--color-text-muted);
		line-height: 1.75;
		margin: 0 0 24px;
	}

	.tag-meta {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.tag-count {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--color-accent-teal);
		background: var(--color-accent-teal-subtle);
		padding: 4px 12px;
		border-radius: var(--radius-full);
	}

	.tag-back {
		font-size: var(--font-size-sm);
		color: var(--color-accent-honey);
		text-decoration: none;
		font-weight: var(--font-weight-semibold);
		transition: all var(--transition-normal);
	}

	.tag-back:hover {
		color: var(--color-accent-honey-hover);
		text-shadow: 0 0 12px rgba(212, 137, 62, 0.4);
	}

	.tag-posts {
		padding: 32px 0 48px;
	}

	.tag-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}

	.tag-empty {
		text-align: center;
		padding: 48px;
	}

	.tag-empty p {
		color: var(--color-text-muted);
		font-size: var(--font-size-lg);
		margin: 0 0 16px;
	}

	.tag-empty-link {
		color: var(--color-accent-honey);
		text-decoration: none;
		font-weight: var(--font-weight-semibold);
		transition: color var(--transition-normal);
	}

	.tag-empty-link:hover {
		color: var(--color-accent-honey-hover);
	}

	/* FAQ Section */
	.faq-section {
		padding: 48px 0 64px;
		max-width: 800px;
	}

	.faq-heading {
		font-family: var(--font-display);
		font-weight: 400;
		font-style: italic;
		font-size: clamp(24px, 4vw, 32px);
		color: var(--color-accent-honey);
		margin: 0 0 32px;
		padding-top: 40px;
		border-top: 1px solid var(--color-border);
	}

	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.faq-item {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(212, 137, 62, 0.1);
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition: border-color var(--transition-normal), background var(--transition-normal);
	}

	.faq-item:hover {
		border-color: rgba(212, 137, 62, 0.25);
		background: rgba(255, 255, 255, 0.03);
	}

	.faq-item-teal {
		border-color: rgba(58, 176, 162, 0.1);
	}

	.faq-item-teal:hover {
		border-color: rgba(58, 176, 162, 0.25);
	}

	.faq-item[open] {
		border-color: rgba(212, 137, 62, 0.2);
		background: rgba(212, 137, 62, 0.03);
	}

	.faq-item-teal[open] {
		border-color: rgba(58, 176, 162, 0.2);
		background: rgba(58, 176, 162, 0.03);
	}

	.faq-question {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 20px 24px;
		cursor: pointer;
		list-style: none;
		user-select: none;
	}

	.faq-question::-webkit-details-marker {
		display: none;
	}

	.faq-q-text {
		font-family: var(--font-sans);
		font-size: var(--font-size-md);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
		line-height: 1.4;
	}

	.faq-chevron {
		font-size: 24px;
		color: var(--color-accent-honey);
		transition: transform var(--transition-normal);
		flex-shrink: 0;
	}

	.faq-item-teal .faq-chevron {
		color: var(--color-accent-teal);
	}

	.faq-item[open] .faq-chevron {
		transform: rotate(90deg);
	}

	.faq-answer {
		padding: 0 24px 20px;
	}

	.faq-answer p {
		font-size: var(--font-size-base);
		color: var(--color-text-muted);
		line-height: 1.75;
		margin: 0;
	}

	@media (max-width: 1024px) {
		.tag-grid { grid-template-columns: repeat(2, 1fr); }
	}

	@media (max-width: 768px) {
		.tag-grid { grid-template-columns: 1fr; }
		.tag-header { padding: 32px 0 24px; }
		.faq-section { padding: 32px 0 48px; }
		.faq-question { padding: 16px 20px; }
		.faq-answer { padding: 0 20px 16px; }
		.faq-q-text { font-size: var(--font-size-base); }
	}
</style>
