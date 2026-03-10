<!-- Blog Post Card for grid display -->

<script>
	import Card from '../design-system/Card.svelte';
	import TagList from '../shared/TagList.svelte';

	let { post } = $props();

	let thumbnailSrc = $derived(
		post.heroImage ? post.heroImage.replace('.webp', '-thumb.webp') : null
	);

	let formattedDate = $derived(new Date(post.date).toLocaleDateString('de-DE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}));

	let titleParts = $derived(() => {
		const accent = post.titleAccent;
		if (!accent) return [{ text: post.title, isAccent: false }];
		const idx = post.title.indexOf(accent);
		if (idx === -1) return [{ text: post.title, isAccent: false }];
		const parts = [];
		if (idx > 0) parts.push({ text: post.title.slice(0, idx), isAccent: false });
		parts.push({ text: accent, isAccent: true });
		const after = post.title.slice(idx + accent.length);
		if (after) parts.push({ text: after, isAccent: false });
		return parts;
	});
</script>

<Card href="/blog/{post.slug}" variant="interactive">
	<div class="space-y-3">
		<!-- Thumbnail -->
		{#if post.heroImage}
			<div class="card-thumbnail">
				<img src={thumbnailSrc || post.heroImage} alt={post.title} loading="lazy" width="400" height="225" />
			</div>
		{/if}

		<!-- Date and reading time -->
		<div class="flex items-center justify-between text-xs text-text-muted">
			<time datetime={post.date}>{formattedDate}</time>
			{#if post.readingTime}
				<span>{post.readingTime} min Lesezeit</span>
			{/if}
		</div>

		<!-- Title -->
		<h3 class="card-title line-clamp-3">
			{#each titleParts() as part}
				{#if part.isAccent}<span class="card-accent">{part.text}</span>{:else}{part.text}{/if}
			{/each}
		</h3>

		<!-- Description -->
		<p class="text-text-muted text-sm line-clamp-3">
			{post.description}
		</p>

		<!-- Tags -->
		<div>
			<TagList tags={post.tags} />
		</div>
	</div>
</Card>

<style>
	.card-title {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: 20px;
		color: var(--color-text);
		line-height: 1.25;
		letter-spacing: -0.02em;
		margin: 0;
		min-height: calc(20px * 1.25 * 3);
		opacity: 0.95;
	}

	.card-accent {
		color: var(--color-accent-honey);
		font-style: italic;
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-thumbnail {
		border-radius: var(--radius-lg, 0.75rem);
		overflow: hidden;
		aspect-ratio: 16 / 9;
		margin: -1.5rem -1.5rem 0 -1.5rem;
	}

	.card-thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	:global(.card:hover) .card-thumbnail img {
		transform: scale(1.03);
	}
</style>
