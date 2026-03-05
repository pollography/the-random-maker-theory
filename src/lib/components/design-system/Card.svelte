<!-- The Random Maker Theory — Card Component (Svelte 5)
     Versatile container with multiple variants
     Usage:
       <Card variant="default">Content</Card>
       <Card variant="interactive" href="/post">Clickable</Card>
-->

<script>
	let {
		variant = 'default',
		href = null,
		class: className = '',
		children,
		onclick,
	} = $props();

	let variantClass = $derived(`card card-${variant} rounded-lg border border-border shadow-card backdrop-blur-sm p-4 transition-all duration-normal hover:shadow-elevated ${className}`);
</script>

<!-- svelte-ignore a11y_no_interactive_element_to_noninteractive_role -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
{#if href}
	<a {href} class={variantClass} {onclick}>
		{@render children?.()}
	</a>
{:else}
	<div class={variantClass} {onclick}>
		{@render children?.()}
	</div>
{/if}

<style>
	/* Card styles inherit from tokens */
	:global(.card) {
		background-color: var(--card-bg);
		border: var(--card-border);
		border-radius: var(--card-radius);
	}
</style>
