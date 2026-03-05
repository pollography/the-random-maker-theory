<!-- Footer with links and info -->

<script>
	import { siteConfig } from '../../config';
</script>

<footer class="border-t border-border-subtle bg-surface mt-16 py-12">
	<div class="max-w-6xl mx-auto px-4">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
			<!-- About Section -->
			<div>
				<h3 class="font-display font-bold text-xl mb-4 text-honey">
					{siteConfig.shortName}
				</h3>
				<p class="text-text-muted text-sm">
					{siteConfig.description}
				</p>
			</div>

			<!-- Links -->
			<div>
				<h4 class="font-display font-semibold text-lg mb-4">Navigation</h4>
				<ul class="space-y-2 text-sm">
					<li><a href="/blog" class="text-text-muted hover:text-honey transition-colors">Blog</a></li>
					<li><a href="/podcast" class="text-text-muted hover:text-honey transition-colors">Podcast</a></li>
					<li><a href="/about" class="text-text-muted hover:text-honey transition-colors">Über uns</a></li>
				</ul>
			</div>

			<!-- Social -->
			<div>
				<h4 class="font-display font-semibold text-lg mb-4">Social</h4>
				<ul class="space-y-2 text-sm">
					<li>
						<a
							href={siteConfig.social.twitter}
							target="_blank"
							rel="noreferrer"
							class="text-text-muted hover:text-honey transition-colors"
						>
							Twitter / X
						</a>
					</li>
					<li>
						<a
							href={siteConfig.social.instagram}
							target="_blank"
							rel="noreferrer"
							class="text-text-muted hover:text-honey transition-colors"
						>
							Instagram
						</a>
					</li>
					<li>
						<a
							href={siteConfig.social.youtube}
							target="_blank"
							rel="noreferrer"
							class="text-text-muted hover:text-honey transition-colors"
						>
							YouTube
						</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Copyright -->
		<div class="border-t border-border-subtle pt-8 text-center text-text-dim text-sm">
			<p>&copy; {new Date().getFullYear()} {siteConfig.name}. Alle Rechte vorbehalten.</p>
		</div>
	</div>
</footer>

<style>
	footer {
		background-color: var(--color-surface);
	}
</style>
