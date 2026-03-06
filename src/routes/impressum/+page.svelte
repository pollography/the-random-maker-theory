<svelte:head>
	<title>Impressum — The Random Maker Theory</title>
	<meta name="description" content="Impressum und Anbieterkennzeichnung von The Random Maker Theory." />
	<meta name="robots" content="noindex" />
	<link rel="canonical" href="https://therandommakertheory.com/impressum" />
</svelte:head>

<section class="legal-page">
	<h1 class="legal-title">Impressum</h1>
	<p class="legal-subtitle">Angaben gemäß § 5 TMG</p>

	<div class="legal-content">
		<div class="legal-block">
			<h2>Verantwortlich für den Inhalt</h2>
			<p>
				<!-- WICHTIG: Vor Go-Live mit echten Daten befüllen -->
				[Vorname Nachname]<br />
				[Straße Hausnummer]<br />
				[PLZ Ort]<br />
				Deutschland
			</p>
		</div>

		<div class="legal-block">
			<h2>Kontakt</h2>
			<p>
				E-Mail: hello@therandommakertheory.com
			</p>
		</div>

		<div class="legal-block">
			<h2>Haftung für Inhalte</h2>
			<p>
				Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
			</p>
			<p>
				Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.
			</p>
		</div>

		<div class="legal-block">
			<h2>Haftung für Links</h2>
			<p>
				Diese Seite enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
			</p>
		</div>

		<div class="legal-block">
			<h2>Urheberrecht</h2>
			<p>
				Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
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
