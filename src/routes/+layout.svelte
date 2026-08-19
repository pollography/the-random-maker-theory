<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import CookieBanner from '$lib/components/layout/CookieBanner.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { dev } from '$app/environment';
	import '../app.css';

	// Vercel Web Analytics: cookiefrei und ohne personenbezogene Daten, laeuft daher
	// unabhaengig vom Cookie-Banner. Umami bleibt unangetastet (eigenes Property).
	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
</svelte:head>

<div class="flex flex-col min-h-screen">
	<Header />
	<main class="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
		{@render children()}
	</main>
	<Footer />
	<CookieBanner />
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		background: var(--gradient-bg);
		background-color: var(--color-bg);
		background-attachment: fixed;
		color: var(--color-text);
	}
</style>
