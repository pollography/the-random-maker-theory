<!-- The Random Maker Theory — Card Component (Svelte 5) -->

<script lang="ts">
	import type { Snippet } from 'svelte';

	type CardVariant = 'default' | 'interactive';
	type CardClickHandler = (event: MouseEvent) => void;

	let {
		variant = 'default',
		href = null,
		class: className = '',
		children,
		onclick,
	}: {
		variant?: CardVariant;
		href?: string | null;
		class?: string;
		children?: Snippet;
		onclick?: CardClickHandler;
	} = $props();
</script>

{#if href}
	<a {href} class="card {variant === 'interactive' ? 'interactive' : ''} {className}" onclick={onclick}>
		{@render children?.()}
	</a>
{:else if onclick}
	<button
		type="button"
		class="card card-button {variant === 'interactive' ? 'interactive' : ''} {className}"
		onclick={onclick}
	>
		{@render children?.()}
	</button>
{:else}
	<div class="card {className}">
		{@render children?.()}
	</div>
{/if}

<style>
	.card {
		background-color: var(--card-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--card-radius);
		box-shadow: var(--shadow-card);
		padding: 24px;
		transition: all var(--transition-normal);
		text-decoration: none;
		display: block;
		color: inherit;
	}

	.card.interactive:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-elevated), 0 0 20px rgba(212, 137, 62, 0.12);
		border-color: rgba(212, 137, 62, 0.35);
	}

	.card-button {
		width: 100%;
		font: inherit;
		text-align: inherit;
		cursor: pointer;
	}

	:global([data-theme='light']) .card {
		background: var(--gradient-card-bg);
		border: none;
		box-shadow: var(--shadow-neo-sm);
		backdrop-filter: blur(20px);
	}

	:global([data-theme='light']) .card.interactive:hover {
		box-shadow: var(--shadow-neo);
		transform: translateY(-2px);
	}

	@media (prefers-reduced-motion: reduce) {
		.card {
			transition: none;
		}

		.card.interactive:hover {
			transform: none;
		}

		:global([data-theme='light']) .card.interactive:hover {
			transform: none;
		}
	}
</style>
