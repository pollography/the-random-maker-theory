<script lang="ts">
	import { onDestroy, tick } from 'svelte';
	import { getImageSeo } from '$lib/utils/image-seo.js';

	type Prompt = {
		command: string;
		title: string;
		image: string;
		displayImage?: string | null;
		alt: string;
	};

	let { prompt, onClose }: { prompt: Prompt | null; onClose: () => void } = $props();
	let dialog = $state<HTMLDialogElement>();
	let closeButton = $state<HTMLButtonElement>();
	let bodyScrollLocked = false;
	let previousBodyOverflow = '';
	let imageSrc = $derived(prompt ? prompt.displayImage ?? prompt.image : null);
	let imageSeo = $derived(getImageSeo(imageSrc, '(max-width: 1120px) calc(100vw - 32px), 1120px'));

	function lockBodyScroll() {
		if (bodyScrollLocked) return;
		previousBodyOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		bodyScrollLocked = true;
	}

	function unlockBodyScroll() {
		if (!bodyScrollLocked) return;
		document.body.style.overflow = previousBodyOverflow;
		bodyScrollLocked = false;
	}

	$effect(() => {
		if (!dialog) return;

		if (prompt) {
			if (!dialog.open) dialog.showModal();
			lockBodyScroll();
			tick().then(() => closeButton?.focus());
		} else {
			if (dialog.open) dialog.close();
			unlockBodyScroll();
		}
	});

	function handleCancel(event: Event) {
		event.preventDefault();
		onClose();
	}

	function handleBackdrop(event: MouseEvent) {
		if (event.target === dialog) onClose();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			event.preventDefault();
			onClose();
		}
	}

	onDestroy(() => {
		unlockBodyScroll();
		if (dialog?.open) dialog.close();
	});
</script>

<dialog
	bind:this={dialog}
	aria-modal="true"
	aria-label={prompt ? `${prompt.title} groß angezeigt` : 'Bildvorschau'}
	oncancel={handleCancel}
	onclick={handleBackdrop}
	onkeydown={handleKeydown}
>
	{#if prompt}
		<div class="lightbox-panel">
			<button bind:this={closeButton} type="button" class="close-button" onclick={onClose} aria-label="Schließen">
				<svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
					<path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
				</svg>
			</button>

			<div class="image-stage" class:transparent-canvas={Boolean(prompt.displayImage)}>
				<img
					src={imageSrc}
					srcset={imageSeo.srcset}
					sizes={imageSeo.sizes}
					alt={prompt.alt}
					width={imageSeo.width}
					height={imageSeo.height}
					decoding="async"
				/>
			</div>

			<div class="caption">
				<h2>{prompt.title}</h2>
				<code>{prompt.command}</code>
			</div>
		</div>
	{/if}
</dialog>

<style>
	dialog {
		width: 100vw;
		max-width: none;
		height: 100dvh;
		max-height: none;
		margin: 0;
		padding: clamp(16px, 4vw, 48px);
		background: transparent;
		border: 0;
		color: var(--color-text);
		overflow: auto;
	}

	dialog[open] {
		display: grid;
		place-items: center;
		animation: reveal 180ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	dialog::backdrop {
		background: rgb(7 12 15 / 88%);
		backdrop-filter: blur(10px);
	}

	.lightbox-panel {
		position: relative;
		display: grid;
		width: min(1120px, 100%);
		max-height: calc(100dvh - clamp(32px, 8vw, 96px));
		overflow: hidden;
		background: var(--color-surface);
		border-radius: var(--radius-xl);
		box-shadow: 0 22px 80px rgb(0 0 0 / 45%);
	}

	.image-stage {
		display: grid;
		min-height: 0;
		place-items: center;
		overflow: hidden;
		background: #171b1d;
	}

	.image-stage.transparent-canvas {
		background-color: #274047;
		background-image:
			linear-gradient(45deg, rgb(255 255 255 / 7%) 25%, transparent 25%),
			linear-gradient(-45deg, rgb(255 255 255 / 7%) 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, rgb(255 255 255 / 7%) 75%),
			linear-gradient(-45deg, transparent 75%, rgb(255 255 255 / 7%) 75%);
		background-position: 0 0, 0 16px, 16px -16px, -16px 0;
		background-size: 32px 32px;
	}

	img {
		display: block;
		width: auto;
		max-width: 100%;
		height: auto;
		max-height: calc(100dvh - 180px);
		object-fit: contain;
	}

	.caption {
		display: flex;
		min-height: 68px;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		padding: 14px 20px;
	}

	.caption h2 {
		margin: 0;
		font-family: var(--font-sans);
		font-size: clamp(1rem, 2vw, 1.25rem);
		font-style: normal;
		line-height: 1.3;
	}

	.caption code {
		flex: 0 0 auto;
		padding: 6px 9px;
		background: var(--color-base);
		border-radius: var(--radius-sm);
		color: var(--color-accent-honey);
		font-size: 0.78rem;
	}

	.close-button {
		position: absolute;
		top: 12px;
		right: 12px;
		z-index: 1;
		display: grid;
		width: 44px;
		height: 44px;
		place-items: center;
		padding: 0;
		background: rgb(10 16 19 / 82%);
		border: 1px solid rgb(255 255 255 / 18%);
		border-radius: var(--radius-full);
		box-shadow: 0 7px 20px rgb(0 0 0 / 30%);
		color: #fff;
		cursor: pointer;
		transition: background var(--transition-fast), transform var(--transition-fast);
	}

	.close-button:hover {
		background: var(--color-accent-honey);
		color: var(--color-on-accent);
		transform: translateY(-1px);
	}

	.close-button:focus-visible {
		outline: none;
		box-shadow: inset 0 0 0 3px #fff, inset 0 0 0 6px #111;
	}

	.close-button svg { width: 22px; height: 22px; }

	@keyframes reveal {
		from { opacity: 0.72; transform: translateY(8px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@media (max-width: 640px) {
		dialog { padding: 10px; }
		.lightbox-panel { max-height: calc(100dvh - 20px); border-radius: var(--radius-lg); }
		img { max-height: calc(100dvh - 126px); }
		.caption { min-height: 62px; padding: 12px 14px; }
		.close-button { top: 8px; right: 8px; }
	}

	@media (prefers-reduced-motion: reduce) {
		dialog[open],
		.close-button { animation: none; transition: none; }
	}
</style>
