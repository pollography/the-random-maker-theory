<!-- Blog Post Layout for mdsvex -->

<script>
	let { children } = $props();
</script>

<div class="prose prose-invert max-w-none">
	{@render children?.()}
</div>

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
