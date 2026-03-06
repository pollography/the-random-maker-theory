<!-- Footer with links and info -->

<script>
	import { siteConfig } from '../../config';
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
					<li><a href="/podcast" class="footer-link">Podcast</a></li>
					<li><a href="/about" class="footer-link">Über mich</a></li>
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

		<!-- Copyright -->
		<div style="border-top: 1px solid var(--color-border-subtle); padding-top: 2rem; margin-top: 2rem; text-align: center; color: var(--color-text-dim); font-size: var(--font-size-sm);">
			<p style="margin: 0;">
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
		max-width: 1440px;
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
