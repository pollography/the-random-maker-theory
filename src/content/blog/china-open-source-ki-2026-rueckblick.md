---
title: "Chinas offene KI-Modelle 2026: Die Aufholjagd, die keine mehr ist"
slug: "china-open-source-ki-2026-rueckblick"
date: "2026-08-19"
description: "Ein 9B-Modell schlägt ein 120B-Modell. Ein Frontier-Modell wird komplett ohne Nvidia trainiert. Und die besten Coding-Modelle kosten ein Zwanzigstel. Was 2026 bei Open Source aus China passiert ist."
tags:
  [
    "open-source",
    "ki-news",
    "analyse",
    "rueckblick",
    "ki-tools",
    "lokale-ki",
  ]
category: "ki-news"
draft: false
readingTime: 13
heroImage: "/images/blog/china-open-source-ki-2026-rueckblick-1.webp"
heroImageThumb: "/images/blog/china-open-source-ki-2026-rueckblick-1-thumb.webp"
titleAccent: "keine mehr ist"
keywords:
  [
    "Open Source KI 2026",
    "chinesische KI-Modelle",
    "DeepSeek V4",
    "Qwen 3.5",
    "GLM-5.1",
    "Kimi K2.6",
    "lokale KI Modelle",
  ]
podcastUrl: ""
videoUrl: ""
---

<div class="rf-block rf-tldr" role="note" aria-label="TL;DR">
	<span class="rf-label" aria-hidden="true">TL;DR</span>
	<ul>
		<li>Qwen 3.5 Small: Ein 9-Milliarden-Modell schlägt OpenAIs 120-Milliarden-Modell bei wissenschaftlichem Reasoning.</li>
		<li>GLM-5.1 wurde komplett auf 100.000 Huawei-Chips trainiert. Kein einziger Nvidia-Chip — und es schlägt Claude Opus und GPT-5.4 auf SWE-Bench Pro.</li>
		<li>MiniMax M2.5 liefert Opus-nahe Coding-Qualität für ein Zwanzigstel des Preises.</li>
		<li>Die Gegenbewegung: OpenAI, Anthropic und Google dokumentierten 16 Millionen unautorisierte API-Zugriffe und bilden eine gemeinsame Front.</li>
		<li>Der eigentliche Gewinn für uns: Modelle, die lokal auf eigener Hardware laufen — ohne API-Key, ohne Token-Kosten, ohne Cloud.</li>
	</ul>
</div>

# Chinas offene KI-Modelle 2026: Die Aufholjagd, die keine mehr ist

Es gab diesen Moment im März, an dem ich zweimal hinschauen musste.

Alibaba hatte Qwen 3.5 Small released. Vier Modelle, das größte mit 9 Milliarden Parametern. Auf GPQA Diamond — einem Benchmark für Reasoning auf Doktoranden-Niveau in Biologie, Physik und Chemie — kam es auf **81,7 Prozent**.

OpenAIs GPT-OSS-120B, ein Modell mit dem Dreizehnfachen an Parametern, kam auf 71,5.

Ein Modell, das auf einen guten Gaming-Rechner passt, schlägt eins, das ein Rechenzentrum braucht. Das war der Punkt, an dem für mich klar wurde: Das hier ist keine Aufholjagd mehr. Das ist ein eigener Weg, und stellenweise ist er der bessere.

## Was tatsächlich passiert ist

Der Reihe nach, weil die Dichte schwer zu glauben ist, wenn man sie nicht chronologisch sieht.

**März — die Lawine.** Alibaba droppt Qwen 3.5 Small: vier Modelle von 0,8 bis 9 Milliarden Parametern, alle nativ multimodal, alle Apache 2.0. Das 2B-Modell läuft auf einem iPhone mit 4 GB RAM. Im Flugmodus. Gleichzeitig veröffentlicht MiniMax M2.5 — 230 Milliarden Parameter, davon 10 aktiv. Und DeepSeek kündigt V4 an.

Am erstaunlichsten fand ich damals eine Randnotiz: **OpenAI hat selbst Open-Weight-Modelle released.** GPT-OSS-120B und -20B unter Apache 2.0. Das erste Mal seit GPT-2, dass aus San Francisco etwas wirklich Offenes kommt. Man muss kein Zyniker sein, um den Zusammenhang zu sehen.

**April — die Ansage.** Zhipu AI stellt GLM-5.1 unter MIT-Lizenz online. 744 Milliarden Parameter als Mixture-of-Experts, 200K Kontext. Auf SWE-Bench Pro: 58,4 Prozent — vor GPT-5.4, Claude Opus 4.6 und Gemini 3.1 Pro.

Und dann der Satz, der die eigentliche Nachricht war: **trainiert auf 100.000 Huawei Ascend 910B Chips. Kein einziger Nvidia-Chip.**

Wenige Tage später kommt DeepSeek V4-Preview. V4-Pro mit 1,6 Billionen Parametern, V4-Flash mit 284 Milliarden, beide MIT-Lizenz, beide ab Tag eins mit **nativem Millionen-Token-Kontext** — nicht als nachgerüstete Erweiterung, sondern als Default. Der Preis für Flash: 14 Cent pro Million Input-Tokens.

**Mai — das Muster.** Vier chinesische Labs veröffentlichen in zwölf Tagen Coding-Modelle. Kimi K2.6 von Moonshot, eine Billion Parameter, schlägt GPT-5.4 auf SWE-Bench Pro — das erste offene Modell, das das schafft. GLM-4.7 kommt nach, wieder ohne Nvidia trainiert.

**Juli — der Alltag.** Ein 27-Milliarden-Modell passt bei 3,9 GB auf ein Smartphone. Das ist keine Schlagzeile mehr, das ist Routine geworden.

## Der Trick heißt Mixture-of-Experts

Kurz erklärt, weil sich sonst nicht erschließt, warum die Preise so absurd wirken.

Ein klassisches Modell aktiviert bei jeder Anfrage alle seine Parameter. Ein 230-Milliarden-Modell rechnet also mit 230 Milliarden Parametern — bei jedem einzelnen Wort.

Mixture-of-Experts teilt das Modell in viele Spezialisten auf und aktiviert pro Anfrage nur die passenden. MiniMax M2.5 hat 230 Milliarden Parameter, nutzt aber nur 10 Milliarden gleichzeitig. GLM-5.1: 744 Milliarden gesamt, 40 aktiv. DeepSeek V4-Pro: 1,6 Billionen gesamt, 49 aktiv.

Das Ergebnis ist die Denktiefe eines riesigen Modells bei den Kosten eines kleinen. Deshalb kostet M2.5 rund 15 Cent pro Aufgabe, wo Claude Opus 3 Dollar nimmt.

**Ein Zwanzigstel.** Bei vergleichbarer Coding-Qualität.

## Die unangenehme Seite

Und jetzt der Teil, den man nicht weglassen darf, wenn man ehrlich bleiben will.

Im April haben OpenAI, Anthropic und Google etwas getan, was es vorher nicht gab: Sie haben sich zusammengetan. Gegen chinesische Labs, die ihre Modelle systematisch per **adversarial distillation** nachbauen.

Die Methode ist simpel. Man befragt ein gutes Modell massenhaft und trainiert ein eigenes auf dessen Antworten. Billig, schnell, effektiv — und laut Nutzungsbedingungen klar verboten.

Anthropic allein dokumentierte **16 Millionen unautorisierte API-Zugriffe** von drei Firmen: DeepSeek, Moonshot AI und MiniMax. Also genau von denen, deren Modelle oben in der Liste stehen.

Kurz darauf ging das auf Regierungsebene. Das Weiße Haus beschuldigte China formell des Diebstahls geistigen Eigentums „auf industrieller Ebene". Und Peking konterte, indem es Metas bereits vollzogene 2-Milliarden-Übernahme des Startups Manus **rückwirkend** kassierte — vier Monate nach Abschluss, als die Integration längst lief. So etwas gab es vorher nicht.

<div class="rf-block rf-callout" role="note" aria-label="Mein Take">
	<span class="rf-label" aria-hidden="true">Mein Take</span>
	<p>Wenn ein Modell auf abgesaugtem Trainingssignal basiert, ist das kein fairer Wettbewerb. Da bin ich klar. Gleichzeitig finde ich die Empörung schwer erträglich: Dieselbe Branche hat jahrelang das halbe Internet ohne zu fragen eingesammelt, und Meta hat Open-Weight-Modelle strategisch verteilt, um den Markt zu fluten. Jetzt kopiert jemand die Ergebnisse, und plötzlich ist geistiges Eigentum heilig. Beide Dinge können wahr sein: Die Distillation ist unsauber, und die Aufregung darüber ist scheinheilig.</p>
</div>

Was dabei allerdings untergeht: **Adversarial Distillation erklärt nicht, wie man ein Frontier-Modell auf Huawei-Chips trainiert.** Das ist eigene Ingenieursarbeit, und sie ist der eigentlich bemerkenswerte Teil. Man kann Antworten absaugen. Eine funktionierende Trainings-Infrastruktur außerhalb des Nvidia-Ökosystems kann man nicht absaugen.

## Was das für dich und mich praktisch heißt

Ich baue Sachen, die lokal laufen sollen. Für mich ist der wichtigste Effekt nicht die Benchmark-Tabelle, sondern das hier:

**Lokale Modelle sind 2026 alltagstauglich geworden.** Ein 4B-Modell läuft flüssig auf einem normalen Gaming-Rechner. Ein 9B-Modell braucht eine anständige GPU, aber keine Serverfarm. Und ein 2B-Modell läuft auf dem Handy im Flugmodus.

Konkret heißt das: kein API-Key, keine Token-Abrechnung, keine Daten, die irgendwo hochgeladen werden. Für Content-Tagging, Zusammenfassungen, Umformulierungen, einfache Klassifizierung — alles Aufgaben, für die man kein Frontier-Modell braucht — reicht das völlig. Wie ich lokale Modelle bei mir einsetze, hab ich im [Ollama- und LM-Studio-Guide](/blog/lokale-ki-ollama-lm-studio-2026) und im [Vergleich der Ollama-Pro-Modelle](/blog/ollama-pro-modelle-qwen3-kimi-vergleich) aufgeschrieben.

**Der Preisdruck kommt bei allen an.** Wenn ein offenes Modell Opus-Niveau für ein Zwanzigstel liefert, kann der Rest des Marktes das nicht ignorieren. Genau das ist 2026 passiert — nachzulesen in dem, was danach mit den Preisen geschah.

**Aber Vorsicht bei den Zahlen.** Fast alle genannten Benchmarks sind Hersteller-Angaben. Unabhängige Nachmessungen kamen später und fielen regelmäßig nüchterner aus. „Schlägt Claude" auf einem Benchmark heißt nicht „ist besser". Ich teste jedes Modell, bevor ich es in einen Workflow lasse, und empfehle dir dasselbe.

## Was ich mitnehme

Die Frage „holt Open Source auf?" hat sich 2026 erledigt. Bei Coding, bei Reasoning, bei multimodalen Aufgaben liegen offene Modelle im selben Feld wie die geschlossenen. Der Abstand ist nicht null, aber er ist keine Kategorie mehr.

Die interessantere Frage ist inzwischen eine andere: Wie lange bleibt das so? Denn offene Gewichte sind eine Entscheidung, keine Naturkonstante. Zhipu, DeepSeek und Moonshot veröffentlichen heute unter MIT und Apache — weil Offenheit ihre schnellste Route zu Verbreitung und Legitimität ist. Wenn sich das ändert, ändert sich auch die Lizenz.

Deshalb mein praktischer Rat: **Lade dir die Gewichte runter, die du wirklich brauchst.** Ein heruntergeladenes Modell kann dir niemand abschalten. Genau das ist der Unterschied zu jedem Cloud-Abo — und in einem Jahr, in dem eine Regierung ein fertiges Modell binnen drei Tagen weltweit vom Netz nehmen konnte, ist das kein theoretisches Argument mehr.
