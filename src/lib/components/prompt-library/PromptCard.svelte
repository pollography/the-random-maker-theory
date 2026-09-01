<script lang="ts">
	import { onDestroy } from 'svelte';
	import { copyPromptText } from '$lib/utils/prompt-actions.js';
	import { getPromptCopyText, getPromptThumbnail } from '$lib/utils/prompt-library.js';
	import { getImageSeo } from '$lib/utils/image-seo.js';

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
		promptType?: string;
		promptText?: string;
	};

	let {
		prompt,
		categoryLabel,
		onPreview,
		priority = false
	}: {
		prompt: Prompt;
		categoryLabel: string;
		onPreview: (prompt: Prompt, trigger: HTMLButtonElement) => void;
		priority?: boolean;
	} = $props();
	let previewImage = $derived(prompt.displayImage ?? prompt.image);
	let thumbnailImage = $derived(getPromptThumbnail(previewImage));
	let imageSeo = $derived(getImageSeo(
		thumbnailImage,
		'(max-width: 720px) calc(100vw - 40px), (max-width: 1100px) calc(50vw - 42px), 340px'
	));
	let copyText = $derived(getPromptCopyText(prompt));
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
			await copyPromptText(copyText, navigator.clipboard, document);
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
	<button
		type="button"
		class="image-button"
		class:transparent-preview={Boolean(prompt.displayImage)}
		onclick={(event) => onPreview(prompt, event.currentTarget)}
		aria-haspopup="dialog"
		aria-label="{prompt.title} groß anzeigen"
	>
		<img
			src={thumbnailImage}
			srcset={imageSeo.srcset}
			sizes={imageSeo.sizes}
			alt={prompt.alt}
			loading={priority ? 'eager' : 'lazy'}
			fetchpriority={priority ? 'high' : 'auto'}
			decoding="async"
			width={imageSeo.width}
			height={imageSeo.height}
		/>
	</button>

	<div class="card-body">
		<p class="category">{categoryLabel}</p>
		<h2>{prompt.title}</h2>

		<div class="command-row">
			<div class="command-label">
				<code>{prompt.command}</code>
				{#if prompt.articleSlug === 'praezise-bildprompts-weniger-zufall'}
					<span>Präziser Prompt</span>
				{:else if prompt.promptType === 'detailed'}
					<span>Ausführlicher Prompt</span>
				{/if}
			</div>
			<button type="button" class="copy-button" onclick={copyPrompt} aria-label="Prompt kopieren: {prompt.command}">
				<svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
					<rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.8" />
					<path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
				</svg>
				Prompt kopieren
			</button>
		</div>

		{#if prompt.promptType === 'detailed' && prompt.promptText}
			<details class="prompt-details">
				<summary>Vollständigen Prompt anzeigen</summary>
				<p>{prompt.promptText}</p>
			</details>
		{/if}

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
		content-visibility: auto;
		contain-intrinsic-size: auto 460px;
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

	.image-button {
		display: grid;
		width: 100%;
		aspect-ratio: 4 / 3;
		place-items: center;
		overflow: hidden;
		padding: 0;
		background: #f4f4f2;
		border: 0;
		border-bottom: 1px solid var(--color-border-subtle);
		color: inherit;
		cursor: zoom-in;
	}

	.image-button.transparent-preview {
		background-color: #274047;
		background-image:
			linear-gradient(45deg, rgb(255 255 255 / 7%) 25%, transparent 25%),
			linear-gradient(-45deg, rgb(255 255 255 / 7%) 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, rgb(255 255 255 / 7%) 75%),
			linear-gradient(-45deg, transparent 75%, rgb(255 255 255 / 7%) 75%);
		background-position: 0 0, 0 12px, 12px -12px, -12px 0;
		background-size: 24px 24px;
	}

	.image-button:focus-visible {
		outline: none;
		box-shadow: inset 0 0 0 3px #fff, inset 0 0 0 6px #111;
	}

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		transition: transform var(--transition-normal);
	}

	.image-button:hover img { transform: scale(1.018); }

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

	.command-label {
		display: flex;
		min-width: 0;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}

	.command-label span {
		padding: 3px 7px;
		background: color-mix(in srgb, var(--color-accent-teal) 12%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-accent-teal) 32%, transparent);
		border-radius: var(--radius-full);
		color: var(--color-accent-teal);
		font-size: 0.58rem;
		font-weight: 800;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.prompt-details {
		padding: 9px 11px;
		background: color-mix(in srgb, var(--color-accent-teal) 5%, var(--color-elevated));
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-md);
	}

	.prompt-details summary {
		color: var(--color-text-muted);
		font-size: 0.7rem;
		font-weight: 750;
		cursor: pointer;
	}

	.prompt-details p {
		margin: 9px 0 0;
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: 0.65rem;
		line-height: 1.55;
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
