<!-- Header with navigation and theme toggle -->

<script>
	import { page } from '$app/stores';
	import ThemeToggle from '../design-system/ThemeToggle.svelte';
	import { siteConfig } from '../../config';
</script>

<header class="sticky top-0 z-50 border-b border-border-subtle bg-bg/80 backdrop-blur-md">
	<div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
		<!-- Logo / Brand -->
		<div class="flex items-center gap-3">
			<a href="/" class="font-display font-bold text-2xl text-honey hover:text-honey-hover transition-colors">
				TRMT
			</a>
			<span class="hidden sm:block text-text-muted text-sm">{siteConfig.shortName}</span>
		</div>

		<!-- Navigation -->
		<nav class="flex items-center gap-6">
			<a
				href="/blog"
				class="text-text hover:text-honey transition-colors"
				class:text-honey={$page.url.pathname.startsWith('/blog')}
			>
				Blog
			</a>
			<a
				href="/podcast"
				class="text-text hover:text-honey transition-colors"
				class:text-honey={$page.url.pathname.startsWith('/podcast')}
			>
				Podcast
			</a>
			<a
				href="/about"
				class="text-text hover:text-honey transition-colors"
				class:text-honey={$page.url.pathname.startsWith('/about')}
			>
				Über uns
			</a>
		</nav>

		<!-- Theme Toggle -->
		<ThemeToggle variant="icon" />
	</div>
</header>

<style>
	header {
		background-color: var(--color-bg);
		border-bottom: 1px solid var(--color-border-subtle);
	}
</style>
