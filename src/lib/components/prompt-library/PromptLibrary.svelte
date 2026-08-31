<script lang="ts">
	import { tick } from 'svelte';
	import PromptCard from './PromptCard.svelte';
	import PromptLightbox from './PromptLightbox.svelte';
	import { filterPrompts, getCategoryCounts } from '$lib/utils/prompt-library.js';

	type Prompt = {
		id: string;
		command: string;
		title: string;
		category: string;
		image: string;
		displayImage?: string | null;
		alt: string;
		articleSlug: string;
		useCases: string[];
	};

	type Category = {
		id: string;
		label: string;
		description: string;
		order: number;
	};

	let { prompts, categories }: { prompts: Prompt[]; categories: Category[] } = $props();
	let query = $state('');
	let activeCategory = $state('all');
	let filteredPrompts = $derived(filterPrompts(prompts, categories, query, activeCategory) as Prompt[]);
	let categoryCounts = $derived(getCategoryCounts(prompts, categories) as Record<string, number>);
	let categoryLabels = $derived(new Map(categories.map((category) => [category.id, category.label])));
	let activePrompt = $state<Prompt | null>(null);
	let returnFocusElement: HTMLButtonElement | null = null;

	function resetFilters() {
		query = '';
		activeCategory = 'all';
	}

	function openPreview(prompt: Prompt, trigger: HTMLButtonElement) {
		returnFocusElement = trigger;
		activePrompt = prompt;
	}

	async function closePreview() {
		activePrompt = null;
		await tick();
		returnFocusElement?.focus();
		returnFocusElement = null;
	}
</script>

<div class="library-controls">
	<label class="search-box">
		<span class="sr-only">Prompt suchen</span>
		<svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
			<circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.8" />
			<path d="m16 16 4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
		</svg>
		<input type="search" bind:value={query} placeholder="Prompt, Ergebnis oder Einsatz suchen …" />
		{#if query}
			<button type="button" class="clear-search" onclick={() => query = ''} aria-label="Suche leeren">×</button>
		{/if}
	</label>

	<p class="result-summary" aria-live="polite">
		<strong>{filteredPrompts.length}</strong> von {prompts.length} getesteten Prompts
	</p>
</div>

<div class="mobile-filters" aria-label="Prompt-Kategorien">
	<button type="button" class:active={activeCategory === 'all'} onclick={() => activeCategory = 'all'}>
		Alle <span>{categoryCounts.all}</span>
	</button>
	{#each categories as category (category.id)}
		<button
			type="button"
			class:active={activeCategory === category.id}
			onclick={() => activeCategory = category.id}
		>
			{category.label} <span>{categoryCounts[category.id]}</span>
		</button>
	{/each}
</div>

<div class="library-layout">
	<aside class="category-sidebar" aria-label="Prompt-Kategorien">
		<p class="sidebar-title">Kategorien</p>
		<button type="button" class:active={activeCategory === 'all'} onclick={() => activeCategory = 'all'}>
			<span>Alle Prompts</span><strong>{categoryCounts.all}</strong>
		</button>
		{#each categories as category (category.id)}
			<button
				type="button"
				class:active={activeCategory === category.id}
				onclick={() => activeCategory = category.id}
			>
				<span>{category.label}</span><strong>{categoryCounts[category.id]}</strong>
			</button>
		{/each}
	</aside>

	<section class="results" aria-label="Gefundene Bildprompts">
		{#if filteredPrompts.length > 0}
			<div class="prompt-grid">
				{#each filteredPrompts as prompt, index (prompt.id)}
					<PromptCard
						{prompt}
						categoryLabel={categoryLabels.get(prompt.category) ?? prompt.category}
						onPreview={openPreview}
						priority={index === 0}
					/>
				{/each}
			</div>
		{:else}
			<div class="empty-state">
				<h2>Kein passender Prompt</h2>
				<p>Versuche einen anderen Begriff oder zeige wieder alle Kategorien.</p>
				<button type="button" onclick={resetFilters}>Filter zurücksetzen</button>
			</div>
		{/if}
	</section>
</div>

<PromptLightbox prompt={activePrompt} onClose={closePreview} />

<style>
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
	}

	.library-controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		margin-bottom: 20px;
	}

	.search-box {
		position: relative;
		display: flex;
		width: min(620px, 100%);
		align-items: center;
	}

	.search-box > svg {
		position: absolute;
		left: 15px;
		width: 19px;
		height: 19px;
		color: var(--color-text-muted);
		pointer-events: none;
	}

	.search-box input {
		width: 100%;
		height: 48px;
		padding: 0 48px 0 45px;
		background: var(--color-surface);
		border: 1px solid var(--color-border-soft);
		border-radius: var(--radius-lg);
		font-size: 0.92rem;
		box-shadow: var(--shadow-card);
	}

	.clear-search {
		position: absolute;
		right: 7px;
		display: grid;
		width: 34px;
		height: 34px;
		place-items: center;
		padding: 0;
		background: transparent;
		border: 0;
		border-radius: var(--radius-sm);
		color: var(--color-text-muted);
		font-size: 1.25rem;
		cursor: pointer;
	}

	.clear-search:hover { color: var(--color-text); background: var(--color-elevated); }

	.result-summary {
		flex: 0 0 auto;
		margin: 0;
		color: var(--color-text-muted);
		font-size: 0.78rem;
		line-height: 1.4;
	}

	.result-summary strong { color: var(--color-accent-teal); }

	.library-layout {
		display: grid;
		grid-template-columns: 210px minmax(0, 1fr);
		gap: 24px;
		align-items: start;
	}

	.category-sidebar {
		position: sticky;
		top: 94px;
		display: flex;
		flex-direction: column;
		padding: 10px;
		background: color-mix(in srgb, var(--color-surface) 82%, transparent);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-lg);
		backdrop-filter: blur(14px);
	}

	.sidebar-title {
		margin: 4px 8px 9px;
		color: var(--color-text-dim);
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.category-sidebar button {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding: 9px 10px;
		background: transparent;
		border: 0;
		border-radius: var(--radius-md);
		color: var(--color-text-muted);
		font-family: var(--font-sans);
		font-size: 0.73rem;
		font-weight: 650;
		line-height: 1.25;
		text-align: left;
		cursor: pointer;
		transition: background var(--transition-fast), color var(--transition-fast);
	}

	.category-sidebar button:hover { color: var(--color-text); background: var(--color-elevated); }

	.category-sidebar button.active {
		background: var(--color-accent-honey-subtle);
		color: var(--color-accent-honey);
	}

	.category-sidebar strong {
		color: inherit;
		font-family: var(--font-mono);
		font-size: 0.64rem;
		font-weight: 600;
	}

	.mobile-filters { display: none; }

	.results { min-width: 0; }

	.prompt-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16px;
	}

	.empty-state {
		display: grid;
		min-height: 360px;
		place-items: center;
		align-content: center;
		padding: 48px 24px;
		border: 1px dashed var(--color-border-soft);
		border-radius: var(--radius-xl);
		text-align: center;
	}

	.empty-state h2 {
		margin: 0;
		color: var(--color-text);
		font-size: 1.75rem;
	}

	.empty-state p { margin: 8px 0 20px; color: var(--color-text-muted); }

	.empty-state button {
		padding: 10px 15px;
		background: var(--color-accent-honey);
		border: 0;
		border-radius: var(--radius-md);
		color: var(--color-on-accent);
		font-family: var(--font-sans);
		font-size: 0.8rem;
		font-weight: 800;
		cursor: pointer;
	}

	:global([data-theme='light']) .search-box input,
	:global([data-theme='light']) .category-sidebar {
		border-color: transparent;
		box-shadow: var(--shadow-neo-sm);
	}

	@media (max-width: 960px) {
		.library-layout { display: block; }
		.category-sidebar { display: none; }

		.mobile-filters {
			display: flex;
			overflow-x: auto;
			gap: 7px;
			margin: 0 -16px 18px;
			padding: 2px 16px 9px;
			scrollbar-width: thin;
		}

		.mobile-filters button {
			display: inline-flex;
			min-height: 36px;
			flex: 0 0 auto;
			align-items: center;
			gap: 6px;
			padding: 8px 11px;
			background: var(--color-surface);
			border: 1px solid var(--color-border-soft);
			border-radius: var(--radius-full);
			color: var(--color-text-muted);
			font-family: var(--font-sans);
			font-size: 0.72rem;
			font-weight: 700;
			white-space: nowrap;
			cursor: pointer;
		}

		.mobile-filters button.active {
			background: var(--color-accent-honey);
			border-color: var(--color-accent-honey);
			color: var(--color-on-accent);
		}

		.mobile-filters span { font-family: var(--font-mono); font-size: 0.62rem; }
		.prompt-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
	}

	@media (max-width: 640px) {
		.library-controls { align-items: stretch; flex-direction: column; gap: 9px; }
		.result-summary { padding-left: 2px; }
		.prompt-grid { grid-template-columns: 1fr; gap: 14px; }
	}
</style>
