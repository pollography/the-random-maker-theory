<!-- Blog Post Card for grid display -->

<script>
	import Card from '../design-system/Card.svelte';
	import TagList from '../shared/TagList.svelte';

	let { post } = $props();

	let formattedDate = $derived(new Date(post.date).toLocaleDateString('de-DE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}));
</script>

<Card href="/blog/{post.slug}" variant="interactive">
	<div class="space-y-3">
		<!-- Date and reading time -->
		<div class="flex items-center justify-between text-xs text-text-muted">
			<time datetime={post.date}>{formattedDate}</time>
			{#if post.readingTime}
				<span>{post.readingTime} min Lesezeit</span>
			{/if}
		</div>

		<!-- Title -->
		<h3 class="font-display font-bold text-xl text-text line-clamp-2">
			{post.title}
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
</style>
