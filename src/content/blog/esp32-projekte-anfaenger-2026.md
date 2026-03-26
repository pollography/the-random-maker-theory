---
title: "ESP32 Projekte fuer Anfaenger: 5 Ideen unter 20 Euro"
slug: esp32-projekte-anfaenger-2026
date: "2026-04-06"
draft: false
category: maker
primaryKW: "esp32 projekt anfaenger"
metaDescription: "5 ESP32 Projekte fuer Anfaenger unter 20 Euro: Temperatursensor, OLED Display, Wetterstation, Bewegungsmelder und automatische Pflanzenbewaesserung. Mit Einkaufsliste und Schritt-fuer-Schritt Anleitung."
titleAccent: "ESP32"
podcastSlug: "017-esp32-projekte-anfaenger-2026"
interlinks:
  - esp32-home-assistant-erster-sensor-2026
  - wled-esp32-anleitung-2026
  - esphome-tutorial-deutsch-2026
affiliate:
  - "Sensor-Kit (~20 EUR)"
  - "ESP32 Board (~8 EUR)"
  - "Starter Kit (~25 EUR)"
heroImage: "/images/blog/esp32-projekte-anfaenger-2026-1.webp"
heroImageThumb: "/images/blog/esp32-projekte-anfaenger-2026-1-thumb.webp"
---

# ESP32 Projekte fuer Anfaenger: 5 Ideen unter 20 Euro

**TL;DR**

- Der ESP32 ist ein 8-Euro-Microcontroller mit WLAN und Bluetooth eingebaut — perfekter Einstieg ins Maker-Hobby
- 5 konkrete esp32 projekt anfaenger Ideen: Temperatursensor, OLED Display, Wetterstation, Bewegungsmelder, Pflanzenbewaesserung
- Jedes Projekt hat eine eigene Einkaufsliste, einen Schwierigkeitsgrad (1-5) und realistische Kostenangaben
- Arduino IDE reicht als Software — kein Profi-Setup noetig
- Wer tiefer einsteigen will: Danach direkt weiter mit ESPHome und Home Assistant

---

Ich hab meinen ersten ESP32 bestellt, weil ich zu faul war, mir merken zu muessen ob ich die Pflanzen gewaessert hab. Klingt laecherlich, aber genau das ist der Punkt: der ESP32 loest echte Probleme, und das fuer fast nix.

Heute zeige ich dir 5 **esp32 projekt anfaenger** Ideen, die ich selbst gebaut habe oder die so simpel sind, dass ich sie jeden zum Einstieg empfehlen wuerde. Alle Projekte liegen unter 20 Euro fuer die Komponenten — das Board nicht eingerechnet, das kostet einmalig rund 8 Euro und du kannst es fuer alle Projekte recyceln.

Was du grundsaetzlich brauchst:

**Grundausstattung (einmalig, ~25 EUR als Starter Kit):**
- ESP32 Development Board (z.B. AZ-Delivery ESP32, ~8 EUR auf Amazon)
- Breadboard + Jumper-Kabel Set (~5 EUR)
- USB-Kabel Micro-USB oder USB-C (je nach Board)
- Arduino IDE (kostenlos, arduino.cc)

Das war es. Alles andere ist Projekt-spezifisch.

---

## Projekt 1: Temperatur- und Feuchtigkeitssensor anzeigen

**Schwierigkeitsgrad: 1/5 — absoluter Einstieg**
**Kosten (zusaetzlich zum Grundsetup): ~5-8 EUR**

Das ist das "Hello World" unter den ESP32 Projekten. Du baust einen Sensor, der Temperatur und Luftfeuchtigkeit misst und die Werte per Serial Monitor auf deinen Laptop uebertraegt. Klingt einfach — ist es auch. Und trotzdem lernt man dabei alles Wichtige: Board anschliessen, Code hochladen, Sensor auslesen.

### Einkaufsliste

| Bauteil | Typ | Preis |
|---|---|---|
| Temperatur/Feuchtigkeitssensor | DHT22 (genauer) oder DHT11 (guenstiger) | 3-5 EUR |
| 10k Ohm Widerstand | 1x | im Sensor-Kit meist dabei |
| Jumper-Kabel | bereits in Grundausstattung | - |

Ein [Sensor-Kit (~20 EUR)](https://amzn.to/esp32-sensor-kit) mit DHT22, diversen Widerstaenden und ein paar Extra-Sensoren ist hier eine gute Investition — du brauchst das Zeug eh noch fuer die anderen Projekte.

### So geht's

1. DHT22 an ESP32 anschliessen: VCC an 3.3V, GND an GND, Data an GPIO4 (mit 10k Ohm Pullup-Widerstand zwischen Data und 3.3V)
2. Arduino IDE oeffnen, Library Manager aufrufen: "DHT sensor library" von Adafruit installieren
3. Beispiel-Sketch laden: Datei → Beispiele → DHT sensor library → DHTtester
4. Board einstellen: Werkzeuge → Board → ESP32 Arduino → ESP32 Dev Module
5. COM-Port auswaehlen und hochladen
6. Serial Monitor oeffnen (115200 Baud) — du siehst jetzt Temperatur und Feuchte alle 2 Sekunden

[SCREENSHOT: Serial Monitor mit Temperatur-Output, z.B. "Temperature: 21.5 *C" und "Humidity: 48.0 %"]

Was ich daran mag: du siehst sofort ein Ergebnis. Kein stundenlanger Setup, keine Konfigurationshoeille. 20 Minuten und du hast deinen ersten funktionierenden Sensor.

**Naechster Schritt:** Die Werte per WLAN an Home Assistant schicken — genau das erklaere ich in meinem Artikel [ESP32 + Home Assistant: Dein erster Sensor](/blog/esp32-home-assistant-erster-sensor-2026).

---

## Projekt 2: OLED Display mit Echtzeit-Anzeige

**Schwierigkeitsgrad: 2/5 — ein bisschen mehr, aber kein Hexenwerk**
**Kosten: ~5-8 EUR**

Sobald man den ersten Sensor zum Laufen gebracht hat, will man die Werte irgendwo anzeigen — nicht nur im Serial Monitor. Ein 0,96 Zoll OLED Display kostet keine 5 Euro und sieht trotzdem richtig gut aus. Ich hab eines an meiner Werkbank haengen, das mir Temperatur, Uhrzeit und den aktuellen Status meines 3D-Druckers zeigt.

### Einkaufsliste

| Bauteil | Typ | Preis |
|---|---|---|
| OLED Display 0,96 Zoll | SSD1306, I2C, 128x64 Pixel | 3-5 EUR |
| DHT22 Sensor | wie Projekt 1 | 3-5 EUR (oder bereits vorhanden) |
| Jumper-Kabel | bereits in Grundausstattung | - |

Das Display laeuft ueber I2C — das bedeutet, du brauchst nur 4 Kabel: VCC, GND, SDA und SCL. Das ist angenehm simpel.

### So geht's

1. Display verdrahten: VCC an 3.3V, GND an GND, SDA an GPIO21, SCL an GPIO22
2. Library installieren: "Adafruit SSD1306" + "Adafruit GFX Library" (beide im Library Manager)
3. I2C Adresse pruefen: meist 0x3C, manchmal 0x3D. Mit dem I2C Scanner Sketch kurz checken
4. Beispiel-Sketch: Adafruit SSD1306 → ssd1306_128x64_i2c

Kombination mit dem DHT22 aus Projekt 1 macht hier Sinn. Du liest Temperatur und Feuchtigkeit aus, und statt Serial Monitor laesst du das Display die Werte ausgeben. Etwa 30 Zeilen Code insgesamt.

```cpp
// Minimalbeispiel: Temperatur auf OLED anzeigen
#include <Adafruit_SSD1306.h>
#include "DHT.h"

DHT dht(4, DHT22);
Adafruit_SSD1306 display(128, 64, &Wire, -1);

void setup() {
  dht.begin();
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
}

void loop() {
  float temp = dht.readTemperature();
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(0, 0);
  display.print(temp);
  display.print(" C");
  display.display();
  delay(2000);
}
```

[SCREENSHOT: OLED Display zeigt Temperatur und Feuchte, physisches Foto des aufgebauten Breadboards]

Der Effekt ist ueberproportional zum Aufwand. Das Ding sieht nach "echtem Geraet" aus, und Besuch fragt immer was das ist.

**Variante:** Statt Temperatur kannst du auch Text anzeigen, Ladebalken animieren oder kleine Icons zeichnen. Die Adafruit GFX Library kann erstaunlich viel.

---

## Projekt 3: Mini-Wetterstation mit WLAN

**Schwierigkeitsgrad: 3/5 — erster Kontakt mit WLAN und APIs**
**Kosten: ~8-12 EUR (wenn man DHT22 und Display aus Projekt 1 und 2 hat: ~0 EUR extra)**

Jetzt wird es spannend. Dieses esp32 projekt anfaenger kombiniert alles aus den ersten beiden Projekten und fuegt WLAN hinzu. Der ESP32 verbindet sich mit dem Heimnetz, holt aktuelle Wetterdaten von der OpenWeatherMap API (kostenloser Account reicht) und zeigt sie auf dem OLED Display an — zusammen mit den eigenen Messwerten vom DHT22.

Das Ergebnis: eine Wetterstation, die sowohl draussen-Daten von der API als auch drinnen-Daten vom eigenen Sensor anzeigt.

### Einkaufsliste

| Bauteil | Typ | Preis |
|---|---|---|
| DHT22 Sensor | wie Projekt 1 | bereits vorhanden |
| OLED Display | wie Projekt 2 | bereits vorhanden |
| OpenWeatherMap Account | kostenlos | 0 EUR |

Extra-Kosten: theoretisch 0 Euro, wenn du die Komponenten aus den ersten beiden Projekten hast.

### So geht's

1. OpenWeatherMap Account erstellen: openweathermap.org → kostenloser Plan, API Key notieren
2. WLAN-Verbindung in Code einbauen (kommt mit dem ESP32 Standard-Framework mit):

```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "DEIN_WLAN";
const char* password = "DEIN_PASSWORT";
String apiKey = "DEIN_API_KEY";
String city = "Berlin";

void setup() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  // Jetzt kann ich HTTP-Requests machen
}
```

3. ArduinoJson Library installieren (im Library Manager, Version 7.x)
4. HTTP-Request an OpenWeatherMap: `api.openweathermap.org/data/2.5/weather?q=Berlin&appid=DEINKEY&units=metric`
5. JSON parsen, Temperatur + Beschreibung extrahieren
6. Auf OLED anzeigen: Zeile 1 = Aussen-Wetter, Zeile 2 = eigener Sensor

[SCREENSHOT: OLED Display zeigt "Aussen: 8.2 C / Bewoelkt" und "Innen: 21.5 C / 48%"]

Was hier klick macht: der ESP32 ist kein isoliertes Geraet mehr, sondern Teil des Internets. Ab diesem Punkt kannst du theoretisch jeden API-Endpoint abfragen — Boersenpreise, Sportresultate, Heizungsstatus. Dieselbe Technik.

**Stolperfalle:** Der kostenlose OpenWeatherMap-Plan hat ein Limit von 60 Requests pro Minute — das reicht locker, aber vergiss nicht, Delays einzubauen. Alle 10 Minuten updaten ist voellig ausreichend.

---

## Projekt 4: Bewegungsmelder mit E-Mail-Benachrichtigung

**Schwierigkeitsgrad: 3/5 — etwas mehr Logik, aber der PIR-Sensor macht die Arbeit**
**Kosten: ~3-6 EUR**

Das ist das Projekt, das ich Leuten zeige, wenn sie fragen ob man mit dem ESP32 auch "sicherheitsrelevante" Sachen bauen kann. Du baust einen Bewegungsmelder, der bei Ausloesung eine E-Mail oder Telegram-Nachricht schickt. Ich hab so etwas an meiner Hintertur laufen — nicht als echtes Sicherheitssystem, aber als Benachrichtigung wenn die Paketzusteller klingeln (oder auch nicht klingeln).

### Einkaufsliste

| Bauteil | Typ | Preis |
|---|---|---|
| PIR Bewegungssensor | HC-SR501 | 2-4 EUR |
| Jumper-Kabel | bereits in Grundausstattung | - |
| Telegram Bot | kostenlos | 0 EUR |

Der HC-SR501 ist quasi der Standardsensor fuer Bewegungserkennung im DIY-Bereich. Er hat drei Pins (VCC, GND, OUT) und ist damit noch einfacher zu verdrahten als der DHT22.

### So geht's

1. PIR-Sensor anschliessen: VCC an 5V (beim ESP32 Dev Board meist vorhanden), GND an GND, OUT an GPIO13
2. Telegram Bot erstellen: BotFather in Telegram schreiben, `/newbot`, Namen vergeben, API Token notieren
3. Chat-ID herausfinden: `api.telegram.org/botTOKEN/getUpdates` aufrufen, nach Nachricht an den Bot eine Zahl zurueckbekommen

```cpp
#include <WiFi.h>
#include <HTTPClient.h>

const int pirPin = 13;
String botToken = "DEIN_BOT_TOKEN";
String chatId = "DEINE_CHAT_ID";

void loop() {
  int pirState = digitalRead(pirPin);
  if (pirState == HIGH) {
    sendTelegramMessage("Bewegung erkannt!");
    delay(10000); // 10 Sekunden Pause, damit kein Spam entsteht
  }
}

void sendTelegramMessage(String message) {
  HTTPClient http;
  String url = "https://api.telegram.org/bot" + botToken +
               "/sendMessage?chat_id=" + chatId +
               "&text=" + message;
  http.begin(url);
  http.GET();
  http.end();
}
```

[SCREENSHOT: Telegram-Chat mit Nachricht "Bewegung erkannt! 14:32 Uhr"]

Was ich gern am PIR-Sensor mag: du kannst Empfindlichkeit und Verzoegerungszeit direkt am Sensor per kleinen Potentiometern einstellen. Keine Software noetig fuer die Grundkalibrierung.

**Erweiterung:** Mit einem kleinen Buzzer (1-2 EUR) kannst du zusaetzlich einen lokalen Alarm einbauen. Oder du kombinierst das mit dem OLED Display aus Projekt 2 und zeigst "Bewegung erkannt!" direkt auf dem Geraet an.

**Wichtiger Hinweis:** Der HC-SR501 braucht eigentlich 5V an VCC fuer volle Reichweite, aber der Signalpin gibt trotzdem 3.3V-kompatible Signale aus. Keine Sorge wegen Damage am ESP32.

---

## Projekt 5: Automatische Pflanzenbewaesserung

**Schwierigkeitsgrad: 4/5 — erstes Projekt mit einem Aktor (etwas das physisch etwas tut)**
**Kosten: ~12-18 EUR**

Das war das Projekt, das mich urspruenglich zum ESP32 gebracht hat. Ich hab zwei Tomatenplanzen auf dem Balkon und bin gelegentlich fuer eine Woche weg. Statt einen Nachbarn zu belaestigen, hab ich eine automatische Bewaesserung gebaut. Die liest den Bodenfeuchtigkeitssensor, und wenn der Wert unter einen Schwellenwert faellt, pumpt sie fuer 5 Sekunden Wasser. Das Ding laeuft jetzt seit zwei Jahren.

Das ist das erste Projekt hier, bei dem der ESP32 nicht nur misst, sondern auch handelt. Das macht es technisch etwas anspruchsvoller — aber nur ein bisschen.

### Einkaufsliste

| Bauteil | Typ | Preis |
|---|---|---|
| Kapazitiver Bodenfeuchtigkeitssensor | nicht resistiv (langlebiger!) | 3-5 EUR |
| 5V Mini-Wasserpumpe | z.B. "Arduino Wasserpumpe" | 4-6 EUR |
| 5V Relais-Modul | 1-Kanal | 2-4 EUR |
| Kleiner Schlauch | Silikonschlauch 4-6mm | 1-2 EUR |
| Netzteil 5V 2A | micro-USB | 3-5 EUR (oder altes Handy-Ladegeraet) |

Gesamtkosten: circa 13-22 Euro, je nach Quelle. Auf Amazon gibt es gelegentlich Sets mit Pumpe, Sensor und Relais zusammen fuer unter 15 Euro.

**Wichtig: Nimm kapazitive Sensoren, keine resistiven.** Resistive Sensoren (die mit zwei Metallplatten) korrodieren innerhalb von Wochen. Kapazitive Sensoren messen den Wert anders und halten deutlich laenger.

### Schaltung verstehen

Der Knackpunkt bei diesem Projekt ist das Relais. Der ESP32 arbeitet mit 3.3V Logik und kann damit keine 5V-Pumpe direkt schalten. Das Relais ist quasi ein ferngesteuerter Schalter: der ESP32 gibt ein 3.3V Signal → das Relais schliesst einen Kontakt → die Pumpe bekommt 5V vom Netzteil und laeuft.

Das klingt komplizierter als es ist. Das Relais-Modul hat drei Anschluesse zur Pumpen-Seite (COM, NO, NC) und drei zur Steuerungsseite (VCC, GND, IN). COM und NO verbinden — das ist der "normally open" Kontakt, der sich schliesst wenn das Relais ausloest.

### So geht's

1. Sensor anschliessen: VCC an 3.3V, GND an GND, AOUT an GPIO34 (analoger Pin)
2. Relais anschliessen: VCC an 5V, GND an GND, IN an GPIO26
3. Pumpe zwischen COM und NO des Relais haengen, 5V vom Netzteil an die Pumpe (+ an COM, - direkt)
4. Code:

```cpp
const int moisturePin = 34; // analoger Eingang
const int relayPin = 26;    // Relais-Steuerung
const int dryThreshold = 2800;  // Wert anpassen nach Kalibrierung
const int pumpDuration = 5000;  // 5 Sekunden pumpen

void setup() {
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, HIGH); // Relais aus (meist HIGH = inaktiv)
  Serial.begin(115200);
}

void loop() {
  int moistureValue = analogRead(moisturePin);
  Serial.print("Feuchtigkeit: ");
  Serial.println(moistureValue);

  if (moistureValue > dryThreshold) {
    Serial.println("Zu trocken! Pumpe an.");
    digitalWrite(relayPin, LOW);  // Pumpe an
    delay(pumpDuration);
    digitalWrite(relayPin, HIGH); // Pumpe aus
    delay(60000); // 1 Minute warten bevor naechste Messung
  }

  delay(30000); // alle 30 Sekunden messen
}
```

[SCREENSHOT: Serial Monitor mit Feuchtigkeitswerten, dazwischen "Zu trocken! Pumpe an."]

5. Kalibrieren: Sensor in trockene Erde stecken, Wert im Serial Monitor notieren. In feuchte Erde stecken, Wert notieren. Schwellenwert in der Mitte setzen.

**Stolperfalle:** Der `dryThreshold` Wert haengt komplett von deiner Erde und deinem Sensor ab. Nicht blindlings meinen Wert uebernehmen — immer selbst messen.

**Sicherheitshinweis:** Wasser und Elektronik sind keine Freunde. Alles ausser Sensor und Pumpenende in einem wassergeschuetzten Gehaeuse (Tupperbox funktioniert) verwahren. Den Schlauch mit Kabelbinder sichern.

---

## Was kommt danach?

Wenn du alle fuenf Projekte durchgegangen bist, hast du das Handwerkszeug fuer alles Weitere:

- **WLAN-Verbindung** (Projekte 3-5)
- **Sensoren auslesen** (alle Projekte)
- **Displays ansteuern** (Projekt 2-3)
- **APIs aufrufen** (Projekt 3-4)
- **Aktoren steuern** (Projekt 5)

Der logische naechste Schritt: statt alles selbst zu programmieren, nimmst du **ESPHome**. Das ist ein Framework speziell fuer Home Automation, wo du deine Sensoren per YAML konfigurierst statt selbst Code zu schreiben. Ich hab meinen gesamten Sensor-Wald auf ESPHome umgestellt — das ist deutlich wartungsfreundlicher. Mehr dazu in meinem [ESPHome Tutorial Deutsch](/blog/esphome-tutorial-deutsch-2026).

Und wenn du die Daten in einem echten Smart Home Dashboard haben willst: [WLED auf ESP32](/blog/wled-esp32-anleitung-2026) zeigt dir wie du mit demselben Board auch LEDs smart machst.

---

## Fazit: ESP32 Projekte fuer Anfaenger — wo anfangen?

**Meine Empfehlung:** Projekt 1 (Temperatursensor) als erstes. Du lernst die Grundlagen ohne Frustrationen. Dann Projekt 2 (Display) direkt danach, weil die Kombination aus beiden schon richtig befriedigend ist.

Projekt 5 (Pflanzenbewaesserung) klingt anspruchsvoller, aber wenn man die ersten vier hinter sich hat, ist es eigentlich recht straightforward. Der Sprung von "ich messe Daten" zu "ich steuere etwas" ist konzeptuell groesser als technisch.

Was ich bei meinen ersten **esp32 projekt anfaenger** Versuchen gemerkt hab: der ESP32 selbst ist selten das Problem. Die meisten Issues kommen von falschen Pin-Zuweisungen, falschen Library-Versionen oder vergessenen Delay-Anweisungen. Wenn etwas nicht klappt: Serial Monitor aufmachen und schauen was rauskommt. 90% der Bugs zeigen sich dort.

**Budget-Tipp:** Ein [Starter Kit (~25 EUR)](https://amzn.to/esp32-starter-kit) mit Board, Breadboard, Sensor-Sortiment und Jumperkabeln ist besser als Einzelkauf. Kostet aehnlich viel, du hast aber gleich alles fuer die naechsten 10 Projekte dabei. Alternativ gibt es [Sensor-Kits (~20 EUR)](https://amzn.to/esp32-sensor-kit) die DHT22, PIR, Feuchtigkeitssensor und mehr enthalten.

Der ESP32 hat mein Maker-Hobby komplett veraendert. Es ist das erste Mal, dass die Einstiegshuerde niedrig genug war, dass ich wirklich drangeblieben bin. 8 Euro fuer ein Board, etwas Zeit, und auf einmal loest man echte Probleme. Das ist das Beste an diesem Hobby.

---

*Affiliate-Hinweis: Die Links in diesem Artikel sind Amazon-Affiliate-Links. Der Preis aendert sich fuer dich nicht. Ich bekomme eine kleine Provision, die diesen Blog am Leben haelt.*
