<!-- Header with navigation and theme toggle -->

<script>
	import { page } from '$app/stores';
	import ThemeToggle from '../design-system/ThemeToggle.svelte';

	let scrolled = $state(false);

	function handleScroll() {
		scrolled = typeof window !== 'undefined' && window.scrollY > 20;
	}
</script>

<svelte:window onscroll={handleScroll} />

<header class="header" class:scrolled>
	<div class="header-inner">
		<a href="/" class="logo">
			<span class="logo-text">TRMT</span>
		</a>

		<nav class="nav">
			<a href="/blog" class="nav-link" class:active={$page.url.pathname.startsWith('/blog')}>Blog</a>
			<a href="/podcast" class="nav-link" class:active={$page.url.pathname.startsWith('/podcast')}>Zum Hoeren</a>
			<a href="/about" class="nav-link" class:active={$page.url.pathname.startsWith('/about')}>Ueber mich</a>
		</nav>

		<ThemeToggle variant="icon" />
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 50;
		background-color: transparent;
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-bottom: 1px solid transparent;
		transition: all var(--transition-normal);
	}

	.header.scrolled {
		background-color: rgba(11, 11, 11, 0.8);
		border-bottom: 1px solid var(--color-border-subtle);
	}

	:global([data-theme='light']) .header.scrolled {
		background-color: rgba(226, 216, 198, 0.8);
	}

	.header-inner {
		max-width: 1152px;
		margin: 0 auto;
		padding: 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo { text-decoration: none; }

	.logo-text {
		font-family: var(--font-display);
		font-weight: var(--font-weight-extrabold);
		font-size: var(--font-size-xl);
		color: var(--color-accent-honey);
		letter-spacing: var(--letter-spacing-wide);
		transition: all var(--transition-normal);
	}

	.logo:hover .logo-text {
		color: var(--color-accent-honey-hover);
		text-shadow: 0 0 20px var(--color-accent-honey-glow);
	}

	.nav { display: flex; align-items: center; gap: 32px; }

	.nav-link {
		color: var(--color-text-muted);
		text-decoration: none;
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		transition: color var(--transition-normal);
		position: relative;
	}

	.nav-link:hover { color: var(--color-text); }

	.nav-link.active { color: var(--color-accent-honey); }

	.nav-link.active::after {
		content: '';
		position: absolute;
		bottom: -6px;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, var(--color-accent-honey), var(--color-accent-teal));
		border-radius: 1px;
	}

	@media (max-width: 640px) {
		.nav { gap: 16px; }
		.nav-link { font-size: var(--font-size-sm); }
	}
</style>
