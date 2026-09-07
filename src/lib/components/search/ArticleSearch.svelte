<script>
	import { loadSearchIndex, resetSearchIndex } from '$lib/utils/search-index-client.js';
	import { searchSiteIndex } from '$lib/utils/site-search.js';
	import SearchResults from './SearchResults.svelte';

	/** @type {{ topic?: string | null, totalCount?: number, onActiveChange?: (active: boolean) => void }} */
	let { topic = null, totalCount = 0, onActiveChange = () => {} } = $props();
	let query = $state('');
	/** @type {any[]} */
	let index = $state([]);
	let loading = $state(false);
	let loadError = $state(false);
	let hasRequested = $state(false);
	let searchInput = $state();
	let results = $derived(searchSiteIndex(index, query, { types: ['article'], tag: topic, limit: 24 }));
	let inputId = $derived(topic ? `topic-search-${topic}` : 'blog-article-search');

	async function loadIndex(force = false) {
		if (force) resetSearchIndex();
		hasRequested = true;
		loading = true;
		loadError = false;
		try {
			index = await loadSearchIndex();
		} catch {
			loadError = true;
			hasRequested = false;
		} finally {
			loading = false;
		}
	}

	/** @param {Event} event */
	function handleInput(event) {
		query = /** @type {HTMLInputElement} */ (event.currentTarget).value;
		const active = query.trim().length > 0;
		onActiveChange(active);
		if (active && !hasRequested) void loadIndex();
	}

	function clearSearch() {
		query = '';
		loadError = false;
		onActiveChange(false);
		searchInput?.focus();
	}
</script>

<section class="article-search" class:topic-search={Boolean(topic)} aria-labelledby={`${inputId}-heading`}>
	<div class="search-copy">
		<p class="eyebrow">{topic ? 'Im Thema suchen' : 'Im ganzen Blog suchen'}</p>
		<h2 id={`${inputId}-heading`}>{topic ? 'Dieses Thema durchsuchen' : 'Blogartikel durchsuchen'}</h2>
		<p>Auch Treffer aus Artikeln, die weiter unten noch nicht geladen wurden.</p>
	</div>

	<div class="search-control">
		<label for={inputId}>{topic ? 'Suchbegriff für dieses Thema' : 'Suchbegriff für alle Blogartikel'}</label>
		<div class="input-shell">
			<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 4 4"></path></svg>
			<input
				bind:this={searchInput}
				id={inputId}
				type="search"
				maxlength="160"
				autocomplete="off"
				value={query}
				oninput={handleInput}
				placeholder={topic ? 'In diesem Thema suchen …' : 'Alle Artikel durchsuchen …'}
			/>
			{#if query}
				<button type="button" class="clear-button" aria-label="Suche leeren" onclick={clearSearch}>×</button>
			{/if}
		</div>
	</div>

	{#if query.trim()}
		<div class="inline-results">
			<SearchResults
				{query}
				{results}
				{loading}
				error={loadError}
				totalLabel={`${totalCount} Blogartikel`}
				onRetry={() => loadIndex(true)}
			/>
		</div>
	{/if}
</section>

<style>
	.article-search { display: grid; grid-template-columns: minmax(220px, .72fr) minmax(300px, 1.28fr); gap: clamp(20px, 5vw, 56px); margin: 10px 0 12px; padding: clamp(22px, 4vw, 34px); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-xl); background: linear-gradient(135deg, color-mix(in srgb, var(--color-accent-teal) 8%, var(--color-surface)), var(--color-surface)); }
	.search-copy .eyebrow { margin: 0 0 7px; color: var(--color-accent-teal-foreground); font-family: var(--font-mono); font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; }
	.search-copy h2 { margin: 0; color: var(--color-text); font-family: var(--font-display); font-size: clamp(1.55rem, 3vw, 2.15rem); font-weight: 400; line-height: 1.1; }
	.search-copy p:last-child { margin: 10px 0 0; color: var(--color-text-muted); font-size: var(--font-size-sm); line-height: 1.55; }
	.search-control { align-self: center; }
	.search-control > label { display: block; margin: 0 0 8px; color: var(--color-text-muted); font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); }
	.input-shell { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 10px; min-height: 56px; padding: 0 8px 0 16px; border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-bg); color: var(--color-accent-honey-foreground); }
	.input-shell:focus-within { border-color: var(--color-accent-honey); box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent-honey) 20%, transparent); }
	.input-shell svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-width: 1.8; }
	.input-shell input { width: 100%; min-height: 54px; padding: 0; border: 0; outline: 0; background: transparent; color: var(--color-text); font: inherit; }
	.input-shell input::placeholder { color: var(--color-text-dim); }
	.clear-button { display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; padding: 0 0 2px; border: 0; border-radius: 50%; background: transparent; color: var(--color-text-muted); cursor: pointer; font-size: 1.55rem; }
	.clear-button:hover, .clear-button:focus-visible { background: var(--color-surface-elevated); color: var(--color-accent-honey-foreground); }
	.inline-results { grid-column: 1 / -1; padding-top: 4px; }
	@media (max-width: 720px) {
		.article-search { grid-template-columns: 1fr; gap: 18px; padding: 20px 16px; }
		.inline-results { grid-column: auto; }
	}
</style>
