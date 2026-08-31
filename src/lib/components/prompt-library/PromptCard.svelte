<script lang="ts">
	import { onDestroy } from 'svelte';
	import { copyPromptText } from '$lib/utils/prompt-actions.js';

	type Prompt = {
		id: string;
		command: string;
		title: string;
		image: string;
		alt: string;
		articleSlug: string;
		useCases: string[];
	};

	let { prompt, categoryLabel }: { prompt: Prompt; categoryLabel: string } = $props();
	let status = $state('');
	let statusState = $state<'success' | 'error'>('success');
	let statusTimer: ReturnType<typeof setTimeout> | undefined;

	function showStatus(message: string, state: 'success' | 'error') {
		status = message;
		statusState = state;
		if (statusTimer) clearTimeout(statusTimer);
		statusTimer = setTimeout(() => {
			status = '';
		}, 2800);
	}

	async function copyPrompt() {
		try {
			await copyPromptText(prompt.command, navigator.clipboard, document);
			showStatus('Kopiert', 'success');
		} catch {
			showStatus('Bitte manuell markieren', 'error');
		}
	}

	onDestroy(() => {
		if (statusTimer) clearTimeout(statusTimer);
	});
</script>

<article class="prompt-card">
	<a
		class="image-link"
		href={prompt.image}
		target="_blank"
		rel="noopener noreferrer"
		aria-label="{prompt.title} in voller Größe öffnen"
	>
		<img src={prompt.image} alt={prompt.alt} loading="lazy" decoding="async" />
	</a>

	<div class="card-body">
		<p class="category">{categoryLabel}</p>
		<h2>{prompt.title}</h2>

		<div class="command-row">
			<code>{prompt.command}</code>
			<button type="button" class="copy-button" onclick={copyPrompt} aria-label="{prompt.command} kopieren">
				<svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
					<rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.8" />
					<path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
				</svg>
				Prompt kopieren
			</button>
		</div>

		<ul class="use-cases" aria-label="Einsatzmöglichkeiten">
			{#each prompt.useCases.slice(0, 3) as useCase}
				<li>{useCase}</li>
			{/each}
		</ul>

		<div class="card-footer">
			<a href="/blog/{prompt.articleSlug}">Beispiel &amp; Anwendung</a>
			<p class:error={statusState === 'error'} aria-live="polite">{status}</p>
		</div>
	</div>
</article>

<style>
	.prompt-card {
		display: flex;
		min-width: 0;
		overflow: hidden;
		flex-direction: column;
		background: var(--color-surface);
		border: 1px solid var(--color-border-soft);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-card);
		transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
	}

	.prompt-card:hover {
		transform: translateY(-3px);
		border-color: color-mix(in srgb, var(--color-accent-teal) 48%, var(--color-border-soft));
		box-shadow: var(--shadow-elevated);
	}

	.image-link {
		display: grid;
		aspect-ratio: 4 / 3;
		place-items: center;
		overflow: hidden;
		background: #f4f4f2;
		border-bottom: 1px solid var(--color-border-subtle);
	}

	.image-link:focus-visible {
		outline: 3px solid var(--color-accent-honey);
		outline-offset: -3px;
	}

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		transition: transform var(--transition-normal);
	}

	.image-link:hover img { transform: scale(1.018); }

	.card-body {
		display: flex;
		flex: 1;
		flex-direction: column;
		padding: 16px;
	}

	.category {
		margin: 0 0 5px;
		color: var(--color-accent-teal);
		font-size: 0.68rem;
		font-weight: 800;
		line-height: 1.25;
		letter-spacing: 0.09em;
		text-transform: uppercase;
	}

	h2 {
		margin: 0;
		color: var(--color-text);
		font-family: var(--font-sans);
		font-size: 1rem;
		font-style: normal;
		font-weight: 700;
		line-height: 1.35;
	}

	.command-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		margin-top: 14px;
		padding: 7px 7px 7px 11px;
		background: var(--color-base);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-md);
	}

	code {
		min-width: 0;
		overflow: hidden;
		padding: 0;
		background: transparent;
		border: 0;
		color: var(--color-accent-honey);
		font-size: 0.78rem;
		font-weight: 600;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.copy-button {
		display: inline-flex;
		min-height: 32px;
		flex: 0 0 auto;
		align-items: center;
		gap: 6px;
		padding: 7px 9px;
		background: color-mix(in srgb, var(--color-accent-honey) 18%, var(--color-surface));
		border: 1px solid color-mix(in srgb, var(--color-accent-honey) 60%, var(--color-border));
		border-radius: var(--radius-sm);
		color: var(--color-text);
		font-family: var(--font-sans);
		font-size: 0.68rem;
		font-weight: 800;
		line-height: 1;
		cursor: pointer;
		transition: background var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
	}

	.copy-button:hover {
		background: var(--color-accent-honey);
		border-color: var(--color-accent-honey);
		color: var(--color-on-accent);
		transform: translateY(-1px);
	}

	.copy-button:focus-visible {
		outline: 2px solid var(--color-accent-teal);
		outline-offset: 2px;
	}

	.copy-button svg { width: 14px; height: 14px; }

	.use-cases {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 12px 0 0;
		padding: 0;
		list-style: none;
	}

	.use-cases li {
		padding: 4px 7px;
		background: color-mix(in srgb, var(--color-accent-teal) 9%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-accent-teal) 23%, var(--color-border-subtle));
		border-radius: var(--radius-full);
		color: var(--color-text-muted);
		font-size: 0.64rem;
		font-weight: 600;
		line-height: 1.2;
	}

	.card-footer {
		display: flex;
		min-height: 24px;
		align-items: flex-end;
		justify-content: space-between;
		gap: 8px;
		margin-top: auto;
		padding-top: 14px;
	}

	.card-footer a {
		color: var(--color-text-muted);
		font-size: 0.7rem;
		font-weight: 700;
		text-decoration: none;
	}

	.card-footer a:hover { color: var(--color-accent-honey); }

	.card-footer p {
		margin: 0;
		color: var(--color-accent-teal);
		font-size: 0.68rem;
		font-weight: 800;
		line-height: 1.2;
	}

	.card-footer p.error { color: var(--color-danger); }

	:global([data-theme='light']) .prompt-card {
		border-color: transparent;
		box-shadow: var(--shadow-neo-sm);
	}

	@media (prefers-reduced-motion: reduce) {
		.prompt-card,
		img,
		.copy-button { transition: none; }
	}
</style>
