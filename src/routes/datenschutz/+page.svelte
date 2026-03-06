<svelte:head>
	<title>Datenschutzerklärung — The Random Maker Theory</title>
	<meta name="description" content="Datenschutzerklärung von The Random Maker Theory." />
	<meta name="robots" content="noindex" />
	<link rel="canonical" href="https://therandommakertheory.com/datenschutz" />
</svelte:head>

<section class="legal-page">
	<h1 class="legal-title">Datenschutzerklärung</h1>
	<p class="legal-subtitle">Stand: März 2026</p>

	<div class="legal-content">
		<div class="legal-block">
			<h2>1. Verantwortlicher</h2>
			<p>
				<!-- WICHTIG: Vor Go-Live mit echten Daten befüllen -->
				[Vorname Nachname]<br />
				[Straße Hausnummer]<br />
				[PLZ Ort]<br />
				E-Mail: hello@therandommakertheory.com
			</p>
		</div>

		<div class="legal-block">
			<h2>2. Hosting</h2>
			<p>
				Diese Website wird bei Vercel Inc. gehostet. Beim Besuch der Website werden automatisch technische Informationen (z.B. IP-Adresse, Zeitpunkt des Zugriffs, Browsertyp) durch den Hosting-Provider erfasst. Diese Daten werden in Server-Logfiles gespeichert und nach spätestens 30 Tagen gelöscht.
			</p>
			<p>
				Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der sicheren Bereitstellung der Website).
			</p>
		</div>

		<div class="legal-block">
			<h2>3. Webanalyse</h2>
			<p>
				Ich verwende Umami Analytics, eine datenschutzfreundliche Analysesoftware. Umami erhebt keine personenbezogenen Daten, setzt keine Cookies und speichert keine IP-Adressen. Alle Daten werden aggregiert und anonym erhoben.
			</p>
			<p>
				Es ist daher kein Cookie-Banner erforderlich, da keine Einwilligung nach § 25 TDDDG (ehemals TTDSG) notwendig ist.
			</p>
		</div>

		<div class="legal-block">
			<h2>4. Newsletter</h2>
			<p>
				Wenn du dich für den Newsletter anmeldest, wird deine E-Mail-Adresse bei Brevo (ehemals Sendinblue, Sendinblue GmbH, Berlin) gespeichert und verarbeitet. Die Anmeldung erfolgt per Double-Opt-In: Du erhältst eine Bestätigungsmail und musst deinen Wunsch aktiv bestätigen.
			</p>
			<p>
				Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Du kannst dich jederzeit abmelden. Ein Abmeldelink befindet sich in jeder Newsletter-Mail.
			</p>
		</div>

		<div class="legal-block">
			<h2>5. Externe Dienste</h2>
			<p>
				Diese Website kann Links zu externen Plattformen enthalten (YouTube, Spotify, Twitter/X, Instagram). Beim Anklicken dieser Links gelten die Datenschutzbestimmungen der jeweiligen Anbieter. Es werden keine Daten an diese Dienste übermittelt, solange du die Links nicht aktiv anklickst.
			</p>
		</div>

		<div class="legal-block">
			<h2>6. Affiliate-Links</h2>
			<p>
				Einige Links auf dieser Seite sind Affiliate-Links. Wenn du über einen solchen Link etwas kaufst, erhalte ich eine kleine Provision. Der Preis für dich bleibt gleich. Es werden dabei keine zusätzlichen personenbezogenen Daten durch mich erhoben.
			</p>
		</div>

		<div class="legal-block">
			<h2>7. Deine Rechte</h2>
			<p>
				Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Wenn du Fragen zum Datenschutz hast oder deine Rechte ausüben möchtest, schreib mir eine E-Mail an hello@therandommakertheory.com.
			</p>
			<p>
				Du hast außerdem das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
			</p>
		</div>

		<div class="legal-block">
			<h2>8. Änderungen</h2>
			<p>
				Ich behalte mir vor, diese Datenschutzerklärung bei Bedarf anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht.
			</p>
		</div>
	</div>
</section>

<style>
	.legal-page {
		padding: 3rem 1rem;
		max-width: 48rem;
		margin: 0 auto;
	}

	.legal-title {
		font-family: var(--font-display);
		font-weight: var(--font-weight-extrabold);
		font-size: clamp(2rem, 5vw, 3rem);
		color: var(--color-text);
		margin: 0 0 0.5rem;
	}

	.legal-subtitle {
		color: var(--color-text-muted);
		font-size: var(--font-size-md);
		margin: 0 0 3rem;
	}

	.legal-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.legal-block h2 {
		font-family: var(--font-display);
		font-weight: var(--font-weight-bold);
		font-size: var(--font-size-xl);
		color: var(--color-text);
		margin: 0 0 0.75rem;
	}

	.legal-block p {
		color: var(--color-text-muted);
		line-height: var(--line-height-relaxed);
		margin: 0 0 0.75rem;
		font-size: var(--font-size-base);
	}

	.legal-block p:last-child {
		margin-bottom: 0;
	}
</style>
