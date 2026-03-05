<!-- The Random Maker Theory — Button Component (Svelte 5)
     Primary interactive element with multiple variants and sizes
     Usage:
       <Button>Default</Button>
       <Button variant="primary" size="lg">Large Primary</Button>
       <Button variant="danger" disabled>Disabled Danger</Button>
-->

<script>
	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		type = 'button',
		icon = null,
		loading = false,
		class: className = '',
		children,
		onclick,
		onfocus,
		onblur,
	} = $props();

	const variantStyles = {
		primary: 'bg-honey text-on-accent hover:bg-honey-hover shadow-glow-honey',
		secondary: 'bg-teal text-on-accent hover:bg-teal-hover shadow-glow-teal',
		ghost: 'bg-transparent text-text hover:bg-surface-raised border border-border-subtle',
		danger: 'bg-danger text-on-accent hover:bg-red-700',
	};

	const sizeStyles = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg',
	};

	const loadingClass = loading ? 'opacity-75 cursor-wait' : '';
	let buttonClass = $derived(`btn inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-normal disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${loadingClass} ${className}`);
</script>

<button
	{type}
	disabled={disabled || loading}
	class={buttonClass}
	{onclick}
	{onfocus}
	{onblur}
>
	{#if loading}
		<svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	{:else if icon}
		<span>{icon}</span>
	{/if}

	{@render children?.()}
</button>

<style>
	/* Button styles handled by Tailwind */
	:global(button) {
		user-select: none;
		-webkit-user-select: none;
	}
</style>
