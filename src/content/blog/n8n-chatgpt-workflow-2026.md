---
title: "n8n + ChatGPT: Mein Automatisierungs-Stack"
titleAccent: "ChatGPT"
slug: "n8n-chatgpt-workflow-2026"
date: "2026-04-07"
category: "automatisierung"
primaryKW: "n8n chatgpt workflow"
description: "Wie ich n8n mit der ChatGPT API kombiniere: 3 echte Automationen die ich taeglich nutze — Node fuer Node erklaert. Kein Theorie-Bla, nur Praxis."
tags: ["n8n", "chatgpt", "automatisierung", "tutorial", "workflow"]
draft: false
pillar: "Automation"
type: "Tutorial + Deep-Dive"
interlinks:
  - "n8n-tutorial-deutsch-2026"
  - "prompt-engineering-lernen-2026"
  - "chatgpt-vs-claude-content-creator-2026"
heroImage: "/images/blog/n8n-chatgpt-workflow-2026-1.webp"
heroImageThumb: "/images/blog/n8n-chatgpt-workflow-2026-1-thumb.webp"
---

# n8n + ChatGPT: Mein Automatisierungs-Stack

<div class="rf-block rf-tldr">
	<span class="rf-label">TL;DR</span>
	<ul>
		<li>n8n + ChatGPT ist die Kombination die meinen Content-Output verdreifacht hat — ohne dass ich mehr Zeit investiere</li>
		<li>Ich zeige 3 konkrete n8n chatgpt workflow Setups die ich selbst taeglich nutze</li>
		<li>Jeder Workflow wird Node fuer Node erklaert, kein "einfach so funktioniert das halt"</li>
		<li>Die OpenAI-Kosten fuer alle drei zusammen: unter 5 EUR im Monat</li>
		<li>Das hier ist kein YouTube-Tutorial-Klon — ich zeige was wirklich in Produktion laeuft</li>
	</ul>
</div>

---

Ich hab lange gebraucht bis ich kapiert habe was der Unterschied zwischen "ChatGPT nutzen" und "ChatGPT automatisieren" ist.

ChatGPT aufmachen, Prompt reintippen, Ergebnis kopieren — das ist manuell. Das frisst Zeit. Das skaliert nicht. Und ehrlich gesagt nervt es mich nach dem dritten Mal schon.

n8n chatgpt workflow bedeutet: ich definiere den Ablauf einmal, stelle den Trigger ein, und danach laeuft das Ding von selbst. Ich bekomme morgens eine Telegram-Nachricht mit dem fertigen Content-Brief. Ich oeffne n8n abends und die Social Posts fuer die naechste Woche sind schon drin. Das ist der Unterschied.

Ich nutze n8n selbst-gehosted auf einem kleinen VPS — wenn du mit n8n noch nicht vertraut bist, schau dir zuerst meinen [n8n Tutorial Deutsch](n8n-tutorial-deutsch-2026) an, da erklaere ich die Grundlagen. Hier gehe ich direkt in die Tiefe.

---

## Warum n8n + ChatGPT und nicht einfach ChatGPT Plus?

Kurze Antwort: Weil ChatGPT Plus kein Automatisierungstool ist.

ChatGPT Plus gibt mir bessere Modelle und mehr Features im Browser. Aber ich muss trotzdem hingehen, prompten, warten, kopieren. Bei jeder verdammten Aufgabe.

Die OpenAI API ueber n8n zu nutzen bedeutet: Ich schreibe den Prompt einmal in einen n8n-Node. Ich definiere den Trigger. Fertig. Danach laeuft das ohne mich.

Ausserdem ist die API oft guenstiger als gedacht. GPT-4o Mini kostet so wenig pro Token dass ich mir manchmal frage warum ich ueberhaupt gezaehlt habe. Fuer meine drei Haupt-Workflows zahle ich tatsaechlich unter 5 EUR im Monat. GPT-4o kostet mehr, aber ich nutze den nur da wo er wirklich noetig ist.

Ein Punkt den ich wichtig finde: n8n gibt mir volle Kontrolle ueber den Datenfluss. Ich weiss genau was in den Prompt reingeht und was rauskommt. Kein Blackbox-Gefuehl wie bei manchen No-Code-Tools die "AI-Features" eingebaut haben aber nicht sagen was damit gemacht wird.

---

## Setup: Was ich brauche

Bevor ich die Workflows zeige, kurz das Grundsetup:

**n8n:** Ich nutze die Self-Hosted Version auf einem Hetzner VPS (CX21, 6 EUR/Monat). Die Cloud-Variante funktioniert genauso fuer alle Workflows hier.

**OpenAI Account:** API-Key holen unter platform.openai.com. Wichtig: Das ist NICHT der ChatGPT Plus Account. Das ist ein separater API-Account. Guthaben aufladen (10-20 EUR reichen erstmal) und einen Key erstellen.

**In n8n den OpenAI Credential anlegen:**

1. In n8n: Settings → Credentials → New
2. "OpenAI" auswaehlen
3. API Key eintragen
4. Done

[SCREENSHOT: n8n Credential Setup fuer OpenAI, API Key Eingabefeld]

Jetzt zu den drei Workflows.

---

## Workflow 1: Automatischer Content-Brief aus RSS

**Was der Workflow macht:** Jeden Morgen um 7 Uhr durchsucht n8n eine Liste von RSS-Feeds (Technologie-Blogs, AI-News), filtert die interessantesten Artikel, schickt die Zusammenfassungen an ChatGPT und legt mir einen fertigen Content-Brief in Notion ab.

**Warum ich das brauche:** Ich folge ungefaehr 30 RSS-Feeds. Das waren frueher 30-45 Minuten Research pro Tag. Jetzt bekomme ich um 7:15 Uhr eine Telegram-Benachrichtigung mit drei Content-Ideen die tatsaechlich relevant sind. Die Research laeuft ohne mich.

### Node fuer Node

**Node 1 — Schedule Trigger**

- Typ: Schedule Trigger
- Einstellung: Every Day, 7:00 AM
- Das ist der Startschuss. Jeden Morgen, punklich.

**Node 2 — RSS Feed Read (wiederholt fuer jeden Feed)**

- Typ: RSS Feed Read
- URL: Einer meiner RSS-Feeds (z.B. https://feeds.feedburner.com/techcrunch)
- Items to Return: 5 (die 5 neuesten Eintraege)

Ich habe diesen Node drei Mal nebeneinander — einmal pro Haupt-Feed. Die Outputs landen alle beim naechsten Node.

**Node 3 — Merge**

- Typ: Merge
- Mode: Append
- Alle drei RSS-Outputs werden zusammengefuehrt in eine Liste

**Node 4 — Item Lists (Sort + Limit)**

- Sortiert nach Datum (neuste zuerst)
- Limit: 10 Artikel maximal weiterleiten

[SCREENSHOT: n8n Canvas mit den ersten 4 Nodes, Verbindungen sichtbar]

**Node 5 — Code Node (Artikel-Text zusammenbauen)**

- Typ: Code
- Ich baue hier einen strukturierten Text pro Artikel zusammen:

```javascript
const items = $input.all();
const articleList = items
  .map((item) => {
    return `Titel: ${item.json.title}\nURL: ${item.json.link}\nBeschreibung: ${item.json.contentSnippet || item.json.summary || "keine"}`;
  })
  .join("\n\n---\n\n");

return [{ json: { articleList } }];
```

Dieser Node reduziert 10 Eintraege auf einen einzigen Text-Block. Das ist wichtig damit der naechste ChatGPT-Call nicht 10 separate API-Requests macht.

**Node 6 — OpenAI (Chat Model)**

- Typ: OpenAI
- Operation: Message a Model
- Model: gpt-4o-mini (reicht hier voellig)
- Prompt (System): "Du bist ein Content-Stratege fuer einen Tech-Blog der sich auf Maker, Home Automation und AI fokussiert. Deine Aufgabe: Identifiziere aus der folgenden Artikel-Liste die 3 interessantesten Ideen fuer Blog-Content und schreibe je einen kurzen Content-Brief (Idee, Angle, Zielgruppe, 3 Punkte die der Artikel abdecken soll)."
- Prompt (User): Die n8n-Expression `$json.articleList` — also der zusammengebaute Text aus dem Code Node

Das ist der Kern des n8n chatgpt workflow — der OpenAI Node mit dem richtigen Prompt.

[SCREENSHOT: n8n OpenAI Node Config, Prompt-Felder ausgefuellt]

**Node 7 — Notion**

- Typ: Notion
- Operation: Create Page
- Database: Meine Content-Pipeline-Datenbank
- Fields: Titel = "Content Brief" + aktuelles Datum via n8n-Expression, Content = OpenAI Output

**Node 8 — Telegram**

- Typ: Telegram
- Operation: Send Message
- Chat ID: Meine Telegram-Chat-ID
- Message: "Content Brief fuer heute ist in Notion. Schau mal rein."

Fertig. Der Workflow laeuft jeden Morgen, ich bekomme eine kurze Benachrichtigung und finde einen fertigen Brief in Notion. Zeitersparnis: ~40 Minuten taeglich.

---

## Workflow 2: Social Post Generator aus Blog-Artikel

**Was der Workflow macht:** Wenn ich einen neuen Artikel in meiner Notion-Datenbank auf "Ready to Post" stelle, generiert dieser Workflow automatisch Social-Media-Posts fuer drei Plattformen (LinkedIn, Twitter/X, Mastodon) — mit unterschiedlichem Ton und Laenge fuer jede Plattform.

**Warum ich das brauche:** Einen guten Artikel schreiben dauert Stunden. Danach noch drei verschiedene Social-Post-Varianten zu schreiben nervt einfach. Das ist repetitiv, das koennte auch ein Automat.

### Node fuer Node

**Node 1 — Notion Trigger**

- Typ: Notion Trigger
- Event: Page Updated
- Database: Content-Pipeline
- Filter: Status = "Ready to Post"

Sobald ich in Notion den Status eines Artikels aendere, feuert dieser Trigger.

**Node 2 — Notion (Get Page)**

- Typ: Notion
- Operation: Get Page
- Ich hole die vollstaendigen Seiten-Daten: Titel, Meta-Description, URL, Artikel-Intro (erste 500 Zeichen)

**Node 3 — OpenAI (LinkedIn Post)**

- Model: gpt-4o-mini
- System Prompt: "Du schreibst LinkedIn-Posts fuer einen Tech-Blogger. Ton: professionell aber persoenlich, keine Floskeln, kein 'Ich freue mich'. Max 1200 Zeichen. Starte mit einer provokanten These oder einer persoenlichen Beobachtung. 3-5 kurze Absaetze. Ende mit einer offenen Frage."
- User Prompt: Artikel-Titel, Meta-Description, Intro und URL werden per n8n-Expression aus dem Notion-Datensatz gezogen

**Node 4 — OpenAI (Twitter/X Post)**

- Model: gpt-4o-mini
- System Prompt: "Schreibe einen Twitter-Post. Max 280 Zeichen. Direkt, keine Emojis ausser 1 am Anfang. Endet mit dem Link als [URL]."
- User Prompt: Gleiche Daten wie Node 3

**Node 5 — OpenAI (Mastodon Post)**

- Model: gpt-4o-mini
- System Prompt: "Mastodon-Post fuer eine Tech-Community. 500 Zeichen max. Etwas geekiger als LinkedIn, #Hashtags am Ende (max 4)."
- User Prompt: Gleiche Daten

[SCREENSHOT: n8n Workflow mit drei parallelen OpenAI-Nodes fuer die drei Plattformen]

Ich nutze hier drei separate OpenAI-Nodes statt einem — das klingt verschwenderisch, aber jeder bekommt seinen eigenen System-Prompt und damit einen anderen Output. Wenn ich alle drei in einen Prompt packe, wird das Ergebnis schlechter. Das habe ich ausprobiert.

**Node 6 — Notion (Update Page)**

- Ich speichere alle drei generierten Posts als Properties der Notion-Seite
- LinkedIn Post, Twitter Post, Mastodon Post als Text-Properties

Danach schaue ich kurz rein, passe ggf. minimal an, und poste manuell oder per separatem Buffer-Workflow. Das manuelle Review ist bewusst — ich will nicht dass Dinge ungeprueft rausgehen.

---

## Workflow 3: KI-gestuetzter Kommentar-Monitor

Das ist der Workflow der am meisten Reaktionen bekommt wenn ich ihn erwaehne.

**Was der Workflow macht:** Alle 4 Stunden prueft der Workflow neue Kommentare auf meinem Blog und in meinen Discord-Servern (Medieval Frontiers, Prospera). ChatGPT analysiert jeden Kommentar und kategorisiert ihn: technische Frage, positives Feedback, Bug-Report, oder "needs manual review". Ich bekomme eine taeglich Zusammenfassung mit Prioritaeten.

**Warum ich das brauche:** Community-Management ist einer der Zeitfresser die am wenigsten sichtbar sind. Ein Kommentar hier, ein Discord-Thread da, eine GitHub-Issue dort. Ohne System verliert man den Ueberblick. Mit diesem Workflow behalte ich die Kontrolle ohne staendig alles zu checken.

### Node fuer Node

**Node 1 — Schedule Trigger**

- Alle 4 Stunden

**Node 2 — HTTP Request (Blog API)**

- Mein Blog hat eine simple API unter `/api/comments?since=...` — der Zeitstempel wird per n8n-Expression auf "letzte 4 Stunden" gesetzt
- Gibt JSON-Array mit neuen Kommentaren zurueck

**Node 3 — Discord (Get Messages)**

- Typ: Discord
- Operation: Get Messages
- Channel ID: Meine Support-Channel-ID
- Limit: 50 neueste Nachrichten

**Node 4 — Merge**

- Blog-Kommentare und Discord-Nachrichten zusammenfuehren

**Node 5 — Filter**

- Entfernt Messages von mir selbst (anhand der User-ID)
- Entfernt bereits verarbeitete Items (ich nutze eine kleine SQLite-Tabelle als State)

**Node 6 — Code Node (Batch-Aufbereitung)**
Alle gefilterten Kommentare werden in einen strukturierten Text zusammengefuehrt:

```javascript
const comments = $input.all();
const formatted = comments
  .map(
    (c, i) =>
      `[${i + 1}] Quelle: ${c.json.source} | Von: ${c.json.author}\n${c.json.content}`,
  )
  .join("\n\n");

return [{ json: { commentBatch: formatted, count: comments.length } }];
```

**Node 7 — OpenAI (Kategorisierung)**

- Model: gpt-4o-mini
- System Prompt: "Du analysierst Community-Kommentare fuer einen Tech-Blog und Discord-Server. Kategorisiere jeden Kommentar als: FRAGE (technische oder allgemeine Frage), FEEDBACK_POS (positives Feedback), BUG (Bug-Report oder Fehler-Meldung), SPAM (offensichtlicher Spam), REVIEW (muss manuell geprueft werden, z.B. kontroverse Diskussion). Antworte als JSON-Array mit den Feldern: id (Nummer aus dem Input), kategorie, prioritaet (1-3, wobei 1=dringend), kurze_zusammenfassung."
- User Prompt: Die aufbereiteten Kommentare aus dem Code Node als n8n-Expression `$json.commentBatch`

Das ist der anspruchsvollste Prompt in meinem Stack. Ich habe ihn ueber mehrere Wochen verfeinert. Die Schluessel-Entscheidung war das JSON-Output-Format zu erzwingen — dann kann ich den naechsten Node direkt mit strukturierten Daten fuettern.

[SCREENSHOT: OpenAI Node Response mit JSON-Array Kategorisierungen]

**Node 8 — Code Node (Zusammenfassung aufbereiten)**
Parsed das JSON, sortiert nach Prioritaet, baut den Telegram-Report:

```javascript
const analysisRaw = $input.first().json.text;
const analysis = JSON.parse(analysisRaw);

const urgent = analysis.filter((a) => a.prioritaet === 1);
const normal = analysis.filter((a) => a.prioritaet > 1);

const report = `Community Report (${new Date().toLocaleDateString("de-DE")})

DRINGEND (${urgent.length}):
${urgent.map((a) => `- [${a.kategorie}] ${a.kurze_zusammenfassung}`).join("\n")}

NORMAL (${normal.length}):
${normal.map((a) => `- [${a.kategorie}] ${a.kurze_zusammenfassung}`).join("\n")}`;

return [{ json: { report } }];
```

**Node 9 — Telegram**
Sendet den Report an meinen privaten Telegram-Bot.

Was ich an diesem Workflow besonders mag: Er braucht mich nicht zu ersetzen. Er stellt sicher dass ich nichts verpasse und weiss wo ich anfangen soll. Das ist der richtige Einsatz von AI-Automatisierung — Triage, nicht Autonomie.

---

## Was ich gelernt habe (und was nicht so toll ist)

Drei Dinge die ich gerne frueher gewusst haette:

**1. Prompts in n8n sind anders als in ChatGPT direkt.** In ChatGPT habe ich Kontext — das Chat-Interface, den Verlauf. In n8n ist jeder API-Call komplett kontextlos. Der System-Prompt muss deshalb praeziser sein. Ich musste jeden Prompt neu schreiben.

**2. gpt-4o-mini vs gpt-4o klug einsetzen.** Fuer Kategorisierung und einfache Text-Generierung reicht Mini voellig. Fuer komplexere Aufgaben wie das Content-Brief-Writing wo Kreativitaet und Qualitaet zaehlen lohnt sich gpt-4o. Ich habe das durchgetestet. Den Unterschied bei den Content-Briefs merkt man, bei der Kommentar-Kategorisierung kaum.

**3. Error Handling nicht vergessen.** Wenn der OpenAI API-Call fehlschlaegt (passiert selten, aber passiert), muss der Workflow das graceful handeln. Ich habe jedem OpenAI-Node einen Error-Output hinzugefuegt der mir eine Telegram-Nachricht schickt. Klingt kleinkraemig, hat mir aber schon zweimal den Tag gerettet.

Was nervt: Die n8n OpenAI-Node ist manchmal pingelig mit dem Output-Format. Wenn ich JSON erwarte und ChatGPT leichte Abweichungen produziert (ein Zeichen extra, markdown-Wrapper drum), crasht der naechste Node. Die Loesung ist ein Try-Catch im Code Node dahinter. Nicht elegant, aber es funktioniert.

---

## Die Kosten im echten Betrieb

Alle drei Workflows zusammen laufen seit ungefaehr 4 Monaten. Die monatlichen OpenAI-Kosten pendeln zwischen 3 und 7 EUR. Der Hauptkostentreiber ist Workflow 1 (daily RSS-Brief) wenn viele Artikel reinkommen.

Die n8n Selbst-Hosting-Kosten sind Teil meines normalen VPS — da laeuft noch mehr drauf. Separat betrachtet: Der VPS kostet 6 EUR, n8n ist Open Source.

Fuer diesen n8n chatgpt workflow Stack zahle ich also unter 15 EUR monatlich. Dafuer spart er mir schaetzungsweise 1,5-2 Stunden taeglich. Die ROI-Rechnung muss ich nicht machen.

---

## Wo du anfangen solltest

Wenn du noch keinen n8n chatgpt workflow laufen hast:

Starte mit Workflow 2 (Social Post Generator). Er ist der einfachste, der Nutzen ist sofort sichtbar, und du lernst dabei wie OpenAI-Nodes in n8n funktionieren. Wenn der laeuft, macht Workflow 1 Sinn — der hat mehr Nodes, aber das Prinzip ist das gleiche.

Workflow 3 empfehle ich erst wenn du ein bisschen Erfahrung mit dem Code Node hast. Das JSON-Parsing kann frustrieren wenn man noch nicht weiss wie man Fehler debuggt.

Wenn du tiefer in Prompt Engineering einsteigen willst — ich habe [ein eigenes System dafuer entwickelt](prompt-engineering-lernen-2026) das ich seit ueber einem Jahr nutze. Und falls du dich fragst ob ChatGPT oder Claude die bessere Wahl fuer deinen Stack ist: [den Vergleich habe ich hier gemacht](chatgpt-vs-claude-content-creator-2026), mit echten Use Cases statt Benchmark-Zahlen.

---

## Fazit

n8n + ChatGPT ist kein Hype-Stack. Es ist ein pragmatisches Werkzeug das ich taeglich nutze weil es funktioniert.

Der entscheidende Mindshift: Nicht "wie kann AI mir helfen" sondern "welche wiederholende Aufgabe kann ich einmal definieren und dann vergessen". Das ist das Prinzip hinter jedem dieser Workflows.

Die OpenAI API macht aus n8n-Automationen mehr als nur Daten-Routing. Mit einem guten Prompt wird n8n zu einem System das tatsaechlich denkt — oder zumindest gut genug denkt dass ich die Zeit lieber fuer andere Dinge nutze.
