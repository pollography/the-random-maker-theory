<script>
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import { siteConfig } from '$lib/config';

	let { data } = $props();
</script>

<svelte:head>
	<title>Tag: {data.tag} — {siteConfig.name}</title>
	<meta name="description" content="Blog-Posts mit Tag: {data.tag}" />
</svelte:head>

<!-- Header -->
<section class="py-12 space-y-4">
	<h1 class="text-5xl md:text-6xl font-display font-extrabold">
		Tag: <span class="text-honey">#{data.tag}</span>
	</h1>
	<p class="text-xl text-text-muted">
		{data.posts.length} {data.posts.length === 1 ? 'Post' : 'Posts'} gefunden
	</p>
</section>

<!-- Posts Grid -->
<section class="py-8">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each data.posts as post (post.slug)}
			<BlogCard {post} />
		{/each}
	</div>

	{#if data.posts.length === 0}
		<div class="text-center py-12">
			<p class="text-text-muted text-lg">Keine Posts mit diesem Tag gefunden.</p>
			<a href="/blog" class="text-honey hover:text-honey-hover font-semibold mt-4 inline-block">
				← Zurück zum Blog
			</a>
		</div>
	{/if}
</section>
