<!-- Header with navigation, theme toggle, and mobile menu -->

<script>
	import { page } from '$app/stores';
	import ThemeToggle from '../design-system/ThemeToggle.svelte';

	let scrolled = $state(false);
	let mobileOpen = $state(false);
	/** @type {HTMLElement | null} */
	let headerElement = $state(null);
	/** @type {HTMLButtonElement | null} */
	let burgerButton = $state(null);

	function handleScroll() {
		scrolled = typeof window !== 'undefined' && window.scrollY > 20;
	}

	function closeMobile() {
		mobileOpen = false;
	}

	/** @param {string} path */
	function isActive(path) {
		/** @type {string} */
		const pathname = $page.url.pathname;
		return pathname === path || pathname.startsWith(`${path}/`);
	}

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.key === 'Escape' && mobileOpen) {
			mobileOpen = false;
			requestAnimationFrame(() => burgerButton?.focus());
		}
	}

	/** @param {MouseEvent | PointerEvent} event */
	function handleOutsideClick(event) {
		if (mobileOpen && headerElement && !event.composedPath().includes(headerElement)) {
			mobileOpen = false;
		}
	}
</script>

<svelte:window onscroll={handleScroll} onkeydown={handleKeydown} onclick={handleOutsideClick} />

<header class="header" class:scrolled bind:this={headerElement}>
	<div class="header-inner">
		<a href="/" class="logo" onclick={closeMobile} aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
			<span class="logo-text">TRMT</span>
		</a>

		<!-- Desktop Nav -->
		<nav class="nav-desktop">
			<a href="/blog" class="nav-link" class:active={isActive('/blog')} aria-current={isActive('/blog') ? 'page' : undefined}>Blog</a>
			<a href="/tools/bildprompt-library" class="nav-link" class:active={isActive('/tools')} aria-current={isActive('/tools') ? 'page' : undefined}>Tools</a>
			<a href="/podcast" class="nav-link" class:active={isActive('/podcast')} aria-current={isActive('/podcast') ? 'page' : undefined}>Zum Hören</a>
			<a href="/about" class="nav-link" class:active={isActive('/about')} aria-current={isActive('/about') ? 'page' : undefined}>Über TRMT</a>
		</nav>

		<div class="header-actions">
			<ThemeToggle variant="icon" />
			<button
				bind:this={burgerButton}
				class="burger"
				class:open={mobileOpen}
				onclick={() => mobileOpen = !mobileOpen}
				aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
				aria-expanded={mobileOpen}
				aria-controls="mobile-navigation"
			>
				<span class="burger-line"></span>
				<span class="burger-line"></span>
				<span class="burger-line"></span>
			</button>
		</div>
	</div>

	<!-- Mobile Nav -->
	{#if mobileOpen}
		<nav id="mobile-navigation" class="nav-mobile">
			<a href="/blog" class="nav-link-mobile" class:active={isActive('/blog')} aria-current={isActive('/blog') ? 'page' : undefined} onclick={closeMobile}>Blog</a>
			<a href="/tools/bildprompt-library" class="nav-link-mobile" class:active={isActive('/tools')} aria-current={isActive('/tools') ? 'page' : undefined} onclick={closeMobile}>Tools</a>
			<a href="/podcast" class="nav-link-mobile" class:active={isActive('/podcast')} aria-current={isActive('/podcast') ? 'page' : undefined} onclick={closeMobile}>Zum Hören</a>
			<a href="/about" class="nav-link-mobile" class:active={isActive('/about')} aria-current={isActive('/about') ? 'page' : undefined} onclick={closeMobile}>Über TRMT</a>
		</nav>
	{/if}
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

	:global([data-theme='light']) .logo-text {
		text-shadow: none;
	}

	:global([data-theme='light']) .logo:hover .logo-text {
		text-shadow: 0 0 12px rgba(196, 133, 76, 0.3);
	}

	.header-inner {
		max-width: 1152px;
		margin: 0 auto;
		padding: 6px 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.logo { text-decoration: none; }

	.logo-text {
		font-family: var(--font-display);
		font-weight: var(--font-weight-extrabold);
		font-size: var(--font-size-xl);
		color: var(--color-accent-honey-foreground);
		letter-spacing: var(--letter-spacing-wide);
		transition: all var(--transition-normal);
		text-shadow:
			0 0 8px rgba(212, 137, 62, 0.3),
			0 0 20px rgba(212, 137, 62, 0.15);
	}

	.logo:hover .logo-text {
		color: var(--color-accent-honey-foreground);
		text-shadow:
			0 0 10px rgba(212, 137, 62, 0.6),
			0 0 25px rgba(212, 137, 62, 0.35),
			0 0 50px rgba(212, 137, 62, 0.15);
	}

	/* Desktop Nav */
	.nav-desktop { display: flex; align-items: center; gap: 32px; }

	.nav-link {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		min-width: 44px;
		color: var(--color-text-muted);
		text-decoration: none;
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		transition: color var(--transition-normal);
		position: relative;
	}

	.nav-link:hover { color: var(--color-text); }

	.nav-link.active { color: var(--color-accent-honey-foreground); }

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

	/* Burger Button */
	.burger {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: 44px;
		height: 44px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.burger-line {
		display: block;
		width: 100%;
		height: 2px;
		background: var(--color-text-muted);
		border-radius: 2px;
		transition: all 0.25s ease;
	}

	.burger.open .burger-line:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}

	.burger.open .burger-line:nth-child(2) {
		opacity: 0;
	}

	.burger.open .burger-line:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	/* Mobile Nav */
	.nav-mobile {
		display: none;
		flex-direction: column;
		padding: 0 16px 20px;
		gap: 0;
		border-top: 1px solid var(--color-border-subtle);
		animation: slideDown 0.2s ease-out;
	}

	@keyframes slideDown {
		from { opacity: 0; transform: translateY(-8px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.nav-link-mobile {
		display: flex;
		align-items: center;
		min-height: 44px;
		min-width: 44px;
		padding: 14px 0;
		color: var(--color-text-muted);
		text-decoration: none;
		font-size: var(--font-size-md);
		font-weight: var(--font-weight-medium);
		border-bottom: 1px solid var(--color-border-subtle);
		transition: color var(--transition-normal);
	}

	.nav-link-mobile:last-child {
		border-bottom: none;
	}

	.nav-link-mobile:hover { color: var(--color-text); }
	.nav-link-mobile.active { color: var(--color-accent-honey-foreground); }

	@media (max-width: 640px) {
		.nav-desktop { display: none; }
		.burger { display: flex; }
		.nav-mobile { display: flex; }
	}

	@media (prefers-reduced-motion: reduce) {
		.header,
		.logo-text,
		.nav-link,
		.nav-link-mobile,
		.burger-line {
			transition: none;
		}

		.nav-mobile {
			animation: none;
		}
	}
</style>
