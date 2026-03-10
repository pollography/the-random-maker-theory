/**
 * SEO-Content für Tag-Seiten
 * Jeder Tag bekommt einen einzigartigen Titel, eine Description (für Meta)
 * und einen Intro-Text (wird auf der Seite angezeigt für Word Count + SEO)
 */
export const tagDescriptions = {
	'3d-druck': {
		title: '3D-Druck',
		metaDesc: '3D-Druck Guides, Slicer-Settings, Material-Tipps und Projektanleitungen. Vom Einsteiger-Drucker bis zum fortgeschrittenen Multi-Material-Print.',
		intro: 'Alles rund um 3D-Druck: welcher Drucker für Einsteiger taugt, welche Slicer-Settings wirklich funktionieren und welche Materialien sich für welches Projekt eignen. Hier findest du Anleitungen, die nicht bei "Benchy drucken" aufhören, sondern echte Projekte zeigen. Von PLA über PETG bis ASA, von Cura über PrusaSlicer bis OrcaSlicer. Praktische Erfahrung statt Datenblatt-Vergleiche.',
		icon: '🖨️'
	},
	'analyse': {
		title: 'Analyse',
		metaDesc: 'Tiefgehende Analysen zu Tech-Trends, KI-Entwicklungen und Maker-Themen. Einordnung statt Clickbait.',
		intro: 'Wenn ein neues Tool, ein Trend oder eine Entwicklung mehr als einen Absatz verdient, landet es hier. Tiefgehende Analysen zu KI-Modellen, Tech-Trends und Marktentwicklungen. Keine heißen Takes nach 5 Minuten Googeln, sondern durchdachte Einordnungen mit Kontext. Wer verstehen will, was hinter den Headlines steckt, ist hier richtig.',
		icon: '📊'
	},
	'ankuendigung': {
		title: 'Ankündigungen',
		metaDesc: 'Ankündigungen und Updates rund um The Random Maker Theory. Neue Features, Formate und Meilensteine.',
		intro: 'Was passiert bei TRMT? Neue Formate, Blog-Updates, Community-News und alles was sich hinter den Kulissen tut. Hier erfährst du als Erstes, wenn sich was ändert oder was Neues kommt.',
		icon: '📢'
	},
	'arduino': {
		title: 'Arduino',
		metaDesc: 'Arduino-Projekte, Tutorials und Anleitungen. Vom Blink-Sketch bis zum vollständigen IoT-Projekt mit Schaltplan und Code.',
		intro: 'Arduino-Projekte mit vollständigen Anleitungen: Schaltpläne, Code, Teilelisten und Erklärungen, die auch Einsteiger abholen. Vom ersten LED-Blink bis zu komplexen Sensor-Netzwerken und IoT-Anbindungen. Jedes Projekt ist getestet und nachbaubar. Dazu Grundlagen-Tutorials zu Pins, Bibliotheken, Interrupts und serieller Kommunikation.',
		icon: '🔌'
	},
	'automatisierung': {
		title: 'Automatisierung',
		metaDesc: 'Automatisierung mit n8n, Make, Zapier, Shell-Scripts und APIs. Workflows die dir repetitive Arbeit abnehmen.',
		intro: 'Repetitive Arbeit ist Zeitverschwendung. Hier findest du Automatisierungen, die wirklich funktionieren: n8n-Workflows, Shell-Scripts, API-Anbindungen und Cron-Jobs. Von einfachen Backup-Routinen bis zu kompletten Content-Pipelines. Alles mit Step-by-Step-Anleitungen, damit du es nachbauen kannst, ohne drei Tage Doku lesen zu müssen.',
		icon: '⚡'
	},
	'diy': {
		title: 'DIY & Selbermachen',
		metaDesc: 'DIY-Projekte zum Nachbauen. Hardware, Elektronik, 3D-Druck und Smart Home Bastelprojekte mit Anleitung.',
		intro: 'Hands-on-Projekte für alle, die lieber selbst bauen statt nur kaufen. Von Elektronik über Holzarbeiten bis zu smarten Gadgets: hier geht es um das Selbermachen. Jedes Projekt kommt mit Materialliste und Schritt-für-Schritt-Anleitung. Basteln mit Hirn, nicht Pinterest-Deko.',
		icon: '🛠️'
	},
	'esp32': {
		title: 'ESP32',
		metaDesc: 'ESP32-Projekte und Tutorials. WiFi, Bluetooth, Sensoren und Smart Home mit dem günstigsten Mikrocontroller der Welt.',
		intro: 'Der ESP32 ist der Schweizer Taschenmesser unter den Mikrocontrollern: WiFi, Bluetooth, günstig und extrem vielseitig. Hier findest du Projekte, die das volle Potenzial ausschöpfen. Von Temperatur-Sensoren über WLED-Steuerung bis zu kompletten Smart-Home-Nodes. Mit ESPHome, Arduino IDE oder PlatformIO. Alle Projekte mit Code und Schaltplänen.',
		icon: '📡'
	},
	'fotografie': {
		title: 'Fotografie',
		metaDesc: 'Fotografie trifft KI: Lightroom AI, Topaz Photo AI, Editing-Workflows und Gear-Reviews. Ehrliche Tests nach Wochen der Nutzung.',
		intro: 'Wo klassische Fotografie auf KI trifft. Lightroom AI Masking, Topaz Photo AI, Luminar Neo, Generative Fill in Photoshop: was davon wirklich den Workflow verbessert und was nur Marketing ist. Dazu Editing-Workflows, die tatsächlich Zeit sparen, Gear-Reviews von Kameras und Objektiven, und Tipps für Fotografen, die KI-Tools sinnvoll einsetzen wollen.',
		icon: '📸'
	},
	'home-assistant': {
		title: 'Home Assistant',
		metaDesc: 'Home Assistant Guides, Automationen und Integrationen. Vom Einsteiger-Setup bis zum kompletten Smart Home Dashboard.',
		intro: 'Home Assistant ist das Herz eines offenen Smart Homes. Hier findest du Einsteiger-Guides, Automationen, Dashboard-Designs und Integrationen mit Zigbee, Z-Wave und WiFi-Geräten. Von der Installation auf einem Raspberry Pi bis zu fortgeschrittenen YAML-Automationen und Template-Sensoren. Alles getestet im echten Alltag.',
		icon: '🏠'
	},
	'kaufberatung': {
		title: 'Kaufberatung',
		metaDesc: 'Ehrliche Kaufberatung für Tech, Hardware und Tools. Was sich lohnt und was du dir sparen kannst.',
		intro: 'Bevor du Geld ausgibst, lies hier rein. Ehrliche Kaufberatungen für Hardware, Software und Tools, basierend auf echten Tests und Langzeiterfahrung. Keine Affiliate-optimierten Bestenlisten, sondern konkrete Empfehlungen mit Begründung. Was sich lohnt, wo man sparen kann und wann man besser wartet.',
		icon: '💰'
	},
	'ki-tools': {
		title: 'KI-Tools',
		metaDesc: 'KI-Tools im Praxistest: ChatGPT, Claude, Gemini, Midjourney, Leonardo AI und mehr. Reviews, Vergleiche und Tutorials.',
		intro: 'ChatGPT, Claude, Gemini, Midjourney, Leonardo AI, Stable Diffusion und dutzende andere KI-Tools im ehrlichen Praxistest. Keine gesponserten Lobeshymnen, sondern echte Erfahrung nach Wochen der Nutzung. Vergleiche zwischen Tools, Prompt-Engineering-Guides und Tutorials, die auch Einsteiger abholen. Von Text-KI über Bildgenerierung bis Audio und Video.',
		icon: '🤖'
	},
	'lightroom': {
		title: 'Lightroom',
		metaDesc: 'Adobe Lightroom Tutorials, AI-Features, Preset-Workflows und Editing-Tipps. Klassisch und mit KI-Unterstützung.',
		intro: 'Lightroom bleibt der Standard für Foto-Editing, vor allem seit die KI-Features immer besser werden. Hier findest du Tutorials zu AI Masking, Denoise, Lens Blur und den klassischen Editing-Workflows. Dazu Preset-Strategien, Katalog-Management und Tipps für einen schnelleren Workflow. Für Einsteiger und Fortgeschrittene.',
		icon: '🎨'
	},
	'maker': {
		title: 'Maker',
		metaDesc: 'Maker-Projekte mit Arduino, ESP32, Raspberry Pi und 3D-Drucker. Anleitungen, Schaltpläne und Code zum Nachbauen.',
		intro: 'Die Maker-Ecke von TRMT. Projekte mit Arduino, ESP32, Raspberry Pi und 3D-Drucker zum Nachbauen. Jedes Projekt kommt mit Teileliste, Schaltplan und vollständigem Code. Von smarten Sensoren fürs Terrarium über LED-Strips mit WLED bis zum eigenen Wetterstation-Dashboard. Dazu Grundlagen-Tutorials für alle, die noch nie einen Lötkolben in der Hand hatten.',
		icon: '🔧'
	},
	'n8n': {
		title: 'n8n',
		metaDesc: 'n8n-Workflows und Automatisierungen. Self-hosted, open source und ohne monatliche Kosten. Tutorials für Einsteiger und Profis.',
		intro: 'n8n ist die Open-Source-Alternative zu Zapier und Make, die du selbst hosten kannst. Hier findest du fertige Workflows, Einsteiger-Tutorials und fortgeschrittene Automationen. Von einfachen Webhook-Triggern bis zu komplexen Multi-Step-Workflows mit API-Calls, Datenbanken und Conditional Logic. Alles mit Screenshots und exportierbaren JSON-Files.',
		icon: '🔗'
	},
	'news': {
		title: 'News',
		metaDesc: 'Aktuelle Tech- und KI-News auf Deutsch. Schnelle Einordnung neuer Tools, Updates und Entwicklungen.',
		intro: 'Was gerade in der Tech- und KI-Welt passiert, schnell auf Deutsch zusammengefasst und eingeordnet. Neue Tool-Releases, wichtige Updates, Branchen-Entwicklungen. Kein Nachplappern von Pressemitteilungen, sondern kurze Einordnungen mit persönlicher Einschätzung. Wenn was Relevantes passiert, erfährst du es hier.',
		icon: '📰'
	},
	'notion': {
		title: 'Notion',
		metaDesc: 'Notion-Setups, Templates und Workflows. Datenbanken, Automationen und Produktivitäts-Systeme die man tatsächlich nutzt.',
		intro: 'Notion ist mächtig, aber nur wenn man es richtig einsetzt. Hier findest du Setups und Templates, die im Alltag funktionieren und nicht nach einer Woche wieder vergessen werden. Datenbank-Architekturen, Automationen, Relationen und Formeln. Dazu Vergleiche mit Obsidian und anderen Tools. Praxis-getestete Workflows statt hübsche Screenshots.',
		icon: '📋'
	},
	'obsidian': {
		title: 'Obsidian',
		metaDesc: 'Obsidian als Second Brain: Setup-Guides, Plugin-Empfehlungen, PARA-Methode und Workflows für Knowledge Management.',
		intro: 'Obsidian ist mehr als eine Notiz-App. Es ist ein Second Brain, wenn man es richtig einrichtet. Hier findest du Setup-Guides, Plugin-Empfehlungen, die PARA-Methode in der Praxis und Workflows für Leute, die ihr Wissen tatsächlich wiederfinden wollen. Speziell auch für ADHS-Brains, die ein System brauchen, das auch funktioniert wenn die Motivation fehlt.',
		icon: '🧠'
	},
	'open-source': {
		title: 'Open Source',
		metaDesc: 'Open-Source-Tools und Self-Hosting Guides. Freie Software, die mit kommerziellen Alternativen mithält.',
		intro: 'Open Source ist nicht nur kostenlos, sondern oft auch die bessere Wahl. Hier findest du Empfehlungen für Open-Source-Tools, Self-Hosting-Guides und Vergleiche mit kommerziellen Alternativen. Von n8n über Home Assistant bis Immich. Für alle, die ihre Daten lieber selbst kontrollieren und nicht von Cloud-Abos abhängig sein wollen.',
		icon: '🔓'
	},
	'produktivitaet': {
		title: 'Produktivität',
		metaDesc: 'Produktivitäts-Systeme, Tools und Workflows. Second Brain, PARA-Methode, Fokus-Hacks. Auch für ADHS-Brains.',
		intro: 'Produktivität ohne Hustle-Culture-Bullshit. Systeme die funktionieren, auch wenn die Motivation komplett fehlt. Obsidian als Second Brain, Notion-Setups die man tatsächlich nutzt, PARA-Methode in der Praxis. Dazu Fokus-Strategien für Leute mit ADHS-Brain, Tool-Vergleiche und Tipps für digitale Ordnung. Journaling-Workflows und alles was hilft, den Kopf zu entlasten.',
		icon: '⚡'
	},
	'smart-home': {
		title: 'Smart Home',
		metaDesc: 'Smart Home Guides: Home Assistant, Zigbee, WLED, Sensoren und Automationen. Offene Systeme statt Cloud-Abhängigkeit.',
		intro: 'Smart Home, aber richtig: offen, lokal, ohne Cloud-Abhängigkeit. Home Assistant als Zentrale, Zigbee-Geräte, WiFi-Sensoren und WLED-LED-Streifen. Hier findest du Anleitungen für echte Smart-Home-Projekte, die zuverlässig laufen und deine Daten nicht an Amazon oder Google schicken. Von der ersten Lampe bis zum voll automatisierten Zuhause.',
		icon: '🏡'
	},
	'tipps': {
		title: 'Tipps & Tricks',
		metaDesc: 'Schnelle Tipps und Tricks für Tech, Tools und Workflows. Kurz, praktisch, sofort umsetzbar.',
		intro: 'Kurze, praktische Tipps die du sofort umsetzen kannst. Kein langes Drumherum, sondern direkte Lösungen für alltägliche Tech-Probleme. Shortcuts, versteckte Features, Einstellungen die keiner kennt und Workarounds, die dir Zeit sparen. Alles getestet und für gut befunden.',
		icon: '💡'
	},
	'tools': {
		title: 'Tools',
		metaDesc: 'Tool-Reviews und Vergleiche: Software, Hardware und Services im Praxistest. Was taugt wirklich?',
		intro: 'Ehrliche Tool-Reviews nach Wochen echter Nutzung, nicht nach 5 Minuten Ausprobieren. Software, Hardware, Apps und Services im Praxistest. Was hält, was es verspricht? Was nervt nach drei Tagen? Und was ist die bessere Alternative? Vergleiche, Empfehlungen und Warnungen, damit du nicht auf Marketing reinfällst.',
		icon: '🧰'
	},
	'tutorial': {
		title: 'Tutorials',
		metaDesc: 'Step-by-Step Tutorials: KI-Tools, Maker-Projekte, Smart Home und Automatisierung. Verständlich auch für Einsteiger.',
		intro: 'Schritt-für-Schritt-Anleitungen, die funktionieren. Jedes Tutorial ist getestet, mit Screenshots und Code-Beispielen. Von KI-Tool-Einrichtung über Maker-Projekte bis Smart-Home-Automationen. Geschrieben für Leute, die Ergebnisse wollen, nicht akademische Vorlesungen. Wenn ein Schritt fehlt, sag Bescheid.',
		icon: '📝'
	},
	'willkommen': {
		title: 'Willkommen',
		metaDesc: 'Willkommen bei The Random Maker Theory. Lerne den Blog kennen und erfahre, was dich hier erwartet.',
		intro: 'Neu hier? Perfekt. In diesen Posts erfährst du, was TRMT ist, wer dahintersteckt und was dich hier erwartet. Tech, KI-Tools, Maker-Projekte, Automatisierung und Produktivität. Alles frei Schnauze, ehrlich und ohne Corporate-Filter. Der beste Startpunkt, wenn du wissen willst, ob dieser Blog für dich ist.',
		icon: '👋'
	},
	'workflow': {
		title: 'Workflows',
		metaDesc: 'Effiziente Workflows für Content, Development und Produktivität. Tools verbinden, Prozesse optimieren, Zeit sparen.',
		intro: 'Workflows, die dir wirklich Zeit sparen. Wie du Tools clever verbindest, Prozesse optimierst und repetitive Arbeit eliminierst. Von Content-Pipelines über Development-Workflows bis zu persönlichen Produktivitäts-Systemen. Jeder Workflow ist im echten Alltag getestet und kommt mit konkreten Tool-Empfehlungen und Setup-Anleitungen.',
		icon: '🔄'
	}
};

/**
 * Fallback für Tags die nicht in der Map sind
 */
export function getTagDescription(tag) {
	if (tagDescriptions[tag]) return tagDescriptions[tag];

	// Fallback: generische Description
	const displayName = tag.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
	return {
		title: displayName,
		metaDesc: `Alle Artikel zum Thema ${displayName} auf The Random Maker Theory. Tech, KI und Maker-Projekte.`,
		intro: `Hier findest du alle Artikel zum Thema ${displayName}. Von Reviews über Tutorials bis zu Praxis-Guides. Regelmäßig neue Inhalte, geschrieben für Leute die wirklich verstehen wollen, wie Dinge funktionieren.`,
		icon: '📌'
	};
}
