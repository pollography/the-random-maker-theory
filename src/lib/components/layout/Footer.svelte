<script>
	import { siteConfig } from '../../config';
</script>

<footer>
	<div class="footer-accent" aria-hidden="true"></div>

	<div class="footer-container">
		<div class="footer-main">
			<div class="footer-brand">
				<a href="/" class="footer-wordmark" aria-label="The Random Maker Theory – Startseite">
					The <em>Random</em> Maker Theory
				</a>
				<p>Tech, KI und Maker-Ideen. Verständlich erklärt, ehrlich eingeordnet und frei zugänglich.</p>
			</div>

			<div class="footer-navigation">
				<nav class="footer-primary-links" aria-label="Navigation im Footer">
					<a href="/blog" class="footer-link">Blog</a>
					<a href="/#topics" class="footer-link">Themen</a>
					<a href="/tools/bildprompt-library" class="footer-link">Bildprompt-Library</a>
					<a href="/podcast" class="footer-link">Zum Hören</a>
					<a href="/about" class="footer-link">Über TRMT</a>
				</nav>
				<nav class="footer-social-links" aria-label="TRMT auf Social Media">
					<a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" class="footer-link">Instagram</a>
					<a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" class="footer-link">YouTube</a>
					<a href={siteConfig.social.twitter} target="_blank" rel="noreferrer" class="footer-link">X</a>
				</nav>
			</div>
		</div>

		<div class="footer-bottom">
			<nav class="footer-legal" aria-label="Rechtliche Hinweise">
				<a href="/impressum" class="footer-link">Impressum</a>
				<a href="/datenschutz" class="footer-link">Datenschutz</a>
				<a href="/bildrechte" class="footer-link">Bildrechte</a>
			</nav>
			<p>
				&copy; {new Date().getFullYear()} {siteConfig.name}. Alle Rechte vorbehalten.
			</p>
		</div>
	</div>
</footer>

<style>
	footer {
		position: relative;
		background-color: var(--color-surface);
		margin-top: clamp(3.5rem, 8vw, 6rem);
		padding: 0 1rem;
	}

	.footer-accent {
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--color-accent-honey), var(--color-accent-teal), transparent);
	}

	.footer-container {
		max-width: 1152px;
		margin: 0 auto;
		padding: clamp(36px, 5vw, 64px) 1rem 28px;
	}

	.footer-main {
		display: grid;
		grid-template-columns: minmax(280px, 1fr) minmax(360px, 1.2fr);
		align-items: end;
		gap: clamp(32px, 6vw, 80px);
	}

	.footer-brand { max-width: 520px; }

	.footer-wordmark {
		display: inline-block;
		font-family: var(--font-display);
		font-size: clamp(30px, 4vw, 44px);
		font-weight: 400;
		line-height: 1.05;
		letter-spacing: -0.02em;
		color: var(--color-text);
		text-decoration: none;
	}

	.footer-wordmark em {
		color: var(--color-accent-honey-foreground);
		font-style: italic;
	}

	.footer-brand p {
		max-width: 52ch;
		margin: 14px 0 0;
		color: var(--color-text-muted);
		font-size: var(--font-size-base);
		line-height: 1.65;
	}

	.footer-navigation {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 8px;
	}

	.footer-primary-links,
	.footer-social-links,
	.footer-legal {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.footer-primary-links { justify-content: flex-end; gap: 4px 24px; }
	.footer-social-links { justify-content: flex-end; gap: 4px 20px; }
	.footer-social-links :global(.footer-link) { color: var(--color-text-dim); }

	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		margin-top: clamp(28px, 4vw, 44px);
		padding-top: 20px;
		border-top: 1px solid var(--color-border-subtle);
	}

	.footer-legal { gap: 4px 20px; }

	.footer-bottom p {
		margin: 0;
		color: var(--color-text-dim);
		font-size: var(--font-size-sm);
		text-align: right;
	}

	:global(.footer-link) {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		min-width: 44px;
		color: var(--color-text-muted);
		text-decoration: none;
		font-size: var(--font-size-sm);
		transition: color var(--transition-normal), transform var(--transition-normal);
	}

	:global(.footer-link:hover) {
		color: var(--color-accent-honey-foreground);
		transform: translateY(-1px);
	}

	@media (max-width: 768px) {
		.footer-main {
			grid-template-columns: 1fr;
			align-items: start;
			gap: 24px;
		}

		.footer-navigation { align-items: flex-start; }
		.footer-primary-links,
		.footer-social-links { justify-content: flex-start; }
		.footer-bottom { align-items: flex-start; flex-direction: column; gap: 8px; }
		.footer-bottom p { text-align: left; }
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.footer-link) { transition: none; }
		:global(.footer-link:hover) { transform: none; }
	}
</style>
