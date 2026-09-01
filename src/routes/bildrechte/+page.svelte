<script>
	import { siteConfig } from '$lib/config';

	const canonicalUrl = `${siteConfig.url}/bildrechte`;
	const pageTitle = 'Bildrechte und Nutzung';
	const pageDescription = `Bildnachweise und Nutzungsbedingungen für Bilder von ${siteConfig.imageRights.creatorName} auf The Random Maker Theory.`;
</script>

<svelte:head>
	<title>{pageTitle} | TRMT</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:title" content={`${pageTitle} | TRMT`} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content="website" />
	<link rel="canonical" href={canonicalUrl} />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: pageTitle,
		description: pageDescription,
		url: canonicalUrl,
		copyrightHolder: {
			'@type': 'Person',
			name: siteConfig.imageRights.creatorName
		},
		copyrightNotice: siteConfig.imageRights.copyrightNotice
	})}</script>`}
</svelte:head>

<article class="rights-page">
	<header>
		<p class="eyebrow">The Random Maker Theory</p>
		<h1>Bildrechte und Nutzung</h1>
		<p class="intro">
			Die auf TRMT veröffentlichten eigenen Bilder werden unter dem Creator-Namen
			<strong>{siteConfig.imageRights.creatorName}</strong> geführt.
		</p>
	</header>

	<section>
		<h2>Alle Rechte vorbehalten</h2>
		<p>{siteConfig.imageRights.rightsUsageTerms}</p>
		<p>
			Das gilt insbesondere für eine Verwendung auf Websites, in sozialen Netzwerken,
			in Videos, Publikationen, Datensätzen oder kommerziellen Projekten.
		</p>
	</section>

	<section>
		<h2>Bildnachweis</h2>
		<dl>
			<div><dt>Creator</dt><dd>{siteConfig.imageRights.creatorName}</dd></div>
			<div><dt>Credit</dt><dd>{siteConfig.imageRights.creditText}</dd></div>
			<div><dt>Rechtehinweis</dt><dd>{siteConfig.imageRights.copyrightNotice}</dd></div>
		</dl>
	</section>

	<section>
		<h2>Nutzung anfragen</h2>
		<p>
			Wenn du ein Bild verwenden möchtest, frage bitte vorher per E-Mail an.
			Eine Erlaubnis gilt erst, wenn sie schriftlich bestätigt wurde.
		</p>
		<a class="contact-link" href="mailto:info@therandommakertheory.com?subject=Anfrage%20zur%20Bildnutzung">
			Bildnutzung anfragen
		</a>
	</section>

	<aside>
		<strong>Hinweis zu KI-Bildern:</strong>
		Ein Teil der Motive wurde mit generativer KI erstellt oder bearbeitet, teilweise auf
		Basis eigener Ausgangsbilder. Die Angaben auf dieser Seite dokumentieren Herkunft,
		Credit und gewünschte Nutzungsbedingungen; sie ersetzen keine rechtliche Einzelfallprüfung.
	</aside>
</article>

<style>
	.rights-page {
		max-width: 48rem;
		margin: 0 auto;
		padding: 3rem 0 2rem;
	}

	header { margin-bottom: 3rem; }
	.eyebrow {
		margin: 0 0 0.75rem;
		color: var(--color-accent-honey);
		font-size: var(--font-size-sm);
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	h1 {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 7vw, 4.5rem);
		font-weight: 400;
		line-height: 1;
	}

	.intro {
		max-width: 42rem;
		margin: 1.25rem 0 0;
		color: var(--color-text-muted);
		font-size: 1.1rem;
		line-height: 1.7;
	}

	section {
		margin-top: 2rem;
		padding: 1.75rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-xl);
	}

	h2 { margin: 0 0 0.75rem; color: var(--color-accent-honey); }
	p { line-height: 1.7; }
	section p:last-child { margin-bottom: 0; }

	dl { margin: 0; }
	dl div {
		display: grid;
		grid-template-columns: minmax(8rem, 0.35fr) 1fr;
		gap: 1rem;
		padding: 0.8rem 0;
		border-bottom: 1px solid var(--color-border-subtle);
	}
	dl div:last-child { border-bottom: 0; }
	dt { color: var(--color-text-muted); }
	dd { margin: 0; overflow-wrap: anywhere; }

	.contact-link {
		display: inline-flex;
		min-height: 44px;
		align-items: center;
		margin-top: 0.5rem;
		padding: 0.7rem 1rem;
		background: var(--color-accent-honey);
		border-radius: var(--radius-lg);
		color: var(--color-on-accent);
		font-weight: 700;
		text-decoration: none;
	}

	aside {
		margin-top: 2rem;
		padding: 1.25rem 1.5rem;
		background: color-mix(in srgb, var(--color-accent-teal) 8%, var(--color-surface));
		border-left: 3px solid var(--color-accent-teal);
		border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
		color: var(--color-text-muted);
		line-height: 1.7;
	}

	@media (max-width: 600px) {
		.rights-page { padding-top: 1.5rem; }
		section { padding: 1.25rem; }
		dl div { grid-template-columns: 1fr; gap: 0.2rem; }
	}
</style>
