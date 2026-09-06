# Homepage Editorial Bridge

## Ziel

Der Abschnitt `Worum geht es hier?` soll nicht mehr wie ein freischwebender Textblock zwischen Beiträgen und Medien wirken. Er wird zu einem klaren, aber leichten Übergang vom redaktionellen Feed zu Video, Podcast und Newsletter.

## Freigegebene Richtung

- Kein weiterer schwerer Kartencontainer.
- Eine ruhige Editorial Bridge mit feinem Petrol-zu-Honig-Hintergrund, dünnen Trennlinien und bewusstem Innenraum.
- Der kurze Aufmacher lautet `Hier wird Neugier praktisch.`; die vorhandene Überschrift `Worum geht es hier?` bleibt bestehen.
- Desktop: Aufmacher und Überschrift links, Erklärung rechts; eine feine vertikale Linie trennt beide Bereiche.
- Mobil: natürliche Stapelung ohne vertikale Linie und mit kompaktem Innenabstand.
- Der vorhandene Inhalt und die fünf Themenlinks bleiben erhalten. Der letzte Gedanke wird als eigene kurze Abschlusszeile abgesetzt: `Wähle ein Thema oder spring direkt ins vollständige Blogarchiv. Alle Beiträge bleiben frei zugänglich – ohne Anmeldung.`
- Der Abstand zum folgenden Videomodul sinkt von rund 72 auf ungefähr 28 bis 32 Pixel.

## Responsive und Barrierefreiheit

- Semantische Überschriftenreihenfolge bleibt unverändert.
- Der Text bleibt bei 200 Prozent Zoom und auf kleinen Mobilbreiten ohne globalen horizontalen Overflow lesbar.
- Farben verwenden die vorhandenen TRMT-Tokens; Akzente müssen in Dark und Light Theme lesbar bleiben.
- Dekoration erhält keine eigene semantische Bedeutung.

## Verifikation

- Regressionstests sichern Struktur, Wortlaut und Spacing-Vertrag.
- Produktions-Build und bestehende Gesamttests müssen bestehen.
- Ein gemeinsamer visueller Prüfpass umfasst Desktop und Mobil; eine zweite Runde erfolgt nur, falls der erste Pass konkrete Defekte zeigt.
- Vor Medieninteraktion dürfen weiterhin keine YouTube- oder Spotify-Iframes geladen sein.
