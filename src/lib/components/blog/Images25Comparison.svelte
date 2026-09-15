<script>
	import { onMount } from 'svelte';
	import { setupBeforeAfterComparison } from '$lib/utils/before-after.js';

	/** @type {HTMLElement | undefined} */
	let widget;
	onMount(() => widget ? setupBeforeAfterComparison(widget) : undefined);

	const original = '/images/blog/chatgpt-images-2-5-altes-foto-original.webp';
	const edited = '/images/blog/chatgpt-images-2-5-maker-outfit.webp';
</script>

<section
	class="proof-section"
	aria-labelledby="images25-test-title"
	data-before-after
	data-before-label="Original"
	data-after-label="Maker-Outfit"
	bind:this={widget}
>
	<div class="proof-heading">
		<h2 id="images25-test-title">Ein Foto. Eine erlaubte Änderung.</h2>
		<p>Zieh den Regler. Links bleibt das Familienfoto von 1990, rechts erscheint der türkisfarbene Maker-Overall.</p>
	</div>

	<div
		class="comparison-stage"
		data-before-after-stage
		style="--split: 50%;"
		role="group"
		aria-label="Bildvergleich zwischen Original und Maker-Outfit"
	>
		<img
			class="comparison-original"
			src={original}
			alt="Originales Kinderfoto aus dem Jahr 1990 mit gestreiftem Oberteil und bedrucktem Latz"
			width="1400"
			height="874"
			draggable="false"
		/>
		<img
			class="comparison-edited"
			data-before-after-edited
			src={edited}
			alt="KI-Variante desselben Kinderfotos mit türkisfarbenem Maker-Overall"
			width="1400"
			height="873"
			draggable="false"
		/>
		<span class="image-label image-label-original">Original 1990</span>
		<span class="image-label image-label-edited">Maker-Outfit</span>
		<span class="comparison-divider" aria-hidden="true"><span>↔</span></span>
	</div>

	<div class="comparison-controls">
		<button type="button" data-before-after-value="100" aria-pressed="false">Nur Original</button>
		<label for="images25-range">
			<span>Vorher und Nachher vergleichen</span>
			<input
				id="images25-range"
				data-before-after-range
				type="range"
				min="0"
				max="100"
				value="50"
				aria-label="Anteil von Original und Maker-Outfit"
				aria-valuetext="50 Prozent Original, 50 Prozent Maker-Outfit"
			/>
		</label>
		<button type="button" data-before-after-value="0" aria-pressed="false">Nur Maker-Outfit</button>
	</div>

	<div class="fixed-comparison" role="group" aria-label="Fester Vorher-Nachher-Vergleich">
		<figure class="compare-card">
			<div class="compare-image-wrap">
				<img src={original} alt="Vorher: das unveränderte Familienfoto mit Ringelshirt" width="1400" height="874" loading="lazy" />
			</div>
			<figcaption><span>Vorher</span><strong>Original 1990</strong></figcaption>
		</figure>
		<figure class="compare-card">
			<div class="compare-image-wrap edited-frame">
				<img src={edited} alt="Nachher: die KI-Variante mit türkisfarbenem Overall" width="1400" height="873" loading="lazy" />
			</div>
			<figcaption><span>Nachher</span><strong>Maker-Outfit</strong></figcaption>
		</figure>
	</div>

	<div class="proof-readback">
		<div><span class="status-dot status-pass" aria-hidden="true"></span><strong>Klar geändert</strong><p>Ringelshirt und Latz wurden durch einen türkisfarbenen Overall ersetzt.</p></div>
		<div><span class="status-dot status-pass" aria-hidden="true"></span><strong>Gut erhalten</strong><p>Sessel, Decken, Pose und analoge Grundstimmung bleiben sofort erkennbar.</p></div>
		<div><span class="status-dot status-warn" aria-hidden="true"></span><strong>Nicht pixelgleich</strong><p>Gesicht und Hände wurden leicht neu interpretiert, der Ausschnitt hat sich verschoben.</p></div>
	</div>
</section>

<style>
	.proof-section { margin: 1rem 0 clamp(4rem, 8vw, 7rem); }
	.proof-heading { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(18rem, 0.6fr); align-items: end; gap: 3rem; margin-bottom: 1.75rem; }
	.proof-heading h2 { margin: 0; font-family: var(--font-sans); font-size: clamp(2.15rem, 3.7vw, 3.35rem); font-weight: 760; font-style: normal; line-height: 1.06; letter-spacing: -0.03em; color: var(--color-text); }
	.proof-heading p { max-width: 37rem; margin: 0 0 0.25rem; color: var(--color-text-muted); font-size: 0.98rem; line-height: 1.6; }
	.comparison-stage { position: relative; isolation: isolate; width: 100%; aspect-ratio: 16 / 7; overflow: hidden; border-radius: var(--radius-xl); background: var(--color-surface); cursor: ew-resize; touch-action: pan-y; }
	.comparison-stage img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; user-select: none; -webkit-user-drag: none; }
	.comparison-original { z-index: 1; }
	.comparison-edited { z-index: 2; clip-path: inset(0 0 0 var(--split, 50%)); }
	.image-label { position: absolute; top: 1.1rem; z-index: 5; padding: 0.5rem 0.7rem; border-radius: 0.5rem; box-shadow: 0 8px 24px rgb(0 0 0 / 28%); font-size: 0.72rem; font-weight: 800; line-height: 1; letter-spacing: 0.06em; text-transform: uppercase; }
	.image-label-original { left: 1.1rem; background: rgb(11 11 11 / 86%); color: var(--color-text); }
	.image-label-edited { right: 1.1rem; background: rgb(58 176 162 / 94%); color: #07110f; }
	.comparison-divider { position: absolute; inset: 0 auto 0 var(--split, 50%); z-index: 4; width: 2px; transform: translateX(-1px); background: rgb(255 255 255 / 94%); box-shadow: 0 0 18px rgb(0 0 0 / 50%); pointer-events: none; }
	.comparison-divider > span { position: absolute; top: 50%; left: 50%; display: grid; place-items: center; width: 3.2rem; height: 3.2rem; transform: translate(-50%, -50%); border: 2px solid white; border-radius: 50%; background: rgb(11 11 11 / 84%); box-shadow: 0 8px 24px rgb(0 0 0 / 42%); color: white; font: 700 1.2rem/1 var(--font-sans); }
	.comparison-controls { display: grid; grid-template-columns: auto minmax(15rem, 1fr) auto; align-items: center; gap: 1rem; margin-top: 1.15rem; }
	.comparison-controls button { min-height: 2.75rem; padding: 0.65rem 0.9rem; border: 1px solid var(--color-border); border-radius: 0.65rem; background: var(--color-surface-raised); color: var(--color-text); font: 700 0.78rem/1.3 var(--font-sans); cursor: pointer; }
	.comparison-controls button:hover { border-color: var(--color-accent-teal); }
	.comparison-controls :global(button[aria-pressed='true']) { border-color: var(--color-accent-honey); color: var(--color-accent-honey); }
	.comparison-controls label { display: grid; gap: 0.2rem; }
	.comparison-controls label span { color: var(--color-text-muted); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.04em; text-align: center; }
	.comparison-controls input[type='range'] { width: 100%; height: 2.4rem; margin: 0; accent-color: var(--color-accent-honey); cursor: ew-resize; }
	.comparison-controls :focus-visible { outline: 3px solid var(--color-accent-teal); outline-offset: 3px; }
	.fixed-comparison { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.25rem; margin-top: 3.5rem; }
	.compare-card { margin: 0; }
	.compare-image-wrap { position: relative; aspect-ratio: 16 / 10; overflow: hidden; border-radius: var(--radius-lg); box-shadow: 0 12px 35px rgb(0 0 0 / 34%); }
	.compare-image-wrap::after { content: ''; position: absolute; inset: 0; border: 1px solid rgb(255 255 255 / 12%); border-radius: inherit; pointer-events: none; }
	.compare-image-wrap.edited-frame::after { border-color: rgb(58 176 162 / 52%); }
	.compare-image-wrap img { width: 100%; height: 100%; object-fit: cover; }
	.compare-card figcaption { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; padding: 0.85rem 0.2rem 0; }
	.compare-card figcaption span { color: var(--color-text-muted); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
	.compare-card figcaption strong { font-size: 0.9rem; color: var(--color-text); }
	.compare-card:last-child figcaption strong { color: var(--color-accent-teal); }
	.proof-readback { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2rem; margin-top: 3.25rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border); }
	.proof-readback > div { display: grid; grid-template-columns: auto 1fr; column-gap: 0.6rem; align-items: center; }
	.status-dot { width: 0.55rem; height: 0.55rem; border-radius: 50%; }
	.status-pass { background: var(--color-accent-teal); }
	.status-warn { background: var(--color-accent-honey); }
	.proof-readback strong { font-size: 0.84rem; color: var(--color-text); }
	.proof-readback p { grid-column: 2; margin: 0.3rem 0 0; color: var(--color-text-muted); font-size: 0.8rem; line-height: 1.55; }
	@media (max-width: 900px) { .proof-heading { grid-template-columns: 1fr; gap: 1rem; } .proof-readback { gap: 1.25rem; } }
	@media (max-width: 720px) {
		.proof-section { margin-bottom: 5rem; }
		.proof-heading { padding-inline: 0.5rem; }
		.proof-heading h2 { font-size: clamp(2rem, 9vw, 2.6rem); }
		.comparison-stage { border-radius: var(--radius-lg); }
		.image-label { top: 0.65rem; padding: 0.42rem 0.52rem; font-size: 0.6rem; }
		.image-label-original { left: 0.65rem; }
		.image-label-edited { right: 0.65rem; }
		.comparison-divider > span { width: 2.6rem; height: 2.6rem; }
		.comparison-controls { grid-template-columns: 1fr 1fr; gap: 0.65rem; }
		.comparison-controls label { grid-column: 1 / -1; grid-row: 1; }
		.comparison-controls button { min-height: 2.9rem; }
		.fixed-comparison { grid-template-columns: 1fr; margin-top: 2.5rem; }
		.proof-readback { grid-template-columns: 1fr; padding-inline: 0.5rem; }
	}
	@media (prefers-reduced-motion: reduce) { .proof-section *, .proof-section *::before, .proof-section *::after { transition: none !important; scroll-behavior: auto !important; } }
</style>
