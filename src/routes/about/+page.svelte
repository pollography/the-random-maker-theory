<script>
	import { siteConfig } from '$lib/config';
</script>

<svelte:head>
	<title>Über uns — {siteConfig.name}</title>
	<meta name="description" content="Lerne mehr über {siteConfig.name}" />
</svelte:head>

<section style="padding: 3rem 1rem; max-width: 48rem; margin: 0 auto;">
	<!-- Header -->
	<div style="margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid var(--color-border);">
		<h1 style="font-size: clamp(2rem, 6vw, 3.5rem); font-family: var(--font-display); font-weight: var(--font-weight-extrabold); line-height: var(--line-height-tight); margin: 0 0 1rem 0; color: var(--color-text);">
			Über The Random Maker Theory
		</h1>
		<p style="font-size: var(--font-size-lg); color: var(--color-text-muted); margin: 0; line-height: var(--line-height-relaxed);">
			Wir erklären KI-News, Tools und Tutorials in echten Worten.
		</p>
	</div>

	<!-- Content -->
	<div style="display: flex; flex-direction: column; gap: 2.5rem;">
		<!-- Section 1 -->
		<div>
			<h2 style="font-size: var(--font-size-2xl); font-family: var(--font-display); font-weight: var(--font-weight-bold); margin: 0 0 1rem 0; color: var(--color-text);">
				Was ist TRMT?
			</h2>
			<p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin: 0; font-size: var(--font-size-base);">
				The Random Maker Theory ist dein wöchentliches Update zur Welt der künstlichen Intelligenz. Wir sprechen über neue Tools, Breaking News und praktische Tutorials. Ohne Buzzword-Bullshit.
			</p>
		</div>

		<!-- Section 2 -->
		<div>
			<h2 style="font-size: var(--font-size-2xl); font-family: var(--font-display); font-weight: var(--font-weight-bold); margin: 0 0 1rem 0; color: var(--color-text);">
				Wer steckt dahinter?
			</h2>
			<p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin: 0; font-size: var(--font-size-base);">
				Gegründet von Pollo, 40, ENFP, mit 15 Jahren Fotografie-, Social Media- und Community-Erfahrung. Unterstützt von unserem Team und natürlich von unseren KI-Freunden.
			</p>
		</div>

		<!-- Section 3 -->
		<div>
			<h2 style="font-size: var(--font-size-2xl); font-family: var(--font-display); font-weight: var(--font-weight-bold); margin: 0 0 1rem 0; color: var(--color-text);">
				Warum TRMT?
			</h2>
			<p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin: 0; font-size: var(--font-size-base);">
				Die KI-Landschaft ändert sich täglich. Wir machen es verständlich. Nicht für Tech-Experten, sondern für Menschen, die einfach wissen möchten, was gerade los ist.
			</p>
		</div>

		<!-- Section 4 -->
		<div>
			<h2 style="font-size: var(--font-size-2xl); font-family: var(--font-display); font-weight: var(--font-weight-bold); margin: 0 0 1rem 0; color: var(--color-text);">
				Unsere Mission
			</h2>
			<p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin: 0; font-size: var(--font-size-base);">
				KI demokratisieren. Jede Woche neuen Content. Blog-Posts, Podcast-Episoden, Videos. Alles transparent, hilfreich und witzig.
			</p>
		</div>
	</div>

	<!-- Social Links -->
	<div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--color-border);">
		<h2 style="font-size: var(--font-size-2xl); font-family: var(--font-display); font-weight: var(--font-weight-bold); margin: 0 0 1.5rem 0; color: var(--color-text);">
			Folge uns
		</h2>
		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
			<a
				href={siteConfig.social.twitter}
				target="_blank"
				rel="noreferrer"
				class="social-card"
			>
				<div style="font-weight: var(--font-weight-semibold); color: var(--color-text); margin-bottom: 0.25rem;">Twitter</div>
				<div style="color: var(--color-text-muted); font-size: var(--font-size-sm);">@randommakertheory</div>
			</a>
			<a
				href={siteConfig.social.instagram}
				target="_blank"
				rel="noreferrer"
				class="social-card"
			>
				<div style="font-weight: var(--font-weight-semibold); color: var(--color-text); margin-bottom: 0.25rem;">Instagram</div>
				<div style="color: var(--color-text-muted); font-size: var(--font-size-sm);">@therandommakertheory</div>
			</a>
			<a
				href={siteConfig.social.youtube}
				target="_blank"
				rel="noreferrer"
				class="social-card"
			>
				<div style="font-weight: var(--font-weight-semibold); color: var(--color-text); margin-bottom: 0.25rem;">YouTube</div>
				<div style="color: var(--color-text-muted); font-size: var(--font-size-sm);">@therandommakertheory</div>
			</a>
			<a
				href={siteConfig.social.spotify}
				target="_blank"
				rel="noreferrer"
				class="social-card"
			>
				<div style="font-weight: var(--font-weight-semibold); color: var(--color-text); margin-bottom: 0.25rem;">Spotify</div>
				<div style="color: var(--color-text-muted); font-size: var(--font-size-sm);">Podcast</div>
			</a>
		</div>
	</div>
</section>

<style>
	:global(.social-card) {
		display: block;
		padding: 1.25rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		text-align: center;
		text-decoration: none;
		transition: all var(--transition-normal);
		background-color: transparent;
	}

	:global(.social-card:hover) {
		background-color: var(--color-surface-raised);
		border-color: var(--color-accent-honey);
		transform: translateY(-2px);
		box-shadow: var(--shadow-card);
	}

	@media (max-width: 768px) {
		:global(section) {
			padding: 2rem 1rem;
		}
	}
</style>
