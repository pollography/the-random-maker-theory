<!-- Footer with links and info -->

<script>
	import { siteConfig } from '../../config';
	import NewsletterSignup from '../NewsletterSignup.svelte';
</script>

<footer>
	<!-- Gradient Line -->
	<div style="height: 1px; background: linear-gradient(90deg, var(--color-accent-honey), var(--color-accent-teal), transparent); width: 100%;"></div>

	<div class="footer-container">
		<div class="footer-grid">
			<!-- About Section -->
			<div>
				<h3 style="font-family: var(--font-display); font-weight: var(--font-weight-bold); font-size: var(--font-size-xl); margin: 0 0 1rem 0; color: var(--color-accent-honey);">
					{siteConfig.shortName}
				</h3>
				<p style="color: var(--color-text-muted); font-size: var(--font-size-sm); margin: 0; line-height: var(--line-height-relaxed);">
					{siteConfig.description}
				</p>
			</div>

			<!-- Links -->
			<div>
				<h4 style="font-family: var(--font-display); font-weight: var(--font-weight-semibold); font-size: var(--font-size-lg); margin: 0 0 1rem 0;">
					Navigation
				</h4>
				<ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem;">
					<li><a href="/blog" class="footer-link">Blog</a></li>
					<li><a href="/podcast" class="footer-link">Zum Hören</a></li>
					<li><a href="/about" class="footer-link">Über TRMT</a></li>
				</ul>
			</div>

			<!-- Social -->
			<div>
				<h4 style="font-family: var(--font-display); font-weight: var(--font-weight-semibold); font-size: var(--font-size-lg); margin: 0 0 1rem 0;">
					Social
				</h4>
				<ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem;">
					<li>
						<a
							href={siteConfig.social.twitter}
							target="_blank"
							rel="noreferrer"
							class="footer-link"
						>
							Twitter / X
						</a>
					</li>
					<li>
						<a
							href={siteConfig.social.instagram}
							target="_blank"
							rel="noreferrer"
							class="footer-link"
						>
							Instagram
						</a>
					</li>
					<li>
						<a
							href={siteConfig.social.youtube}
							target="_blank"
							rel="noreferrer"
							class="footer-link"
						>
							YouTube
						</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Newsletter -->
		<div style="border-top: 1px solid var(--color-border-subtle); padding-top: 2rem; margin-top: 2rem;">
			<NewsletterSignup />
		</div>

		<!-- Legal Links -->
		<div style="border-top: 1px solid var(--color-border-subtle); padding-top: 2rem; margin-top: 2rem; display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
			<div style="display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center;">
				<a href="/impressum" class="footer-link">Impressum</a>
				<a href="/datenschutz" class="footer-link">Datenschutz</a>
				<button class="footer-link cookie-settings-btn" onclick={() => { localStorage.removeItem('trmt-cookie-consent'); location.reload(); }}>Cookie-Einstellungen</button>
			</div>
			<p style="margin: 0; color: var(--color-text-dim); font-size: var(--font-size-sm);">
				&copy; {new Date().getFullYear()} {siteConfig.name}. Alle Rechte vorbehalten.
			</p>
		</div>
	</div>
</footer>

<style>
	footer {
		background-color: var(--color-surface);
		margin-top: 4rem;
		padding: 3rem 1rem;
	}

	.footer-container {
		max-width: 1152px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
		margin-bottom: 2rem;
	}

	:global(.footer-link) {
		color: var(--color-text-muted);
		text-decoration: none;
		font-size: var(--font-size-sm);
		transition: color var(--transition-normal);
	}

	:global(.footer-link:hover) {
		color: var(--color-accent-honey);
	}

	:global(.cookie-settings-btn) {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		font-family: inherit;
	}

	@media (max-width: 768px) {
		footer {
			padding: 2rem 1rem;
		}

		.footer-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
</style>
