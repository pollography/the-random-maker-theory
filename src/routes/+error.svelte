<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Seite nicht gefunden — TRMT</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="error-page">
	<span class="error-code">{$page.status}</span>
	<h1 class="error-title">
		{#if $page.status === 404}
			Hier ist nichts.
		{:else}
			Da ist was schiefgelaufen.
		{/if}
	</h1>
	<p class="error-desc">
		{#if $page.status === 404}
			Die Seite existiert nicht oder wurde verschoben. Passiert den Besten.
		{:else}
			{$page.error?.message || 'Unbekannter Fehler. Versuch es nochmal.'}
		{/if}
	</p>
	<div class="error-actions">
		<a href="/" class="btn-honey">Zur Startseite</a>
		<a href="/blog" class="btn-teal">Zum Blog</a>
	</div>
</section>

<style>
	.error-page {
		text-align: center;
		padding: 120px 1rem 80px;
		max-width: 520px;
		margin: 0 auto;
	}

	.error-code {
		font-family: var(--font-display);
		font-size: clamp(80px, 15vw, 140px);
		font-weight: 400;
		color: var(--color-accent-honey);
		line-height: 1;
		opacity: 0.15;
		display: block;
		margin-bottom: -20px;
	}

	.error-title {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(24px, 5vw, 36px);
		color: var(--color-text);
		margin: 0 0 16px;
	}

	.error-desc {
		color: var(--color-text-muted);
		font-size: var(--font-size-md);
		line-height: 1.6;
		margin: 0 0 40px;
	}

	.error-actions {
		display: flex;
		gap: 16px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn-honey, .btn-teal {
		display: inline-flex;
		align-items: center;
		padding: 14px 28px;
		border-radius: var(--radius-lg);
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-base);
		text-decoration: none;
		transition: all var(--transition-normal);
		border: none;
	}

	.btn-honey {
		background: var(--color-accent-honey);
		color: var(--color-on-accent);
	}
	.btn-honey:hover {
		background: var(--color-accent-honey-hover);
		transform: translateY(-2px);
		box-shadow: 0 0 20px rgba(212, 137, 62, 0.4), 0 0 40px rgba(212, 137, 62, 0.15), 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.btn-teal {
		background: var(--color-accent-teal);
		color: var(--color-on-accent);
	}
	.btn-teal:hover {
		background: var(--color-accent-teal-hover);
		transform: translateY(-2px);
		box-shadow: 0 0 20px rgba(58, 176, 162, 0.4), 0 0 40px rgba(58, 176, 162, 0.15), 0 4px 12px rgba(0, 0, 0, 0.2);
	}
</style>
