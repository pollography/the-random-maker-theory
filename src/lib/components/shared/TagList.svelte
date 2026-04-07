<!-- Display list of tags -->

<script>
	let { tags = [], linked = true } = $props();
</script>

<div class="flex flex-wrap gap-2">
	{#each tags as tag}
		{#if linked}
			<a
				href="/tags/{tag}"
				class="inline-block px-2 py-1 text-xs bg-honey-subtle text-honey rounded-full hover:bg-honey hover:text-on-accent transition-colors"
			>
				#{tag}
			</a>
		{:else}
			<span
				class="inline-block px-2 py-1 text-xs bg-honey-subtle text-honey rounded-full"
			>
				#{tag}
			</span>
		{/if}
	{/each}
</div>

<style>
	/* Styles handled by Tailwind */
</style>
