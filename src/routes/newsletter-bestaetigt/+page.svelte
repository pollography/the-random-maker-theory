<svelte:head>
	<title>Newsletter bestätigt — TRMT</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="confirm-page">
	<div class="confirm-icon">✓</div>
	<h1 class="confirm-title">Du bist drin.</h1>
	<p class="confirm-text">
		Deine E-Mail ist bestätigt. Ab jetzt kriegst du das Beste aus Tech, KI und Maker-Welt direkt in dein Postfach.
	</p>
	<a href="/" class="confirm-btn">Zurück zur Startseite</a>
</section>

<style>
	.confirm-page {
		text-align: center;
		padding: 6rem 1rem;
		max-width: 32rem;
		margin: 0 auto;
	}

	.confirm-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 64px;
		height: 64px;
		background: var(--color-accent-teal);
		color: var(--color-on-accent);
		border-radius: 50%;
		font-size: 2rem;
		font-weight: var(--font-weight-bold);
		margin-bottom: 1.5rem;
	}

	.confirm-title {
		font-family: var(--font-display);
		font-weight: var(--font-weight-extrabold);
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		color: var(--color-text);
		margin: 0 0 1rem;
	}

	.confirm-text {
		color: var(--color-text-muted);
		font-size: var(--font-size-md);
		line-height: var(--line-height-relaxed);
		margin: 0 0 2rem;
	}

	.confirm-btn {
		display: inline-flex;
		align-items: center;
		padding: 14px 28px;
		background: var(--color-accent-honey);
		color: var(--color-on-accent);
		border-radius: var(--radius-lg);
		font-weight: var(--font-weight-semibold);
		text-decoration: none;
		transition: all var(--transition-normal);
	}

	.confirm-btn:hover {
		background: var(--color-accent-honey-hover);
		box-shadow: 0 0 20px rgba(212, 137, 62, 0.4), 0 0 40px rgba(212, 137, 62, 0.15), 0 4px 12px rgba(0, 0, 0, 0.2);
		transform: translateY(-2px);
	}
</style>
