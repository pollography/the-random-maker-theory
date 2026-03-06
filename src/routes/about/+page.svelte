<script>
	import { siteConfig } from '$lib/config';
</script>

<svelte:head>
	<title>Über mich — The Random Maker Theory</title>
	<meta name="description" content="Wer steckt hinter TRMT? Ich erkläre Tech, KI, Maker-Projekte und Produktivität in echten Worten. Ohne Buzzword-Bullshit." />
	<meta property="og:title" content="Über The Random Maker Theory" />
	<meta property="og:description" content="Tech, KI, Maker-Projekte & Produktivität — von Pollo und seinen KI-Freunden." />
	<meta property="og:url" content="https://therandommakertheory.com/about" />
	<link rel="canonical" href="https://therandommakertheory.com/about" />
</svelte:head>

<section style="padding: 3rem 1rem; max-width: 48rem; margin: 0 auto;">
	<!-- Header -->
	<div style="margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid var(--color-border);">
		<h1 style="font-size: clamp(2rem, 6vw, 3.5rem); font-family: var(--font-display); font-weight: var(--font-weight-extrabold); line-height: var(--line-height-tight); margin: 0 0 1rem 0; color: var(--color-text);">
			Über The Random Maker Theory
		</h1>
		<p style="font-size: var(--font-size-lg); color: var(--color-text-muted); margin: 0; line-height: var(--line-height-relaxed);">
			Ich erkläre Tech, KI und Maker-Projekte in echten Worten.
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
				The Random Maker Theory ist dein wöchentliches Update zu Tech, KI, Maker-Projekten und Produktivität. Ich schreibe über neue Tools, teste Workflows und zeige dir praktische Tutorials. Ohne Buzzword-Bullshit.
			</p>
		</div>

		<!-- Section 2 -->
		<div>
			<h2 style="font-size: var(--font-size-2xl); font-family: var(--font-display); font-weight: var(--font-weight-bold); margin: 0 0 1rem 0; color: var(--color-text);">
				Wer steckt dahinter?
			</h2>
			<p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin: 0; font-size: var(--font-size-base);">
				Ich bin Pollo. 15 Jahre Erfahrung in Fotografie, Social Media und Community. Ich baue digitale Produkte, automatisiere Workflows und teste jeden Tag neue Tech-Tools. TRMT ist mein Solo-Projekt, unterstützt von meinen KI-Freunden.
			</p>
		</div>

		<!-- Section 3 -->
		<div>
			<h2 style="font-size: var(--font-size-2xl); font-family: var(--font-display); font-weight: var(--font-weight-bold); margin: 0 0 1rem 0; color: var(--color-text);">
				Warum TRMT?
			</h2>
			<p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin: 0; font-size: var(--font-size-base);">
				Die Tech-Landschaft ändert sich täglich. Ich mach das verständlich. Nicht für Hardcore-Devs, sondern für Menschen, die einfach wissen wollen, was grad los ist und wie sie Tech praktisch nutzen können.
			</p>
		</div>

		<!-- Section 4 -->
		<div>
			<h2 style="font-size: var(--font-size-2xl); font-family: var(--font-display); font-weight: var(--font-weight-bold); margin: 0 0 1rem 0; color: var(--color-text);">
				Meine Mission
			</h2>
			<p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin: 0; font-size: var(--font-size-base);">
				Tech und KI für alle zugänglich machen. Jede Woche neuer Content. Blog-Posts, Podcast-Episoden, Tutorials. Alles transparent, hilfreich und locker.
			</p>
		</div>
	</div>

	<!-- Social Links -->
	<div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--color-border);">
		<h2 style="font-size: var(--font-size-2xl); font-family: var(--font-display); font-weight: var(--font-weight-bold); margin: 0 0 1.5rem 0; color: var(--color-text);">
			Folge mir
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
