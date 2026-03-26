---
title: "WLED auf ESP32: LED-Strips smart machen"
titleAccent: "WLED"
slug: "wled-esp32-anleitung-2026"
description: "WLED auf den ESP32 flashen, WS2812B LED-Strips einrichten und mit Home Assistant verbinden — komplette Anleitung für unter 35 EUR. Kein Vorwissen nötig."
date: "2026-03-29"
category: "maker"
pillar: "maker"
draft: false
primaryKW: "wled esp32 anleitung"
tags: ["wled", "esp32", "led", "ws2812b", "home-assistant", "smart-home", "diy"]
podcastSlug: "008-wled-esp32-anleitung-2026"
interlinks:
  - "esp32-home-assistant-erster-sensor-2026"
  - "home-assistant-dashboard-2026"
affiliate:
  - product: "WS2812B LED Strip (1m)"
    price: "~15 EUR"
  - product: "ESP32 DevKit v1"
    price: "~8 EUR"
  - product: "Netzteil 5V 3A"
    price: "~12 EUR"
ogImage: "/images/wled-esp32-anleitung-2026-og.jpg"
heroImage: "/images/blog/wled-esp32-anleitung-2026-1.webp"
heroImageThumb: "/images/blog/wled-esp32-anleitung-2026-1-thumb.webp"
---

# WLED auf ESP32: LED-Strips in 20 Minuten smart machen

**TL;DR**
- WS2812B LED-Strip + ESP32 + WLED = addressierbare Smart-LEDs für unter 35 EUR
- WLED flashen dauert 5 Minuten, kein Coding nötig
- 100+ vorgefertigte Effekte, eigene Animationen, Musik-Reaktion
- Home Assistant Integration via native API — ein Klick
- Ambilight für den TV ist mit einem Abend Arbeit machbar

---

Coole addressierbare LEDs. Tausende Effekte. Musik-Reaktion. Alles per App steuerbar — und das Ganze für knapp 35 Euro selbst gebaut.

Das ist kein Wunschtraum. Das ist WLED auf dem ESP32, und ich hab das Ding inzwischen in drei Räumen hängen. Diese WLED ESP32 Anleitung zeigt dir genau wie.

Ehrlich gesagt hatte ich lange keinen Bock drauf. LED-Strips kannte ich von AliExpress-Ramsch der nach zwei Wochen aufgibt, oder von diesen überteuertem Philips Hue Krams. Dann hab ich WLED entdeckt. Open Source. Aktive Community. Läuft auf dem ESP32 den ich eh schon rumliegen hatte. Sold.

## Was du brauchst (Einkaufsliste)

Bevor wir anfangen: Hier ist alles was du brauchst. Keine versteckten Extras, keine teuren Spezialteile.

**Hardware:**

- **[WS2812B LED Strip](https://amzn.to/ws2812b-strip)** (~15 EUR) — 1m bis 5m, je nach Projekt. Ich empfehle den mit 60 LEDs/Meter für den Anfang. Dichte genug für gleichmäßige Ausleuchtung, nicht zu hungerig beim Strom.
- **[ESP32 DevKit v1](https://amzn.to/esp32-devkit)** (~8 EUR) — Der Klassiker. Jeder ESP32 mit 4MB Flash funktioniert, aber der DevKit v1 ist gut dokumentiert und hat brauchbare Pinouts.
- **[Netzteil 5V / 3A](https://amzn.to/netzteil-5v-3a)** (~12 EUR) — Nicht am Netzteil sparen. Je Meter WS2812B mit 60 LEDs brauchst du grob 3A bei voller weißer Helligkeit. Für 1m reicht 3A locker, für 5m nimm lieber 10A.

Dazu: ein paar Jumperkabel oder Lüsterklemmen, Lötzinn wenn du fest verbinden willst. Aber für den ersten Test reichen Jumperkabel.

**Software:**

- Google Chrome oder Edge (für den WLED Web-Installer — Firefox geht nicht)
- WLED App für Android oder iOS (optional, aber praktisch)

Gesamtkosten für ein 1m-Projekt: ungefähr 35 EUR. Für 5m mit fetterem Netzteil kommst du auf 50-60 EUR. Das ist immer noch weniger als ein einzelner Hue Strip.

---

## Was ist WLED überhaupt?

Kurze Erklärung, weil das wichtig ist: WLED ist eine Open-Source-Firmware für ESP-Microcontroller. Wenn du WLED auf dem ESP32 installierst, ersetzt du quasi das "Gehirn" deines LED-Strips.

Normal läuft ein LED-Strip einfach — an, aus, Farbe fertig. WS2812B-Strips sind anders. Jede einzelne LED hat einen kleinen Chip drin und kann individuell angesteuert werden. Das nennt sich "addressierbar". WLED spricht die Sprache dieser Chips und gibt dir eine komplette Steuerzentrale — Web-Interface, App, HTTP-API, Home Assistant Integration, Musikreaktivität. Alles.

Der ESP32 ist dabei dein Vermittler. Er bekommt WLED als Firmware, hängt im WLAN, und schickt die Steuerbefehle an deinen LED-Strip. Simpel.

---

## Schritt 1: WLED auf den ESP32 flashen

Das ist der Schritt der bei den meisten WLED ESP32 Anleitungen kompliziert klingt. Ist er aber nicht — zumindest nicht mehr seit es den WLED Web Installer gibt.

**1. ESP32 per USB an deinen PC anschließen.**

Treiber brauchst du normalerweise keine mehr unter Windows 10/11. Falls der ESP32 nicht erkannt wird: CH340 oder CP2102 Treiber suchen, je nach Board-Variante steht das auf der Produktseite.

**2. wled.me/install im Browser öffnen.**

Wichtig: Chrome oder Edge. Firefox unterstützt die Web Serial API nicht, da passiert dann nichts.

**3. "Install WLED" klicken, deinen ESP32 aus der Liste auswählen.**

Der Installer zeigt dir alle verbundenen seriellen Geräte. Wenn du mehrere Geräte hast: ESP32 ist meistens der mit "USB-SERIAL" im Namen.

**4. Flash starten. Warten. Fertig.**

Der Vorgang dauert 2-3 Minuten. Der Installer löscht den alten Speicher und schreibt WLED drauf. Du siehst einen Fortschrittsbalken, dann "Installation complete."

Das wars. WLED läuft jetzt auf deinem ESP32. Kein Arduino IDE, kein Terminal, kein Bashing irgendwelcher Befehle.

---

## Schritt 2: WiFi einrichten

Nach dem Flash startet der ESP32 als eigener WLAN-Hotspot. Der heißt "WLED-AP" oder ähnlich.

**1. Mit "WLED-AP" verbinden** (Passwort: "wled1234" — steht im Web Installer).

**2. Browser öffnet sich automatisch** (oder du gehst auf 4.3.2.1).

**3. WiFi-Einstellungen:** Oben rechts das Gear-Icon, dann "WiFi Setup". Deinen Heimnetz-SSID eintragen, Passwort rein, speichern.

**4. ESP32 startet neu** und verbindet sich mit deinem Netzwerk.

Ab jetzt erreichst du WLED über die IP-Adresse die dein Router vergeben hat — die siehst du im Router-Interface unter "verbundene Geräte", oder du nutzt die WLED App die automatisch nach Geräten sucht.

Tipp: Gib dem ESP32 im Router eine feste IP-Adresse. Das spart Ärger wenn die IP sich ändert.

---

## Schritt 3: LED-Strip anschließen

Jetzt kommt der Hardware-Teil. Nur drei Verbindungen:

```
ESP32 Pin 2  →  LED Strip DATA
ESP32 GND    →  LED Strip GND  (und Netzteil GND)
Netzteil 5V  →  LED Strip VCC
```

Wichtig: Den ESP32 selbst kannst du über USB mit Strom versorgen, das reicht für den Controller. Der LED-Strip braucht aber das externe Netzteil — bei 60 LEDs auf voller Helligkeit zieht das deutlich mehr als ein USB-Port liefern kann.

Noch wichtiger: GND vom Netzteil und GND vom ESP32 müssen verbunden sein. Sonst redet der ESP32 "Kauderwelsch" mit dem Strip.

**LED-Typ in WLED einstellen:**

Im WLED Web-Interface unter "Config" → "LED Preferences":
- LED Type: WS2812B
- Data GPIO: 2 (oder welchen Pin du nutzt)
- LED Count: Anzahl deiner LEDs eintragen (1 Meter mit 60 LEDs/m = 60 LEDs)

Speichern, neu starten — und wenn alles passt leuchtet der Strip beim nächsten Einschalten in einem Regenbogeneffekt auf.

---

## Schritt 4: Effekte erkunden

Das ist der Spaß-Teil. Und da wird WLED echt unverschämt gut.

Über 100 vorgefertigte Effekte. Wirklich. Von simplem statischem Weiß über Regenbogen-Wellen, Feuersimulation, Blitz-Effekte, Konfetti bis zu Marquee-Laufschriften — alles drin. Jeder Effekt hat Parameter wie Geschwindigkeit, Intensität und Palette.

Paletten sind dabei unterschätzt. Du kannst jedem Effekt eine andere Farbpalette geben — von "Halloween" über "Lava" bis hin zu eigenen Farbkombinationen. Ein und derselbe "Wippe"-Effekt sieht mit Eisblau-Weiß komplett anders aus als mit Sunset-Farben.

**Presets:**

Erstell dir Presets für verschiedene Stimmungen. Ich hab:
- "Arbeiten" — kühles Weiß, 80% Helligkeit
- "Film" — weiches Amber, 30% Helligkeit
- "Party" — Regenbogen-Wipe, volle Helligkeit
- "Nacht" — gedimmtes Rot, 5% Helligkeit (Augen schonen)

Die Presets kannst du direkt aus Home Assistant aufrufen. Aber dazu gleich.

**Musik-Reaktivität:**

WLED hat ein separates Feature namens "WLED-SR" (Sound Reactive). Das braucht ein Mikrofon-Modul am ESP32. Nicht im Basis-Setup, aber ein cooles Upgrade wenn du mal Lust hast.

---

## Schritt 5: Home Assistant einbinden

Das ist der Moment wo WLED von "cool" zu "wirklich nützlich" wird. Integration via [ESP32 + Home Assistant](./esp32-home-assistant-erster-sensor-2026) geht erschreckend einfach.

**WLED integriert sich nativ in Home Assistant** — kein MQTT, kein Custom Component, kein Hexenwerk.

**So geht's:**

1. Home Assistant öffnen
2. Einstellungen → Integrationen → "+ Integration hinzufügen"
3. "WLED" suchen
4. IP-Adresse deines ESP32 eintragen
5. Fertig

Home Assistant erkennt automatisch: den LED-Strip als Licht-Entität, alle Presets als Szenen, und die WLED-Effekte als auswählbare Optionen in der Licht-Steuerung.

Du kannst jetzt:
- Den Strip ein-/ausschalten per Sprachbefehl oder Automation
- Presets über Home Assistant Dashboards aufrufen
- Automationen bauen: "Wenn jemand heimkommt → Ambilight-Modus"
- Den Strip in Szenen mit anderen Lichtern kombinieren

Für ein ordentliches [Home Assistant Dashboard](./home-assistant-dashboard-2026) mit deinen WLED-Lights: Das ist ein eigenes Thema, aber kurz gesagt — ein Mushroom-Card mit Preset-Buttons ist in 10 Minuten gebaut.

---

## Bonus: Ambilight fürs TV

Das ist quasi das Endgame für viele WLED-Projekte, und ich kann verstehen warum. LED-Strip hinter dem TV, der die Farben des aktuellen Bildes spiegelt — das sieht aus wie Magie.

Technisch läuft das über einen separaten PC oder Raspberry Pi der das TV-Bild analysiert und die Farben an WLED schickt. Die beliebteste Lösung dafür heißt **Hyperion**.

**Der grobe Ablauf:**

1. HDMI-Splitter + HDMI-zu-USB-Grabber kaufen (~20 EUR extra)
2. Hyperion auf einem Raspberry Pi oder Mini-PC installieren
3. Hyperion mit WLED verbinden (geht über UDP/E1.31)
4. LED-Positionen kalibrieren

Das ist ein eigenes Tutorial wert — aber der wichtige Punkt: WLED ist die Basis, auf der das alles aufbaut. Du brauchst WLED zum Laufen bevor du mit Ambilight anfängst. Und ehrlich gesagt macht WLED auch ohne Ambilight schon so viel Spaß, dass manche nie weiterziehen.

---

## WLED per HTTP-API steuern (für Fortgeschrittene)

Das wollte ich nicht unterschlagen, weil es WLED nochmal auf ein anderes Level hebt: Eine vollständige HTTP-API.

Du kannst WLED von überall ansteuern wo du einen HTTP-Request absetzen kannst. n8n, Home Assistant Automationen, Bash-Skripte, Python — alles funktioniert. Paar Beispiele:

```
# Einschalten
GET http://192.168.1.xx/win&T=1

# Preset 3 laden
GET http://192.168.1.xx/win&PL=3

# Helligkeit auf 50%
GET http://192.168.1.xx/win&A=128

# JSON API (moderne Version)
POST http://192.168.1.xx/json/state
Body: {"on": true, "bri": 200, "ps": 2}
```

Das ist nützlich wenn du WLED in n8n-Automationen einbauen willst — zum Beispiel "Wenn in Home Assistant ein bestimmter Sensor auslöst, wechsle WLED zu Preset X". Einfacher geht das kaum.

Die vollständige API-Dokumentation gibt es auf wled.me — die ist überraschend gut gepflegt für ein Open-Source-Projekt.

---

## Häufige Probleme (und warum sie passieren)

**LEDs leuchten, aber in falschen Farben:**
WS2812B hat RGB-Reihenfolge, manche Strips sind GRB. In WLED unter "LED Preferences" den Color Order auf GRB umstellen.

**Strip flackert oder zeigt zufällige Farben:**
GND-Verbindung fehlt oder ist schlecht. Netzteil zu schwach. Datenkabel zu lang ohne Level-Shifter (bei Kabeln über 1m empfiehlt sich ein 470 Ohm Widerstand am Data-Pin).

**WLED reagiert nicht mehr nach Firmware-Update:**
Einfach nochmal über wled.me/install flashen. Das ist sicher, überschreibt nichts an deinen gespeicherten Presets (die liegen im Flash-Speicher separat).

**Home Assistant findet WLED nicht:**
WLED muss im gleichen Netzwerk-Subnet sein wie Home Assistant. Außerdem: mDNS aktiviert? Im WLED Config unter "Network" → mDNS einschalten.

---

## Fazit: Lohnt sich der Aufwand?

Ja. Definitiv.

35 Euro, eine Stunde Zeit — und du hast mit WLED auf dem ESP32 addressierbare Smart-LEDs die sich in dein Smart Home integrieren, 100+ Effekte mitbringen, und auf Open Source basieren die seit Jahren aktiv entwickelt wird. Kein Cloud-Abo, kein Vendor-Lock-in, kein "leider wird das Produkt eingestellt".

WLED ESP32 ist das Beste was passieren konnte für DIY-LED-Projekte. Ich sag das nicht weil ich muss. Ich sag das weil ich inzwischen drei Installationen zuhause habe — unter dem TV, hinterm Bett, und am Schreibtisch — und alle drei laufen seit Monaten ohne einen einzigen Aussetzer.

Der einzige echte Fallstrick: Du fängst mit einem Meter an. Und dann willst du mehr.

---

## Schnellreferenz

| Schritt | Zeit | Tool |
|---|---|---|
| WLED flashen | 5 Min | wled.me/install (Chrome) |
| WiFi einrichten | 3 Min | WLED Web-Interface |
| Strip anschließen | 10 Min | Jumperkabel |
| LED-Typ konfigurieren | 2 Min | WLED Config |
| Home Assistant | 5 Min | HA Integration |

**Gesamtzeit:** 25 Minuten. Ich hab "20 Minuten" im Titel geschrieben. Das stimmt für einen guten Tag. An einem normalen Tag, mit Kabelsalat-Suchen, sind es 25. Auch okay.

---

*Weiterführend: [ESP32 + Home Assistant: Dein erster Sensor](./esp32-home-assistant-erster-sensor-2026) — wenn du noch nie mit dem ESP32 gearbeitet hast, fang da an. Und für das Dashboard wo du später deine WLED-Presets steuerst: [Home Assistant Dashboard Setup](./home-assistant-dashboard-2026).*
