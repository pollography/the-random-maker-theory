<script>
	import { tick } from 'svelte';
	import { loadSearchIndex, resetSearchIndex } from '$lib/utils/search-index-client.js';
	import { searchSiteIndex } from '$lib/utils/site-search.js';
	import SearchResults from './SearchResults.svelte';

	let dialog = $state();
	let triggerButton = $state();
	let searchInput = $state();
	let query = $state('');
	/** @type {any[]} */
	let index = $state([]);
	let loading = $state(false);
	let loadError = $state(false);
	let results = $derived(searchSiteIndex(index, query, { limit: 12 }));

	async function loadIndex(force = false) {
		if (force) resetSearchIndex();
		loading = true;
		loadError = false;
		try {
			index = await loadSearchIndex();
		} catch {
			loadError = true;
		} finally {
			loading = false;
		}
	}

	async function openSearch() {
		dialog?.showModal();
		await tick();
		searchInput?.focus();
		void loadIndex();
	}

	function closeSearch() {
		dialog?.close();
	}

	function handleClose() {
		query = '';
		loadError = false;
		requestAnimationFrame(() => triggerButton?.focus());
	}

	function handleCancel() {
		query = '';
	}
</script>

<button
	bind:this={triggerButton}
	type="button"
	class="search-trigger"
	aria-label="Website durchsuchen"
	aria-haspopup="dialog"
	onclick={openSearch}
>
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<circle cx="11" cy="11" r="6.5"></circle>
		<path d="m16 16 4 4"></path>
	</svg>
</button>

<dialog
	bind:this={dialog}
	class="search-dialog"
	aria-labelledby="site-search-title"
	onclose={handleClose}
	oncancel={handleCancel}
	onclick={(event) => event.target === dialog && closeSearch()}
>
	<div class="dialog-shell">
		<div class="dialog-header">
			<div>
				<p class="eyebrow">TRMT durchsuchen</p>
				<h2 id="site-search-title">Was willst du finden?</h2>
			</div>
			<button type="button" class="close-button" aria-label="Suche schließen" onclick={closeSearch}>×</button>
		</div>

		<label class="search-field">
			<span class="sr-only">Suchbegriff</span>
			<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 4 4"></path></svg>
			<input bind:this={searchInput} bind:value={query} type="search" maxlength="160" autocomplete="off" placeholder="Artikel, Podcast oder Tool …" />
		</label>

		<div class="results-scroll">
			<SearchResults
				{query}
				{results}
				{loading}
				error={loadError}
				totalLabel="alle öffentlichen TRMT-Inhalte"
				onRetry={() => loadIndex(true)}
			/>
		</div>
	</div>
</dialog>

<style>
	.search-trigger { display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; padding: 0; border: 1px solid transparent; border-radius: 50%; background: transparent; color: var(--color-text-muted); cursor: pointer; transition: color var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast); }
	.search-trigger:hover, .search-trigger:focus-visible { border-color: var(--color-border-subtle); background: var(--color-surface); color: var(--color-accent-honey-foreground); }
	.search-trigger svg, .search-field svg { width: 21px; height: 21px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-width: 1.8; }
	.search-dialog { width: min(760px, calc(100vw - 32px)); max-height: min(760px, calc(100dvh - 48px)); margin: auto; padding: 0; overflow: visible; border: 1px solid var(--color-border); border-radius: var(--radius-xl); background: var(--color-surface); color: var(--color-text); box-shadow: 0 30px 90px rgba(0, 0, 0, .48); }
	.search-dialog::backdrop { background: rgba(5, 5, 5, .72); backdrop-filter: blur(7px); }
	.dialog-shell { display: flex; flex-direction: column; max-height: min(760px, calc(100dvh - 48px)); padding: clamp(20px, 4vw, 34px); background: radial-gradient(circle at 8% 0%, color-mix(in srgb, var(--color-accent-teal) 12%, transparent), transparent 36%), var(--color-surface); border-radius: inherit; }
	.dialog-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; margin-bottom: 22px; }
	.eyebrow { margin: 0 0 4px; color: var(--color-accent-teal-foreground); font-family: var(--font-mono); font-size: .72rem; letter-spacing: .14em; text-transform: uppercase; }
	h2 { margin: 0; color: var(--color-text); font-family: var(--font-display); font-size: clamp(1.8rem, 5vw, 2.7rem); font-weight: 400; line-height: 1.05; }
	.close-button { flex: 0 0 44px; width: 44px; height: 44px; padding: 0 0 3px; border: 1px solid var(--color-border-subtle); border-radius: 50%; background: transparent; color: var(--color-text-muted); cursor: pointer; font-size: 1.75rem; line-height: 1; }
	.close-button:hover, .close-button:focus-visible { border-color: var(--color-accent-honey); color: var(--color-accent-honey-foreground); }
	.search-field { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 12px; min-height: 58px; padding: 0 18px; border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-bg); color: var(--color-accent-honey-foreground); }
	.search-field:focus-within { border-color: var(--color-accent-honey); box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent-honey) 22%, transparent); }
	.search-field input { width: 100%; min-height: 56px; padding: 0; border: 0; outline: 0; background: transparent; color: var(--color-text); font: inherit; font-size: clamp(1rem, 2.3vw, 1.15rem); }
	.search-field input::placeholder { color: var(--color-text-dim); }
	.results-scroll { min-height: 160px; margin-top: 18px; overflow-y: auto; overscroll-behavior: contain; }
	.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
	@media (max-width: 640px) {
		.search-dialog { width: calc(100vw - 20px); max-height: calc(100dvh - 20px); }
		.dialog-shell { max-height: calc(100dvh - 20px); padding: 18px 15px; }
		.dialog-header { margin-bottom: 16px; }
		.search-field { min-height: 54px; padding: 0 14px; }
		.search-field input { min-height: 52px; }
	}
	@media (prefers-reduced-motion: reduce) {
		.search-trigger { transition: none; }
	}
</style>
