---
title: "Home Assistant einrichten: Komplett-Guide 2026"
titleAccent: "Home Assistant"
description: "Home Assistant einrichten in 2026: Schritt-fuer-Schritt von Hardware-Wahl bis erste Automatisierung. Raspberry Pi 5, HA Green oder Mini-PC? Hier ist die ehrliche Entscheidungshilfe."
slug: home-assistant-einrichten-2026
date: "2026-03-28"
updatedAt: 2026-03-18
draft: false
category: smart-home
tags:
  - home-assistant
  - smart-home
  - raspberry-pi
  - haos
  - tutorial
  - maker
  - heimautomatisierung
  - anfaenger
pillar: maker
type: guide
primaryKW: home assistant einrichten
volume: 590
interlinks:
  - esp32-home-assistant-erster-sensor-2026
  - home-assistant-dashboard-2026
  - zigbee-thread-matter-vergleich-2026
affiliate:
  - name: "Raspberry Pi 5 (4GB)"
    price: "~80 EUR"
  - name: "Home Assistant Green"
    price: "~100 EUR"
  - name: "Mini-PC (z.B. Beelink EQ12)"
    price: "~150 EUR"
heroImage: "/images/blog/home-assistant-einrichten-2026-1.webp"
heroImageThumb: "/images/blog/home-assistant-einrichten-2026-1-thumb.webp"
---

# Home Assistant einrichten: Komplett-Guide 2026

<div class="rf-block rf-tldr">
	<span class="rf-label">TL;DR</span>
	<ul>
		<li>Home Assistant ist die einzige Smart-Home-Plattform, die wirklich dir gehoert. Kein Cloud-Zwang, kein Abo, kein "Dienst wird eingestellt".</li>
		<li>Drei Hardware-Optionen: Raspberry Pi 5 (guenstig, flexibel), HA Green (Plug-and-Play), Mini-PC (Power und Storage).</li>
		<li>HAOS installieren dauert ca. 15 Minuten. Erste Integration einrichten nochmal 10.</li>
		<li>Erste Automatisierung laeuft oft schon am selben Abend.</li>
		<li>Lernkurve gibt es. Aber die ist flach genug, dass du heute noch anfangen kannst.</li>
	</ul>
</div>

---

Ich nutze Home Assistant seit 2022. Und ich kann dir sagen: Die erste Woche war verwirrend. Nicht weil die Software schlecht ist, sondern weil ich komplett falsch angefangen habe. Zu viel gegoogelt, zu viele YouTube-Videos auf einmal, zu viele Tabs auf. Das klassische ADHS-Setup, das garantiert ins Nichts fuehrt.

Dieser Artikel ist das, was ich mir damals gewuenscht haette. Kein Bullshit, keine 47 Optionen gleichzeitig, keine Grundsatzdiskussion ob Zigbee oder Matter. Einfach: Hardware raussuchen, installieren, erste Integration, fertig.

---

## Warum ueberhaupt Home Assistant?

Kurze Version: weil Alexa, Google Home und Co. irgendwann abschalten. Oder teurer werden. Oder deine Daten in die Cloud schicken, ob du willst oder nicht.

Amazon hat 2023 einfach den kostenlosen Alexa-Guard-Service gestrichen. Google hat Nest-Hubs mit Funktionen beworben, die dann sang- und klanglos verschwunden sind. Philips Hue hat eine Bridge-Gebuehr einfuehren wollen. Wink hat seinen Hub deaktiviert und Nutzer aufgefordert, ein Abo zu zahlen, oder alles faellt aus.

Home Assistant laeuft bei dir. Lokal. Auf deiner Hardware. Wenn der Hersteller deiner Gluehbirne pleite geht, laeuft das Ding trotzdem. Das ist der einzige Grund den ich brauche.

Dazu kommt: ueber 3.000 Integrationen. Thermostaten, Steckdosen, Kameras, Waschmaschinen, Spotify, iCloud, der Netatmo-Regensensor von 2018, quasi alles.

---

## Hardware-Entscheidung: Was brauchst du wirklich?

Das ist die Frage die fast alle falsch stellen. Die meisten fragen "was ist am guenstigsten?" Besser waere: "was passt zu meiner Situation?"

### Vergleichstabelle

| Hardware                        | Preis    | Vorteile                                         | Nachteile                                           | Empfehlung fuer                                       |
| ------------------------------- | -------- | ------------------------------------------------ | --------------------------------------------------- | ----------------------------------------------------- |
| **Raspberry Pi 5 (4GB)**        | ~80 EUR  | Guenstig, gut dokumentiert, grosse Community     | Braucht SD-Karte oder SSD extra, Setup noetig       | Maker, Bastler, wer lernen will                       |
| **Home Assistant Green**        | ~100 EUR | Plug-and-Play, offiziell unterstuetzt, kompakt   | Kein Zigbee-Chip eingebaut, etwas teurer            | Einsteiger, wer einfach anfangen will                 |
| **Mini-PC (z.B. Beelink EQ12)** | ~150 EUR | Viel Power, grosse SSD, 24/7-faehig, erweiterbar | Groesser, mehr Verbrauch, Setup etwas aufwaendiger  | Fortgeschrittene, viele Daten, Proxmox-Setup          |
| **Home Assistant Yellow**       | ~130 EUR | PoE, eingebauter Zigbee-Chip, M.2-Slot           | Nicht mehr aktiv verkauft, begrenzte Verfuegbarkeit | Zigbee-Nutzer die Wert auf integrierte Hardware legen |
| **NUC oder alter Laptop**       | 0-80 EUR | Ggf. schon vorhanden, viel Power                 | Oft nicht effizient genug fuer 24/7                 | Wenn ohnehin was rumliegt                             |

Meine Empfehlung fuer 90% der Leute die anfangen: **Home Assistant Green** oder **Raspberry Pi 5 mit SSD**. Wer basteln will, nimmt den Pi. Wer einfach anfangen will, nimmt den Green.

Ich selbst laufe auf einem Beelink Mini-PC, weil ich nebenbei noch Frigate (Kameras mit AI-Detection) und eine eigene Datenbank betreibe. Fuer den Start braucht man das nicht.

### Was du sonst noch brauchst

Wenn du den Raspberry Pi 5 nimmst:

- **MicroSD-Karte (min. 32GB, Class 10)** oder besser eine USB-SSD fuer mehr Stabilitaet. SD-Karten sterben irgendwann, SSDs nicht so schnell.
- **USB-C Netzteil (offizielles Pi-Netzteil, ~12 EUR)**, kein billiges No-Name-Teil. Schlechte Netzteile machen mehr Aerger als sie Geld sparen.
- **Gehaeuse** optional, aber sinnvoll fuer 24/7-Betrieb.

Beim Green brauchst du nur ein Ethernet-Kabel und eine Steckdose. Das ist halt der Witz dabei.

---

## Home Assistant OS installieren: Schritt fuer Schritt

Ich beschreibe hier den Weg mit dem **Raspberry Pi 5** und einer SD-Karte. Der Green-Weg ist noch einfacher, den kannst du ueberspringen wenn du ihn nimmst.

### Schritt 1: Raspberry Pi Imager herunterladen

Geh auf [raspberrypi.com/software](https://www.raspberrypi.com/software/) und lad den Raspberry Pi Imager herunter. Gibt ihn fuer Windows, Mac und Linux.

[SCREENSHOT: Raspberry Pi Imager Startbildschirm mit drei Buttons: Choose Device, Choose OS, Choose Storage]

### Schritt 2: Home Assistant OS auswaehlen

Oeffne den Imager. Klick auf "Choose Device" und waehle deinen Raspberry Pi (bei uns: Pi 5). Dann "Choose OS", runterscrollen zu "Other specific-purpose OS", dann "Home assistants and home automation", dann "Home Assistant OS".

Wichtig: Nicht das falsche Image nehmen. Kontrollier ob "64-bit" und die richtige Pi-Version drin steht.

[SCREENSHOT: Raspberry Pi Imager mit Home Assistant OS ausgewaehlt, Pfad Other > Home Assistants > HAOS]

### Schritt 3: SD-Karte beschreiben

Steck deine SD-Karte in den Rechner, klick auf "Choose Storage" und waehle sie aus. Dann "Write". Der Imager laed das Image herunter und schreibt es direkt drauf. Dauert je nach Internetverbindung 3-8 Minuten.

Keine anderen Einstellungen noetig, kein SSH aktivieren, kein Wifi eintragen. HAOS macht das alles selbst.

### Schritt 4: Pi starten und warten

SD-Karte rein in den Pi. Ethernet-Kabel anschliessen (kein WLAN beim ersten Start, Ethernet ist stabiler). Strom drauf.

Jetzt warten. Das erste Booten dauert 3-5 Minuten. Der Pi laedt alles herunter und richtet sich ein.

[SCREENSHOT: Raspberry Pi mit gruener und roter LED, Ethernet-Kabel angeschlossen]

### Schritt 5: Home Assistant im Browser oeffnen

Geh auf einem anderen Geraet (Laptop, Handy, egal) im gleichen Netzwerk auf:

```
http://homeassistant.local:8123
```

Falls das nicht klappt, schau im Router nach der IP-Adresse des Pi und versuch es mit:

```
http://192.168.x.x:8123
```

Du siehst dann einen Ladescreen. "Preparing Home Assistant" steht dort. Nochmal kurz warten.

[SCREENSHOT: Home Assistant Onboarding Screen "Preparing Home Assistant" mit Fortschrittsbalken]

### Schritt 6: Konto anlegen

Wenn Home Assistant fertig geladen hat, siehst du den Onboarding-Wizard. Name, Username, Passwort eintragen. Kein E-Mail-Konto noetig. Das ist dein lokales Admin-Konto.

Standort eintragen (wird fuer Sonnenauf- und untergang in Automatisierungen benoetigt). Welche Daten du mit der HA-Cloud teilst, kannst du selbst waehlen. Ich teile grundsaetzlich nichts.

Home Assistant wird dich jetzt nach erkannten Geraeten in deinem Netzwerk fragen. Da erscheinen oft schon Philips Hue, Sonos oder andere Sachen die er automatisch findet. Die kannst du schon hier hinzufuegen oder spaeter.

---

## Erste Integration einrichten

Jetzt kommt der Teil, wo home assistant einrichten erst wirklich Spass macht. Du verbindest dein erstes Geraet.

Geh links in der Sidebar auf "Einstellungen" (das Zahnrad), dann "Geraete und Dienste", dann "Integration hinzufuegen".

[SCREENSHOT: Home Assistant Einstellungen > Geraete und Dienste mit dem Button "Integration hinzufuegen" oben rechts]

Such nach deinem Geraet oder Service. Ein paar Beispiele was gut und schnell funktioniert:

**Philips Hue**
Wenn du eine Hue Bridge hast, findet HA sie automatisch. Auf der Bridge den Knopf druecken wenn er es verlangt, fertig. Alle Lampen erscheinen sofort.

**FRITZ!Box**
Einfach IP und Zugangsdaten eingeben. HA zeigt dir danach alle verbundenen Geraete im Netzwerk, Anrufer-Erkennung, Portweiterleitung und mehr.

**Shelly Steckdosen / Switche**
Shelly-Geraete muessen auf "Local Mode" stehen (in der Shelly App unter Netzwerk > Cloud deaktivieren). Dann findet HA sie per Auto-Discovery.

**Spotify / Apple Music**
Geht auch, ist aber optional. Ich nutze es fuer Automatisierungen wie "Wenn ich nach Hause komme, spiel Playlist X."

Falls dein Geraet nicht automatisch auftaucht: Suche in der Integrations-Liste, gib den Markennamen ein. Die Chance ist hoch, dass es eine Integration gibt.

---

## Dashboard verstehen: Das Basics-Setup

Nach dem Onboarding siehst du ein Standard-Dashboard. Vielleicht schon mit ein paar Karten fuer erkannte Geraete.

Das Dashboard in HA heisst "Lovelace". Du kannst es vollstaendig anpassen. Aber fuer den Start: nicht anfassen. Schau erst eine Woche was du wirklich sehen willst, bevor du anfaengst zu basteln. Mein erster Fehler war, dass ich direkt 3 Stunden am Dashboard gebastelt hab, statt Geraete einzurichten.

Was du wissen solltest:

- Rechts oben "Bearbeiten" klicken, dann kannst du Karten hinzufuegen, verschieben, loeschen.
- Karten sind die UI-Elemente: eine Karte fuer eine Lampe, eine fuer die Temperatur, eine fuer einen Schalter.
- Du kannst mehrere Dashboards anlegen. Eines fuer ueberblick, eines fuer Schlafzimmer, etc.

Einen eigenen Artikel dazu hab ich hier: [Home Assistant Dashboard selbst bauen 2026](/blog/home-assistant-dashboard-2026)

---

## Erste Automatisierung: Das "Hello World" von HAOS

Automatisierungen sind der Grund warum home assistant einrichten sich lohnt. Klingt fancy, ist aber simpel.

Grundprinzip jeder Automatisierung:
**Wenn [Trigger] und [Bedingung], dann [Aktion].**

Beispiel: Wenn ich nach Hause komme (Trigger: Handy tritt ins WLAN ein) und es nach Sonnenuntergang ist (Bedingung), dann schalte das Licht im Flur an (Aktion).

So baust du sie:

Geh auf "Einstellungen", dann "Automatisierungen", dann "Automatisierung erstellen".

[SCREENSHOT: Home Assistant Automatisierungs-Editor mit drei Sektionen: Trigger, Bedingungen, Aktionen]

### Einfachste Automatisierung zum Starten

**Trigger:** Zeitplan - taeglich 22:30 Uhr.
**Bedingung:** keine.
**Aktion:** "Steckdose Schreibtisch ausschalten."

Dauert 2 Minuten. Funktioniert. Und gibt dir das Gefuehl, dass du was gebaut hast. Gut. Besser. Groesser.

Von da aus kannst du die Bedingungen erweitern. Nur wenn jemand zuhause ist. Nur wenn es Wochentag ist. Nur wenn der Fernseher noch laeuft.

---

## Add-ons: Die erste Erweiterung

Home Assistant hat einen eigenen App-Store. In der Sidebar unter "Einstellungen" > "Add-ons".

Drei Add-ons die ich jedem empfehle der gerade anfaengt:

**1. File Editor**
Damit kannst du Konfigurationsdateien direkt im Browser bearbeiten. Brauchst du sobald du mal YAML anfassen willst.

**2. Terminal & SSH**
Optionaler Direktzugriff auf die Kommandozeile. Nicht zwingend noetig, aber praktisch wenn mal was haengt.

**3. Mosquitto Broker (MQTT)**
Fuer Zigbee-Geraete via Zigbee2MQTT oder wenn du ESP32-Sensoren einbinden willst. Den Artikel dazu findest du hier: [ESP32 + Home Assistant: Dein erster Sensor](/blog/esp32-home-assistant-erster-sensor-2026)

Fuer den Anfang reicht der File Editor. Den Rest kannst du bei Bedarf nachruestren.

---

## Zigbee einrichten: Der naechste Schritt

Wenn du Zigbee-Geraete hast oder kaufen willst (IKEA Tradfri, Aqara, Sonoff, etc.), brauchst du einen Zigbee-Dongle.

Der guenstigste und am besten unterstuetzte: **SONOFF Zigbee 3.0 USB Dongle Plus** fuer ca. 20 EUR.

Wenn du dir den Artikel ueber Protokolle sparen willst: Zigbee ist 2026 noch immer die beste Wahl fuer guenstige Sensoren und Lampen. Thread und Matter sind fuer neue Geraete interessant, aber die Auswahl ist noch kleiner und teurer. Mehr dazu: [Zigbee vs Thread vs Matter: Was brauchst du 2026?](/blog/zigbee-thread-matter-vergleich-2026) — der Vergleich hilft dir, die richtige Entscheidung fuer dein Setup zu treffen, bevor du Geld ausgibst.

---

## Companion App: Home Assistant auf dem Handy

Home Assistant einrichten bedeutet auch: das Ganze mobil nutzbar machen. Die offizielle App heisst "Home Assistant Companion" und die ist echt gut.

Installieren aus dem App Store (iOS oder Android), dann einfach die lokale IP eingeben oder "Suche im Netzwerk" tippen. Sie verbindet sich automatisch wenn du im Heimnetz bist.

Was die App kann:

**Presence Detection:** Dein Handy meldet automatisch ob du zuhause bist oder nicht. Basis fuer alle "wenn ich nach Hause komme"-Automatisierungen. Funktioniert via WLAN und GPS parallel, ist also ziemlich zuverlaessig.

**Notifications:** HA kann dir Push-Benachrichtigungen schicken. Wassermelder angeschlagen, Waschmaschine fertig, Bewegung erkannt. Kein IFTTT, kein Umweg. Direkt.

**Sensoren aus dem Handy auslesen:** Akkustand, Helligkeit, Lautheitsgrad, welches WLAN verbunden. Die App macht dein Handy quasi selbst zum HA-Sensor.

Das einzige was die App nicht kann: von unterwegs auf dein HA zugreifen ohne zusaetzliches Setup. Dafuer brauchst du entweder den kostenlosen **Nabu Casa Remote Access** (2,5 EUR/Monat, unterstuetzt gleichzeitig die HA-Entwicklung) oder einen eigenen VPN-Tunnel nach Hause. Beides optional fuer den Start, beides leicht einzurichten wenn du mal soweit bist.

[SCREENSHOT: Home Assistant Companion App auf iPhone, Dashboard mit Kacheln fuer Lampen und Temperatursensoren]

---

## Backups: Der Schritt den alle vergessen

Ich sag das kurz und deutlich: Richte Backups ein bevor du irgendwas anderes machst.

"Einstellungen" > "System" > "Backups". Dort einen automatischen Backup aktivieren. Taeglich oder woechentlich, je nach Paranoia-Level. Den Backup-Ordner auf einen anderen Datentraeger oder in die Cloud kopieren.

Warum das so wichtig ist: SD-Karten sterben. Manchmal nach 3 Monaten, manchmal nach 3 Jahren. Ohne Backup verlierst du alle Integrationen, alle Automatisierungen, alles. Mit Backup: 15 Minuten um alles wiederherzustellen.

Ich hab das Lernen auf die harte Tour gemacht. Mach du das nicht.

---

## Haeufige Anfaenger-Fehler

Ich mach das kurz, weil ich alle davon gemacht hab.

**SD-Karte statt SSD nehmen.**
SD-Karten sterben bei Dauerbetrieb. Manchmal nach 6 Monaten, manchmal nach 2 Jahren. Eine USB-SSD kostet 15-20 EUR und ist wesentlich zuverlaessiger.

**Alles auf einmal einrichten wollen.**
Home Assistant einrichten ist kein Sprint. Erste Woche: ein Geraet, eine Automatisierung, fertig. Dann weiter.

**Ohne Backup arbeiten.**
Einstellungen > System > Backups. Richte dort einen automatischen Backup ein, am besten auf eine externe SD-Karte oder in eine Cloud. Wenn deine SD stirbt ohne Backup: alles weg.

**Zigbee-Dongle direkt in den Pi stecken.**
Stroerungen durch USB-3-Interferenz sind real. Ein 30cm USB-2-Verlaengerungskabel kostet 3 EUR und loest das Problem.

**Zu viele YouTube-Tutorials gleichzeitig schauen.**
Jeder hat seinen eigenen Setup-Stil. Das verwirrt mehr als es hilft. Einen Guide durchziehen, dann selbst ausprobieren.

---

## Fazit: Lohnt sich der Aufwand?

Ja. Absolut. Kein Zweifel.

Der initiale Aufwand ist real, keine Frage. Ein Nachmittag fuer Installation und erste Einrichtung ist realistisch. Dann ein paar Stunden pro Woche in den ersten Wochen wenn man neugierig ist.

Aber danach: du hast ein Smart Home das wirklich funktioniert. Das keinem Unternehmen gehoert. Das nicht einfach die Preise erhoehen kann. Das morgen noch genauso laeuft wie heute, egal ob irgendein Dienst abgekuendigt wird.

Ich hab meine alte Alexa-Infrastruktur komplett ersetzt. Heute laeuft alles lokal. Heizung, Lichter, Kameras, Sensoren, Steckdosen. Keine Cloud ausser ich entscheide mich bewusst dafuer.

Das Gefuehl, wenn man das erste Mal per Automatisierung das Licht angeht bevor man ueberhaupt die Tuer aufgemacht hat: krass. Klingt banal. Ist es nicht.

Wenn du mit Sensoren und eigenen Geraeten weitermachen willst, schau dir den ESP32-Artikel an: [ESP32 + Home Assistant: Dein erster Sensor in 30 Minuten](/blog/esp32-home-assistant-erster-sensor-2026). Das ist quasi der naechste logische Schritt.

---

## Empfohlene Hardware (Affiliate-Links)

Die drei sinnvollsten Einstiegsmoeglichkeiten kurz zusammengefasst:

**[Raspberry Pi 5 (4GB) -- ca. 80 EUR auf Amazon]**
Der Klassiker. Grosse Community, gut dokumentiert, flexibel. Wenn du Lust hast selbst was zu basteln.

**[Home Assistant Green -- ca. 100 EUR im offiziellen Shop]**
Der einfachste Weg. Auspacken, anschliessen, fertig. Keine Konfiguration noetig. Ideal wenn du einfach anfangen willst ohne rumzubasteln.

**[Beelink EQ12 Mini-PC -- ca. 150 EUR auf Amazon]**
Fuer die, die langfristig planen. Viel Speicher, viel Power, laeuft auch Proxmox problemlos wenn man will. Overkill fuer den Start, aber kein einziger Nachteil wenn man schon weiss, dass man HA langfristig nutzen will.

Ich nutze keinen der Links fuer den eigenen Start irgendwie zu optimieren. Die Empfehlung ist dieselbe egal ob du drueckst oder nicht.

---

_Letztes Update: Maerz 2026. Getestet mit Home Assistant OS 13.x auf Raspberry Pi 5 und Beelink EQ12._
