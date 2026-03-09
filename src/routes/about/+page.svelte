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

<section style="padding: 3rem 1rem; max-width: 48rem; margin: 0 auto;">
	<!-- Header -->
	<div style="margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid var(--color-border);">
		<h1 style="font-size: clamp(2rem, 6vw, 3.5rem); font-family: var(--font-display); font-weight: var(--font-weight-extrabold); line-height: var(--line-height-tight); margin: 0 0 1rem 0; color: var(--color-text);">
			Was ist The Random Maker Theory?
		</h1>
		<p style="font-size: var(--font-size-lg); color: var(--color-text-muted); margin: 0; line-height: var(--line-height-relaxed);">
			Tech, KI, Maker-Projekte und Produktivität. Verständlich aufbereitet, ehrlich bewertet.
		</p>
	</div>

	<!-- Content -->
	<div style="display: flex; flex-direction: column; gap: 2.5rem;">
		<!-- Section 1: Die Story -->
		<div>
			<h2 style="font-size: var(--font-size-2xl); font-family: var(--font-display); font-weight: var(--font-weight-bold); margin: 0 0 1rem 0; color: var(--color-text);">
				Die kurze Version
			</h2>
			<p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin: 0 0 1rem 0; font-size: var(--font-size-base);">
				Ich hab diese Seite gebaut, weil ich sowas gebuendelt einfach nirgendwo gefunden hab. Nicht in meinem Stil, nicht in meiner Sprache, nicht mit dem Fokus auf die Sachen, die mich wirklich interessieren.
			</p>
			<p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin: 0; font-size: var(--font-size-base);">
				Also hab ich es halt selber gemacht. TRMT ist mein persoenliches Tech-Notizbuch, das ich oeffentlich fuehre. Ich recherchiere, teste, bewerte und schreibe alles zusammen, damit ich selber immer up to date bleibe. Und weil es wahrscheinlich anderen genauso geht, hab ich beschlossen, das Ganze nicht nur fuer mich zu behalten.
			</p>
		</div>

		<!-- Section 2: Was du hier findest -->
		<div>
			<h2 style="font-size: var(--font-size-2xl); font-family: var(--font-display); font-weight: var(--font-weight-bold); margin: 0 0 1rem 0; color: var(--color-text);">
				Was du hier findest
			</h2>
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
				<div class="pillar-card">
					<div class="pillar-icon">🤖</div>
					<div class="pillar-title">KI & Tech-News</div>
					<div class="pillar-desc">Tool-Reviews, Vergleiche und News-Roundups. Was funktioniert, was nicht.</div>
				</div>
				<div class="pillar-card">
					<div class="pillar-icon">⚡</div>
					<div class="pillar-title">Automatisierung</div>
					<div class="pillar-desc">n8n, Obsidian, Notion und andere Workflows, die dir Zeit sparen.</div>
				</div>
				<div class="pillar-card">
					<div class="pillar-icon">🔧</div>
					<div class="pillar-title">DIY & Maker</div>
					<div class="pillar-desc">ESP32, Home Assistant, 3D-Druck. Hands-on Projekte.</div>
				</div>
				<div class="pillar-card">
					<div class="pillar-icon">📸</div>
					<div class="pillar-title">Fotografie & Kreatives</div>
					<div class="pillar-desc">KI in der Fotografie, Lightroom Workflows, Bildbearbeitung.</div>
				</div>
				<div class="pillar-card">
					<div class="pillar-icon">🧠</div>
					<div class="pillar-title">Learnings</div>
					<div class="pillar-desc">ADHS-Hacks, Produktivitaet, Freelancer-Alltag.</div>
				</div>
			</div>
		</div>

		<!-- Section 3: Wer dahinter steckt -->
		<div>
			<h2 style="font-size: var(--font-size-2xl); font-family: var(--font-display); font-weight: var(--font-weight-bold); margin: 0 0 1rem 0; color: var(--color-text);">
				Wer steckt dahinter?
			</h2>
			<p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin: 0 0 1rem 0; font-size: var(--font-size-base);">
				Ich bin Pollo. 15 Jahre Fotograf, seit immer Tech-Enthusiast, ADHS als Feature. Ich komme aus der Ecke Social Media, Community und Content. Ich bin kein Programmierer im klassischen Sinne, aber ich bau Sachen. Mit KI, mit Tools, mit whatever funktioniert.
			</p>
			<p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin: 0; font-size: var(--font-size-base);">
				TRMT ist ein Solo-Projekt. Kein Team, kein Publisher, keine Agenda. Einfach ehrliches Interesse an Tech und der Drang, Dinge auszuprobieren und darueber zu schreiben.
			</p>
		</div>

		<!-- Section 4: Transparenz -->
		<div style="padding: 1.5rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-xl);">
			<h2 style="font-size: var(--font-size-2xl); font-family: var(--font-display); font-weight: var(--font-weight-bold); margin: 0 0 1rem 0; color: var(--color-text);">
				Transparenz: KI als Werkzeug
			</h2>
			<p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin: 0 0 1rem 0; font-size: var(--font-size-base);">
				Ich arbeite aktiv mit KI. Recherche, Zusammenfassungen, Bilder, Code. Ich nutze Claude, ChatGPT, Gemini und andere Tools als Werkzeuge. Genau wie ein Fotograf Lightroom nutzt oder ein Entwickler eine IDE.
			</p>
			<p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin: 0; font-size: var(--font-size-base);">
				Aber: Ich kontrolliere, bewerte und kuratiere alles selbst. Die Meinungen sind meine, die Fehler auch. KI ist das Werkzeug, nicht der Autor.
			</p>
		</div>

		<!-- Section 5: Audio -->
		<div>
			<h2 style="font-size: var(--font-size-2xl); font-family: var(--font-display); font-weight: var(--font-weight-bold); margin: 0 0 1rem 0; color: var(--color-text);">
				Keine Zeit zum Lesen?
			</h2>
			<p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin: 0; font-size: var(--font-size-base);">
				Zu den meisten Themen gibt es Audio-Zusammenfassungen. Kein Podcast im klassischen Sinne, sondern KI-generierte Zusammenfassungen der Blog-Inhalte. Perfekt fuer unterwegs, beim Autofahren oder nebenbei. Du findest sie unter <a href="/podcast" style="color: var(--color-accent-teal);">Zum Hoeren</a>.
			</p>
		</div>
	</div>

	<!-- Social Links -->
	<div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--color-border);">
		<h2 style="font-size: var(--font-size-2xl); font-family: var(--font-display); font-weight: var(--font-weight-bold); margin: 0 0 1.5rem 0; color: var(--color-text);">
			Folge mir
		</h2>
		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
			<a href={siteConfig.social.twitter} target="_blank" rel="noreferrer" class="social-card">
				<div style="font-weight: var(--font-weight-semibold); color: var(--color-text); margin-bottom: 0.25rem;">Twitter/X</div>
				<div style="color: var(--color-text-muted); font-size: var(--font-size-sm);">@randommakertheory</div>
			</a>
			<a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" class="social-card">
				<div style="font-weight: var(--font-weight-semibold); color: var(--color-text); margin-bottom: 0.25rem;">Instagram</div>
				<div style="color: var(--color-text-muted); font-size: var(--font-size-sm);">@therandommakertheory</div>
			</a>
			<a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" class="social-card">
				<div style="font-weight: var(--font-weight-semibold); color: var(--color-text); margin-bottom: 0.25rem;">YouTube</div>
				<div style="color: var(--color-text-muted); font-size: var(--font-size-sm);">@therandommakertheory</div>
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

	.pillar-card {
		padding: 1.25rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		transition: all var(--transition-normal);
	}

	.pillar-card:hover {
		border-color: var(--color-accent-honey);
		transform: translateY(-2px);
	}

	.pillar-icon {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.pillar-title {
		font-family: var(--font-display);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
		margin-bottom: 0.375rem;
		font-size: var(--font-size-base);
	}

	.pillar-desc {
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
	}

	@media (max-width: 768px) {
		:global(section) {
			padding: 2rem 1rem;
		}
	}
</style>
