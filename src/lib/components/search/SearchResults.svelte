<script>
	let {
		query = '',
		results = [],
		loading = false,
		error = false,
		totalLabel = 'Inhalte',
		onRetry = null
	} = $props();

	const typeLabels = /** @type {Record<string, string>} */ ({
		article: 'Artikel',
		podcast: 'Podcast',
		tool: 'Tool'
	});

	/** @param {string} type */
	const typeLabel = (type) => typeLabels[type] ?? 'Inhalt';
</script>

<div class="search-status" aria-live="polite" aria-busy={loading}>
	{#if loading}
		<p class="search-message"><span class="search-spinner" aria-hidden="true"></span>Suche wird geladen …</p>
	{:else if error}
		<div class="search-error">
			<p class="search-message">Die Suche konnte gerade nicht geladen werden.</p>
			{#if onRetry}
				<button type="button" class="retry-button" onclick={onRetry}>Erneut versuchen</button>
			{/if}
		</div>
	{:else if !query.trim()}
		<p class="search-hint">Durchsuche {totalLabel} nach Titel, Thema oder einem Begriff aus dem Inhalt.</p>
	{:else if results.length === 0}
		<p class="search-message">Keine Treffer für „{query}“.</p>
	{:else}
		<p class="result-count">{results.length} {results.length === 1 ? 'Treffer' : 'Treffer'}</p>
		<ul class="result-list">
			{#each results as result (result.url)}
				<li>
					<a class="result-link" href={result.url}>
						<span class="result-type">{typeLabel(result.type)}</span>
						<strong>{result.title}</strong>
						{#if result.excerpt}<span class="result-excerpt">{result.excerpt}</span>{/if}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.search-status { min-height: 120px; }
	.search-message, .search-hint, .result-count { margin: 0; color: var(--color-text-muted); line-height: 1.6; }
	.search-hint { max-width: 58ch; padding: 18px 2px; }
	.search-error { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; }
	.search-spinner { display: inline-block; width: 12px; height: 12px; margin-right: 9px; border: 2px solid var(--color-border-subtle); border-top-color: var(--color-accent-honey); border-radius: 50%; animation: search-spin .7s linear infinite; }
	.retry-button { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: .55rem 1rem; border: 1px solid var(--color-accent-honey); border-radius: var(--radius-full); background: transparent; color: var(--color-accent-honey-foreground); cursor: pointer; font: inherit; font-weight: var(--font-weight-semibold); }
	.retry-button:hover, .retry-button:focus-visible { background: var(--color-accent-honey); color: var(--color-on-accent); }
	.result-count { padding: 3px 2px 12px; color: var(--color-text-dim); font-size: var(--font-size-sm); }
	.result-list { display: grid; gap: 9px; margin: 0; padding: 0; list-style: none; }
	.result-link { display: grid; grid-template-columns: 92px minmax(0, 1fr); align-items: center; min-height: 64px; padding: 13px 16px; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); background: color-mix(in srgb, var(--color-surface) 88%, transparent); color: var(--color-text); text-decoration: none; transition: border-color var(--transition-fast), transform var(--transition-fast), background var(--transition-fast); }
	.result-link:hover, .result-link:focus-visible { border-color: var(--color-accent-honey); background: var(--color-surface-elevated); transform: translateY(-1px); }
	.result-type { grid-row: 1 / span 2; color: var(--color-accent-teal-foreground); font-family: var(--font-mono); font-size: .72rem; letter-spacing: var(--letter-spacing-wide); text-transform: uppercase; }
	.result-link strong { min-width: 0; font-family: var(--font-display); font-size: clamp(1.05rem, 2vw, 1.25rem); font-weight: 400; line-height: 1.2; }
	.result-excerpt { min-width: 0; overflow: hidden; color: var(--color-text-muted); font-size: var(--font-size-sm); line-height: 1.45; text-overflow: ellipsis; white-space: nowrap; }
	@keyframes search-spin { to { transform: rotate(360deg); } }
	@media (max-width: 540px) {
		.result-link { grid-template-columns: 1fr; gap: 4px; padding: 14px; }
		.result-type { grid-row: auto; }
	}
	@media (prefers-reduced-motion: reduce) {
		.search-spinner { animation: none; }
		.result-link { transition: none; }
		.result-link:hover, .result-link:focus-visible { transform: none; }
	}
</style>
