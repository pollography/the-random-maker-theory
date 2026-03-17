---
title: "ESP32 + Home Assistant: Dein erster Sensor in 30 Minuten"
slug: "esp32-home-assistant-erster-sensor-2026"
date: "2026-03-17"
description: "ESP32 + ESPHome + Home Assistant: Eigenen Temperatursensor bauen fuer 15 Euro. Schritt-fuer-Schritt ohne Coding. YAML-Config zum Kopieren."
tags:
  [
    "esp32",
    "home-assistant",
    "esphome",
    "smart-home",
    "maker",
    "tutorial",
    "anfaenger",
    "diy",
  ]
category: "maker-projekt"
draft: false
readingTime: 11
heroImage: "/images/blog/esp32-home-assistant-erster-sensor-2026-1.webp"
heroImageThumb: "/images/blog/esp32-home-assistant-erster-sensor-2026-1-thumb.webp"
titleAccent: "ESP32"
podcastSlug: "007-esp32-home-assistant-erster-sensor-2026"
podcastUrl: ""
videoUrl: ""
---

<script>
  import MindMap3D from '$lib/components/blog/MindMap3D.svelte';

  const mindMapData = {"name":"Home Assistant 2025.12 & ESPHome","children":[{"name":"Home Assistant 2025.12 Release","children":[{"name":"Home Assistant Labs","children":[{"name":"Winter Mode (Snowflakes)"},{"name":"Feature Previews"}]},{"name":"Automations","children":[{"name":"Purpose-specific Triggers"},{"name":"Purpose-specific Conditions"},{"name":"Target-first Approach"},{"name":"Floor and Area Support"}]},{"name":"Dashboards","children":[{"name":"System-wide Default Dashboard"},{"name":"Manual Reorder Areas/Floors"},{"name":"Undo/Redo in Editor"},{"name":"Home Dashboard Improvements"}]},{"name":"Energy Dashboard","children":[{"name":"Real-time Power Monitoring"},{"name":"Downstream Water Meters"},{"name":"Water Sankey Card"}]},{"name":"New Integrations","children":[{"name":"Google Air Quality"},{"name":"Philips Hue BLE"},{"name":"Airobot"},{"name":"Victron BLE"}]}]},{"name":"ESPHome & Hardware","children":[{"name":"ESP32 Support","children":[{"name":"ESP32-C3 Super Mini"},{"name":"ESP32-C6 (Wi-Fi 6/Thread)"},{"name":"ESP32-H2 (RISC-V)"},{"name":"ESP32-P4 (High Performance)"}]},{"name":"Frameworks","children":[{"name":"ESP-IDF v5.3.2"},{"name":"Arduino Migration"},{"name":"Python 3.10 Requirement"}]},{"name":"Sensors","children":[{"name":"BME280","children":[{"name":"I2C/SPI Interface"},{"name":"Temp/Pressure/Humidity"},{"name":"Oversampling Options"}]},{"name":"DHT22","children":[{"name":"Pull-up Resistor Needed"},{"name":"Temp/Humidity Only"},{"name":"Slow Update Rate"}]},{"name":"DS18B20 (Dallas)"},{"name":"SHT3x/SHT4x"}]},{"name":"Networking","children":[{"name":"OpenThread Support"},{"name":"Post-Connect Roaming"},{"name":"802.11k/v Native Roaming"}]}]},{"name":"Changes & Deprecations","children":[{"name":"32-bit System Support Removed"},{"name":"Core/Supervised Deprecation"},{"name":"Removed: Dominos, Flick Electric"},{"name":"Removed: Bluetooth Tracker"}]}]};
</script>

Hast du dir mal die fertigen Smart-Home-Sensoren im Laden angeschaut? Entweder kosten sie ein Vermoegen, oder sie schicken deine Daten ueber irgendeine Cloud in China. Ich hatte da echt keinen Bock mehr drauf. Leere Batterien genau dann wenn man sie braucht, Daten die mit Verzoegerung ankommen -- und das alles fuer 50 Euro plus Abo.

Der ESP32 hat das fuer mich geaendert. Das Ding kostet so viel wie ein Snack an der Tanke, hat WLAN und Bluetooth eingebaut, und mit ESPHome ist der Einstieg quasi ein Kinderspiel. In 30 Minuten steht deine erste Temperaturkurve in Home Assistant. Kein C++ Code, kein Arduino IDE Gefummel. Ich zeig dir wie.

## Was ist dieser ESP32 eigentlich?

Stell dir den ESP32 wie ein winziges schlaues Gehirn vor -- so gross wie eine Briefmarke, aber mit eingebautem WLAN und Bluetooth. Er kostet zwischen 4 und 9 Euro und kann im Grunde alles messen, steuern und ausloesen, was du dir vorstellst.

Das Problem: Von Haus aus spricht er nur reinen Maschinencode. C++ Befehle, bei denen ein vergessenes Semikolon das halbe Projekt killt. Das hat frueher viele Leute abgeschreckt -- mich auch. Ich hab mir damals die Arduino IDE runtergeladen, drei Stunden Treiber-Probleme gehabt und dann aufgegeben.

**ESPHome** ist der Dolmetscher fuer genau dieses Problem. Du schreibst eine einfache Textliste -- quasi eine Einkaufsliste in normaler Sprache: "Ich hab einen Temperatursensor an Pin 4, er soll alle 30 Sekunden messen und den Wert an Home Assistant schicken." ESPHome nimmt diese Liste und uebersetzt sie automatisch in den Code, den der ESP32 versteht. Malen nach Zahlen fuer Hardware, halt.

Das Beste: ESPHome ist direkt in Home Assistant als Add-on integriert. Du flasht den ESP32, er verbindet sich mit deinem WLAN, und Home Assistant findet ihn automatisch ueber das lokale Netzwerk. Keine manuelle MQTT-Konfiguration, kein Port-Forwarding, kein Gefummel.

## Welches Board kaufen?

Beim ESP32 gibt es inzwischen eine ganze Familie. Fuer den Einstieg empfehle ich zwei Boards:

**ESP32-WROOM-32 DevKit (5-8 EUR):** Das ist der Klassiker. Gross genug um gut damit zu arbeiten, laeuft mit quasi jeder ESPHome-Config. Wenn du zum ersten Mal einen esp32 home assistant Sensor baust, nimm diesen.

**ESP32-C3 Super Mini (4-6 EUR):** Das ist mein aktueller Favorit. Winzig, sparsam, und unglaublich guenstig. Der Chip ist neuer, laeuft stabiler mit ESP-IDF. Einziger Nachteil: Die Pins sind enger zusammen, was das erste Aufstecken auf ein Breadboard etwas fummelig macht.

Fuer dieses Tutorial benutze ich den C3 Super Mini, aber die Anleitung funktioniert mit beiden.

## Einkaufsliste: Was kostet das wirklich?

Alles auf Amazon oder AliExpress fuer zusammen circa 15 Euro:

**Der Sensor -- hier bitte aufpassen:**

Der DHT22 ist der guenstige Klassiker (3-5 EUR). Er misst Temperatur und Luftfeuchtigkeit. Das Problem: Er macht gerne NaN-Fehler ("Not a Number") wenn das Kabel ein paar Zentimeter zu lang ist oder es eine leichte Stoerung gibt. Dann zeigt dein Home Assistant einfach nichts an. Das hab ich selbst erlebt, mehrfach, und es nervt brutal.

Nimm den **BME280** (5-10 EUR). Der misst auch noch den Luftdruck, hat eine zehnmal feinere Aufloesung (0.01 statt 0.1 Grad), und laeuft ueber I2C -- einen Bus-Standard der quasi unkaputtbar ist.

|                  | DHT22          | BME280                     |
| ---------------- | -------------- | -------------------------- |
| Preis            | 3-5 EUR        | 5-10 EUR                   |
| Misst            | Temp + Feuchte | Temp + Feuchte + Luftdruck |
| Aufloesung       | 0.1 Grad       | 0.01 Grad                  |
| Zuverlaessigkeit | Mittelmaessig  | Sehr gut                   |
| Empfehlung       | Nein           | Ja                         |

**Restliches Material:**

- Breadboard (3 EUR)
- Jumper-Kabel / Dupont-Kabel (2 EUR)
- USB-Kabel (hast du bestimmt schon)

Gesamtinvestition: 12-18 Euro fuer ein System das lokal laeuft, kein Abo braucht, und deine Daten nicht an Server in Uebersee schickt.

## Verkabelung: Schnell erklaert

Bevor wir flashen, kurz der Anschluss. Der BME280 kommuniziert ueber I2C -- das sind vier Kabel:

- **VCC** → 3.3V am ESP32 (nicht 5V, der Sensor vertraegt das nicht)
- **GND** → GND
- **SDA** → GPIO8 (C3 Super Mini) oder GPIO21 (WROOM-32)
- **SCL** → GPIO9 (C3 Super Mini) oder GPIO22 (WROOM-32)

Fertig. Vier Kabel, zwei Minuten. Kein Loeten notwendig -- alles steckbar auf dem Breadboard.

Der BME280 hat auf der Rueckseite aufgedruckt welcher Pin was ist. Einfach die Beschriftung auf dem Modul lesen und entsprechend verbinden. Falls du ein Modul ohne Beschriftung erwischst: Standardmaessig liegt VCC links und GND daneben.

## ESP32 flashen: Direkt im Browser

Frueher musstest du die Arduino IDE installieren, Treiber suchen, Board-Definitionen einrichten. Heute geht das direkt im Browser -- in unter 5 Minuten.

**Schritt 1:** Oeffne web.esphome.io in Chrome oder Edge. Firefox unterstuetzt kein WebSerial.

**Schritt 2:** USB-Kabel rein, auf "Connect" klicken, COM-Port auswaehlen. Falls du mehrere Ports siehst: ESP32 kurz abstecken, schauen welcher Port verschwindet -- das ist er.

**Schritt 3:** "Prepare for First Use" waehlen. Das flasht einen minimalen Bootloader. Dauert 1-2 Minuten.

**Der Bootloader-Trick fuer den C3 Super Mini:**

Wenn der Flash-Vorgang abbricht, keine Panik. Beim C3 Super Mini gibt es zwei physische Buttons: Halte BOOT gedrueckt, drueck kurz RESET, lass BOOT wieder los. Jetzt ist er im Flash-Modus. Das ist kein Bug -- der Chip schuetzt sich vor ungewolltem Ueberschreiben waehrend er normal laeuft.

## Die YAML-Konfiguration

Das hier ist das Herzstuck. Die YAML-Datei ist das Kochrezept fuer deinen ESP32 Home Assistant Sensor:

```yaml
esphome:
  name: mein-erster-sensor

esp32:
  board: esp32-c3-devkitm-1 # Beim WROOM-32: esp32dev
  framework:
    type: esp-idf # Stabiler als Arduino, seit 2026 Standard

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password

api:
  encryption:
    key: !secret api_key

ota:
  platform: esphome

i2c:
  sda: GPIO8
  scl: GPIO9
  scan: true

sensor:
  - platform: bme280_i2c
    temperature:
      name: "Wohnzimmer Temperatur"
      oversampling: 16x
    humidity:
      name: "Wohnzimmer Luftfeuchtigkeit"
    pressure:
      name: "Wohnzimmer Luftdruck"
    address: 0x77
    update_interval: 30s
```

Und die `secrets.yaml` daneben anlegen:

```yaml
wifi_ssid: "Dein_WLAN_Name"
wifi_password: "Dein_WLAN_Passwort"
api_key: "EinLangerZufaelligerSchluessel"
```

**Warum update_interval: 30s?**

Der ESP32 erzeugt im Betrieb Waerme. Wenn er den Sensor alle 2 Sekunden abfragt, heizt er die Platine auf -- und der Sensor misst dann die Abwaerme statt die Raumtemperatur. Ich hab das erst nach einer Woche gemerkt warum mein Wohnzimmer laut Sensor konstant 24 Grad anzeigte obwohl ich fror. 30 Sekunden loest das Problem.

**Warum ESP-IDF statt Arduino?**

Seit ESPHome 2026.1 ist ESP-IDF Standard. Der Grund: Arduino-Firmware ist so gewachsen dass OTA-Updates bei manchen Boards fehlschlagen -- Flash zu 103% belegt. Mit ESP-IDF schrumpft die Firmware um bis zu 40%. Kleinere Dateien, stabilere Updates. Beim C3 Super Mini ist ESP-IDF quasi Pflicht -- mit dem Arduino-Framework hatte ich selbst mehrfach Abstuerze beim OTA-Update.

**Kleiner Fallstrick:** Der BME280 hat zwei moegliche I2C-Adressen: 0x76 und 0x77. Standard ist 0x77. Wenn der Sensor nach dem Flashen nicht auftaucht, probier 0x76. Der Unterschied haengt davon ab wie der SDO-Pin auf deinem Modul verdrahtet ist -- bei manchen China-Modulen ist das anders.

**Der `scan: true` Trick:**

Wenn du dir nicht sicher bist welche I2C-Adresse dein Sensor hat, lass ESPHome selbst suchen. Mit `scan: true` loggt ESPHome beim Start alle gefundenen I2C-Geraete mit ihrer Adresse. Einfach Serial-Log aufmachen und schauen was auftaucht -- dann die Adresse in die Config eintragen.

## In Home Assistant einbinden

Sobald der ESP32 im WLAN ist, erkennt Home Assistant ihn automatisch per mDNS. Du bekommst eine Benachrichtigung unter Einstellungen > Geraete & Dienste: "Neues ESPHome-Geraet gefunden". Klick auf Konfigurieren, und Temperatur, Luftfeuchtigkeit, Luftdruck tauchen sofort als Entitaeten auf.

**Dashboard-Karten:**

Die Gauge Card zeigt die aktuelle Temperatur als Tacho-Anzeige -- sehr uebersichtlich. Die History Graph Card zeigt den Verlauf ueber 24 Stunden. Damit siehst du sofort wann deine Wohnung am waermsten oder feuchtesten ist.

Ich hab mir darueber hinaus eine Mini-Graph-Card aus dem HACS-Store installiert. Die zeigt Temperaturverlauf kompakter an als die eingebaute History Graph Card. Ist optional, aber macht das Dashboard viel schoener.

**Erste Automatisierung:**

Ich hab eine einfache Regel gebaut -- wenn die Luftfeuchtigkeit ueber 65% steigt, schickt Home Assistant eine Benachrichtigung aufs Handy. Dauert 2 Minuten in der Automatisierungs-UI. Seitdem weiss ich sofort wenn mein Bad nach dem Duschen nicht genuegend gelueftet wird. Schimmelvorsorge auf Tech-Level -- geil.

Eine zweite Automatisierung die ich empfehle: Wenn die Temperatur ausserhalb der Heizzeiten unter 18 Grad faellt, Benachrichtigung schicken. Das hat mir einmal geholfen zu merken dass ein Fenster in der Nacht offen geblieben war.

**OTA-Updates: Nie wieder Kabel**

Das Beste an ESPHome ist Over-The-Air Update. Wenn du die YAML-Config aenderst -- neuen Sensor hinzufuegen, Namen umbenennen, Messwert anpassen -- druckst du in Home Assistant auf "Install" und das Update wird per WLAN eingespielt. Der ESP32 startet neu und laeuft mit der neuen Config. Kein Kabel, kein Rumgefummel.

## Realitaetscheck: Was nervt, was geil ist

**Was geil ist:**

- 12-18 Euro statt 50+ Euro fuer kommerzielle Sensoren
- Daten bleiben lokal -- keine Cloud, kein Abo, kein Account
- Jederzeit erweiterbar: Display, LED, Knopf, Relais
- OTA-Updates per WLAN, nie wieder Kabel anstecken
- Wenn was kaputt geht: ESP32 fuer 5 Euro nachbestellen

**Was nervt:**

- Jumper-Kabel sind winzig. Breadboard-Stecken ist Zen-Training.
- YAML-Einrueckung muss exakt sein. Ein falsches Leerzeichen und ESPHome beschwert sich.
- Erster Flash schlaegt manchmal fehl. Nicht aufgeben, Boot-Trick versuchen.
- Der erste Kompilier-Vorgang dauert 2-3 Minuten. Geduld.
- Auf AliExpress bestellt? Lieferzeit 2-3 Wochen. Amazon-Varianten sind teurer aber sofort da.

**Das Waerme-Problem:**

Halte mindestens 10-20 cm Abstand zwischen Sensor und ESP32-Board. Entweder laengere Kabel oder ein Gehaeuse das den Sensor nach aussen ausleitet. Das ist kein optionales Extra -- das ist notwendig fuer genaue Messungen. Ich hab ein 3D-gedrucktes Gehaeuse auf Thingiverse gefunden das den BME280 per Kabel nach oben rausfuehrt und das ESP32-Board geschuetzt im Inneren hat. Perfekt.

**Was als naechstes?**

Wenn der erste Sensor laeuft, kommst du quasi automatisch auf den Geschmack. Ich hab angefangen mit einem Sensor, jetzt hab ich acht davon in der Wohnung. Schlafzimmer, Bad, Kueche, Keller -- alles hat seinen eigenen Knoten. Jeder kostet 15 Euro und laeuft seit Monaten stabil ohne einmal angefasst werden zu muessen.

Moegliche Erweiterungen die ich selbst gebaut hab: Bewegungsmelder fuer die Treppenhausbeleuchtung (PIR-Sensor, 2 EUR), Fensterkontakte fuer die Heizungssteuerung (Reed-Schalter, 1 EUR), und eine kleine Wetterstation auf dem Balkon (BME280 + Windrichtung).

## Fazit: Einfach anfangen

Smart Home muss nicht kompliziert oder teuer sein. Der ESP32 und ESPHome nehmen dir die Angst vor dem Code. Ich hab am Anfang Kabel falsch rum reingesteckt, die YAML-Einrueckung versaut, und einmal aus Versehen zwei Sensoren mit der gleichen ID angelegt. Solange nichts raucht, ist jeder Fehler ein Lernmoment.

Das Gefuehl wenn die erste Temperaturkurve in deinem eigenen Home Assistant auftaucht -- lokal, ohne Cloud, ohne Abo -- ist unschlagbar.

Bestell die Teile fuer den Preis eines Kasten Biers und fang an. Der Rest ergibt sich beim Basteln.

Wenn du tiefer einsteigen willst: Im [Home Assistant Komplett-Guide](/blog/home-assistant-einrichten-2026) erklaere ich wie du die komplette Basis aufsetzt. Und im [ESPHome Tutorial](/blog/esphome-tutorial-deutsch-2026) kommen dann komplexere Sensoren dran.

## Konzept-Map: Das grosse Bild

Alle Themen auf einmal — drehen, zoomen, erkunden:

<MindMap3D data={mindMapData} />

## Quellen und Links

- [ESPHome Getting Started Guide](https://esphome.io/guides/getting_started_hassio/) -- Offizielle Anleitung fuer den Einstieg
- [ESPHome BME280 Dokumentation](https://esphome.io/components/sensor/bme280.html) -- Alle Config-Optionen
- [Home Assistant ESPHome Integration](https://www.home-assistant.io/integrations/esphome/) -- Offizielle HA-Dokumentation
- [ESP32 DHT22 Tutorial Deutsch](https://newbiely.de/tutorials/esp32/esp32-dht22) -- Schritt-fuer-Schritt auf Deutsch
- [DHT22 vs BME280 Vergleich](https://datort.de/vergleiche-tests/512/dht22-v-bme280-v-ds18b20-der-vergleich/) -- Sensor-Vergleich mit echten Messdaten

-- TRMT
