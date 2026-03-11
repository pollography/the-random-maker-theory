/**
 * FAQ-Daten für die Hauptseiten (Homepage, Blog, Podcast)
 * Gekürzt auf 3-4 echte, relevante Fragen pro Seite.
 * Optimiert für Featured Snippets und People Also Ask.
 */
export const pageFAQs = {
	home: [
		{
			q: 'Was ist The Random Maker Theory?',
			a: 'TRMT ist ein deutschsprachiges Tech-Magazin für KI-Tools, Maker-Projekte, Smart Home und Produktivität. Ehrliche Reviews nach wochenlanger Nutzung, Praxis-Tutorials zum Nachbauen und News mit Kontext statt Clickbait.'
		},
		{
			q: 'Welche Themen behandelt TRMT?',
			a: 'Fünf Bereiche: KI und Tech (Tool-Reviews, News, Prompt-Engineering), Maker und DIY (Arduino, ESP32, 3D-Druck), Automatisierung (n8n, Docker, Shell-Scripts), Fotografie (KI-Editing, Lightroom) und Produktivität (Obsidian, Second Brain, Fokus-Strategien).'
		},
		{
			q: 'Was unterscheidet TRMT von anderen Tech-Blogs?',
			a: 'Alle Tools werden über Wochen getestet, nicht 5 Minuten ausprobiert. Keine gesponserten Rankings. Wenn was Mist ist, steht das auch so da. Ein Solo-Projekt ohne Corporate-Filter.'
		},
		{
			q: 'Wer steckt hinter TRMT?',
			a: 'Ein Solo-Projekt. 15+ Jahre Erfahrung in Fotografie, Content und Community-Aufbau, dazu ein technischer Hintergrund in DevOps und Automatisierung.'
		}
	],

	blog: [
		{
			q: 'Was für Artikel gibt es auf TRMT?',
			a: 'Tool-Reviews nach wochenlanger Nutzung, Schritt-für-Schritt-Tutorials, Tool-Vergleiche, tägliche KI-News mit Einordnung, Maker-Projekte mit Code und Teilelisten, und Deep-Dives in einzelne Themen.'
		},
		{
			q: 'Wie ehrlich sind die Reviews?',
			a: 'Kein Tool wird nur 5 Minuten angetestet. Jedes Review basiert auf echtem Einsatz über Wochen. Affiliate-Links ändern nichts an der Bewertung. Wenn was nervt, steht das drin.'
		},
		{
			q: 'Gibt es auch KI-News?',
			a: 'Ja, regelmässige Roundups zu neuen Modellen, Tool-Updates, API-Änderungen und Preisanpassungen. Kompakt zusammengefasst und eingeordnet, ohne Panikmache oder Hype.'
		},
		{
			q: 'Gibt es einen RSS-Feed?',
			a: 'Ja, unter therandommakertheory.com/rss.xml. Funktioniert mit Feedly, Inoreader, NetNewsWire und jedem anderen Feed-Reader.'
		}
	],

	podcast: [
		{
			q: 'Was ist der TRMT Podcast?',
			a: 'Audio-Zusammenfassungen der Blog-Artikel. Jede Episode fasst einen Artikel in wenigen Minuten zusammen. Perfekt für unterwegs, beim Sport oder Kochen.'
		},
		{
			q: 'Wie werden die Episoden erstellt?',
			a: 'Die Audio-Zusammenfassungen werden mit Google NotebookLM generiert. Das Tool erstellt aus Blog-Artikeln natürlich klingende Zusammenfassungen im Gesprächsformat. Der Inhalt wird geprüft, bevor er online geht.'
		},
		{
			q: 'Wo kann ich den Podcast hören?',
			a: 'Direkt auf der TRMT-Website im Browser oder auf Spotify. Keine extra App nötig.'
		},
		{
			q: 'Warum KI-generiertes Audio statt selbst eingesprochen?',
			a: 'Als Solo-Projekt wäre es unrealistisch, mehrere Episoden pro Woche selbst einzusprechen und zu schneiden. NotebookLM liefert gute Qualität und die gesparte Zeit fliesst in bessere Artikel.'
		}
	]
};
