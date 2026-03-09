---
title: "Home Assistant 2026: Smart Home ohne Cloud-Zwang"
slug: "home-assistant-einsteiger-guide-2026"
date: "2026-03-06"
description: "Dein Smart Home, deine Daten. Home Assistant 2026 macht den Einstieg so leicht wie nie. Was du brauchst, was es kostet, welche Automationen sich lohnen."
tags: ["smart-home", "home-assistant", "tutorial", "diy", "open-source"]
category: "maker-projekt"
draft: false
titleAccent: "Home Assistant"
heroImage: "/images/blog/home-assistant-1.webp"
readingTime: 3
---

> **TL;DR**
> - Open Source, lokal, keine Cloud, deine Daten bleiben bei dir, 2.000+ Integrationen
> - Hardware: Pi 4 ab 30€ + Zigbee Dongle 20€, für 5-20 Geräte ausreichend
> - Start mit Smart Plug (15€), Bewegungssensor (20€), Tür-Sensor (10€), dann Automationen bauen
> - Erste Automation: Bewegung im Flur, Licht an, nach 10 Min aus, dann wird's Sucht

Alexa hört mit. Google speichert alles. Und wenn der Cloud-Server down ist, geht dein Licht nicht an.

Home Assistant macht das anders. Open Source, lokal, keine Cloud nötig. Deine Daten bleiben bei dir. Und seit Version 2026.3 ist der Einstieg so einfach wie noch nie.

## Was ist Home Assistant?

Eine Open-Source-Plattform für Heimautomation. Läuft lokal auf einem Raspberry Pi oder Mini-PC. Verbindet sich mit über 2.000 Geräten und Diensten. Kostet null Euro Software-Gebühren.

Release 2026.3 bringt Vacuum-Automationen (Staubsauger per Zone steuern), Android Wake-Words und ein komplett überarbeitetes Energy Dashboard mit Live-Ansicht.

## Was brauchst du an Hardware?

**Budget-Start (unter 100€):** Raspberry Pi 4 (gebraucht ab 30€) + Sonoff Zigbee Dongle (20€). Reicht für 5-10 Geräte ohne Probleme.

**Komfort-Setup (150-300€):** Raspberry Pi 5 oder Intel NUC. Schneller, mehr RAM, zukunftssicher. Wenn du mehr als 20 Geräte planst oder viele Add-ons nutzen willst.

**Faustregel:** Unter 5 Geräte → Pi 4 reicht. 5-20 Geräte → Pi 5. 20+ Geräte → Mini-PC.

![Raspberry Pi 4 mit Sonoff Zigbee Dongle und Aqara Sensoren](/images/blog/home-assistant-2.webp)

## Die ersten 3 Geräte

Kauf nicht alles auf einmal. Start klein:

**1. Smart Plug (Aqara oder Sonoff, ~15€).** Lampen, Kaffeemaschine, was auch immer. Ein/aus per App und Automation.

**2. Bewegungssensor (Aqara, ~20€).** Der Trigger für deine erste Automation. Bewegung erkannt → Licht an.

**3. Tür-/Fenstersensor (Aqara, ~10€).** Fenster offen + Heizung an = Heizung aus. Spart Energie, nervt auf die gute Art.

Alles über Zigbee. Kein WLAN-Chaos, kein Cloud-Zwang. Ein Dongle, fertig.

## 5 Automationen, die sofort Spaß machen

### 1. Bewegungslicht

Bewegung im Flur → Licht an. Nach 10 Minuten ohne Bewegung → Licht aus. Der Klassiker. Hands-free, kein Schalter nötig.

### 2. Sonnenuntergang-Stimmung

Sonne geht unter → Wohnzimmer-Licht auf 80%, warmweiß. Um 22:30 → dimmen auf 30%. Morgens um 6:30 → alles aus.

Dein Tagesrhythmus, automatisch.

### 3. Security-Alert

Bewegung im Wohnzimmer nach 23 Uhr und keiner zuhause? Push-Notification aufs Handy. Optional: Licht blinkt rot.

### 4. Abwesenheits-Modus

Letzter Bewohner verlässt das Haus (Geofence via Handy) → Alle Lichter aus, TV aus, Heizung auf 16°C Sparmodus. Notification: "Haus im Away-Mode."

### 5. Fenster-offen-Warner

Fenstersensor meldet "offen" + Heizung läuft → Heizung aus, Notification: "Fenster zu, du heizt die Straße!"

Nervig? Ja. Spart Geld? Absolut.

![Home Assistant Automation Editor: Bewegungssensor triggert Licht an](/images/blog/home-assistant-3.webp)

## Was kostet der Spaß?

| Was | Budget | Komfort |
|---|---|---|
| Hardware (Hub) | Pi 4 gebraucht: 30€ | NUC: 200€ |
| Zigbee-Dongle | 20€ | 30€ |
| Smart Plugs (2x) | 30€ | 50€ |
| Smart Bulbs (2x) | 30€ | 60€ |
| Bewegungssensor | 20€ | 30€ |
| Tür-Sensor (2x) | 20€ | 40€ |
| **Gesamt** | **~150€** | **~410€** |

Die Software ist kostenlos. Kein Abo. Kein Vendor-Lock-in.

## Warum nicht einfach Alexa?

Drei Gründe:

**Datenschutz.** Home Assistant läuft lokal. Keine Cloud, keine Daten an Amazon/Google.

**Keine Abhängigkeit.** Amazon stellt den Dienst ein? Dein Smart Home läuft weiter. Alles lokal.

**Mehr Möglichkeiten.** 2.000+ Integrationen. Geräte verschiedener Hersteller in einer Oberfläche. Automationen, die Alexa nicht kann.

## Wo anfangen?

1. Raspberry Pi 4 besorgen (gebraucht reicht)
2. Home Assistant OS installieren (Balena Etcher, 10 Minuten)
3. Zigbee-Dongle anschließen
4. Ersten Sensor hinzufügen
5. Erste Automation bauen: Bewegung → Licht

Nach einem Nachmittag hast du ein funktionierendes Smart Home. Lokal, privat, erweiterbar.

---

Welches Gerät automatisierst du als Erstes?. TRMT
