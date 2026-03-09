---
title: "ESP32 Projekte für dein Smart Home , 5 Builds unter 20€"
slug: "esp32-smart-home-projekte-unter-20-euro"
date: "2026-03-06"
description: "5 ESP32-Projekte mit ESPHome und Home Assistant. Temperatur-Sensor, Bewegungsmelder, Pflanzen-Bewässerung. Alle unter 20€. Mit Teilelisten und Code."
tags: ["smart-home", "home-assistant", "arduino", "esp32", "diy", "maker"]
category: "maker-projekt"
draft: false
titleAccent: "ESP32"
heroImage: "/images/blog/esp32-1.webp"
readingTime: 4
---

> **TL;DR**
> - ESP32-C3 (3€) + Sensoren (DHT22, PIR, Reed Switch), YAML-Config mit ESPHome, Home Assistant erkennt automatisch
> - 5 Projekte, alle unter 20€, Temperatur/Luftfeuchte, Bewegung, Tür, Pflanzenbewässerung, LED-Strips
> - Kritisch: GPIO-Pins, 5V Netzteil, Sensor-Kalibrierung, Level Shifter bei LEDs
> - Deep Sleep für Batteriebtrieb 6-12 Monate Laufzeit

Ein ESP32 Board kostet 3€. Ein Temperatursensor 1,50€. Zusammen mit ESPHome und Home Assistant hast du in 20 Minuten einen smarten Raumsensor, der keine Cloud braucht.

Hier sind 5 Projekte, die alle unter 20€ kosten. Mit exakten Teilelisten, ESPHome-Configs und Anfänger-Tipps.

## Welches Board?

| Modell | Core | Preis | Best für |
|---|---|---|---|
| **ESP32-C3** | Single RISC-V | 2,50-4€ | Budget, Anfänger |
| **ESP32** (klassisch) | Dual-Core | 4-5€ | Allrounder |
| **ESP32-S3** | Dual-Core | 5-7€ | KI/ML, Kamera |

**Mein Tipp:** ESP32-C3 für unter 3€ auf AliExpress. Reicht für alle 5 Projekte.

## Warum ESPHome?

ESPHome ist YAML-basiert. Kein C++, kein Arduino IDE, kein Debugging-Hölle. Du schreibst eine Config-Datei, flashst das Board, fertig. Home Assistant erkennt das Gerät automatisch.

```yaml
esphome:
  name: mein-sensor

esp32:
  board: esp32dev

wifi:
  ssid: "Mein-WiFi"
  password: "passwort"
```

Das ist die Basis. Jedes Projekt baut darauf auf.

## Projekt 1: Temperatur & Luftfeuchte (5€)

![Schaltplan: DHT22 Sensor an ESP32 GPIO4 angeschlossen](/images/blog/esp32-2.webp)

**Teileliste:**

| Teil | Preis |
|---|---|
| ESP32-C3 | 3€ |
| DHT22 Sensor | 1,50€ |
| Jumper-Kabel | 0,50€ |
| **Gesamt** | **5€** |

**ESPHome Config:**

```yaml
sensor:
  - platform: dht
    pin: GPIO4
    temperature:
      name: "Wohnzimmer Temperatur"
    humidity:
      name: "Wohnzimmer Luftfeuchte"
    update_interval: 30s
```

**Tipp:** DHT22 braucht 2,5 Sekunden pro Messung. Update-Interval nicht unter 30s setzen.

**Alternative:** BME280 (2-4€) misst zusätzlich barometrischen Luftdruck. Genauer, aber teurer.

Home Assistant zeigt dir automatisch einen Live-Graph mit History. Perfekt für Raumklima-Monitoring.

## Projekt 2: Bewegungsmelder mit Notification (6€)

![HC-SR501 PIR Bewegungssensor an der Wand montiert](/images/blog/esp32-3.webp)

**Teileliste:**

| Teil | Preis |
|---|---|
| ESP32-C3 | 3€ |
| HC-SR501 PIR Sensor | 1€ |
| Pull-Down Widerstand | 0,10€ |
| Kabel + Stiftleisten | 0,50€ |
| **Gesamt** | **~5-6€** |

**ESPHome Config:**

```yaml
binary_sensor:
  - platform: gpio
    pin: GPIO33
    name: "Bewegungsmelder Flur"
    device_class: motion
```

**Reichweite:** 5-7 Meter je nach Modell. Sensitivität und Delay sind über Potentiometer am Sensor einstellbar.

**Home Assistant Automation:** Bewegung erkannt → Licht an. Nach 10 Minuten ohne Bewegung → Licht aus. Push-Notification aufs Handy optional.

## Projekt 3: Smarter Tür-Sensor (5€)

**Teileliste:**

| Teil | Preis |
|---|---|
| ESP32-C3 | 3€ |
| Reed Switch (MC-38) | 0,80€ |
| Magnet | 0,20€ |
| Kabel | 0,30€ |
| **Gesamt** | **~4-5€** |

Reed Switch an den Türrahmen, Magnet an die Tür. Tür auf → Kontakt unterbrochen → Home Assistant weiß Bescheid.

**ESPHome Config:**

```yaml
binary_sensor:
  - platform: gpio
    pin: GPIO2
    name: "Haustür"
    device_class: door
    filters:
      - delayed_on: 100ms
```

Der `delayed_on` Filter ignoriert Prellen (elektrisches Rauschen).

**Automationen:** Tür nachts offen → Alarm. Alle Türen zu + letzter Bewohner weg → Away-Mode. Fenster offen + Heizung an → Heizung aus.

## Projekt 4: Automatische Pflanzenbewässerung (10€)

![ESP32 mit kapazitivem Bodenfeuchte-Sensor und Mini-Wasserpumpe](/images/blog/esp32-4.webp)

**Teileliste:**

| Teil | Preis |
|---|---|
| ESP32-C3 | 3€ |
| Kapazitiver Bodenfeuchte-Sensor | 0,80€ |
| 5V Relais-Modul | 1€ |
| DC Mini-Wasserpumpe | 3,50€ |
| Schlauch + Düse | 1€ |
| **Gesamt** | **~10€** |

**ESPHome Config:**

```yaml
sensor:
  - platform: adc
    pin: GPIO35
    name: "Bodenfeuchte"
    filters:
      - calibrate_linear:
        - 2.5 -> 100
        - 1.0 -> 0

switch:
  - platform: gpio
    pin: GPIO27
    name: "Pumpe"
```

**Kalibrierung ist Pflicht:** Sensor in Wasser = 100%, trocken = 0%. Rohwerte notieren und in die Config eintragen.

**Wichtig:** Relais mit separatem 5V Netzteil betreiben. Nicht vom ESP32! Und Pump-Runtime limitieren (max 30 Sekunden pro Start), sonst überschwemmst du deine Wohnung.

## Projekt 5: LED-Strip Controller mit WLED (11€)

![WS2812B LED Strip mit ESP32 Controller, warmes Licht](/images/blog/esp32-5.webp)

**Teileliste:**

| Teil | Preis |
|---|---|
| ESP32-C3 | 3€ |
| WS2812B LED-Strip (1m, 30 LEDs) | 4€ |
| Level Shifter (3.3V→5V) | 0,50€ |
| Kabel | 0,50€ |
| USB-Netzteil | 2€ |
| **Gesamt** | **~11€** |

WLED ist eine Firmware speziell für LED-Strips. Installation über den Browser: [install.wled.me](https://install.wled.me). Flash, WiFi verbinden, fertig.

**15+ Effekte** vorinstalliert. Musik-reaktiv mit Mikrofon. Smartphone-App. Home Assistant Integration out-of-the-box.

**Kritisch:** Level Shifter nutzen! ESP32 gibt 3.3V aus, WS2812B braucht 5V Signal. Ohne Shifter: Flackern, falsche Farben.

## Das Komplett-Set: 3 Projekte für 7,30€

Du brauchst nicht für jedes Projekt ein eigenes Board. Mit einem ESP32-C3 (3€) + DHT22 (1,50€) + HC-SR501 (1€) + Reed Switch (0,80€) + Kabel (1€) hast du drei funktionierende Smart-Home-Sensoren für **7,30€ total**.

![Kostenvergleich: ESP32 DIY Sensoren vs Aqara vs Hue](/images/blog/esp32-6.webp)

Zum Vergleich: Ein einzelner Aqara Temperatursensor kostet 15-20€. Du baust drei Sensoren für die Hälfte.

## Die 3 häufigsten Anfängerfehler

**Falsche GPIO-Pins.** GPIO0, GPIO1, GPIO3, GPIO6-11 sind beim Boot reserviert. Nutze GPIO2, GPIO4, GPIO5, GPIO18-27, GPIO33-39. GPIO12 auf HIGH beim Boot = Board wirkt wie gebrickt.

**USB-Power reicht nicht.** ESP32 zieht beim WiFi-Senden ~200mA. Billiges USB-Kabel + schwaches Netzteil = ständige Resets. "Brownout detector triggered" in der Console ist das Symptom. Lösung: Vernünftiges 5V/2A Netzteil.

**Sensor nicht kalibriert.** DHT22 zeigt 150°C? Bodenfeuchte immer 0%? Die Rohwerte müssen kalibriert werden. Einmal nass, einmal trocken messen, Werte in die Config eintragen.

## Batterie oder Netzteil?

| Modus | Stromverbrauch |
|---|---|
| Aktiv (WiFi an) | 30-68mA |
| Deep Sleep | 0,15µA |

Mit Deep Sleep und Messung alle 5 Minuten hält ein 18650 Akku (2500mAh) circa 6 Wochen. Bei stündlicher Messung: 8-12 Monate.

Für stationäre Sensoren (Temperatur, Tür): USB-Netzteil. Für mobile Sensoren (Garten, Keller): Batterie mit Deep Sleep.

## Los geht's

1. ESP32-C3 bestellen (AliExpress: 3€, Amazon: 6€)
2. Sensor aussuchen (DHT22 für den Start)
3. ESPHome Add-on in Home Assistant installieren
4. YAML Config schreiben (Copy-Paste von oben)
5. Flashen, verbinden, automatisieren

Das erste Projekt dauert 30 Minuten. Danach bist du süchtig.

---

Welches Projekt baust du zuerst? Temperatur-Sensor oder direkt die Pflanzenbewässerung?. TRMT
