<!-- The Random Maker Theory — Theme Toggle Component (Svelte 5) -->

<script>
	import { theme } from '../../stores/theme.js';

	let {
		variant = 'icon',
		class: className = '',
		onclick,
	} = $props();

	const icons = {
		light: '☀️',
		dark: '🌙',
	};

	function handleToggle() {
		theme.toggleTheme();
		onclick?.();
	}
</script>

{#if variant === 'icon'}
	<button
		class="btn btn-ghost p-2 rounded-full hover:bg-surface-raised transition-colors {className}"
		{onclick}
		aria-label="Toggle theme"
		title={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	>
		<span class="text-lg">
			{$theme === 'dark' ? icons.dark : icons.light}
		</span>
	</button>
{:else if variant === 'button'}
	<button
		class="btn btn-secondary btn-sm {className}"
		{onclick}
		aria-label="Toggle theme"
	>
		<span class="mr-2">
			{$theme === 'dark' ? icons.dark : icons.light}
		</span>
		{$theme === 'dark' ? 'Dark' : 'Light'}
	</button>
{:else if variant === 'toggle'}
	<label class="flex items-center gap-3 cursor-pointer {className}">
		<span class="text-sm font-medium text-text-muted">
			{icons.light}
		</span>

		<div
			class="relative w-12 h-6 rounded-full transition-colors"
			class:bg-honey={$theme === 'dark'}
			class:bg-border-subtle={$theme === 'light'}
		>
			<div
				class="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200"
				class:translate-x-6={$theme === 'dark'}
				class:translate-x-1={$theme === 'light'}
			></div>
		</div>

		<span class="text-sm font-medium text-text-muted">
			{icons.dark}
		</span>

		<input
			type="checkbox"
			class="sr-only"
			checked={$theme === 'dark'}
			onchange={handleToggle}
			aria-label="Toggle dark mode"
		/>
	</label>
{/if}

<style>
	/* Component specific styles */
</style>
