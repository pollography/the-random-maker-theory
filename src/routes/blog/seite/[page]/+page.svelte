<script>
	import BlogArchive from '$lib/components/blog/BlogArchive.svelte';

	let { data } = $props();
</script>

<BlogArchive {...data} showFaq={false} />
