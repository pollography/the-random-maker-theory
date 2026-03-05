<!-- The Random Maker Theory — Card Component (Svelte 5) -->

<script>
	let {
		variant = 'default',
		href = null,
		class: className = '',
		children,
		onclick,
	} = $props();
</script>

{#if href}
	<a {href} class="card {variant === 'interactive' ? 'interactive' : ''} {className}" {onclick}>
		{@render children?.()}
	</a>
{:else}
	<div class="card {className}" {onclick}>
		{@render children?.()}
	</div>
{/if}

<style>
	.card {
		background-color: var(--card-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--card-radius);
		box-shadow: var(--shadow-card);
		padding: 24px;
		transition: all var(--transition-normal);
		text-decoration: none;
		display: block;
		color: inherit;
	}

	.card.interactive:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-elevated);
		border-color: var(--color-accent-honey-subtle);
	}

	:global([data-theme='light']) .card {
		background: var(--gradient-card-bg);
		border: none;
		box-shadow: var(--shadow-neo-sm);
		backdrop-filter: blur(20px);
	}

	:global([data-theme='light']) .card.interactive:hover {
		box-shadow: var(--shadow-neo);
		transform: translateY(-2px);
	}
</style>
