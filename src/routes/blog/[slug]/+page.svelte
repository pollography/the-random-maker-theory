<script>
	import TagList from '$lib/components/shared/TagList.svelte';
	import { siteConfig } from '$lib/config';

	let { data } = $props();

	let formattedDate = $derived(new Date(data.post.date).toLocaleDateString('de-DE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}));
</script>

<svelte:head>
	<title>{data.post.title} — {siteConfig.name}</title>
	<meta name="description" content={data.post.description} />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.description} />
	<meta name="twitter:title" content={data.post.title} />
	<meta name="twitter:description" content={data.post.description} />
</svelte:head>

<article class="max-w-3xl mx-auto py-12">
	<!-- Metadata -->
	<header class="mb-12 space-y-4">
		<div>
			<h1 class="text-5xl font-display font-extrabold mb-4">
				{data.post.title}
			</h1>
			<div class="flex flex-wrap items-center gap-4 text-text-muted text-sm">
				<time datetime={data.post.date}>{formattedDate}</time>
				{#if data.post.readingTime}
					<span>·</span>
					<span>{data.post.readingTime} min Lesezeit</span>
				{/if}
			</div>
		</div>

		<!-- Tags -->
		{#if data.post.tags && data.post.tags.length > 0}
			<div class="pt-4">
				<TagList tags={data.post.tags} />
			</div>
		{/if}
	</header>

	<!-- Content -->
	<div class="prose prose-invert max-w-none">
		{#if data.content}
			<data.content />
		{/if}
	</div>
</article>

<style>
	:global(.prose code) {
		background-color: var(--color-surface-raised);
		color: var(--color-text);
		padding: 0.25rem 0.5rem;
		border-radius: 0.375rem;
	}

	:global(.prose pre) {
		background-color: var(--color-surface-raised);
		border: 1px solid var(--color-border);
	}

	:global(.prose a) {
		color: var(--color-accent-honey);
	}

	:global(.prose a:hover) {
		color: var(--color-accent-honey-hover);
	}
</style>
