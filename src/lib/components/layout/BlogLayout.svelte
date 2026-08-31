<!-- Blog Post Layout for mdsvex -->

<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { copyPromptText, getPromptDestinations } from '$lib/utils/prompt-actions.js';

	let { children }: { children?: Snippet } = $props();
	let contentRoot: HTMLDivElement | undefined;

	onMount(() => {
		if (!contentRoot) return;

		const cleanups: Array<() => void> = [];
		const timers: number[] = [];
		const promptCodes = contentRoot.querySelectorAll<HTMLElement>('pre > code.language-prompt');

		promptCodes.forEach((code: HTMLElement) => {
			const pre = code.parentElement;
			const parent = pre?.parentElement;
			const prompt = code.textContent ?? '';

			if (!pre || !parent || !prompt.trim() || pre.dataset.promptEnhanced === 'true') return;

			pre.dataset.promptEnhanced = 'true';
			const destinations = getPromptDestinations(prompt);
			const wrapper = document.createElement('section');
			const toolbar = document.createElement('div');
			const label = document.createElement('span');
			const actions = document.createElement('div');
			const status = document.createElement('p');

			wrapper.className = 'prompt-block';
			wrapper.setAttribute('aria-label', 'Kopierbarer Prompt');
			toolbar.className = 'prompt-toolbar';
			actions.className = 'prompt-actions';
			label.className = 'prompt-label';
			label.textContent = 'PROMPT';
			status.className = 'prompt-status';
			status.setAttribute('aria-live', 'polite');

			let statusTimer: number | undefined;
			const showStatus = (message: string, isError = false) => {
				status.textContent = message;
				status.dataset.state = isError ? 'error' : 'success';
				if (statusTimer) clearTimeout(statusTimer);
				statusTimer = window.setTimeout(() => {
					status.textContent = '';
					delete status.dataset.state;
				}, 5000);
				timers.push(statusTimer);
			};

			const copy = async (message: string) => {
				try {
					await copyPromptText(prompt, navigator.clipboard, document);
					showStatus(message);
				} catch {
					showStatus('Kopieren ging nicht. Du kannst den Prompt oben manuell markieren.', true);
				}
			};

			const copyButton = document.createElement('button');
			copyButton.type = 'button';
			copyButton.className = 'prompt-action prompt-action-primary';
			copyButton.dataset.promptAction = 'copy';
			copyButton.textContent = 'Prompt kopieren';
			const copyHandler = () => copy('Prompt kopiert.');
			copyButton.addEventListener('click', copyHandler);
			cleanups.push(() => copyButton.removeEventListener('click', copyHandler));
			actions.appendChild(copyButton);

			const webLinks: Array<[string, string, string]> = [
				['chatgpt', 'In ChatGPT öffnen', destinations.chatgpt],
				['claude', 'In Claude öffnen', destinations.claude]
			];

			webLinks.forEach(([action, text, href]) => {
				const link = document.createElement('a');
				link.className = 'prompt-action';
				link.dataset.promptAction = action;
				link.href = href;
				link.target = '_blank';
				link.rel = 'noopener noreferrer';
				link.textContent = text;
				const handler = () => copy('Prompt kopiert. Im neuen Tab einfach einfügen.');
				link.addEventListener('click', handler);
				cleanups.push(() => link.removeEventListener('click', handler));
				actions.appendChild(link);
			});

			const desktopLink = document.createElement('a');
			desktopLink.className = 'prompt-action prompt-action-secondary';
			desktopLink.dataset.promptAction = 'claude-desktop';
			desktopLink.href = destinations.claudeDesktop;
			desktopLink.textContent = 'Claude App';
			const desktopHandler = () => copy('Prompt kopiert. Claude Desktop wird geöffnet.');
			desktopLink.addEventListener('click', desktopHandler);
			cleanups.push(() => desktopLink.removeEventListener('click', desktopHandler));
			actions.appendChild(desktopLink);

			toolbar.append(label, actions);
			parent.insertBefore(wrapper, pre);
			wrapper.append(toolbar, pre, status);
		});

		return () => {
			cleanups.forEach((cleanup) => cleanup());
			timers.forEach((timer) => clearTimeout(timer));
		};
	});
</script>

<div class="prose prose-invert max-w-none" bind:this={contentRoot}>
	{@render children?.()}
</div>

<style>
	:global(.prose code) {
		background-color: var(--color-surface-raised);
		color: var(--color-text);
		padding: 0.25rem 0.5rem;
		border-radius: 0.375rem;
	}

	:global(.prose pre) {
		background-color: var(--color-surface-raised);
		border: 1px solid var(--color-border);
	}

	:global(.prose a) {
		color: var(--color-accent-honey);
	}

	:global(.prose a:hover) {
		color: var(--color-accent-honey-hover);
	}

	:global(.prompt-block) {
		margin: 1.25rem 0;
		overflow: hidden;
		border: 1px solid color-mix(in srgb, var(--color-accent-honey) 48%, var(--color-border));
		border-radius: 0.75rem;
		background: var(--color-surface-raised);
		box-shadow: 0 0.5rem 1.5rem hsl(0 0% 0% / 0.12);
	}

	:global(.prompt-toolbar) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.5rem 0.625rem;
		border-bottom: 1px solid var(--color-border);
		background: linear-gradient(
			120deg,
			color-mix(in srgb, var(--color-accent-honey) 12%, transparent),
			color-mix(in srgb, var(--color-accent-teal) 8%, transparent)
		);
	}

	:global(.prompt-label) {
		flex: 0 0 auto;
		color: var(--color-accent-honey);
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.14em;
	}

	:global(.prompt-actions) {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 0.375rem;
	}

	:global(.prose .prompt-action) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2rem;
		margin: 0;
		padding: 0.35rem 0.55rem;
		border: 1px solid var(--color-border);
		border-radius: 0.55rem;
		background: color-mix(in srgb, var(--color-surface-raised) 78%, var(--color-text) 6%);
		color: var(--color-text);
		font: inherit;
		font-size: 0.72rem;
		font-weight: 700;
		line-height: 1.1;
		text-decoration: none;
		cursor: pointer;
		transition: border-color 140ms ease, background-color 140ms ease, transform 140ms ease;
	}

	:global(.prose .prompt-action:hover) {
		border-color: var(--color-accent-teal);
		background: color-mix(in srgb, var(--color-accent-teal) 13%, var(--color-surface-raised));
		color: var(--color-text);
		transform: translateY(-1px);
	}

	:global(.prose .prompt-action:focus-visible) {
		outline: 2px solid var(--color-accent-honey);
		outline-offset: 2px;
	}

	:global(.prose .prompt-action-primary) {
		border-color: color-mix(in srgb, var(--color-accent-honey) 72%, var(--color-border));
		background: color-mix(in srgb, var(--color-accent-honey) 18%, var(--color-surface-raised));
	}

	:global(.prose .prompt-action-secondary) {
		border-style: dashed;
		color: var(--color-text-muted);
	}

	:global(.prompt-block pre) {
		margin: 0;
		border: 0;
		border-radius: 0;
		background: transparent;
	}

	:global(.prompt-block pre code) {
		display: block;
		padding: 0.75rem 0.875rem;
		background: transparent;
		color: var(--color-text);
		font-size: 0.88rem;
		line-height: 1.55;
		white-space: pre-wrap;
		word-break: break-word;
	}

	:global(.prompt-status) {
		min-height: 0;
		margin: 0;
		padding: 0.3rem 0.625rem 0.45rem;
		color: var(--color-accent-teal);
		font-size: 0.75rem;
		line-height: 1.2;
	}

	:global(.prompt-status:empty) {
		display: none;
	}

	:global(.prompt-status[data-state='error']) {
		color: var(--color-accent-honey);
	}

	@media (max-width: 42rem) {
		:global(.prompt-toolbar) {
			align-items: flex-start;
			flex-direction: column;
		}

		:global(.prompt-actions) {
			justify-content: flex-start;
			width: 100%;
		}

		:global(.prose .prompt-action) {
			font-size: 0.7rem;
		}
	}
</style>
