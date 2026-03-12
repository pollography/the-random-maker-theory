---
title: "Amazons AI Code Probleme: 6 Stunden Down"
slug: "amazon-ai-code-probleme"
date: "2026-03-12"
description: "Amazon hatte 6h Outage wegen KI-generiertem Code. Ich nutz Claude Code taeglich, hier ist was das fuer uns bedeutet und was ich jetzt anders mache."
tags: ["ki-news", "ki-tools", "automation", "coding", "claude-code"]
category: "ki-news"
draft: false
readingTime: 8
heroImage: "/images/blog/amazon-ai-code-probleme-1.webp"
heroImageThumb: "/images/blog/amazon-ai-code-probleme-1-thumb.webp"
titleAccent: "AI Code"
keywords: ["AI Code Probleme", "Amazon Outage", "KI Code Review", "AI Coding"]
---

Ein AI-Agent hat eine AWS-Produktionsumgebung geloescht. Einfach so. Ohne Rueckfrage. 13 Stunden Outage in China. Und das war nicht mal der groesste Vorfall.

Amazon. Die Firma mit mehr Engineers als manche Staedte Einwohner haben. Hat sich mit KI-generiertem Code mehrfach ins eigene Knie geschossen. Innerhalb von weniger als einem Jahr. Und ich sitz hier, arbeite jeden Tag mit Claude Code und denke mir: oh.

## Was genau passiert ist

Am 5. Maerz 2026 war Amazon Shopping fuer circa 6 Stunden teilweise oder komplett nicht erreichbar. Checkout kaputt. Login kaputt. Preisanzeigen. Amazon Fresh. Alles.

In einem internen Briefing das danach geleakt wurde, spricht Amazon von einem "Trend of Incidents" mit "high blast radius". Und diese Incidents seien direkt oder indirekt mit "GenAI-assisted changes" verknuepft. Also mit KI-generiertem Code.

<div class="vb-stat">
<span class="vb-stat-number">6h</span>
<span class="vb-stat-text">Amazon komplett down. Checkout, Login, Preise, Fresh, alles. Ursache laut internem Briefing: KI-generierter Code mit "high blast radius".</span>
</div>

Und es hoert nicht da auf. Amazon hatte bereits Ende 2025 mehrere Vorfaelle mit "Amazon Q Developer", ihrem eigenen internen AI-Coding-Tool. Dann im Dezember 2025 der Knaller: Amazons AI-Agent "Kiro" hat autonom eine AWS Cost Explorer Umgebung geloescht. Nicht "fast geloescht". Komplett weg. 13 Stunden Outage in der China-Region.

Lass das mal sacken. Ein AI-Agent hat eigenstaendig eine Produktionsumgebung entfernt. Ohne dass ein Mensch "ja" gesagt haette.

Das war mindestens der 4. grosse Vorfall in Amazons AI-Coding Rollout. Der vierte. In weniger als einem Jahr.

<div class="vb-glow"></div>

## Die offizielle vs. die echte Story

Jetzt wird es spannend. Amazon sagt oeffentlich: "Keine Evidenz dass AI-Tools mehr Incidents verursachen als andere Code-Changes."

Aber. Das interne Briefing sagt gleichzeitig: "Novel GenAI usage for which best practices and safeguards are not yet fully established."

Beides ist halt irgendwie wahr. Und widerspricht sich trotzdem. "Wir haben keine Evidenz" kann auch einfach heissen: Wir tracken das noch nicht gut genug. Und "best practices not established" ist basically Amazon-Sprache fuer: Wir machen das auf Verdacht und hoffen.

<div class="vb-highlight">

**Amazons Reaktion:** Junior- und Mid-Level-Devs brauchen ab sofort Senior-Approval fuer KI-generierten Code bevor er in Production geht. Gleichzeitig plant Amazon Entlassungen. Mehr menschliche Kontrolle mit weniger Menschen. Die Logik erschliesst sich mir ehrlich gesagt nicht.

</div>

Was sie jetzt konkret tun klingt sinnvoll. In der Theorie halt. In der Praxis rubber-stampt ein Senior Dev der 20 AI-generierte PRs am Tag reviewen soll spaetestens nach Woche 2 durch. Das Problem ist systemisch. Das loest du nicht mit ner neuen Approval-Stufe.

Elon Musk hat auf X kommentiert: "Proceed with caution." Der Mann der mit Tesla und SpaceX quasi alles auf Automatisierung setzt. Wenn der bremst... hm.

<div class="vb-gradient"></div>

## Warum das bei Amazon passiert

Amazon hat intern massiv auf AI-Coding gesetzt. Verstaendlich: zehntausende Engineers, Codebasen die seit 20 Jahren gewachsen sind, AI-Tools die Velocity versprechen. Wer will da nein sagen?

Das Problem liegt halt im Gap. Zwischen "AI schreibt Code der kompiliert" und "AI versteht was dieser Code im Kontext eines verteilten Systems mit echten Usern und echten Daten macht."

AI-Code hat ein ganz spezifisches Problem. Lokal korrekt, global falsch. Das Modell loest das Problem das du ihm beschreibst. Was sonst noch an diesem System haengt, weiss es nicht. Welcher Service auf diese Umgebung angewiesen ist. Welcher Cronjob nachts um 3 diese Tabelle liest. Das weisst du. Oder solltest es zumindest.

<div class="vb-shimmer">
<div class="vb-shimmer-inner">

**Das Kernproblem in einem Satz:** AI-Code ist lokal korrekt, global falsch. Das Modell loest das Problem das du ihm gibst. Alles drumherum, Services, Dependencies, Cronjobs, existiert fuer das Modell schlicht nicht.

</div>
</div>

### Drei Typen von AI Code Problemen die ich selber kenne

**Problem 1: Der confident wrong output.** AI schreibt Code der logisch aussieht, sauber strukturiert, gut kommentiert. Und fundamental falsch ist, weil ein Requirement falsch kommuniziert wurde. Hatte ich schon. Kein Drama wenn du reviewst. Katastrophe wenn du blind deployst.

**Problem 2: Der Scope Creep durch Autonomie.** Kiro hat ne Umgebung geloescht weil es die Aufgabe hatte "Cost Explorer aufzuraeumen" oder so aehnlich. Das Modell hat das Problem geloest das es verstand. Ob Loeschen die richtige Interpretation von "aufraeumen" ist? Hat es halt nicht gefragt. Autonome Agents werden sofort gefaehrlich sobald sie Delete-Permissions haben.

**Problem 3: Senior Dev als Bottleneck-Theater.** Amazons Loesung klingt erstmal sinnvoll. Mehr Approval. In der Praxis rubber-stampen ueberlastete Senior Devs spaetestens nach Woche 2 alles durch. Das ist halt Theater.

<div class="vb-glow"></div>

## Was ich konkret anders mache

Ich nutz Claude Code fuer meine eigenen Projekte: [diesen Blog](/blog/claude-code-ultimate-setup-produktivitaet-2026), Automations, kleinere Tools. Kein Production-System mit tausenden Usern. Aber trotzdem hab ich nach dem Amazon-Ding meinen Workflow kurz ueberpruefen muessen.

<div class="vb-card">

#### Meine 4 Regeln fuer AI-Code

**Jeden Output lesen.** Claude schreibt Code fast schneller als ich lesen kann. Das verleitet krass zum Scrollen und Nicken. Ich force mich dazu jeden geaenderten Block wirklich zu lesen. Jeden einzelnen.

**Keine Delete-Permissions fuer AI.** Nie. Nicht in Skripten, nicht in Agents, nicht in Automations. Wenn etwas geloescht werden soll, schreib ich den Delete-Command selber. Keine Faulheit. Grundhygiene.

**Kontext rein, nicht nur Task.** Ich sag nicht "bau mir eine Funktion die X macht". Ich sag: Hier ist der Kontext, hier ist was drumherum haengt, hier ist was dieser Code NICHT anfassen darf. Kostet 2 Minuten mehr. Spart dir Stunden Recovery.

**Kleiner Scope, haeufiges Commit.** Lieber 10 kleine Changes die ich einzeln verstehe als ein fetter PR mit 400 geaenderten Zeilen. Gilt fuer AI-Code noch mehr als fuer handgeschriebenen.

</div>

## Das eigentliche Problem: Velocity als einzige Metrik

Amazon, und ehrlich gesagt die gesamte Tech-Branche, hat AI-Coding hauptsaechlich als Velocity-Problem gesehen. Schneller deployen. Mehr Features. Weniger Kosten.

<div class="vb-highlight-teal">

**Velocity ohne Reliability ist Tempo bergab ohne Bremsen.** Frag dich nicht "wie schnell kann AI Code schreiben" sondern "wie viel verstehe ich noch von dem was deployed wird." Wenn die Antwort "eigentlich nicht mehr so viel" ist, hast du ein Ownership-Problem. Kein AI-Problem.

</div>

Klingt konservativ. Ist aber kein Widerspruch zu "maximal AI nutzen". Ich koennte ohne Claude Code nicht mehr so produktiv arbeiten. Aber "nutzen" heisst halt nicht "vertrauen ohne nachzufragen."

<div class="vb-gradient"></div>

## Was wird sich aendern

Kurzfristig: mehr Approval-Gates. Reflexartig. Hilft begrenzt.

Was wirklich kommen muss ist besseres Tooling fuer AI-Code-Tracing. Ich will wissen koennen welche Zeile in einem File ein Modell geschrieben hat, wann, mit welchem Prompt. Nicht als Schuldzuweisung. Als Debugging-Hilfe. Gibt es noch nicht wirklich.

Und Unternehmen muessen lernen Agent-Permissions granularer zu denken. Read-only Agents hier, Write-only in Sandboxes dort, Delete niemals autonom. Klingt offensichtlich. Hat Amazon aber halt nicht implementiert.

Der Elefant im Raum: Amazons eigene AI-Tools haben Amazons eigene Systeme kaputt gemacht. Selbst die Unternehmen die diese Tools bauen verstehen nicht vollstaendig was ihre Tools tun wenn man ihnen genuegend Rechte gibt. Das sollte allen zu denken geben.

---

Ich hoer nicht auf Claude Code zu nutzen. Waer albern. Aber ich nutz es wie ein scharfes Messer. Mit Respekt vor dem was es anrichten kann.

Amazon hat das auf die harte Tour gelernt. Muss ja nicht jeder so machen.

---

*Quellen: Tom's Hardware, The Register, The New Stack, Fortune, PC Gamer*
