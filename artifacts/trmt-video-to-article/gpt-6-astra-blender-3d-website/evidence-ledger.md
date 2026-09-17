# GPT-6 Astra, Blender und 3D-Websites: Evidence ledger

| ID | Claim or step | Evidence state | Source locator | Editorial decision | Notes |
|---|---|---|---|---|---|
| E-001 | Radar topic: Astra can coordinate Blender modeling, export and an interactive 3D website | SPOKEN + SHOWN | YouTube RhGiG-yZP-c captions 00:02-10:37 and 130 chronological storyboard frames | VERIFY | Topic only, never a public template. |
| E-002 | Companion blog repeats no-expertise, hands-off and personal runtime claims | DOCUMENTED | chaseai.io/blog/gpt-6-astra-blender-3d-websites, 2026-09-16 | DROP | No foreign anecdote, exact runtime or four-step imitation. |
| E-003 | Astra can create websites, operate software and run frontend QA | VERIFIED | https://openai.com/index/gpt-6-astra/, checked 2026-09-16 | USE | Does not prove this specific Blender result. |
| E-004 | Astra access in Codex depends on plan/workspace; Codex CLI 0.153.0+; allowance applies | VERIFIED | https://help.openai.com/en/articles/20001275/, checked 2026-09-16 | USE | Volatile access details, recheck before publication. |
| E-005 | Blender is free/open source and supports scripted command-line operation | VERIFIED | https://www.blender.org/about/license/ and Blender command-line manual | USE | No claim that Blender becomes skill-free. |
| E-006 | Blender Agent Studio drives local Blender workflows, keeps Python source and names Blender 5.2 LTS as tested | VERIFIED | https://github.com/ifBars/blender-agent-studio README, checked via gh 2026-09-16 | USE | Independent open-source implementation, not live-tested here. |
| E-007 | The Blender agent project tells users to review scripts and avoid untrusted auto-run blend files | VERIFIED | repository SECURITY.md, checked via gh 2026-09-16 | USE | Supports local execution warning. |
| E-008 | Blender exports meshes, materials, textures and animation to glTF/GLB | VERIFIED | Blender 5.2 glTF manual, checked 2026-09-16 | USE | Exact export support depends on material and feature choices. |
| E-009 | glTF is an open runtime 3D delivery format; GLB is its bundled binary form | VERIFIED | https://www.khronos.org/gltf/ and Blender manual | USE | Plain-language bridge explanation. |
| E-010 | Three.js recommends glTF/GLB and loads it with GLTFLoader | VERIFIED | https://threejs.org/manual/#en/loading-3d-models and GLTFLoader docs | USE | Website interaction remains separate code. |
| E-011 | requestAnimationFrame schedules animation before repaint and hidden tabs are usually paused | VERIFIED | MDN requestAnimationFrame, checked 2026-09-16 | USE | Offscreen sections still need deliberate resource handling. |
| E-012 | Intersection Observer reports when an element enters/leaves the viewport | VERIFIED | MDN Intersection Observer API, checked 2026-09-16 | USE | Appropriate for pausing an out-of-view 3D section. |
| E-013 | Fictional plant sensor, named parts and interaction states | INFERRED | Original editorial teaching example | USE | Explicitly fictional; no live model or website claim. |

## Contradictions

- Radar sources present a fast, largely hands-off build. Primary documentation establishes only the individual capabilities and file chain, not the claimed runtime, quality or lack of required skill.
- A successful GLB export does not establish browser performance, correct interaction or accessible fallback. Treat these as separate checks.

## Author-needed slots

- A future firsthand tutorial needs a real `.blend`, Python source, GLB, production build and device test. Editorial and publication approval remain separate.

