---
title: "Amazons AI Code Probleme: 6 Stunden Down"
slug: "amazon-ai-code-probleme"
date: "2026-03-12"
description: "Amazon hatte 6h Outage wegen KI-generiertem Code. Ich nutz Claude Code täglich, hier ist was das für uns bedeutet und was ich jetzt anders mache."
tags: ["ki-news", "ki-tools", "automation", "coding", "claude-code"]
category: "ki-news"
draft: false
readingTime: 8
heroImage: "/images/blog/amazon-ai-code-probleme-1.webp"
heroImageThumb: "/images/blog/amazon-ai-code-probleme-1-thumb.webp"
titleAccent: "AI Code"
keywords: ["AI Code Probleme", "Amazon Outage", "KI Code Review", "AI Coding"]
---

Ein AI-Agent hat eine AWS-Produktionsumgebung gelöscht. Einfach so. Ohne Rückfrage. 13 Stunden Outage in China. Ja, leck mich fett.

Und das war nicht mal der grösste Vorfall.

Amazon. Die Firma mit mehr Engineers als manche Städte Einwohner haben. Hat sich mit KI-generiertem Code mehrfach ins eigene Knie geschossen. Innerhalb von weniger als einem Jahr. Und ich sitz hier, arbeite jeden Tag mit Claude Code, und denke mir: oh.

## Was genau passiert ist

Am 5. März 2026 war Amazon Shopping für circa 6 Stunden teilweise oder komplett nicht erreichbar. Checkout kaputt. Login kaputt. Preisanzeigen. Amazon Fresh. Alles weg.

In einem internen Briefing das danach geleakt wurde, spricht Amazon von einem "Trend of Incidents" mit "high blast radius". Diese Incidents seien direkt oder indirekt mit "GenAI-assisted changes" verknüpft. Also mit KI-generiertem Code. Ihrem eigenen.

<div class="vb-stat">
<span class="vb-stat-number">6h</span>
<span class="vb-stat-text">Amazon komplett down. Checkout, Login, Preise, Fresh, alles. Ursache laut internem Briefing: KI-generierter Code mit "high blast radius".</span>
</div>

Und da hört's nicht auf. Amazon hatte bereits Ende 2025 mehrere Vorfälle mit "Amazon Q Developer", ihrem eigenen internen AI-Coding-Tool. Dann im Dezember 2025 der eigentliche Knaller: Amazons AI-Agent "Kiro" hat autonom eine AWS Cost Explorer Umgebung gelöscht. Nicht "fast gelöscht". Komplett weg. 13 Stunden Outage in der China-Region.

Kurz sacken lassen. Ein AI-Agent hat eigenständig eine Produktionsumgebung entfernt. Ohne dass ein Mensch "ja" gesagt hätte. Wild.

Das war mindestens der 4. grosse Vorfall in Amazons AI-Coding Rollout. Der vierte. In weniger als einem Jahr.

<div class="vb-glow"></div>

## Die offizielle vs. die echte Story

Amazon sagt öffentlich: "Keine Evidenz dass AI-Tools mehr Incidents verursachen als andere Code-Changes."

Das interne Briefing sagt gleichzeitig: "Novel GenAI usage for which best practices and safeguards are not yet fully established."

Beides ist halt irgendwie wahr, und widerspricht sich trotzdem. "Wir haben keine Evidenz" kann auch einfach heissen: Wir tracken das noch nicht gut genug. Und "best practices not established" ist basically Amazon-Sprache für: Wir machen das auf Verdacht und hoffen dass nichts brennt.

<div class="vb-highlight">

**Amazons Reaktion:** Junior- und Mid-Level-Devs brauchen ab sofort Senior-Approval für KI-generierten Code bevor er in Production geht. Gleichzeitig plant Amazon Entlassungen. Mehr menschliche Kontrolle mit weniger Menschen. Die Logik erschliesst sich mir ehrlich gesagt nicht.

</div>

Was sie konkret tun klingt sinnvoll. In der Theorie. In der Praxis rubber-stampt ein Senior Dev der 20 AI-generierte PRs am Tag reviewen soll spätestens nach Woche 2 durch. Das Problem ist systemisch. Das löst du nicht mit ner neuen Approval-Stufe.

Elon Musk hat auf X kommentiert: "Proceed with caution." Der Mann der mit Tesla und SpaceX quasi alles auf Automatisierung setzt. Wenn der bremst... hm.

<div class="vb-gradient"></div>

## Warum das bei Amazon passiert

Amazon hat intern massiv auf AI-Coding gesetzt. Verständlich: zehntausende Engineers, Codebasen die seit 20 Jahren gewachsen sind, AI-Tools die Velocity versprechen. Wer will da nein sagen?

Das Problem liegt im Gap. Zwischen "AI schreibt Code der kompiliert" und "AI versteht was dieser Code im Kontext eines verteilten Systems mit echten Usern und echten Daten macht." Dieser Gap ist riesig. Und meistens unsichtbar bis er knallt.

AI-Code hat ein ganz spezifisches Problem: lokal korrekt, global falsch. Das Modell löst das Problem das du ihm beschreibst. Was sonst noch an diesem System hängt, weiss es nicht. Welcher Service auf diese Umgebung angewiesen ist. Welcher Cronjob nachts um 3 diese Tabelle liest. Das weisst du. Oder solltest es zumindest.

<div class="vb-shimmer">
<div class="vb-shimmer-inner">

**Das Kernproblem in einem Satz:** AI-Code ist lokal korrekt, global falsch. Das Modell löst das Problem das du ihm gibst. Alles drumherum, Services, Dependencies, Cronjobs, existiert für das Modell schlicht nicht.

</div>
</div>

### Drei Typen von AI Code Problemen die ich selber kenn

**Problem 1: Der confident wrong output.** AI schreibt Code der logisch aussieht, sauber strukturiert, gut kommentiert. Und fundamental falsch ist, weil ein Requirement falsch kommuniziert wurde. Hatte ich schon. Kein Drama wenn du reviewst. Katastrophe wenn du blind deployst.

**Problem 2: Der Scope Creep durch Autonomie.** Kiro hat ne Umgebung gelöscht weil es die Aufgabe hatte "Cost Explorer aufzuräumen" oder so ähnlich. Das Modell hat das Problem gelöst das es verstand. Ob Löschen die richtige Interpretation von "aufräumen" ist? Hat es halt nicht gefragt. Ohhh maaaan. Autonome Agents werden sofort gefährlich sobald sie Delete-Permissions haben.

**Problem 3: Senior Dev als Bottleneck-Theater.** Amazons Lösung klingt erstmal sinnvoll. Mehr Approval. In der Praxis rubber-stampen überlastete Senior Devs spätestens nach Woche 2 alles durch. Das ist halt Theater.

<div class="vb-glow"></div>

## Was ich konkret anders mach

Ich nutz Claude Code für meine eigenen Projekte: [diesen Blog](/blog/claude-code-ultimate-setup-produktivitaet-2026), Automations, kleinere Tools. Kein Production-System mit tausenden Usern. Aber trotzdem hab ich nach dem Amazon-Ding meinen Workflow kurz überprüft.

<div class="vb-card">

#### Meine 4 Regeln für AI-Code

**Jeden Output lesen.** Claude schreibt Code fast schneller als ich lesen kann. Das verleitet krass zum Scrollen und Nicken. Ich force mich dazu jeden geänderten Block wirklich zu lesen. Jeden einzelnen.

**Keine Delete-Permissions für AI.** Nie. Nicht in Skripten, nicht in Agents, nicht in Automations. Wenn etwas gelöscht werden soll, schreib ich den Delete-Command selber. Keine Faulheit. Grundhygiene.

**Kontext rein, nicht nur Task.** Ich sag nicht "bau mir eine Funktion die X macht". Ich sag: Hier ist der Kontext, hier ist was drumherum hängt, hier ist was dieser Code NICHT anfassen darf. Kostet 2 Minuten mehr. Spart dir Stunden Recovery.

**Kleiner Scope, häufiges Commit.** Lieber 10 kleine Changes die ich einzeln verstehe als ein fetter PR mit 400 geänderten Zeilen. Gilt für AI-Code noch mehr als für handgeschriebenen.

</div>

## Das eigentliche Problem: Velocity als einzige Metrik

Amazon, und ehrlich gesagt die gesamte Tech-Branche, hat AI-Coding hauptsächlich als Velocity-Problem gesehen. Schneller deployen. Mehr Features. Weniger Kosten. Immer schneller, immer mehr.

<div class="vb-highlight-teal">

**Velocity ohne Reliability ist Tempo bergab ohne Bremsen.** Frag dich nicht "wie schnell kann AI Code schreiben" sondern "wie viel verstehe ich noch von dem was deployed wird." Wenn die Antwort "eigentlich nicht mehr so viel" ist, hast du ein Ownership-Problem. Kein AI-Problem.

</div>

Klingt konservativ. Ist aber kein Widerspruch zu "maximal AI nutzen". Ich könnte ohne Claude Code nicht mehr so produktiv arbeiten. Aber "nutzen" heisst halt nicht "vertrauen ohne nachzufragen."

<div class="vb-gradient"></div>

## Was wird sich ändern

Kurzfristig: mehr Approval-Gates. Reflexartig. Hilft begrenzt.

Was wirklich kommen muss ist besseres Tooling für AI-Code-Tracing. Ich will wissen können welche Zeile in einem File ein Modell geschrieben hat, wann, mit welchem Prompt. Nicht als Schuldzuweisung, sondern als Debugging-Hilfe. Gibt es noch nicht wirklich.

Unternehmen müssen lernen Agent-Permissions granularer zu denken: Read-only Agents hier, Write-only in Sandboxes dort, Delete niemals autonom. Klingt offensichtlich. Hat Amazon aber halt nicht implementiert.

Der Elefant im Raum ist eigentlich krass: Amazons eigene AI-Tools haben Amazons eigene Systeme kaputt gemacht. Selbst die Unternehmen die diese Tools bauen verstehen nicht vollständig was ihre Tools tun wenn man ihnen genug Rechte gibt. Das sollte zu denken geben.

---

Ich hör nicht auf Claude Code zu nutzen. Wär albern. Aber ich nutz es wie ein scharfes Messer, mit Respekt vor dem was es anrichten kann.

Amazon hat das auf die harte Tour gelernt. Muss ja nicht jeder so machen.

---

*Quellen: Tom's Hardware, The Register, The New Stack, Fortune, PC Gamer*
