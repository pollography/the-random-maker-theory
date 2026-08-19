<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { dev } from '$app/environment';
	import '../app.css';

	// Vercel Web Analytics: setzt keine Cookies, speichert keine IP im Klartext und
	// bildet keine geraeteuebergreifenden Profile. Damit greift § 25 TDDDG nicht und
	// es laeuft ohne Einwilligung. Sobald hier Affiliate- oder Ad-Tracking dazukommt,
	// muss der Consent-Banner zurueck.
	// Umami wurde am 19.08.2026 entfernt: die alte Website-ID gehoerte zu keinem
	// Property im verknuepften Konto. Falls Umami zurueck soll, neue ID anlegen.
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
