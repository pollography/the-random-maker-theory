<script>
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import { getPosts } from '$lib/utils/posts';
	import { siteConfig } from '$lib/config';

	let posts = [];

	async function load() {
		posts = await getPosts();
	}

	load();
</script>

<svelte:head>
	<title>Blog — {siteConfig.name}</title>
	<meta name="description" content="Lese alle Blog-Posts von {siteConfig.name}" />
</svelte:head>

<!-- Header -->
<section class="py-12 space-y-4">
	<h1 class="text-5xl md:text-6xl font-display font-extrabold">Blog</h1>
	<p class="text-xl text-text-muted">KI-News, Tools und Tutorials — neu jede Woche.</p>
</section>

<!-- Posts Grid -->
<section class="py-8">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each posts as post (post.slug)}
			<BlogCard {post} />
		{/each}
	</div>

	{#if posts.length === 0}
		<div class="text-center py-12">
			<p class="text-text-muted text-lg">Keine Posts gefunden.</p>
		</div>
	{/if}
</section>
