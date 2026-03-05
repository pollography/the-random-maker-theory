<!-- Display list of tags -->

<script>
	let { tags = [] } = $props();
</script>

<div class="flex flex-wrap gap-2">
	{#each tags as tag}
		<a
			href="/tags/{tag}"
			class="inline-block px-2 py-1 text-xs bg-honey-subtle text-honey rounded-full hover:bg-honey hover:text-on-accent transition-colors"
		>
			#{tag}
		</a>
	{/each}
</div>

<style>
	/* Styles handled by Tailwind */
</style>
