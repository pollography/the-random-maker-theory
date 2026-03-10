<script>
	let email = $state('');
	let status = $state('idle'); // idle, loading, success, error
	let message = $state('');

	async function handleSubmit(e) {
		e.preventDefault();
		if (!email || !email.includes('@')) return;

		status = 'loading';

		try {
			const res = await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});

			const data = await res.json();

			if (res.ok) {
				status = 'success';
				message = 'Check deine Mails. Double-Opt-In halt.';
				email = '';
			} else {
				status = 'error';
				message = data.error || 'Hat nicht geklappt. Versuch es nochmal.';
			}
		} catch (err) {
			status = 'error';
			message = 'Verbindung fehlgeschlagen. Versuch es nochmal.';
		}
	}
</script>

<div class="newsletter-wrap">
	<div class="newsletter-card">
		<div class="newsletter-content">
			<h3 class="newsletter-title">Newsletter</h3>
			<p class="newsletter-desc">
				Die besten Tech-Finds, direkt in dein Postfach. Kein Spam. Kein Bullshit.
			</p>
		</div>

		{#if status === 'success'}
			<div class="newsletter-success">
				<span class="success-icon">✓</span>
				<p>{message}</p>
			</div>
		{:else}
			<form class="newsletter-form" onsubmit={handleSubmit}>
				<div class="input-group">
					<input
						type="email"
						bind:value={email}
						placeholder="deine@email.de"
						required
						disabled={status === 'loading'}
						class="newsletter-input"
					/>
					<button
						type="submit"
						disabled={status === 'loading'}
						class="newsletter-btn"
					>
						{status === 'loading' ? '...' : 'Anmelden'}
					</button>
				</div>
				{#if status === 'error'}
					<p class="newsletter-error">{message}</p>
				{/if}
				<p class="newsletter-hint">DSGVO-konform. Double-Opt-In. Jederzeit abmeldbar.</p>
			</form>
		{/if}
	</div>
</div>

<style>
	.newsletter-wrap {
		margin-top: 48px;
	}

	.newsletter-card {
		padding: 40px;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-card);
		position: relative;
		overflow: hidden;
	}

	.newsletter-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, var(--color-accent-honey), var(--color-accent-teal));
	}

	.newsletter-title {
		font-family: var(--font-display);
		font-weight: var(--font-weight-bold);
		font-size: var(--font-size-2xl);
		color: var(--color-text);
		margin: 0 0 8px;
	}

	.newsletter-desc {
		color: var(--color-text-muted);
		font-size: var(--font-size-md);
		line-height: var(--line-height-relaxed);
		margin: 0 0 24px;
	}

	.newsletter-form {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.input-group {
		display: flex;
		gap: 12px;
	}

	.newsletter-input {
		flex: 1;
		padding: 14px 18px;
		background: var(--input-bg);
		border: var(--input-border);
		border-radius: var(--radius-lg);
		color: var(--color-text);
		font-size: var(--font-size-base);
		font-family: var(--font-body);
		transition: all var(--transition-normal);
		outline: none;
	}

	.newsletter-input::placeholder {
		color: var(--color-text-dim);
	}

	.newsletter-input:focus {
		border-color: var(--input-focus-border);
		box-shadow: var(--input-focus-ring);
	}

	.newsletter-btn {
		padding: 14px 28px;
		background: var(--color-accent-honey);
		color: var(--color-on-accent);
		border: none;
		border-radius: var(--radius-lg);
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-base);
		font-family: var(--font-body);
		cursor: pointer;
		transition: all var(--transition-normal);
		white-space: nowrap;
	}

	.newsletter-btn:hover:not(:disabled) {
		background: var(--color-accent-honey-hover);
		box-shadow: var(--shadow-glow-honey);
		transform: translateY(-1px);
	}

	.newsletter-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.newsletter-hint {
		color: var(--color-text-dim);
		font-size: var(--font-size-xs);
		margin: 0;
	}

	.newsletter-error {
		color: var(--color-danger);
		font-size: var(--font-size-sm);
		margin: 0;
	}

	.newsletter-success {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px;
		background: rgba(58, 176, 162, 0.1);
		border: 1px solid rgba(58, 176, 162, 0.3);
		border-radius: var(--radius-lg);
	}

	.success-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: var(--color-accent-teal);
		color: var(--color-on-accent);
		border-radius: 50%;
		font-weight: var(--font-weight-bold);
		flex-shrink: 0;
	}

	.newsletter-success p {
		color: var(--color-accent-teal);
		margin: 0;
		font-size: var(--font-size-base);
	}

	@media (max-width: 640px) {
		.newsletter-card {
			padding: 24px;
		}

		.input-group {
			flex-direction: column;
		}

		.newsletter-btn {
			width: 100%;
		}
	}
</style>
