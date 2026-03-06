<script>
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import { getPosts } from '$lib/utils/posts';
	import { siteConfig } from '$lib/config';

	let posts = $state([]);

	async function load() {
		posts = await getPosts();
	}

	load();
</script>

<svelte:head>
	<title>Blog — Tech, KI, Maker & Produktivität | TRMT</title>
	<meta name="description" content="Alle Blog-Posts von The Random Maker Theory: Tech-News, KI-Tools, Maker-Projekte, Produktivitäts-Tutorials und Deep Dives. Jeden Donnerstag neu." />
	<meta property="og:title" content="Blog — The Random Maker Theory" />
	<meta property="og:description" content="Tech, KI, Maker & Produktivität — verständlich erklärt." />
	<meta property="og:url" content="https://therandommakertheory.com/blog" />
	<link rel="canonical" href="https://therandommakertheory.com/blog" />
</svelte:head>

<!-- Header -->
<section style="padding: 3rem 0; display: flex; flex-direction: column; gap: 1.5rem;">
	<div>
		<h1 style="font-size: clamp(2.5rem, 8vw, 3.5rem); font-family: var(--font-display); font-weight: var(--font-weight-extrabold); line-height: var(--line-height-tight); margin: 0; color: var(--color-text);">
			Blog
		</h1>
		<p style="font-size: var(--font-size-lg); color: var(--color-text-muted); margin: 0.5rem 0 0 0; line-height: var(--line-height-relaxed);">
			Tech, KI, Maker-Projekte & Produktivität — neu jede Woche.
		</p>
	</div>
</section>

<!-- Posts Grid -->
<section style="padding: 2rem 0;">
	<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
		{#each posts as post (post.slug)}
			<BlogCard {post} />
		{/each}
	</div>

	{#if posts.length === 0}
		<div style="text-align: center; padding: 3rem; color: var(--color-text-muted); font-size: var(--font-size-lg);">
			Keine Posts gefunden.
		</div>
	{/if}
</section>

<style>
	/* no global body overrides needed — layout handles padding */
</style>
