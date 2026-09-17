---
title: "GPT-6 Astra und Blender: So kommt ein 3D-Modell auf deine Website"
seoTitle: "3D-Website mit GPT-6 Astra und Blender: Ablauf einfach erklärt"
description: "Astra verbindet Blender und Website-Code. Hier siehst du einfach, wie aus einer Idee ein bewegliches 3D-Modell im Browser wird und was du prüfen musst."
slug: "gpt-6-astra-blender-3d-website"
date: "2026-09-16"
tags: ["gpt-6-astra", "blender", "three-js", "3d-website", "codex", "webdesign"]
category: "ki-tools"
draft: true
titleAccent: "3D-Modell"
readingTime: 9
heroImage: "/images/blog/gpt-6-astra-blender-3d-website-1.webp"
heroImageThumb: "/images/blog/gpt-6-astra-blender-3d-website-1-thumb.webp"
---

**GPT-6 Astra kann in Codex Blender-Skripte und den Code einer Website erstellen, sodass aus einer Idee erst ein 3D-Modell und daraus ein bewegliches Element im Browser werden kann. Das ist kein magischer Ein-Klick-Export: Blender baut das Modell, eine GLB-Datei transportiert es, Three.js zeigt es auf der Website, und du prüfst jeden Schritt.**

<div class="rf-block rf-tldr" role="note" aria-label="Kurz gesagt">
  <span class="rf-label" aria-hidden="true">Kurz gesagt</span>
  <ul>
    <li><strong>Blender baut das Objekt:</strong> Astra kann dafür Python-Skripte schreiben und Blender damit wiederholbar bedienen.</li>
    <li><strong>GLB trägt das Objekt weiter:</strong> Die Datei enthält das 3D-Modell und kann auch Materialien, Texturen und Animationen bündeln.</li>
    <li><strong>Three.js zeigt es im Browser:</strong> Bewegung durch Maus oder Scrollen entsteht erst durch Website-Code.</li>
    <li><strong>Du bleibst die Prüfstelle:</strong> Form, Export, Ladezeit, Bedienung und mobile Ersatzansicht müssen getrennt kontrolliert werden.</li>
  </ul>
</div>

## Was passiert hier eigentlich?

Stell dir eine Produktseite für einen kleinen Pflanzensensor vor. Am Anfang siehst du das Gerät schräg von vorn. Wenn du die Maus bewegst, dreht es sich leicht. Beim Scrollen hebt sich die obere Schale, damit du den Aufbau im Inneren erkennst.

So ein Element besteht nicht aus einem einzigen KI-Bild. **Es ist ein echtes 3D-Modell, das der Browser in jedem Bild neu zeichnet.** Genau deshalb kannst du Blickwinkel, Licht oder einzelne Teile während der Benutzung verändern.

Die Aufgabe verteilt sich auf vier klar getrennte Bausteine:

<dl class="evidence-strip" aria-label="Vom 3D-Entwurf zur Website">
  <div>
    <dt>Blender</dt>
    <dd><span class="evidence-value">baut</span><span class="evidence-note">Form, Material und mögliche Animation des Modells.</span></dd>
  </div>
  <div>
    <dt>GLB</dt>
    <dd><span class="evidence-value">transportiert</span><span class="evidence-note">das Modell als kompakte Datei aus Blender heraus.</span></dd>
  </div>
  <div>
    <dt>Three.js</dt>
    <dd><span class="evidence-value">zeigt</span><span class="evidence-note">das Modell in einer 3D-Szene im Browser.</span></dd>
  </div>
</dl>

**GPT-6 Astra kann bei allen drei technischen Teilen helfen.** Es kann ein Blender-Skript schreiben, den Export anstoßen, Website-Code ergänzen und das Ergebnis im Browser prüfen. OpenAI beschreibt Astra ausdrücklich als Modell für Computersteuerung, Softwareentwicklung und den Bau sowie die Qualitätskontrolle von Websites. Das bedeutet aber nicht, dass jeder Entwurf automatisch gut aussieht oder auf jedem Handy flüssig läuft. [OpenAI stellt GPT-6 Astra vor](https://openai.com/index/gpt-6-astra/).

## Was bedeuten Blender, GLB und Three.js in einfacher Sprache?

| Begriff | Einfache Erklärung | Was er nicht automatisch erledigt |
|---|---|---|
| **Blender** | Ein kostenloses, quelloffenes Programm zum Bauen und Animieren von 3D-Objekten | Es baut nicht von allein eine komplette Website |
| **GLB** | Eine Datei, in der 3D-Daten gemeinsam transportiert werden können | Sie enthält noch keine Reaktion auf Maus oder Scrollen |
| **Three.js** | Eine JavaScript-Bibliothek, die 3D-Inhalte im Browser zeichnet | Sie entscheidet nicht, wie deine Seite aussehen oder reagieren soll |
| **Codex mit Astra** | Ein Arbeitsbereich, in dem die KI Dateien, Skripte, Tests und Browserprüfungen bearbeiten kann | Er ersetzt nicht deine gestalterische Entscheidung und Freigabe |

Blender darf kostenlos verwendet, verändert und weitergegeben werden. Für diesen Ablauf ist vor allem wichtig, dass Blender über Python-Skripte bedient und auch ohne ständiges Klicken im Programm gestartet werden kann. [Blender erklärt seine Lizenz](https://www.blender.org/about/license/) und dokumentiert die [Befehle für automatisierte Abläufe](https://docs.blender.org/manual/en/latest/advanced/command_line/arguments.html).

GLB ist die einzelne, binäre Variante des offenen glTF-Formats. Die Blender-Dokumentation erklärt, welche Geometrien, Materialien, Texturen und Animationen exportiert werden können. Three.js empfiehlt glTF oder GLB für Laufzeit-3D-Inhalte und lädt solche Dateien mit dem `GLTFLoader`. [Blender: glTF-Export](https://docs.blender.org/manual/de/latest/addons/scene_gltf2.html) und [Three.js: 3D-Modelle laden](https://threejs.org/manual/#en/loading-3d-models).

## Wann lohnt sich eine echte 3D-Website?

Eine 3D-Szene lohnt sich nicht nur, weil sie gerade beeindruckend aussieht. Sie sollte etwas erklären, das ein Foto schlechter vermittelt.

- **Ein Produkt von mehreren Seiten zeigen:** Der Besucher dreht ein Gerät, Möbelstück oder Modell selbst.
- **Einen Aufbau erklären:** Gehäuseteile fahren auseinander und machen den inneren Aufbau sichtbar.
- **Eine Veränderung zeigen:** Ein Bauteil klappt, wächst, rastet ein oder wechselt zwischen zwei Zuständen.
- **Räumliche Orientierung geben:** Ein Objekt steht an einer nachvollziehbaren Stelle im Raum.

Wenn nur ein dekoratives Objekt im Hintergrund schwebt, ist ein gutes Bild oder ein kurzes Video oft einfacher und schneller. **3D ist dann sinnvoll, wenn die Bewegung eine Frage beantwortet.**

Wenn du zunächst eine normale Website ohne eigene 3D-Szene bauen möchtest, ist mein [Vergleich von v0, Bolt und Lovable](/blog/v0-bolt-lovable-websites-ohne-code-2026) der einfachere Einstieg.

## Was brauchst du, bevor du anfängst?

- **Eine klare Aufgabe für das Modell:** Nicht „mach etwas Beeindruckendes“, sondern zum Beispiel „zeige einen Pflanzensensor geschlossen und mit angehobener Oberschale“.
- **Blender auf deinem Rechner:** Für einen agentischen Ablauf kann ein Zusatz wie [Blender Agent Studio](https://github.com/ifBars/blender-agent-studio) Codex mit lokalen Blender-Arbeitsabläufen verbinden. Das Projekt nennt Blender 5.2 LTS als getestete Version.
- **Codex mit Zugriff auf Astra:** Die Verfügbarkeit hängt von Plan, App-Version und Arbeitsbereich ab. Laut OpenAI benötigt Astra in Codex mindestens Codex CLI 0.153.0; die Nutzung zählt zum jeweiligen Work- und Codex-Kontingent. [OpenAI: Astra in Work und Codex](https://help.openai.com/en/articles/20001275/).
- **Ein eigenes Website-Projekt:** Darin liegen später die GLB-Datei, der Three.js-Code und eine einfache Ersatzansicht für Geräte, auf denen die 3D-Szene nicht gut läuft.
- **Eigene oder eindeutig erlaubte Vorlagen:** Fotos, Logos und fremde 3D-Modelle werden nicht dadurch frei nutzbar, dass eine KI sie verarbeitet.

Ein Blender-Zusatz kann lokale Skripte ausführen. Das ist praktisch, aber auch ein echter Zugriff auf deinen Rechner. Das öffentliche Blender-Agent-Studio-Projekt rät deshalb dazu, unbekannte Skripte vor dem Ausführen zu prüfen und keine fremden `.blend`-Dateien mit automatisch erlaubten Skripten zu öffnen. [Sicherheitshinweise des Projekts](https://github.com/ifBars/blender-agent-studio/blob/main/SECURITY.md).

## Ein verständliches Beispiel: der Pflanzensensor

Für diesen Artikel nehmen wir ein **fiktives Gerät**, das nirgends verkauft wird. Es besteht aus einer abgerundeten Hülle, einem kurzen Erdspieß und einer abnehmbaren Oberschale. Das Beispiel ist absichtlich einfach, damit jeder Schritt sichtbar bleibt.

| Zustand | Was der Besucher sieht | Was technisch passieren muss |
|---|---|---|
| Start | Sensor schräg von vorn | GLB laden, Kamera und Licht setzen |
| Mausbewegung | Sensor dreht sich nur wenige Grad | Zeigerposition in eine ruhige Drehung übersetzen |
| Scrollen | Oberschale hebt sich | Scrollfortschritt mit der Position eines benannten Bauteils verbinden |
| Kleine Displays | Ruhiges Standbild mit gleicher Aussage | 3D optional abschalten, Inhalt trotzdem verständlich halten |

Der entscheidende Punkt ist die Benennung: **„Oberschale“ muss im Blender-Modell ein eigener, eindeutig benannter Teil sein.** Sonst weiß der Website-Code später nicht, welches Stück er anheben soll.

## So baust du den Ablauf ohne Ratespiel auf

### 1. Beschreibe zuerst die sichtbaren Zustände

Beginne nicht mit Software. Schreibe auf, was der Besucher am Anfang, bei Bewegung und am Ende verstehen soll. Für den Pflanzensensor reichen vier kurze Angaben: geschlossen, leicht drehbar, Oberschale angehoben, mobile Ersatzansicht.

Lass Astra daraus zuerst einen Plan machen. Es soll noch nichts installieren, herunterladen oder verändern:

Falls dir das Eingrenzen schwerfällt, hilft vorher mein [Einsteiger-Guide für klare Prompts](/blog/prompt-engineering-lernen-2026).

```prompt
Ich plane ein eigenes interaktives 3D-Element für eine Website. Erstelle zuerst nur einen Arbeitsplan und ändere noch keine Dateien.

OBJEKT: [Was soll als 3D-Modell entstehen?]
ERKENNBARE TEILE: [Welche Teile müssen getrennt benannt und beweglich sein?]
STARTANSICHT: [Was sieht der Besucher zuerst?]
REAKTION AUF MAUS ODER TOUCH: [Welche kleine Bewegung ist sinnvoll?]
REAKTION BEIM SCROLLEN: [Welcher Zustand verändert sich?]
MOBILE ERSATZANSICHT: [Welches Standbild oder welche einfache Darstellung bleibt verständlich?]
NICHT VERWENDEN: [Fremde Marken, ungeklärte Modelle, Bilder oder Designs]

Liefere eine Tabelle mit Zustand, sichtbarer Aussage, benötigtem Modellteil und Prüfsignal. Nenne offene Angaben deutlich. Installiere nichts und starte Blender noch nicht.
```

**Beispielwerte:** Objekt: fiktiver Pflanzensensor. Erkennbare Teile: Hülle, Erdspieß, Oberschale. Startansicht: schräg von vorn. Maus: höchstens eine kleine Drehung. Scrollen: Oberschale hebt sich. Mobile Ersatzansicht: gerendertes Bild des geöffneten Sensors. Nicht verwenden: Logos, reale Produktformen und fremde 3D-Dateien.

### 2. Arbeite in einem leeren, eigenen Projektordner

Lege einen neuen Ordner für das Modell, Blender-Skript, die `.blend`-Datei, den GLB-Export und die Website an. Lasse Astra den genauen Zielordner wiederholen, bevor es schreibt. Ein bestehendes Kundenprojekt ist kein guter erster Test.

Wenn du Blender Agent Studio oder einen anderen Zusatz verwendest, lies zuerst dessen aktuelle Installations- und Sicherheitshinweise. Pinne für einen reproduzierbaren Versuch die verwendete Version oder den Git-Commit. **„Installation erfolgreich“ bedeutet nur, dass das Werkzeug vorhanden ist.** Es beweist noch kein gutes Modell und keinen funktionierenden Export.

### 3. Prüfe das Modell vor dem Export

Lass zuerst eine einfache Form bauen und aus mehreren Blickwinkeln rendern. Prüfe dabei nicht nur, ob sie hübsch aussieht:

1. **Silhouette:** Ist auf den ersten Blick ein Sensor mit Spieß erkennbar?
2. **Teile:** Sind Hülle, Oberschale und Spieß getrennt und sinnvoll benannt?
3. **Maßstab und Ursprung:** Dreht sich das Objekt um die erwartete Stelle?
4. **Material:** Bleibt die Oberfläche auch mit einfacher Web-Beleuchtung verständlich?
5. **Quelle:** Liegen neben der `.blend`-Datei auch die erzeugenden Skripte im Projekt?

Erst wenn diese Punkte passen, lohnt sich mehr Detail. Ein zu frühes Hochglanzmaterial versteckt oft, dass Form oder Bauteile noch falsch sind.

### 4. Exportiere eine GLB und prüfe sie getrennt

Exportiere nur die benötigten Objekte. Öffne die GLB anschließend in einem zweiten Viewer oder einer kleinen Testseite. Wenn dort Teile fehlen, Materialien anders aussehen oder der Maßstab falsch ist, liegt das Problem noch vor der eigentlichen Website.

**Prüfsignal:** Die GLB zeigt denselben Sensor, dieselben getrennten Teile und die richtige Grundausrichtung. Ein erfolgreicher Export allein beweist nicht, dass die Datei schnell genug lädt oder die Interaktion funktioniert.

### 5. Baue erst jetzt die Website-Interaktion

Three.js lädt die GLB in eine Szene. Danach verbindet der Website-Code Maus, Touch oder Scrollen mit genau den benannten Teilen. Die 3D-Datei selbst enthält diese Webseitenlogik nicht.

Für den Pflanzensensor bedeutet das:

- **Beim Laden:** Kamera, Licht und Sensor erscheinen in einer festen Startansicht.
- **Bei Mausbewegung:** Das gesamte Objekt dreht sich langsam in einem kleinen Bereich.
- **Beim Scrollen:** Nur die `Oberschale` verändert ihre Position.
- **Ohne 3D:** Ein Standbild und derselbe erklärende Text bleiben sichtbar.

`requestAnimationFrame()` lässt den Browser die nächste Zeichnung passend zur Bildwiederholung anfordern. Browser pausieren solche Aufrufe in den meisten versteckten Tabs bereits, aber eine Seite sollte zusätzlich vermeiden, eine unsichtbare 3D-Szene unnötig weiterzurechnen. [MDN erklärt requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) und den [Intersection Observer für sichtbare Bereiche](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

### 6. Prüfe das Ergebnis wie eine Website, nicht wie einen Blender-Render

Ein schönes Blender-Bild ist noch keine gute Website. Prüfe mindestens diese Fälle:

- **Desktop mit Maus:** Dreht sich nur das gewünschte Objekt, ohne dass Text oder Scrollen blockiert werden?
- **Smartphone mit 390 Pixel Breite:** Bleiben Überschrift, Erklärung und Bedienung verständlich?
- **Langsame Verbindung:** Gibt es vor dem 3D-Modell ein Standbild und einen klaren Ladezustand?
- **Weniger Bewegung:** Respektiert die Seite die Systemeinstellung `prefers-reduced-motion` und zeigt eine ruhige Alternative?
- **Fehler beim Laden:** Bleibt die Kernaussage sichtbar, wenn die GLB fehlt oder WebGL nicht startet?
- **Tastatur und Screenreader:** Ist die Erklärung als normaler Text vorhanden, statt nur in einer visuellen Bewegung zu stecken?

## Ein fertiger Arbeitsauftrag für Codex

Wenn der Plan steht, kannst du diese Vorlage für die Umsetzung verwenden. Passe die Pfade und Namen an dein Projekt an:

```prompt
Arbeite ausschließlich im neuen Projektordner [ABSOLUTER PFAD]. Bestätige den Pfad und liste vorhandene Dateien, bevor du etwas änderst.

ZIEL:
Erstelle einen fiktiven Pflanzensensor als einfaches 3D-Modell und binde ihn als interaktives Element in die vorhandene Website ein.

MODELL:
- getrennte, eindeutig benannte Teile: Gehaeuse, Erdspiess, Oberschale
- einfache eigene Form ohne Marken- oder Produktkopie
- Blender-Datei und erzeugendes Python-Skript behalten
- GLB nur nach einer visuellen Prüfung aus mindestens drei Blickwinkeln exportieren

WEBSITE:
- GLB mit Three.js laden
- kleine, ruhige Drehung auf Maus oder Touch
- Oberschale beim Scrollen anheben
- Standbild als mobile und technische Ersatzansicht
- prefers-reduced-motion beachten
- 3D-Berechnung stoppen, wenn der Bereich nicht sichtbar ist

PRUEFUNG:
- zuerst Plan und Dateiliste zeigen
- danach Modellansichten und GLB getrennt prüfen
- zum Schluss Produktionsbuild sowie Browserprüfung auf Desktop und 390 Pixel Breite
- keine Installation, kein Download und keine Änderung außerhalb des Projektordners ohne meine Bestätigung
- Fehler, fehlende Werkzeuge und nicht selbst geprüfte Ergebnisse klar als offen nennen
```

## Was Astra dir abnimmt und was bei dir bleibt

Astra kann die vielen technischen Übergaben zusammenhalten: ein Modellskript ändern, Blender starten, einen Export erzeugen, Three.js-Code schreiben und die Seite im Browser prüfen. Der eigentliche Gewinn ist **nicht**, dass du Blender nie verstehen musst. Der Gewinn ist, dass du deine Idee in überprüfbare Zwischenstände zerlegen kannst.

Bei dir bleiben vier Entscheidungen:

1. **Welche Aussage soll die 3D-Bewegung erklären?**
2. **Welche Form und welche Quellen darf das Modell verwenden?**
3. **Welche Teile müssen getrennt beweglich bleiben?**
4. **Wann ist Ladezeit und Bedienung auf deinen Zielgeräten gut genug?**

Ein 3D-Element ist gelungen, wenn ein Besucher schneller versteht, was du zeigen willst. Wenn nur die Technik auffällt, aber die Aussage unklar bleibt, ist die einfachere Darstellung wahrscheinlich die bessere.

## Quellen für den Einstieg

- [OpenAI: GPT-6 Astra](https://openai.com/index/gpt-6-astra/)
- [OpenAI: Astra in Work und Codex](https://help.openai.com/en/articles/20001275/)
- [Blender: Lizenz](https://www.blender.org/about/license/)
- [Blender: Automatisierung über die Kommandozeile](https://docs.blender.org/manual/en/latest/advanced/command_line/arguments.html)
- [Blender: glTF- und GLB-Export](https://docs.blender.org/manual/de/latest/addons/scene_gltf2.html)
- [Blender Agent Studio: Arbeitsabläufe und Anforderungen](https://github.com/ifBars/blender-agent-studio)
- [Three.js: 3D-Modelle mit GLTFLoader laden](https://threejs.org/manual/#en/loading-3d-models)
- [Khronos: offener glTF-Standard](https://www.khronos.org/gltf/)
