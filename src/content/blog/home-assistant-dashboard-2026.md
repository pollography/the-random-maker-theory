---
title: "Home Assistant Dashboard: Mein Setup mit Mushroom Cards"
slug: "home-assistant-dashboard-2026"
date: "2026-03-18"
description: "Wie ich mein Home Assistant Dashboard mit Mushroom Cards und Custom Themes aufgebaut habe — inkl. YAML-Beispiele und Schritt-fuer-Schritt Anleitung."
tags: ["smart-home", "home-assistant", "maker", "tutorial", "diy"]
category: "smart-home"
draft: true
readingTime: 11
heroImage: "/images/blog/home-assistant-dashboard-2026-1.webp"
heroImageThumb: "/images/blog/home-assistant-dashboard-2026-1-thumb.webp"
titleAccent: "Dashboard"
podcastSlug: "011-home-assistant-dashboard-2026"
podcastUrl: ""
videoUrl: ""
---

Mein Home Assistant sah anfangs aus wie das Steuerpult eines Kernkraftwerks. Zu viele Karten, zu viel Text, null Struktur. Mit Mushroom Cards hab ich das in einem Nachmittag gerade gebogen. Hier zeig ich dir wie.

## Was dich in diesem Artikel erwartet

- HACS und Mushroom Cards installieren (dauert 10 Minuten)
- Die wichtigsten Karten-Typen erklaert
- Mein persoenliches Dashboard-Layout
- YAML-Snippets zum direkten Kopieren
- Custom Themes fuer den letzten Schliff

---

## Das Problem mit Standard-Dashboards

Wenn du Home Assistant das erste Mal installierst, ist die Begeisterung riesig. Lampen eingebunden, Thermostat taucht auf, alles steuerbar vom Handy. Geil. Und dann schaust du das Standard-Lovelace-Dashboard an.

Es sieht aus wie Excel von 1995.

Funktional? Ja, klar. Aber versuch mal deiner Partnerin zu erklaeren, warum sie drei Untermenus aufmachen muss, um das Flur-Licht zu dimmen. Das haelt keine Beziehung aus. Ich nenn das halb im Spass die "Smart-Home-Scheidung" — wenn die eine Person im Haushalt das System hasst und alle Automatisierungen wieder rueckgaengig macht.

Das eigentliche Problem: Wir versuchen jede einzelne Information gleichzeitig anzuzeigen. Alle Sensoren, alle Entitaeten, alle States auf einer Seite. Das Ergebnis ist ein vollgestopftes Interface, bei dem man vor lauter Zeugs die wichtigen Knopfe nicht mehr findet.

Ein echtes Smart Home sollte quasi unsichtbar sein. So intuitiv, dass man es halbschlafend bedienen kann.

Hier kommen Mushroom Cards ins Spiel. Fuer mich war das der Wendepunkt, echt.

[SCREENSHOT: Vorher-Nachher — Standard Lovelace vs. Mushroom-Dashboard]

---

## Was sind Mushroom Cards eigentlich?

Ganz einfach erklaert: Mushroom ist eine Sammlung von Custom Cards fuer das Home Assistant Dashboard. Der Entwickler piitaya hat das Ding auf GitHub veroffentlicht, mittlerweile hat es ueber 4.900 Stars. Das sagt eigentlich alles.

Der entscheidende Unterschied zu anderen Custom-Card-Projekten: Mushroom braucht null Abhaengigkeiten. Kein `card-mod`, kein `button-card`, nichts. Einfach installieren und los. Das Design basiert auf Material UI und unterstuetzt von Haus aus Dark- und Light-Mode.

Das Beste ist der visuelle Editor. Jede Mushroom-Karte hat einen built-in Editor, bei dem du Icons per Picker suchst, Farben per Klick auswaehlst und alles live siehst. YAML ist optional — nicht Pflicht. Du kannst aber tief einsteigen wenn du willst. Diese Flexibilitaet macht es zum perfekten Tool fuer Anfaenger und gleichzeitig maechtig genug fuer Nerds wie mich.

---

## Schritt 1: HACS installieren und Mushroom holen

Bevor wir irgendwas machen: Falls du HACS noch nicht hast, installier das jetzt. HACS ist quasi der App Store fuer Home Assistant. Offiziell gibt es den nicht, aber ohne HACS bist du eigentlich aufgeschmissen fuer alles Interessante.

Die HACS-Installation beschreib ich hier nicht im Detail — die offizielle Doku ist gut und aktiv gepflegt. Kurz: Du brauchst einen GitHub-Account und fuegst HACS als Add-on hinzu. 10-15 Minuten, einmal, nie wieder.

Sobald HACS laeuft:

1. Seitenleiste → HACS
2. Oben "Frontend" auswaehlen
3. Pluszeichen unten rechts → "Mushroom" suchen
4. "Download" klicken
5. Browser neu laden wenn HA das vorschlaegt

Das war's. Ernsthaft.

[SCREENSHOT: Mushroom-Suche im HACS-Frontend-Bereich]

Falls du HACS nicht willst (versteh ich, aber ich find's die falsche Entscheidung): Manuelle Installation geht auch. Von der GitHub-Release-Seite die `mushroom.js` runterladen, in `config/www/` ablegen, dann unter Einstellungen → Dashboards → Ressourcen als JavaScript-Modul `/local/mushroom.js` hinzufuegen. Wichtig: Den "Erweiterten Modus" in deinem Nutzerprofil aktivieren, sonst siehst du das Ressourcen-Menu nicht mal.

**Tip nach der Installation:** Wenn nichts angezeigt wird, liegt's am Browser-Cache. Hard-Refresh mit `Strg + Shift + R` (Windows) oder `Cmd + Shift + R` (Mac). Das loest 90% der "Mushroom funktioniert nicht"-Probleme.

---

## Schritt 2: Die wichtigsten Mushroom-Karten kennenlernen

Mushroom kommt mit einer ganzen Familie von Karten. Ich stell dir die vor, die ich taeglich nutze.

### Light Card — mein Liebling

Die Light Card ist fuer mich das Parade-Beispiel dafuer, wie gut Mushroom-Design funktioniert. Sie hat einen Helligkeits-Slider direkt auf der Karte, und mit `use_light_color: true` nimmt das Icon die aktuelle Farbe der Lampe an. Wenn das Wohnzimmer auf warmweiss laeuft, leuchtet das Icon gelblich. Auf Blau gesetzt? Icon wird blau.

Das klingt nach einem kleinen Detail, ist aber im Alltag so wertvoll. Man sieht auf einen Blick, welche Stimmung wo laeuft.

```yaml
type: custom:mushroom-light-card
entity: light.wohnzimmer_deckenlicht
show_brightness_control: true
use_light_color: true
name: Deckenlicht
icon: mdi:lightbulb
```

### Chips Card — der Status-Streifen oben

Chips sind kleine kompakte Status-Haeppchen. Die packst du ganz oben ins Dashboard. Bei mir zeigen die: aktuelles Wetter, Alarm-Status, wer gerade zu Hause ist. Kaum Platz, viel Info.

```yaml
type: custom:mushroom-chips-card
chips:
  - type: weather
    entity: weather.home
    show_conditions: true
    show_temperature: true
  - type: entity
    entity: alarm_control_panel.haus_alarm
    icon_color: green
    content_info: name
```

### Entity Card — der Allrounder

Wenn kein spezifischer Karten-Typ existiert, nimmst du die Entity Card. Garagentor, Stromverbrauch, Mailbox-Sensor — die frisst eigentlich alles. Mit anpassbaren Icons, Farben und Info-Feldern.

### Climate Card — fuer Thermostate

Die Standard-Thermostat-Karte in Home Assistant ist klobig und haesslich. Die Mushroom Climate Card macht das selbe, schaut aber um Welten besser aus. Modi auswahlen, Temperatur setzen, alles in einem cleanen Interface.

### Title Card — fuer Struktur

Klingt langweilig, ist aber wichtig. Die Title Card trennst Bereiche voneinander. Ohne Struktur wird auch das schonste Dashboard zur Wueste. Mit Jinja2-Templates kannst du dynamischen Text anzeigen:

```yaml
type: custom:mushroom-title-card
title: Wohnzimmer
subtitle: >-
  {{ states.light | selectattr('state','eq','on') | list | count }} Lampen an
```

So siehst du direkt bei der Raum-Uberschrift, wie viele Lichter gerade brennen.

### Template Card — das Schweizer Taschenmesser

Wenn ich etwas komplett Eigenes brauche, nehm ich die Template Card. Status kombinieren, eigene Logik einbauen, Text aus mehreren Entitaeten zusammensetzen. Wer Jinja2 ein bisschen kennt, kann hier quasi alles bauen.

[SCREENSHOT: Uebersicht aller Mushroom-Karten-Typen im Auswahl-Dialog]

---

## Schritt 3: Dashboard-Struktur — denk in Schachteln

Ein haubusch-Mushroom-Dashboard faellt nicht einfach so vom Himmel. Wenn du alle Karten einfach untereinander reinklatschst, sieht es auf dem Handy okay aus, aber auf dem Tablet oder Desktop verlierst du den Ueberblick.

Die Loesung: Grids und Stacks. Das Grundprinzip erklaere ich mit einer Matroschka-Puppe. Eine Schachtel steckt in der naechsten.

**Vertical Stack** — Karten untereinander stapeln
**Horizontal Stack** — Karten nebeneinander stellen
**Grid** — flexibles Rastersystem fuer mehrere Spalten

Ich baue mein Dashboard immer nach der gleichen Logik:

1. Ganz oben: Chips-Streifen (Wetter, Alarm, Anwesenheit)
2. Darunter: Raum-Bereiche, jeweils mit Title Card als Trenner
3. In jedem Raum: Licht-Karten im Horizontal Stack, darunter spezifische Sachen

Wichtig: Die Option "Render as squares" in Grid-Einstellungen → **abschalten**. Ernsthafte Empfehlung. Wenn Karten als Quadrate erzwungen werden, wird Text abgeschnitten und die Abstande sehen merkwuerdig aus. Lass die Karten lieber dynamisch an ihren Inhalt anpassen.

[SCREENSHOT: Grid-Einstellungen in der Dashboard-Bearbeitung]

Ein konkretes Beispiel fuer ein Wohnzimmer-Layout:

```yaml
type: vertical-stack
cards:
  - type: custom:mushroom-title-card
    title: Wohnzimmer
    subtitle: >-
      {{ expand('group.wohnzimmer_lichter') | selectattr('state','eq','on') | list | count }} Lichter an
  - type: horizontal-stack
    cards:
      - type: custom:mushroom-light-card
        entity: light.wohnzimmer_deckenlicht
        show_brightness_control: true
        use_light_color: true
        name: Decke
      - type: custom:mushroom-light-card
        entity: light.stehlampe_wohnzimmer
        show_brightness_control: true
        use_light_color: true
        name: Stehlampe
  - type: custom:mushroom-media-player-card
    entity: media_player.sonos_wohnzimmer
    use_media_artwork: true
    show_volume_level: true
```

Das ist mein Basis-Template fuer jeden Raum. Title Card mit dynamischem Counter, Licht-Karten im Horizontal Stack, darunter was spezifisches braucht. Das laesst sich beliebig erweitern.

---

## Schritt 4: Custom Themes — der letzte Schliff

Mushroom schaut von Haus aus schon gut aus. Aber mit einem Custom Theme wird's erst richtig rund.

Es gibt ein separates Paket: **Mushroom Themes**, ebenfalls ueber HACS im Frontend-Bereich. Installieren, dann in deinem Profil (unten links auf das Nutzerbild klicken) unter "Theme" das Mushroom-Theme auswaehlen. Das synchronisiert sich auf alle deine Gerate, auch aufs Handy.

[SCREENSHOT: Theme-Auswahl im Home Assistant Nutzerprofil]

Fuer den letzten Feinschliff kannst du eigene Theme-Variablen definieren. Ich hab mir eine `mushroom-custom.yaml` unter `config/themes/` angelegt und passe dort ein paar Sachen an:

```yaml
mushroom-custom:
  modes:
    dark:
      msh-card-primary-font-size: "15px"
      msh-card-primary-font-weight: "600"
      msh-corner-radius: "12px"
      msh-spacing: "12px"
```

Diese Variablen sind selbsterklaerend. Schriftgrosse, Schriftstaerke, Ecken-Radius, Abstande — das reicht um das Design merklich zu veraendern ohne tief in CSS einzutauchen.

Aenderungen sind sofort sichtbar ohne Neustart: einfach `C` druecken im Dashboard (oeffnet das Command-Menu) und nach "Reload Themes" suchen. Einmal klicken, Themes neu geladen. So kannst du dich schrittweise an deinen Wunsch-Look herantasten.

Ein wichtiger Punkt den ich anfangs uebersehen hab: Themes in Home Assistant sind nutzergebunden. Das heisst, wenn du mehrere HA-Profile hast (zum Beispiel ein Admin-Profil und ein Familien-Profil), musst du das Theme fuer jedes Profil separat aktivieren. Klingt laestig, macht aber Sinn — so kann jede Person ihr eigenes Erscheinungsbild haben. Ich hab bei uns zum Beispiel den Dark Mode aktiviert und fuer meine Frau den Light Mode. Das klappt problemlos parallel auf demselben System.

Wenn du weiter tunen willst: Auf GitHub gibt es in den Issues und Discussions des Mushroom-Projekts tausende User die ihre Custom-Themes teilen. Lohnt sich mal reinzuschauen, vor allem wenn du einen bestimmten Farb-Look willst den das Standard-Mushroom-Theme nicht hergibt.

---

## Mein finales Setup — ein Blick auf die Struktur

Ich hab mein Home Assistant Dashboard nach einer klaren Raum-Logik aufgebaut. Das sieht grob so aus:

**View 1: Zuhause (Haupt-Dashboard)**
- Chips-Streifen: Wetter, Alarm, Anwesenheit (wer ist wo)
- Wohnzimmer: Lights + Sonos
- Schlafzimmer: Lights + Rolladensteuerung
- Kueche: Kaffeemaschine, Licht

**View 2: Technik**
- Server-Status (CPU, RAM, Speicher)
- Netzwerk (Pi-hole, Fritzbox)
- Energie-Verbrauch

**View 3: Garten**
- Aussentemperatur
- Bewasserungssteuerung
- Wetterstation

Jeder View ist auf seine Aufgabe fokussiert. Der Haupt-View ist so gebaut, dass meine Frau das Gaestetoiletten-Licht findet ohne mich zu fragen. Das ist fuer mich der ultimative Erfolgstest.

Fuer die Raumtemperaturen nutze ich guenstige Aqara-Sensoren — die sind via Zigbee eingebunden und liefern Temperatur plus Luftfeuchtigkeit. Das integriert sich problemlos in Home Assistant und die Daten lassen sich direkt in Chips anzeigen. Falls du noch gar keine Sensoren hast: Im Artikel [ESP32 + Home Assistant: Dein erster Sensor](/blog/esp32-home-assistant-erster-sensor-2026) zeig ich, wie du dir fuer unter 15 Euro einen eigenen Temperatursensor baust.

Wie ich Home Assistant grundlegend eingerichtet hab — Hardware-Wahl, erste Integrationen, Grundkonfiguration — das hab ich im Komplett-Guide [Home Assistant einrichten 2026](/blog/home-assistant-einrichten-2026) beschrieben.

[SCREENSHOT: Finales Dashboard mit allen Bereichen auf einem Tablet]

---

## Haeufige Probleme und Loesungen

**Mushroom-Karten tauchen nicht im Auswahl-Dialog auf**
Browser-Cache leeren. Wirklich. Das loest dieses Problem in 90% der Faelle.

**Theme aendert nichts optisch**
Pruefe, ob du das Theme im richtigen Profil aktiviert hast. Jeder Nutzer in HA kann ein eigenes Theme haben. Dann: "Reload Themes" via Command-Menu.

**YAML-Fehler beim Kopieren der Snippets**
YAML ist sehr empfindlich bei Einrueckungen. Zwei Leerzeichen pro Ebene, niemals Tabs. Ein Online-YAML-Validator hilft bei der Fehlersuche.

**Auf dem Handy sehen Karten anders aus als am PC**
Das ist eigentlich normal und liegt an responsivem Layout. Wenn die Darstellung stark abweicht, pruefen ob Grids mit `columns: 1` fuer mobile optimiert sind.

**Dashboard-Bearbeitung ist gesperrt**
Wenn du das Dashboard per YAML konfigurierst, ist die UI-Bearbeitung deaktiviert. Entweder alles per YAML machen oder das Dashboard auf UI-Modus umschalten (Achtung: dabei kann die YAML-Konfiguration verloren gehen).

---

## Fazit: Mach's schick, es lohnt sich

Mushroom Cards haben mein Home Assistant Dashboard transformiert. Nicht uebertrieben: vorher hab ich den Link zum Dashboard kaum jemandem gezeigt, heute zeig ich es gerne.

Das Schoene daran: Du brauchst keinen Programmier-Hintergrund. Der visuelle Editor macht 80% der Arbeit. YAML wird erst interessant wenn du komplexere Sachen willst — und dann macht es auch Spass weil man sofort sieht was man baut.

Mein Tipp zum Einstieg: Fang mit einem einzigen Raum an. Installiere Mushroom, bau dir das Wohnzimmer neu auf. Spiel mit den Karten-Typen, probiere ein Theme aus. Wenn das sitzt, machst du weiter.

Das Dashboard-Gefuehl wenn's endlich schick aussieht? Echt unbezahlbar. Und dann reicht's meistens nicht mehr — dann willst du jedes Detail optimieren. Willkommen im Kaninchenbau.

— TRMT

---

## Quellen & Links

- [lovelace-mushroom auf GitHub](https://github.com/piitaya/lovelace-mushroom) — Offizielle Doku und Release-Notes
- [Mushroom Cards Complete Guide — SmartHomeScene](https://smarthomescene.com/guides/mushroom-cards-complete-guide-to-a-clean-minimalistic-home-assistant-ui/) — Sehr gute englische Referenz
- [Mushroom Room Layout & Examples — SmartHomeScene](https://smarthomescene.com/guides/mushroom-cards-part-2-room-layout-and-card-combinations/) — Praxisbeispiele fuer Raumlayouts
- [Mushroom Card Grid Dashboard — SmartHomePursuits](https://smarthomepursuits.com/create-mushroom-card-dashboard-in-home-assistant) — Schritt-fuer-Schritt Grid-Tutorial
- [HA Karten-Typen Uebersicht — Alles Automatisch](https://alles-automatisch.de/home-assistant-karten-uebersicht/) — Deutsche Erklaerung der Karten-Typen
