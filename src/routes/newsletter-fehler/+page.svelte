<svelte:head>
	<title>Link ungültig — TRMT</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="error-page">
	<div class="error-icon">✗</div>
	<h1 class="error-title">Link ungültig oder abgelaufen</h1>
	<p class="error-text">
		Der Bestätigungslink ist leider nicht mehr gültig. Links laufen nach 48 Stunden ab.
		Melde dich einfach nochmal an.
	</p>
	<div class="error-actions">
		<a href="/#newsletter" class="btn-honey">Nochmal anmelden</a>
		<a href="/" class="btn-outline">Zur Startseite</a>
	</div>
</div>

<style>
	.error-page {
		max-width: 520px;
		margin: 120px auto;
		padding: 0 24px;
		text-align: center;
	}

	.error-icon {
		width: 64px;
		height: 64px;
		margin: 0 auto 24px;
		background: rgba(220, 80, 60, 0.1);
		border: 2px solid rgba(220, 80, 60, 0.3);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28px;
		color: #dc503c;
	}

	.error-title {
		font-family: var(--font-display);
		font-size: var(--font-size-2xl);
		color: var(--color-text);
		margin: 0 0 16px;
	}

	.error-text {
		color: var(--color-text-muted);
		font-size: var(--font-size-md);
		line-height: var(--line-height-relaxed);
		margin: 0 0 32px;
	}

	.error-actions {
		display: flex;
		gap: 12px;
		justify-content: center;
	}

	.btn-honey {
		padding: 12px 24px;
		background: var(--color-accent-honey);
		color: var(--color-on-accent);
		border-radius: var(--radius-lg);
		text-decoration: none;
		font-weight: var(--font-weight-semibold);
		transition: all var(--transition-normal);
	}

	.btn-honey:hover {
		background: var(--color-accent-honey-hover);
		transform: translateY(-2px);
		box-shadow: 0 0 20px rgba(212, 137, 62, 0.4), 0 0 40px rgba(212, 137, 62, 0.15), 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.btn-outline {
		padding: 12px 24px;
		border: 1px solid var(--color-border);
		color: var(--color-text-muted);
		border-radius: var(--radius-lg);
		text-decoration: none;
		font-weight: var(--font-weight-semibold);
		transition: all var(--transition-normal);
	}

	.btn-outline:hover {
		border-color: var(--color-text-muted);
		color: var(--color-text);
	}
</style>
