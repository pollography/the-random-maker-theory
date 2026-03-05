<script>
	import { getPosts } from '$lib/utils/posts';
	import { getLatestEpisode } from '$lib/utils/episodes';
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import EpisodeCard from '$lib/components/podcast/EpisodeCard.svelte';
	import { siteConfig } from '$lib/config';

	let posts = [];
	let latestEpisode = null;

	async function load() {
		posts = await getPosts();
		latestEpisode = await getLatestEpisode();
	}

	load();
</script>

<svelte:head>
	<title>{siteConfig.name}</title>
	<meta name="description" content={siteConfig.description} />
</svelte:head>

<!-- Hero Section -->
<section class="py-16 md:py-24 text-center space-y-6">
	<h1 class="text-5xl md:text-6xl font-display font-extrabold">
		The Random Maker Theory
	</h1>
	<p class="text-xl text-text-muted max-w-2xl mx-auto">
		KI-News, Tools und Tutorials — von Menschen und ihren KI-Freunden.
	</p>
	<div class="flex gap-4 justify-center pt-4">
		<a href="/blog" class="px-6 py-3 bg-honey text-on-accent rounded-lg font-semibold hover:bg-honey-hover transition-colors">
			Zum Blog
		</a>
		<a href="/podcast" class="px-6 py-3 bg-teal text-on-accent rounded-lg font-semibold hover:bg-teal-hover transition-colors">
			Zum Podcast
		</a>
	</div>
</section>

<!-- Latest Blog Posts -->
<section class="py-16 space-y-8">
	<div class="space-y-2">
		<h2 class="text-4xl font-display font-bold">Neueste Posts</h2>
		<p class="text-text-muted">Die neuesten Artikel aus unserem Blog</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		{#each posts.slice(0, 3) as post (post.slug)}
			<BlogCard {post} />
		{/each}
	</div>

	<div class="text-center pt-4">
		<a href="/blog" class="inline-block text-honey hover:text-honey-hover font-semibold">
			Alle Posts ansehen →
		</a>
	</div>
</section>

<!-- Latest Podcast Episode -->
{#if latestEpisode}
	<section class="py-16 space-y-8">
		<div class="space-y-2">
			<h2 class="text-4xl font-display font-bold">Neueste Episode</h2>
			<p class="text-text-muted">Der neueste Podcast</p>
		</div>

		<div class="max-w-2xl">
			<EpisodeCard episode={latestEpisode} />
		</div>

		<div class="text-center">
			<a href="/podcast" class="inline-block text-honey hover:text-honey-hover font-semibold">
				Alle Episoden ansehen →
			</a>
		</div>
	</section>
{/if}

<!-- About Snippet -->
<section class="py-16 space-y-6 bg-surface-raised rounded-lg p-8">
	<h2 class="text-3xl font-display font-bold">Über TRMT</h2>
	<p class="text-text-muted text-lg leading-relaxed">
		The Random Maker Theory ist dein wöchentliches Update zu KI-Tools, Breaking News und praktischen Tutorials. Wir erklären komplexe Themen verständlich, ohne Bullshit. Von Pollo & Friends.
	</p>
	<a href="/about" class="inline-block text-honey hover:text-honey-hover font-semibold">
		Mehr über uns →
	</a>
</section>
