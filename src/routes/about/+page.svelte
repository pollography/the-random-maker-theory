<script>
	import { siteConfig } from '$lib/config';
</script>

<svelte:head>
	<title>Über TRMT — Tech, KI, Maker-Projekte & mehr</title>
	<meta name="description" content="Hier erfährst du mehr über Tech, KI-News, Maker-Projekte, Tutorials und Produktivitäts-Hacks. Ein Solo-Projekt, gebaut aus echtem Interesse." />
	<meta property="og:title" content="Über The Random Maker Theory" />
	<meta property="og:description" content="Tech, KI, Maker-Projekte und Produktivität. Erkunden. Testen. Bauen." />
	<meta property="og:url" content="https://therandommakertheory.com/about" />
	<link rel="canonical" href="https://therandommakertheory.com/about" />
</svelte:head>

<section class="about-page">
	<!-- Header -->
	<div class="about-header">
		<h1 class="about-title">Was ist The Random Maker Theory?</h1>
		<p class="about-subtitle">
			Tech, KI, Maker-Projekte und Produktivität. Verständlich aufbereitet, ehrlich bewertet.
		</p>
	</div>

	<!-- Content -->
	<div class="about-content">
		<!-- Section 1: Die Story -->
		<div class="about-block">
			<h2 class="about-heading">Die kurze Version</h2>
			<p>
				Ich hab diese Seite gebaut, weil ich sowas gebündelt einfach nirgendwo gefunden hab. Nicht in meinem Stil, nicht in meiner Sprache, nicht mit dem Fokus auf die Sachen, die mich wirklich interessieren.
			</p>
			<p>
				Also hab ich es halt selber gemacht. TRMT ist mein persönliches Tech-Notizbuch, das ich öffentlich führe. Ich recherchiere, teste, bewerte und schreibe alles zusammen, damit ich selber immer up to date bleibe. Und weil es wahrscheinlich anderen genauso geht, hab ich beschlossen, das Ganze nicht nur für mich zu behalten.
			</p>
		</div>

		<!-- Section 2: Was du hier findest -->
		<div class="about-block">
			<h2 class="about-heading">Was du hier findest</h2>
			<div class="about-pillars">
				<div class="about-pillar-card">
					<div class="about-pillar-icon">🤖</div>
					<div class="about-pillar-title">KI & Tech-News</div>
					<div class="about-pillar-desc">Tool-Reviews, Vergleiche und News-Roundups. Was funktioniert, was nicht.</div>
				</div>
				<div class="about-pillar-card">
					<div class="about-pillar-icon">⚡</div>
					<div class="about-pillar-title">Automatisierung</div>
					<div class="about-pillar-desc">n8n, Obsidian, Notion und andere Workflows, die dir Zeit sparen.</div>
				</div>
				<div class="about-pillar-card">
					<div class="about-pillar-icon">🔧</div>
					<div class="about-pillar-title">DIY & Maker</div>
					<div class="about-pillar-desc">ESP32, Home Assistant, 3D-Druck. Hands-on Projekte.</div>
				</div>
				<div class="about-pillar-card">
					<div class="about-pillar-icon">📸</div>
					<div class="about-pillar-title">Fotografie & Kreatives</div>
					<div class="about-pillar-desc">KI in der Fotografie, Lightroom Workflows, Bildbearbeitung.</div>
				</div>
				<div class="about-pillar-card">
					<div class="about-pillar-icon">🧠</div>
					<div class="about-pillar-title">Learnings</div>
					<div class="about-pillar-desc">ADHS-Hacks, Produktivität, Freelancer-Alltag.</div>
				</div>
			</div>
		</div>

		<!-- Section 3: Wer dahinter steckt -->
		<div class="about-block">
			<h2 class="about-heading">Wer steckt dahinter?</h2>
			<p>
				Ich bin Pollo. 15 Jahre Fotograf, seit immer Tech-Enthusiast, ADHS als Feature. Ich komme aus der Ecke Social Media, Community und Content. Ich bin kein Programmierer im klassischen Sinne, aber ich bau Sachen. Mit KI, mit Tools, mit whatever funktioniert.
			</p>
			<p>
				TRMT ist ein Solo-Projekt. Kein Team, kein Publisher, keine Agenda. Einfach ehrliches Interesse an Tech und der Drang, Dinge auszuprobieren und darüber zu schreiben.
			</p>
		</div>

		<!-- Section 4: Transparenz -->
		<div class="about-block about-highlight">
			<h2 class="about-heading">Transparenz: KI als Werkzeug</h2>
			<p>
				Ich arbeite aktiv mit KI. Recherche, Zusammenfassungen, Bilder, Code. Ich nutze Claude, ChatGPT, Gemini und andere Tools als Werkzeuge. Genau wie ein Fotograf Lightroom nutzt oder ein Entwickler eine IDE.
			</p>
			<p>
				Aber: Ich kontrolliere, bewerte und kuratiere alles selbst. Die Meinungen sind meine, die Fehler auch. KI ist das Werkzeug, nicht der Autor.
			</p>
		</div>

		<!-- Section 5: Audio -->
		<div class="about-block">
			<h2 class="about-heading">Keine Zeit zum Lesen?</h2>
			<p>
				Zu den meisten Themen gibt es Audio-Zusammenfassungen. Kein Podcast im klassischen Sinne, sondern KI-generierte Zusammenfassungen der Blog-Inhalte. Perfekt für unterwegs, beim Autofahren oder nebenbei. Du findest sie unter <a href="/podcast">Zum Hören</a>.
			</p>
		</div>
	</div>

	<!-- Social Links -->
	<div class="about-social">
		<h2 class="about-heading">Folge mir</h2>
		<div class="social-grid">
			<a href={siteConfig.social.twitter} target="_blank" rel="noreferrer" class="social-card">
				<div class="social-name">Twitter/X</div>
				<div class="social-handle">@randommakertheory</div>
			</a>
			<a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" class="social-card">
				<div class="social-name">Instagram</div>
				<div class="social-handle">@therandommakertheory</div>
			</a>
			<a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" class="social-card">
				<div class="social-name">YouTube</div>
				<div class="social-handle">@therandommakertheory</div>
			</a>
		</div>
	</div>
</section>

<style>
	.about-page {
		padding: 3rem 1rem;
		max-width: 48rem;
		margin: 0 auto;
	}

	.about-header {
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--color-border);
	}

	.about-title {
		font-size: clamp(2rem, 6vw, 3.5rem);
		font-family: var(--font-display);
		font-weight: 400;
		line-height: var(--line-height-tight);
		margin: 0 0 1rem 0;
		color: var(--color-text);
	}

	.about-subtitle {
		font-size: var(--font-size-lg);
		color: var(--color-text-muted);
		margin: 0;
		line-height: var(--line-height-relaxed);
	}

	.about-content {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.about-block p {
		color: var(--color-text-muted);
		line-height: var(--line-height-relaxed);
		margin: 0 0 1rem 0;
		font-size: var(--font-size-base);
	}

	.about-block p:last-child {
		margin-bottom: 0;
	}

	.about-heading {
		font-size: var(--font-size-2xl);
		font-family: var(--font-display);
		font-weight: 400;
		margin: 0 0 1rem 0;
		color: var(--color-text);
		font-style: normal;
	}

	.about-highlight {
		padding: 1.5rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
	}

	/* Pillar Cards */
	.about-pillars {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}

	.about-pillar-card {
		padding: 1.25rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		transition: all var(--transition-normal);
	}

	.about-pillar-card:hover {
		border-color: var(--color-accent-honey);
		transform: translateY(-2px);
	}

	.about-pillar-icon {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.about-pillar-title {
		font-family: var(--font-sans);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
		margin-bottom: 0.375rem;
		font-size: var(--font-size-base);
	}

	.about-pillar-desc {
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
	}

	/* Social Links */
	.about-social {
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 1px solid var(--color-border);
	}

	.social-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
	}

	.social-card {
		display: block;
		padding: 1.25rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		text-align: center;
		text-decoration: none;
		transition: all var(--transition-normal);
		background-color: transparent;
	}

	.social-card:hover {
		background-color: var(--color-surface-raised);
		border-color: var(--color-accent-honey);
		transform: translateY(-2px);
		box-shadow: var(--shadow-card);
	}

	.social-name {
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
		margin-bottom: 0.25rem;
	}

	.social-handle {
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
	}

	@media (max-width: 768px) {
		.about-page {
			padding: 2rem 1rem;
		}
	}
</style>
