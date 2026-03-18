---
title: "GPT-5.4 mini und nano: Subagenten-Ära für 20 Cent"
slug: "introducing-gpt-5-4-mini-and-nano-2026-03-17"
date: "2026-03-18"
description: "OpenAI bringt GPT-5.4 mini und nano. Schneller, günstiger, gebaut für Subagenten. Benchmarks, Preise und was das für dich bedeutet."
tags: ["ki-news", "ki-tools", "news", "analyse", "vergleich"]
category: "ki-news"
draft: true
readingTime: 10
heroImage: "/images/blog/introducing-gpt-5-4-mini-and-nano-2026-03-17-1.webp"
heroImageThumb: "/images/blog/introducing-gpt-5-4-mini-and-nano-2026-03-17-1-thumb.webp"
titleAccent: "Subagenten-Ära"
podcastSlug: "009-introducing-gpt-5-4-mini-and-nano"
podcastUrl: ""
videoUrl: ""
---

Holt euch ein Getränk, wir müssen reden. Am 17. März 2026 hat OpenAI GPT-5.4 mini und nano released. Nicht einfach die Billig-Ableger für Leute, die sich das große Modell nicht leisten können. Sondern der Startschuss für eine komplett neue Architektur: Subagenten.

Ich hab mir beide Modelle angeschaut, Benchmarks verglichen, Preise durchgerechnet und getestet, was die Dinger in der Praxis taugen. Hier kommt alles, was du wissen musst.

## Die Kurzversion

Keine Lust auf den ganzen Artikel? Hier die Facts:

- **GPT-5.4 mini** schließt fast zum großen GPT-5.4 auf — bei doppelter Geschwindigkeit und einem Drittel der Kosten
- **GPT-5.4 nano** kostet nur $0.20 pro Million Input-Tokens. Simon Willison hat vorgerechnet: 76.000 Fotos beschreiben für 52 Dollar
- Beide Modelle haben ein **400k Context Window** und können Text + Bilder verarbeiten
- Der eigentliche Game-Plan: OpenAI baut ein Ökosystem, in dem das große Modell plant und hunderte kleine Modelle parallel die Arbeit machen
- Für ChatGPT-User: mini ist jetzt für Free- und Go-Nutzer verfügbar

## Was sind mini und nano? Die Restaurant-Erklärung

Stell dir ein Restaurant vor. Während der Rush-Hour.

**GPT-5.4** ist der Sterne-Chefkoch. Brillant, hat das komplette Menü im Kopf, versteht die chemischen Reaktionen beim Garen. Aber teuer. Und er braucht Zeit zum Nachdenken. Den Chefkoch lässt du nicht Zwiebeln schneiden.

**GPT-5.4 mini** ist der Sous-Chef. Kann quasi alles, was der Chef kann. Aber auf Speed. Wenn der Chef sagt "Analysier mal alle Zutaten im Lager", macht der mini das in der halben Zeit. Das Arbeitstier, das komplexe Rezepte umsetzt, ohne für jede Kleinigkeit eine Denkpause einzulegen.

**GPT-5.4 nano** ist die Küchenhilfe. Getrimmt auf eine Sache: Geschwindigkeit bei einfachen Aufgaben. Kartoffeln schälen, Abwasch sortieren, Bestellungen klassifizieren. Nano macht die repetitive Arbeit so schnell und billig, dass es sich nicht lohnt, den Sous-Chef auch nur zu fragen.

Technisch haben beide ein **400.000-Token Context Window**. Das heißt: Du kannst massig Code oder Dokumentation reinkippen, ohne dass das Modell den Faden verliert. Dazu native Multimodalität — die Modelle "sehen" Bilder direkt. Kein extra Vision-Modell dazwischengeschaltet. Wenn dein Agent einen Screenshot deiner UI bekommt, versteht er sofort, wo er hinklicken muss.

Aber halt: Audio und Video können die beiden nicht. Nur Text und Bilder rein, nur Text raus. Das ist eine bewusste Einschränkung — Speed vor Features.

## Die Benchmarks: Zahlen, die nicht lügen

Butter bei die Fische. Hier der direkte Vergleich:

| Benchmark | GPT-5.4 | GPT-5.4 mini | GPT-5.4 nano | GPT-5 mini (alt) |
| :--- | :--- | :--- | :--- | :--- |
| **SWE-Bench Pro** (Coding) | 57,7% | 54,4% | 52,4% | 45,7% |
| **OSWorld** (Computer Use) | 75,0% | 72,1% | 39,0% | 42,0% |
| **GPQA Diamond** (Science) | 93,0% | 88,0% | 82,8% | 81,6% |
| **Terminal-Bench 2.0** (CLI) | 75,1% | 60,0% | 46,3% | 38,2% |
| **Toolathlon** (Multi-step) | 54,6% | 42,9% | 35,5% | 26,9% |

![Benchmark-Vergleich der GPT-5.4 Modellfamilie](/images/blog/introducing-gpt-5-4-mini-and-nano-2026-03-17-2.webp)

Schau dir mal den **OSWorld-Score** an. Mini rasiert mit 72,1% fast auf dem Level des großen Modells (75,0%). Menschliche Performance liegt bei 72,4%. Ein "kleines" Modell, das bei der Navigation in echten Betriebssystemen genauso gut ist wie ein Mensch. Das ist krank.

Auch bei **Terminal-Bench**: 60% für mini gegen mickrige 38,2% beim alten GPT-5 mini. Wenn du CLI-Agenten baust, ist das ein massives Upgrade.

Und beim **Coding** (SWE-Bench Pro) liegen mini und nano mit 54,4% und 52,4% echt nah am großen Modell (57,7%). Der Sprung vom alten GPT-5 mini (45,7%) ist heftig — fast 10 Prozentpunkte mehr.

Wo es nervt: Long Context. Im MRCR v2 Test (Needle-in-a-Haystack bei 128-256k Tokens) kackt mini mit 33,6% gegenüber 79,3% beim großen Modell ordentlich ab. Wenn du eine ganze Bibliothek in den Kontext wirfst und hoffst, dass mini ein Detail auf Seite 400 findet — lass es. Da fehlt dem Modell die Aufmerksamkeit.

Auch bei **Toolathlon** sieht man den Abstand. Komplexe Multi-Step-Aufgaben mit vielen API-Calls? Da verliert mini (42,9%) gegenüber dem Chef (54,6%) noch zu oft den Überblick. Für solche Jobs brauchst du weiterhin das große Modell.

## Was kostet der Spaß?

Hier wird's interessant.

| Modell | Input (pro 1M Tokens) | Output (pro 1M Tokens) |
| :--- | :--- | :--- |
| GPT-5.4 | $2,50 | $15,00 |
| **GPT-5.4 mini** | **$0,75** | **$4,50** |
| **GPT-5.4 nano** | **$0,20** | **$1,25** |
| GPT-5 mini (alt) | $0,25 | $2,00 |
| GPT-4o-mini (Oldie) | $0,15 | $0,60 |

![Preisvergleich KI-Modelle pro 1M Tokens](/images/blog/introducing-gpt-5-4-mini-and-nano-2026-03-17-3.webp)

Simon Willison hat das durchgerechnet: Mit nano kannst du **76.000 Fotos für 52 Dollar** beschreiben lassen. Das macht Anwendungen möglich, die vorher finanzieller Selbstmord gewesen wären.

Aber — und das muss man ehrlich sagen — im Vergleich zum direkten Vorgänger GPT-5 mini sind die Preise um **200-300% gestiegen**. Mini kostet dreimal so viel beim Input, nano das Vierfache. Das fühlt sich erstmal nach Abzocke an.

Wenn man aber die Performance-Dichte sieht, relativiert sich das. Mini liefert fast GPT-5.4-Niveau für ein Drittel vom Preis. Nano ist sogar günstiger als Googles Gemini 3.1 Flash-Lite ($0,25 Input / $1,50 Output). Die absolute Zahl ist höher als beim Vorgänger, aber du bekommst halt auch massiv mehr dafür.

Insider-Warnung zur Vision-Pricing: Die offiziellen Docs sind grad Müll. OpenAI behauptet einen 1.5x Multiplier für Bilder, experimentell liegt er bei mini und nano aber bei **1.2x**. Der "detail:low" Parameter ist quasi wirkungslos — du zahlst oft den vollen Preis. Check dein Billing-Dashboard, wenn du massenweise Bilder durchjagst.

## Die Subagenten-Ära: Warum das alles wichtig ist

Hier liegt der eigentliche Paradigmenwechsel. Nicht ein Modell für alles, sondern spezialisierte Teams.

In modernen Systemen wie [Claude Code](/blog/claude-code-ultimate-setup-produktivitaet-2026) oder OpenAIs Codex funktioniert das so: Das große Modell plant die Strategie. Dann delegiert es Aufgaben an mini-Subagenten. Die arbeiten parallel — zehn Agents gleichzeitig, jeder durchsucht eine andere Datei, prüft einen anderen Test, checkt einen anderen Log-Eintrag.

GPT-5.4 mini ist dafür über **2x schneller** als GPT-5 mini. In Codex verbraucht der mini nur 30% des Quota-Guthabens vom großen Modell. Das heißt: Mehr Agents, weniger Kosten, schnellere Ergebnisse.

Stell dir vor, du debugst einen Bug, der nur in einer von zehn Testumgebungen auftritt. Statt dass ein Modell nacheinander zehn Log-Files durchgeht, schickt der Chef zehn mini-Agents parallel los. Ergebnis in Sekunden statt Minuten. Das ist der Grund, warum sich moderne [Coding-Assistenten](/blog/claude-code-vs-cursor-vs-copilot-2026) plötzlich so "flüssig" anfühlen.

Es ist basically so, als hättest du statt einem Genie plötzlich ein Genie mit zehn hyperaktiven Assistenten. Kennt man vielleicht — nur dass die Assistenten hier nicht vergessen, was man ihnen gesagt hat.

## Was heißt das für dich?

Drei konkrete Szenarien:

**1. Massen-Vision.** Du hast 100.000 Screenshots deiner Web-App und willst wissen, ob irgendwo der Kontrast nicht stimmt? Nano-Armee losschicken. Bei $0,20 pro Million Tokens kostet das fast nix. Vorher undenkbar.

**2. Coding-Workflows.** Der mini-Agent im Hintergrund indiziert dein Repo, schreibt Tests, sucht Fehler. Bei doppelter Geschwindigkeit fühlt sich das nicht mehr nach "Warten auf die KI" an, sondern nach Echtzeit. In [meinem Claude Code Setup](/blog/claude-code-ultimate-setup-produktivitaet-2026) nutze ich genau solche Patterns schon.

**3. UI-Automatisierung.** Mit 72,1% auf OSWorld kannst du Agenten bauen, die wirklich dein CRM pflegen, Formulare ausfüllen oder Reports generieren. Kein "oops, falscher Button" mehr bei jedem zweiten Klick. Das funktioniert jetzt tatsächlich. Mehr zum Thema [KI-Agents im Alltag](/blog/ki-agents-shoppen-posten-mailen-2026).

Und wenn du kein Entwickler bist: GPT-5.4 mini ist jetzt für **Free- und Go-User in ChatGPT** verfügbar. Du findest es über die "Thinking"-Funktion. Für Pro-User dient mini als automatischer Fallback, wenn du dein GPT-5.4-Limit erreicht hast. Quasi lautlos umgeleitet auf ein Modell, das für 90% der Alltagsfragen immer noch perfekt reicht. Du merkst es daran, dass die Denkpause kürzer wird.

## Ehrliches Fazit

Was ist **geil**: Die Performance-Dichte. Mini schließt zum großen Modell auf, läuft doppelt so schnell und kostet ein Drittel. Nano macht Massen-Anwendungen möglich, die vorher finanzieller Wahnsinn gewesen wären. Die Subagenten-Architektur verändert fundamental, wie KI-Apps gebaut werden.

Was **nervt**: Die Preise sind gegenüber dem Vorgänger heftig gestiegen, auch wenn die Leistung das rechtfertigt. Long Context ist beim mini schwach. Die Vision-Pricing-Dokumentation ist ein Witz. Und nano ist vorerst nur über die API verfügbar — kein ChatGPT-Zugang.

Unterm Strich: GPT-5.4 mini ist ab heute das wichtigste Werkzeug für jeden, der [KI-Tools](/blog/5-beste-ki-tools-maerz-2026) produktiv einsetzt. Schnell genug für Echtzeit, günstig genug für Skalierung, schlau genug, um nicht bei jedem komplexen Befehl aufzugeben.

Die Ära der Subagenten ist da. Und sie ist verdammt bezahlbar.

— TRMT

## Quellen & Links

- [Introducing GPT-5.4 mini and nano](https://openai.com/index/introducing-gpt-5-4-mini-and-nano/) — Offizieller OpenAI Blog-Post
- [Simon Willison: 76.000 Fotos für $52](https://simonwillison.net/2026/Mar/17/mini-and-nano/) — Detaillierte Kostenanalyse
- [The Decoder: Faster but up to 4x pricier](https://the-decoder.com/openai-ships-gpt-5-4-mini-and-nano-faster-and-more-capable-but-up-to-4x-pricier/) — Benchmark-Analyse
- [The New Stack: Built for the subagent era](https://thenewstack.io/gpt-54-nano-mini/) — Subagenten-Architektur erklärt
- [OpenAI API Pricing](https://openai.com/api/pricing/) — Aktuelle Preise
