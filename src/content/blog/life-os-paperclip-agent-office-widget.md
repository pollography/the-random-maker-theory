---
title: "Mein Life OS Dashboard zeigt AI Agents als Widget — So hab ichs gebaut"
slug: "life-os-paperclip-agent-office-widget"
date: "2026-04-10"
description: "Life OS Dashboard mit AI Agent Widget: Ich zeig dir, wie ich Paperclip in mein persoenliches Dashboard eingebaut hab. React, Vite, echte API-Calls. Zum Nachbauen."
tags: ["life-os", "dashboard", "paperclip", "ai-agents", "react", "automatisierung", "adhs", "tutorial"]
category: "automatisierung"
draft: false
readingTime: 10
heroImage: "/images/blog/life-os-paperclip-agent-office-widget-1.webp"
heroImageThumb: "/images/blog/life-os-paperclip-agent-office-widget-1-thumb.webp"
titleAccent: "Life OS Dashboard"
podcastSlug: ""
podcastUrl: ""
videoUrl: ""
---

## TL;DR

- Ich hab ein React Widget gebaut, das meine AI Agents live in meinem Life OS Dashboard anzeigt — Status, Tasks, Kosten, alles auf einen Blick
- Paperclip liefert die API, React + Vite + Tailwind das Frontend — das ganze Setup steht in unter einer Stunde
- Fuer mein ADHS-Gehirn ist das Widget wie ein Buero-Fenster: Ich sehe mein Team arbeiten und bleibe fokussiert
- Komplette Code-Snippets zum Nachbauen in diesem Artikel
- Das Widget pollt alle 30 Sekunden die Paperclip API — kein WebSocket noetig, trotzdem quasi-live

---

Ich hab ein Problem. Eigentlich mehrere, aber eins davon ist relevant fuer diesen Artikel: Ich hab mittlerweile ueber ein Dutzend AI Agents die fuer mich arbeiten. Content schreiben, Code reviewen, Social Media posten, Deployments machen. Die laufen alle ueber Paperclip — ein Open-Source Tool das AI Agents orchestriert wie ein virtuelles Buero.

Und genau da liegt das Problem. Die Agents arbeiten. Aber ich hab keine Ahnung was sie gerade tun. Oder ob sie ueberhaupt was tun. Oder ob einer von denen seit drei Stunden blockiert ist und auf mich wartet.

Also hab ich mir ein Widget gebaut. Fuer mein Life OS Dashboard. Ein Fenster in mein AI-Buero. Und ich zeig dir jetzt genau, wie.

## Warum ich ein persoenliches Life OS Dashboard brauche (und Notion nicht reicht)

Kurze Vorgeschichte: Ich hab ADHS. Das bedeutet unter anderem, dass mein Gehirn absolut miserabel darin ist, Dinge im Hinterkopf zu behalten. "Out of sight, out of mind" — das ist bei mir nicht metaphorisch, das ist woertlich.

Deswegen hab ich mir ueber die letzten Monate ein persoenliches Dashboard gebaut. Mein Life OS. Nicht in Notion — das hab ich versucht, es war zu langsam und zu verschachtelt fuer mein Gehirn. Wenn dich meine ADHS-Produktivitaets-Reise interessiert: Ich hab ausfuehrlich darueber geschrieben in meinem [Obsidian ADHS Artikel](/blog/obsidian-fuer-adhs-system-2026).

Mein Life OS Dashboard ist eine custom React App. Simpel, schnell, alles auf einer Seite. Habits, Tasks, Kalender, Quick Notes. Und jetzt eben auch: meine AI Agents.

Der Grund ist einfach: Wenn ich meine Agents nicht sehe, vergesse ich dass sie existieren. Und dann checke ich deren Arbeit nicht. Und dann laufen Tasks ins Leere oder Agents stecken tagelang im "blocked" Status fest.

## Was ist Paperclip? (Die 30-Sekunden Version)

Falls du Paperclip noch nicht kennst: Es ist ein Open-Source Tool (MIT Lizenz) das mehrere AI Agents koordiniert. Stell dir ein virtuelles Buero vor. Du hast Agents die auf verschiedenen AI-Modellen laufen — Claude, Codex, Gemini, whatever — und Paperclip gibt ihnen Aufgaben, trackt deren Fortschritt und sorgt dafuer dass nichts vergessen wird.

Die wichtigsten Konzepte:

- **Heartbeats**: Agents "wachen auf" in regelmaessigen Intervallen, checken ihre Aufgaben, arbeiten, und gehen wieder schlafen
- **Task Queue**: Aufgaben werden als Issues verwaltet mit Status (todo, in_progress, blocked, done)
- **Governance**: Alles wird geloggt, jede Aktion ist nachvollziehbar
- **Budget Control**: Du setzt monatliche Budgets pro Agent — bei 80% gibts eine Warnung, bei 100% wird pausiert

Paperclip hat eine REST API. Und genau die zapfe ich fuer mein Widget an.

## Die Idee: Ein Buero-Fenster fuer meine AI Agents

Was ich wollte war simpel: Ein Widget in meinem Life OS Dashboard das mir auf einen Blick zeigt:

1. **Welche Agents sind aktiv** (und welche schlafen)
2. **Was arbeiten sie gerade** (aktuelle Tasks)
3. **Was kostets** (Budget-Verbrauch pro Agent)
4. **Gibts Probleme** (blockierte Tasks die auf mich warten)

Quasi ein Buero-Fenster. Ich guck rein, sehe wer arbeitet, und kann bei Bedarf eingreifen.

[SCREENSHOT: Fertiges Agent Office Widget im Life OS Dashboard]

## Der Tech Stack

Nichts Wildes:

- **React 19** + **Vite** — schnell, kein Overhead
- **TailwindCSS** — Styling ohne CSS-Dateien-Chaos
- **Paperclip REST API** — die Datenquelle
- **Polling (30s Intervall)** — ich hab mich gegen WebSockets entschieden, dazu gleich mehr

Warum kein WebSocket? Weil Paperclip auf Heartbeats basiert. Die Agents wachen alle paar Minuten auf, nicht alle paar Sekunden. Ein 30-Sekunden-Poll reicht voellig. Weniger Komplexitaet, weniger Bugs, gleiche User Experience. Keep it simple.

## Build Log: Schritt fuer Schritt

Jetzt wirds technisch. Ich zeig dir die wichtigsten Teile — nicht jede Zeile, aber genug um es nachzubauen.

### 1. Paperclip API anzapfen

Erstmal brauchen wir einen API Client. Paperclip authentifiziert ueber Bearer Tokens. Fuer ein lokales Dashboard reicht ein API Key den du ueber die Paperclip CLI generierst.

```typescript
// src/lib/paperclip.ts
const API_URL = import.meta.env.VITE_PAPERCLIP_API_URL || 'http://127.0.0.1:3100';
const API_KEY = import.meta.env.VITE_PAPERCLIP_API_KEY;

async function paperclipFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}/api${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error(`Paperclip API ${res.status}: ${endpoint}`);
  return res.json();
}

export async function getAgents(companyId: string) {
  return paperclipFetch<Agent[]>(`/companies/${companyId}/agents`);
}

export async function getAgentTasks(companyId: string, agentId: string) {
  return paperclipFetch<Issue[]>(
    `/companies/${companyId}/issues?assigneeAgentId=${agentId}&status=todo,in_progress,blocked`
  );
}

export async function getDashboard(companyId: string) {
  return paperclipFetch<Dashboard>(`/companies/${companyId}/dashboard`);
}
```

Drei Endpoints. Mehr brauchst du erstmal nicht. `getAgents` holt alle Agents mit Status, `getAgentTasks` die offenen Aufgaben pro Agent, und `getDashboard` die Uebersicht.

### 2. Der Custom Hook: useAgentOffice

Statt die Fetch-Logik in jede Component zu stopfen, hab ich einen Hook gebaut der alles zusammenfuehrt und automatisch pollt:

```typescript
// src/hooks/useAgentOffice.ts
import { useState, useEffect, useCallback } from 'react';
import { getAgents, getAgentTasks, getDashboard } from '../lib/paperclip';

const POLL_INTERVAL = 30_000; // 30 Sekunden

interface AgentWithTasks {
  agent: Agent;
  tasks: Issue[];
  isActive: boolean;
}

export function useAgentOffice(companyId: string) {
  const [agents, setAgents] = useState<AgentWithTasks[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const refresh = useCallback(async () => {
    try {
      const allAgents = await getAgents(companyId);
      const withTasks = await Promise.all(
        allAgents.map(async (agent) => {
          const tasks = await getAgentTasks(companyId, agent.id);
          const isActive = agent.status === 'running'
            || tasks.some(t => t.status === 'in_progress');
          return { agent, tasks, isActive };
        })
      );
      setAgents(withTasks);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Agent Office refresh failed:', err);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [refresh]);

  return { agents, loading, lastUpdate, refresh };
}
```

Der Hook pollt alle 30 Sekunden, merged Agent-Daten mit ihren Tasks, und gibt dir ein sauberes Array zurueck. `isActive` ist true wenn der Agent gerade laeuft oder mindestens einen Task in Bearbeitung hat.

### 3. Agent Card Component

Jetzt das eigentliche Widget. Jeder Agent bekommt eine Card:

```tsx
// src/components/AgentCard.tsx
function AgentCard({ agent, tasks, isActive }: AgentWithTasks) {
  const blockedTasks = tasks.filter(t => t.status === 'blocked');
  const activeTasks = tasks.filter(t => t.status === 'in_progress');
  const budgetPercent = agent.budgetMonthlyCents > 0
    ? Math.round((agent.spentMonthlyCents / agent.budgetMonthlyCents) * 100)
    : 0;

  return (
    <div className={`
      rounded-lg border p-3 transition-all duration-300
      ${isActive
        ? 'border-green-500/50 bg-green-950/20 shadow-lg shadow-green-500/10'
        : 'border-zinc-700 bg-zinc-900/50'}
      ${blockedTasks.length > 0 ? 'border-amber-500/50' : ''}
    `}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            isActive ? 'bg-green-400 animate-pulse' : 'bg-zinc-600'
          }`} />
          <span className="font-medium text-sm text-zinc-200">
            {agent.name}
          </span>
        </div>
        <span className="text-xs text-zinc-500">{agent.title}</span>
      </div>

      {activeTasks.length > 0 && (
        <div className="text-xs text-green-400 mb-1 truncate">
          {activeTasks[0].title}
        </div>
      )}

      {blockedTasks.length > 0 && (
        <div className="text-xs text-amber-400 mb-1">
          {blockedTasks.length} blockiert
        </div>
      )}

      {budgetPercent > 0 && (
        <div className="mt-2">
          <div className="h-1 bg-zinc-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                budgetPercent > 80 ? 'bg-red-500' : 'bg-blue-500'
              }`}
              style={{ width: `${Math.min(budgetPercent, 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-500">{budgetPercent}% Budget</span>
        </div>
      )}
    </div>
  );
}
```

Die Card zeigt dir auf einen Blick: Agent-Name, ob er aktiv ist (gruener pulsierender Punkt), was er gerade tut, ob was blockiert ist (gelbe Warnung), und wie viel Budget verbraucht ist (Progress Bar die ab 80% rot wird).

### 4. Das Agent Office Widget

Alles zusammen in einem Widget-Container:

```tsx
// src/components/AgentOffice.tsx
import { useAgentOffice } from '../hooks/useAgentOffice';
import { AgentCard } from './AgentCard';

export function AgentOffice({ companyId }: { companyId: string }) {
  const { agents, loading, lastUpdate, refresh } = useAgentOffice(companyId);

  const activeCount = agents.filter(a => a.isActive).length;
  const blockedCount = agents.reduce(
    (sum, a) => sum + a.tasks.filter(t => t.status === 'blocked').length, 0
  );

  if (loading) return <WidgetSkeleton />;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-zinc-300">Agent Office</h3>
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span>{activeCount} aktiv</span>
          {blockedCount > 0 && (
            <span className="text-amber-400">{blockedCount} blockiert</span>
          )}
          <button onClick={refresh} className="hover:text-zinc-300">
            Aktualisieren
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {agents
          .sort((a, b) => Number(b.isActive) - Number(a.isActive))
          .map(({ agent, tasks, isActive }) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              tasks={tasks}
              isActive={isActive}
            />
          ))}
      </div>

      {lastUpdate && (
        <div className="mt-3 text-[10px] text-zinc-600 text-right">
          Letztes Update: {lastUpdate.toLocaleTimeString('de-DE')}
        </div>
      )}
    </div>
  );
}
```

Aktive Agents werden nach oben sortiert. Blockierte Tasks bekommen eine gelbe Zahl im Header. Und unten steht wann das letzte Update war, damit ich weiss ob die Daten frisch sind.

[SCREENSHOT: Agent Office Widget mit mehreren aktiven und inaktiven Agents]

## ADHS-Twist: Warum visuelles Feedback alles aendert

Jetzt der Teil den ich persoenlich am wichtigsten finde. Und der vermutlich der Grund ist, warum dieses Widget fuer mich so gut funktioniert.

ADHS und Exekutivfunktion — das ist ein eigenes Thema (hab ich [hier](/blog/obsidian-fuer-adhs-system-2026) ausfuehrlich beschrieben). Aber die Kurzversion: Mein Gehirn braucht externen Feedback. Dinge die ich nicht sehe, existieren fuer mich nicht. Das ist kein Motivationsproblem, das ist Neurologie.

Dieses Widget loest drei konkrete ADHS-Probleme:

**1. Object Permanence fuer Agents.** Bevor ich das Widget hatte, hab ich regelmässig vergessen dass Agents auf mein Feedback warten. Ein blockierter Task blieb tagelang liegen — nicht weil ich faul war, sondern weil ich schlicht nicht daran gedacht hab. Jetzt sehe ich die gelbe "blockiert" Warnung jedes Mal wenn ich mein Dashboard oeffne.

**2. Dopamin durch sichtbaren Fortschritt.** Wenn ein Agent von "todo" auf "in_progress" wechselt und der gruene Punkt anfaengt zu pulsieren — das ist ein kleiner Dopamin-Hit. Klingt laecherlich, funktioniert aber. Mein Gehirn assoziiert das Dashboard mit "da passiert was Gutes" und ich oeffne es oefter.

**3. Weniger Kontext-Switches.** Frueher musste ich die Paperclip UI oeffnen, mich einloggen, durch Issues klicken. Das sind genug Schritte um mein ADHS-Gehirn auf dem Weg dorthin abzulenken. Jetzt: Dashboard oeffnen, Widget sehen, fertig. Null kognitive Last.

## Was ich noch bauen will

Das Widget ist V1. Funktioniert, tut was es soll. Aber meine Ideen-Liste ist laenger als mein Budget:

- **Push-Notifications** wenn ein Agent blockiert ist — Browser Notifications, vielleicht ueber [n8n](/blog/n8n-tutorial-deutsch-2026) als Middleware
- **Mobile View** — das Widget responsive machen ist easy, aber ich will eigentlich eine PWA die ich als Home Screen App nutzen kann
- **Agent Timeline** — eine Zeitleiste die zeigt wann welcher Agent aktiv war, wie ein Gantt-Chart fuer AI Arbeit
- **One-Click Unblock** — direkt aus dem Widget heraus blockierte Tasks kommentieren oder reassignen
- **Kosten-Trend** — nicht nur aktuelles Budget, sondern ein Graph der zeigt wie sich die Ausgaben ueber den Monat entwickeln

Das schoene an einem eigenen Life OS Dashboard: Ich kann einfach weiter bauen. Kein Plugin-Store, keine Feature-Requests. Mein Dashboard, meine Regeln.

## Zum Nachbauen: Die Kurzversion

Falls du das nachbauen willst, hier die Schritte:

1. **Paperclip aufsetzen** — `npx paperclip` und der Quickstart Guide bringen dich in 10 Minuten zum Laufen
2. **API Key generieren** — ueber die Paperclip CLI oder die Web UI
3. **React Projekt mit Vite** — `npm create vite@latest my-dashboard -- --template react-ts`
4. **Die drei Dateien von oben** kopieren: `paperclip.ts`, `useAgentOffice.ts`, `AgentOffice.tsx`
5. **Environment Variables** setzen: `VITE_PAPERCLIP_API_URL` und `VITE_PAPERCLIP_API_KEY`
6. **Widget in dein Layout einbauen** und fertig

Die wichtigsten Paperclip API Endpoints die du brauchst:
- `GET /api/companies/{id}/agents` — alle Agents abrufen
- `GET /api/companies/{id}/issues?assigneeAgentId={id}&status=...` — Tasks pro Agent
- `GET /api/companies/{id}/dashboard` — Gesamtuebersicht

Mehr brauchst du nicht fuer V1. Ernsthaft.

## Fazit: Dein eigenes Agent Office

Ich hab lange gedacht, AI Agents sind cool aber abstrakt. Sie laufen irgendwo im Hintergrund und man hofft dass alles klappt. Das Life OS Dashboard mit dem Agent Office Widget hat das fuer mich komplett veraendert.

Jetzt sehe ich mein Team. Ich sehe wer arbeitet, wer Hilfe braucht, und was es kostet. Und weil das in meinem persoenlichen Life OS Dashboard lebt — dem einen Ort den ich sowieso jeden Tag oeffne — vergesse ich es nicht.

Fuer Leute mit ADHS: Dieses Widget ist Gold wert. Fuer alle anderen: Es macht AI Agent Management einfach... sichtbar. Und sichtbar ist der erste Schritt zu kontrolliert.

Den kompletten Code findest du auf meinem GitHub. Und wenn du Fragen hast oder dein eigenes Agent Office Widget gebaut hast — schreib mir. Ich bin neugierig was ihr damit macht.

---

*Dieser Artikel ist Teil meiner Automation-Serie. Wenn dich interessiert wie ich n8n fuer Automatisierungen nutze, schau dir meinen [n8n Einsteiger-Guide](/blog/n8n-tutorial-deutsch-2026) an.*
