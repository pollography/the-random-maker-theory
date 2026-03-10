# SEO-Checkliste — TRMT Referenz

Detaillierte SEO-Optimierung für jeden TRMT-Artikel.

## Pre-Writing SEO

### Keyword-Research
1. Primäres Keyword identifizieren (1 Hauptbegriff)
2. 3-5 LSI Keywords (semantisch verwandte Begriffe)
3. Long-Tail Varianten prüfen (z.B. "n8n tutorial deutsch anfänger")
4. Search Intent klären: Informational, Navigational, Transactional?
5. SERP-Check: Top 5 Ergebnisse scannen. Was fehlt dort?

### Keyword-Verteilung im Artikel
- **Titel (H1):** Primäres Keyword, idealerweise in den ersten 30 Zeichen
- **Erste 100 Wörter:** Keyword natürlich einbauen
- **H2-Überschriften:** 2-3 davon enthalten LSI Keywords
- **Body:** Keyword-Dichte 1-2% (nicht stuffing, natürlich!)
- **Letzter Absatz / Fazit:** Keyword nochmal aufgreifen
- **Bild Alt-Texte:** Keyword-Varianten wo es passt

## On-Page SEO

### Meta-Tags
```yaml
title: "[Keyword] — [Ergänzung] | TRMT"  # Max 60 Zeichen
description: "[Was der Leser bekommt]. [CTA]. [Keyword]."  # Max 160 Zeichen
```

**Title-Formel:**
- Tutorial: "[Keyword]: So machst du X | TRMT"
- Review: "[Tool] Review: Ehrlicher Test nach X Wochen | TRMT"
- Vergleich: "[A] vs [B]: Was ist besser für [Zweck]? | TRMT"
- News: "[Was passiert ist] — Das musst du wissen | TRMT"

**Description-Formel:**
- Start mit Nutzen/Versprechen
- Ende mit CTA oder Neugier-Trigger
- Keyword muss vorkommen (natürlich!)

### URL-Slug
- Max 5 Wörter, nur Lowercase + Hyphens
- Hauptkeyword enthalten
- Keine Füllwörter (der, die, das, und, für, mit)
- Beispiel: `n8n-backup-workflow-anleitung`

### Interne Verlinkung
- Mindestens 3 interne Links pro Artikel
- Links zu thematisch verwandten Artikeln
- Anchor-Text variieren (nicht immer "hier klicken")
- Links aus verschiedenen Säulen verbinden (Cross-Pillar)

**Beispiel Cross-Pillar Links:**
- KI-Artikel → Link zu Automatisierung-Artikel
- Maker-Projekt → Link zu Produktivitäts-Artikel
- Fotografie → Link zu KI-Tools-Artikel

## E-E-A-T Signale (Experience, Expertise, Authority, Trust)

### Experience (Erfahrung)
- Persönliche Nutzung beschreiben ("Ich nutze das seit 3 Monaten")
- Konkrete Ergebnisse/Zahlen nennen
- Screenshots von eigenen Projekten (als Bild-Platzhalter)

### Expertise (Fachwissen)
- Technische Details korrekt (Versionsnummern, API-Endpunkte)
- Quellen verlinken
- Fachbegriffe erklären wenn nötig

### Authority (Autorität)
- Ueber-Seite mit TRMT-Profil vorhanden (Check)
- Konsistente Qualität über alle Posts
- Auf relevante eigene Artikel verlinken

### Trust (Vertrauen)
- Ehrliche Meinung (auch negatives benennen)
- Quellen angeben
- Affiliate-Links kennzeichnen
- Impressum + Datenschutz vorhanden (Check)

## Structured Data (Schema.org)

### Für jeden Artikel:
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[Titel]",
  "description": "[Description]",
  "author": {
    "@type": "Person",
    "name": "TRMT"
  },
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]"
}
```

Hinweis: Schema.org wird automatisch von SvelteKit-Komponenten generiert.

### FAQ-Schema (wenn Artikel FAQs hat):
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [...]
}
```

## GEO (Generative Engine Optimization)

Für Sichtbarkeit in ChatGPT, Perplexity, Google SGE:

### Answer Capsules
Kurze, direkte Antworten am Anfang von Abschnitten:
```markdown
## Was ist n8n?

n8n ist ein Open-Source Automatisierungstool das du selbst hosten kannst.
Es verbindet Apps, APIs und Dienste über visuelle Workflows.

[Dann erst die Details...]
```

### Structured Content
- Klare H2/H3-Hierarchie
- Listen für Schritt-für-Schritt-Anleitungen
- Tabellen für Vergleiche
- Code-Blocks für technische Snippets

### Zitierbarkeit
- Jede wichtige Aussage ist eigenständig verständlich
- Absätze sind in sich geschlossen (nicht auf vorherigen Kontext angewiesen)
- Quellenangaben direkt am Fakt

## Post-Publishing SEO

### Checkliste nach Veröffentlichung:
- [ ] Google Search Console: URL Inspection → "Request Indexing"
- [ ] Interne Links von bestehenden Artikeln auf den neuen setzen
- [ ] Social Sharing (Twitter/X, Newsletter)
- [ ] Sitemap automatisch aktualisiert (SvelteKit macht das)

## SEO-Keywords nach TRMT-Säulen

### Säule 1: KI/Tech (Beispiel-Keywords)
chatgpt deutsch, claude ai, midjourney prompt, ki tools kostenlos, llm vergleich

### Säule 2: Produktivität
n8n tutorial, obsidian setup, notion template deutsch, make.com alternative

### Säule 3: Maker/DIY
esp32 projekt, home assistant anfänger, arduino sensor, 3d druck einsteiger

### Säule 4: Fotografie
lightroom preset, ki bildbearbeitung, foto workflow, upscaling tool

### Säule 5: Life-Learning
adhs produktivität, freelancer tools, remote work setup, maker mindset
