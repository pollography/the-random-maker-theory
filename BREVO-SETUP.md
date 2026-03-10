# Brevo Newsletter Setup-Anleitung

## Was du brauchst

1. Brevo Account (https://app.brevo.com)
2. API Key in Vercel als Environment Variable
3. Double-Opt-In Template in Brevo
4. Kontaktliste in Brevo

---

## Step 1: API Key holen

1. Geh zu https://app.brevo.com → SMTP & API → API Keys
2. Erstelle einen neuen API Key (oder nutze den bestehenden)
3. Kopiere den Key

## Step 2: Environment Variables in Vercel setzen

1. Geh zu https://vercel.com → dein TRMT Projekt → Settings → Environment Variables
2. Füge hinzu:
   - `BREVO_API_KEY` = dein Brevo API Key
   - `BREVO_LIST_ID` = die ID deiner Kontaktliste (Standard: `2`)
3. Redeploy nach dem Setzen (wichtig!)

## Step 3: Kontaktliste erstellen

1. In Brevo: Contacts → Lists → Create a List
2. Name z.B. "TRMT Newsletter"
3. Die List-ID findest du in der URL wenn du die Liste öffnest (z.B. `/contacts/lists/2`)
4. Diese ID kommt als `BREVO_LIST_ID` in Vercel

## Step 4: Double-Opt-In Template erstellen

Dein Code nutzt `templateId: 1` (Brevo Default). Das musst du anpassen:

1. In Brevo: Transactional → Email Templates → Create Template
2. Betreff: "Bestätige deine Anmeldung bei TRMT"
3. Inhalt z.B.:

```
Hey!

Du hast dich für den TRMT Newsletter angemeldet.
Klick den Button um das zu bestätigen:

[BUTTON: Anmeldung bestätigen] → {{ params.DOI_URL }}

Falls du dich nicht angemeldet hast, ignorier einfach diese Mail.

Cheers,
Pollo / TRMT
```

4. **WICHTIG:** Der Bestätigungs-Link muss `{{ params.DOI_URL }}` sein. Brevo ersetzt das automatisch.
5. Aktiviere das Template
6. Merke dir die Template-ID (steht in der URL: `/templates/[ID]`)
7. Trage die ID im Code ein (Datei: `src/routes/api/newsletter/+server.ts`, Zeile 32: `templateId`)

## Step 5: Redirect URL einstellen

Die `redirectionUrl` in deinem Code zeigt auf: `https://therandommakertheory.com/newsletter-bestaetigt`

Diese Seite existiert bereits und zeigt "Du bist drin." Passt.

**WICHTIG in Brevo:** Du musst die Domain `therandommakertheory.com` als erlaubte Redirect-Domain hinzufügen:

1. Geh zu Brevo → Settings → Security → Authorized URLs
2. Füge `therandommakertheory.com` hinzu

## Step 6: Benachrichtigung bei neuen Anmeldungen

Damit du weißt, wenn sich jemand anmeldet:

### Option A: Brevo Automation (empfohlen)
1. In Brevo: Automations → Create Automation
2. Trigger: "A contact is added to a list" → wähle deine Newsletter-Liste
3. Action: "Send an email" → an dich (hello@therandommakertheory.com)
4. Template: Einfache Notification "Neuer Newsletter-Subscriber: {{ contact.EMAIL }}"

### Option B: Brevo Webhook
1. In Brevo: Settings → Webhooks
2. URL: Eine eigene API-Route (z.B. Slack Webhook, Discord Webhook, etc.)
3. Event: "Contact Added"

### Option C: Einfach regelmäßig Dashboard checken
1. Brevo Dashboard zeigt dir neue Contacts
2. Unter Contacts → deine Liste siehst du alle Subscribers

## Testen

1. Deploy die Seite nach Vercel
2. Trag eine Test-Email ein
3. Check ob die Double-Opt-In Mail ankommt
4. Klick den Bestätigungslink
5. Check ob du auf `/newsletter-bestaetigt` landest
6. Check in Brevo ob der Contact in der Liste ist

## Template-ID anpassen

Wenn deine Template-ID nicht `1` ist, ändere sie in:
`src/routes/api/newsletter/+server.ts` → Zeile 32 → `templateId: DEINE_ID`

---

## Troubleshooting

**"Newsletter ist gerade nicht verfügbar"** → `BREVO_API_KEY` fehlt in Vercel
**"Hat nicht geklappt"** → Check Vercel Function Logs für Details
**Keine Bestätigungsmail** → Template-ID falsch oder Template nicht aktiviert
**Redirect funktioniert nicht** → Domain nicht in Brevo Authorized URLs
