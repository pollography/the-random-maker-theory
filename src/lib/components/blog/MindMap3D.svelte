<script lang="ts">
	import { onMount } from 'svelte';

	interface MindMapNode {
		name: string;
		children?: MindMapNode[];
	}

	interface Props {
		data?: MindMapNode;
		title?: string;
	}

	type SeoNode = {
		name: string;
		depth: number;
	};

	type FlatNode = {
		idx: number;
		name: string;
		depth: number;
		parentIdx: number;
		x: number;
		y: number;
		z: number;
		px: number;
		py: number;
		ps: number;
	};

	type Pulse = {
		t: number;
		speed: number;
		reverse: boolean;
	};

	type Link = {
		from: number;
		to: number;
		depth: number;
		pulses: Pulse[];
	};

	type Particle = {
		x: number;
		y: number;
		vx: number;
		vy: number;
		r: number;
		baseAlpha: number;
	};

	let { data, title = 'Konzept-Map' }: Props = $props();

	let canvas: HTMLCanvasElement;

	// Flatten data tree for SEO fallback
	function flattenForSEO(node: MindMapNode, depth = 0): SeoNode[] {
		const items: SeoNode[] = [{ name: node.name, depth }];
		if (node.children) {
			for (const child of node.children) {
				items.push(...flattenForSEO(child, depth + 1));
			}
		}
		return items;
	}

	let seoNodes = $derived(data ? flattenForSEO(data) : []);
	let hoveredName = $state('');
	// Respect prefers-reduced-motion for accessibility
	const prefersReducedMotion = typeof window !== 'undefined'
		? window.matchMedia('(prefers-reduced-motion: reduce)').matches
		: false;
	let isAutoRotating = $state(!prefersReducedMotion);

	onMount(() => {
		if (!canvas || !data) return;
		const canvasEl = canvas;
		const rootData = data;
		const ctx = canvasEl.getContext('2d');
		if (!ctx) return;

		let animFrame = 0;
		let rotX = -0.25;
		let rotY = 0;
		let zoom = 1;
		let dragging = false;
		let lastMouse = { x: 0, y: 0 };
		let hoveredIdx = -1;
		let prevHoveredIdx = -1;

		// ── Build flat node + link lists ─────────────────────────────────────────
		const nodes: FlatNode[] = [];
		const links: Link[] = [];
		const cascadeTimeouts = new Set<number>();

		function flatten(node: MindMapNode, parentIdx: number, depth: number, theta: number, thetaSpread: number) {
			const idx = nodes.length;
			const radii = [0, 160, 280, 370];
			const r = radii[Math.min(depth, 3)];
			let x = 0, y = 0, z = 0;

			if (depth > 0) {
				const phi = Math.PI / 2 + (Math.random() - 0.5) * (depth === 1 ? 0.5 : 1.0);
				x = r * Math.sin(phi) * Math.cos(theta);
				y = r * Math.cos(phi) * (depth === 1 ? 1 : 0.8);
				z = r * Math.sin(phi) * Math.sin(theta);
			}

			nodes.push({ idx, name: node.name, depth, parentIdx, x, y, z, px: 0, py: 0, ps: 1 });
			if (parentIdx >= 0) links.push({ from: parentIdx, to: idx, depth: depth - 1, pulses: [] });

			if (node.children?.length) {
				const n = node.children.length;
				for (let i = 0; i < n; i++) {
					const childTheta = theta + (i - (n - 1) / 2) * (thetaSpread / Math.max(n, 1));
					flatten(node.children[i], idx, depth + 1, childTheta, thetaSpread / n * 1.4);
				}
			}
		}

		flatten(rootData, -1, 0, 0, Math.PI * 2);

		// Evenly distribute depth-1 nodes around Y axis
		const d1 = nodes.filter((n) => n.depth === 1);
		d1.forEach((n, i) => {
			const theta = (i / d1.length) * Math.PI * 2;
			n.x = 160 * Math.cos(theta);
			n.y = (Math.random() - 0.5) * 50;
			n.z = 160 * Math.sin(theta);
		});

		// ── Particles (screen-space, 2D) ─────────────────────────────────────────
		const PARTICLE_COUNT = 110;
		const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
			x: (Math.random() - 0.5) * 800,
			y: (Math.random() - 0.5) * 500,
			vx: (Math.random() - 0.5) * 0.3,
			vy: (Math.random() - 0.5) * 0.3,
			r: Math.random() * 1.4 + 0.4,
			baseAlpha: Math.random() * 0.25 + 0.05,
		}));

		// ── Projection ───────────────────────────────────────────────────────────
		function project(x: number, y: number, z: number) {
			const cy = Math.cos(rotY), sy = Math.sin(rotY);
			const cx2 = Math.cos(rotX), sx = Math.sin(rotX);
			const x1 = x * cy + z * sy;
			const z1 = -x * sy + z * cy;
			const y1 = y * cx2 - z1 * sx;
			const z2 = y * sx + z1 * cx2;
			const fov = 520;
			const s = fov / (fov + z2 + 280);
			return { sx: x1 * s * zoom, sy: y1 * s * zoom, z: z2, s };
		}

		// ── Pulse helpers ────────────────────────────────────────────────────────
		function spawnPulse(fromIdx: number, toIdx: number, reverse = false) {
			const link = links.find(l =>
				reverse ? (l.from === toIdx && l.to === fromIdx) || (l.from === fromIdx && l.to === toIdx)
					: l.from === fromIdx && l.to === toIdx
			);
			if (!link) return;
			if (link.pulses.length >= 2) return; // max 2 per link
			link.pulses.push({
				t: 0,
				speed: 0.004 + Math.random() * 0.002, // slow: ~200-250 frames
				reverse,
			});
		}

		function triggerPulseCascade(fromIdx: number, depth = 0) {
			if (depth > 2) return;
			links.filter(l => l.from === fromIdx).forEach(l => {
				spawnPulse(fromIdx, l.to);
				const timeoutId = window.setTimeout(() => {
					cascadeTimeouts.delete(timeoutId);
					triggerPulseCascade(l.to, depth + 1);
				}, 300 + depth * 200);
				cascadeTimeouts.add(timeoutId);
			});
			// Also animate upward to parent
			const node = nodes[fromIdx];
			if (node && node.parentIdx >= 0) {
				spawnPulse(fromIdx, node.parentIdx);
			}
		}

		// ── Color helpers ────────────────────────────────────────────────────────
		const NODE_COLORS = ['#d4893e', '#3ab0a2', 'rgba(255,255,255,0.9)', 'rgba(255,255,255,0.55)'];
		const LINK_COLORS = ['rgba(212,137,62,', 'rgba(58,176,162,', 'rgba(255,255,255,'];
		const PULSE_COLORS = ['rgba(255,200,120,', 'rgba(100,230,210,', 'rgba(255,255,255,'];

		// ── Draw ─────────────────────────────────────────────────────────────────
		function draw() {
			if (!ctx) return;
			const W = canvasEl.width;
			const H = canvasEl.height;
			const cx = W / 2;
			const cy2 = H / 2;

			// Auto rotate
			if (isAutoRotating && !dragging) rotY += 0.004;

			// Clear
			ctx.fillStyle = '#0d0d0d';
			ctx.fillRect(0, 0, W, H);

			// ── Particles ──
			const hovNode = hoveredIdx >= 0 ? nodes[hoveredIdx] : null;
			const targetX = hovNode ? hovNode.px - cx : 0;
			const targetY = hovNode ? hovNode.py - cy2 : 0;

			for (const p of particles) {
				if (hovNode !== null) {
					// Attract toward hovered node (gentle)
					const dx = targetX - p.x;
					const dy = targetY - p.y;
					const dist = Math.sqrt(dx * dx + dy * dy) || 1;
					const force = Math.min(1.2, 60 / dist);
					p.vx += (dx / dist) * force * 0.018;
					p.vy += (dy / dist) * force * 0.018;
					p.vx *= 0.92;
					p.vy *= 0.92;
				} else {
					// Gentle drift
					p.vx += (Math.random() - 0.5) * 0.015;
					p.vy += (Math.random() - 0.5) * 0.015;
					p.vx *= 0.98;
					p.vy *= 0.98;
				}
				p.x += p.vx;
				p.y += p.vy;

				// Soft boundary bounce
				const bx = W * 0.52, by = H * 0.52;
				if (Math.abs(p.x) > bx) p.vx *= -0.6;
				if (Math.abs(p.y) > by) p.vy *= -0.6;
				p.x = Math.max(-bx, Math.min(bx, p.x));
				p.y = Math.max(-by, Math.min(by, p.y));

				// Alpha: brighter near hovered node
				let alpha = p.baseAlpha;
				if (hovNode !== null) {
					const d = Math.sqrt((p.x - targetX) ** 2 + (p.y - targetY) ** 2);
					if (d < 80) alpha = Math.min(0.7, alpha + (1 - d / 80) * 0.55);
				}

				ctx.beginPath();
				ctx.arc(cx + p.x, cy2 + p.y, p.r, 0, Math.PI * 2);
				ctx.fillStyle = hovNode
					? `rgba(58,176,162,${alpha})`
					: `rgba(255,255,255,${alpha})`;
				ctx.fill();
			}

			// Project all nodes
			const proj = nodes.map((n) => {
				const p = project(n.x, n.y, n.z);
				return { ...n, ...p };
			});

			// ── Links (sorted back to front) ──
			const sortedLinks = [...links].sort(
				(a, b) => (proj[a.from].z + proj[a.to].z) / 2 - (proj[b.from].z + proj[b.to].z) / 2
			);

			for (const link of sortedLinks) {
				const f = proj[link.from];
				const t = proj[link.to];
				const alpha = Math.min(0.7, ((f.s + t.s) / 2) * 0.9);
				const isHovered = hoveredIdx === link.from || hoveredIdx === link.to;

				// Base line
				ctx.beginPath();
				ctx.moveTo(cx + f.sx, cy2 + f.sy);
				ctx.lineTo(cx + t.sx, cy2 + t.sy);
				ctx.strokeStyle =
					(LINK_COLORS[Math.min(link.depth, 2)] || LINK_COLORS[2]) +
					(isHovered ? Math.min(1, alpha * 2.5) : alpha) + ')';
				ctx.lineWidth = isHovered ? 2 : link.depth === 0 ? 1.5 : 1;
				ctx.stroke();

				// ── Pulses along this link ──
				link.pulses = link.pulses.filter(p => p.t <= 1);
				for (const pulse of link.pulses) {
					pulse.t = Math.min(1, pulse.t + pulse.speed);
					const pt = pulse.reverse ? 1 - pulse.t : pulse.t;
					const px = (cx + f.sx) + ((cx + t.sx) - (cx + f.sx)) * pt;
					const py = (cy2 + f.sy) + ((cy2 + t.sy) - (cy2 + f.sy)) * pt;

					// Glow trail
					const pulseColor = PULSE_COLORS[Math.min(link.depth, 2)];
					const trailAlpha = (1 - Math.abs(pulse.t - 0.5) * 2) * 0.7;
					const glowR = 7 * Math.max(0.4, (f.s + t.s) / 2);
					const grad = ctx.createRadialGradient(px, py, 0, px, py, glowR);
					grad.addColorStop(0, pulseColor + '0.9)');
					grad.addColorStop(0.4, pulseColor + `${trailAlpha * 0.5})`);
					grad.addColorStop(1, 'transparent');
					ctx.beginPath();
					ctx.arc(px, py, glowR, 0, Math.PI * 2);
					ctx.fillStyle = grad;
					ctx.fill();

					// Bright core dot
					ctx.beginPath();
					ctx.arc(px, py, 2 * Math.max(0.5, (f.s + t.s) / 2), 0, Math.PI * 2);
					ctx.fillStyle = 'rgba(255,255,255,0.9)';
					ctx.fill();
				}
			}

			// ── Nodes (sorted back to front) ──
			const sortedNodes = [...proj].sort((a, b) => a.z - b.z);

			for (const n of sortedNodes) {
				const nx = cx + n.sx;
				const ny = cy2 + n.sy;
				const baseR = [10, 7, 5, 3.5][Math.min(n.depth, 3)] ?? 3.5;
				const r = baseR * Math.max(0.3, n.s) * zoom;
				const color = NODE_COLORS[Math.min(n.depth, 3)];
				const isHov = n.idx === hoveredIdx;

				// Glow
				if (n.depth === 0 || isHov) {
					const glowR = r * (n.depth === 0 ? 4 : 3);
					const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, glowR);
					grad.addColorStop(
						0,
						n.depth === 0
							? 'rgba(212,137,62,0.35)'
							: isHov
								? 'rgba(255,255,255,0.25)'
								: 'transparent'
					);
					grad.addColorStop(1, 'transparent');
					ctx.beginPath();
					ctx.arc(nx, ny, glowR, 0, Math.PI * 2);
					ctx.fillStyle = grad;
					ctx.fill();
				}

				// Node dot
				ctx.beginPath();
				ctx.arc(nx, ny, r, 0, Math.PI * 2);
				ctx.fillStyle = isHov ? '#ffffff' : color;
				ctx.fill();

				// Pulsing ring for root
				if (n.depth === 0) {
					const pulse = (Math.sin(Date.now() * 0.002) * 0.5 + 0.5) * 6;
					ctx.beginPath();
					ctx.arc(nx, ny, r + pulse, 0, Math.PI * 2);
					ctx.strokeStyle = 'rgba(212,137,62,0.3)';
					ctx.lineWidth = 1;
					ctx.stroke();
				}

				// Labels
				const showLabel = n.depth <= 1 || n.s > 0.65 || isHov;
				if (showLabel) {
					const fontSize = Math.max(9, (n.depth === 0 ? 13 : n.depth === 1 ? 11 : 9) * Math.min(1, n.s));
					ctx.font = n.depth === 0 ? `600 ${fontSize}px Inter, sans-serif` : `${fontSize}px Inter, sans-serif`;
					ctx.textAlign = 'center';
					ctx.fillStyle = n.depth === 0 ? '#d4893e' : n.depth === 1 ? '#3ab0a2' : 'rgba(255,255,255,0.7)';
					ctx.fillText(n.name, nx, ny - r - 5);
				}

				// Store screen pos for hover
				nodes[n.idx].px = nx;
				nodes[n.idx].py = ny;
				nodes[n.idx].ps = n.s;
			}

			animFrame = requestAnimationFrame(draw);
		}

		// ── Resize ───────────────────────────────────────────────────────────────
		function resize() {
			canvasEl.width = canvasEl.offsetWidth;
			canvasEl.height = canvasEl.offsetHeight;
		}
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(canvasEl);

		// ── Input handlers ────────────────────────────────────────────────────────
		const handleMouseDown = (event: MouseEvent) => {
			dragging = true;
			isAutoRotating = false;
			lastMouse = { x: event.clientX, y: event.clientY };
		};

		const handleMouseMove = (event: MouseEvent) => {
			if (dragging) {
				rotY += (event.clientX - lastMouse.x) * 0.006;
				rotX += (event.clientY - lastMouse.y) * 0.006;
				rotX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotX));
				lastMouse = { x: event.clientX, y: event.clientY };
			}
			const rect = canvasEl.getBoundingClientRect();
			const mx = event.clientX - rect.left;
			const my = event.clientY - rect.top;
			hoveredIdx = -1;
			hoveredName = '';
			for (const n of nodes) {
				const dx = n.px - mx;
				const dy = n.py - my;
				if (Math.sqrt(dx * dx + dy * dy) < 18) {
					hoveredIdx = n.idx;
					hoveredName = n.name;
					break;
				}
			}
			// Spawn pulse on new hover
			if (hoveredIdx !== prevHoveredIdx && hoveredIdx >= 0) {
				triggerPulseCascade(hoveredIdx);
			}
			prevHoveredIdx = hoveredIdx;
		};

		const handleMouseUp = () => { dragging = false; };
		const handleMouseLeave = () => {
			dragging = false; hoveredIdx = -1; hoveredName = ''; prevHoveredIdx = -1;
		};

		const handleWheel = (event: WheelEvent) => {
			event.preventDefault();
			zoom *= event.deltaY > 0 ? 0.94 : 1.06;
			zoom = Math.max(0.25, Math.min(4, zoom));
		};

		const handleDoubleClick = () => {
			isAutoRotating = !isAutoRotating;
		};

		// Click: pulse burst from clicked node
		const handleClick = () => {
			if (hoveredIdx >= 0) {
				// Spawn pulses on all adjacent links
				links.filter(l => l.from === hoveredIdx || l.to === hoveredIdx).forEach(l => {
					l.pulses.push({ t: 0, speed: 0.005 + Math.random() * 0.002, reverse: l.to === hoveredIdx });
				});
			}
		};

		// Touch
		const handleTouchStart = (event: TouchEvent) => {
			const touch = event.touches.item(0);
			if (!touch) return;
			dragging = true;
			isAutoRotating = false;
			lastMouse = { x: touch.clientX, y: touch.clientY };
		};
		const handleTouchMove = (event: TouchEvent) => {
			if (!dragging) return;
			const touch = event.touches.item(0);
			if (!touch) return;
			rotY += (touch.clientX - lastMouse.x) * 0.006;
			rotX += (touch.clientY - lastMouse.y) * 0.006;
			rotX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotX));
			lastMouse = { x: touch.clientX, y: touch.clientY };
			event.preventDefault();
		};
		const handleTouchEnd = () => { dragging = false; };

		canvasEl.addEventListener('mousedown', handleMouseDown);
		canvasEl.addEventListener('mousemove', handleMouseMove);
		canvasEl.addEventListener('mouseup', handleMouseUp);
		canvasEl.addEventListener('mouseleave', handleMouseLeave);
		canvasEl.addEventListener('wheel', handleWheel, { passive: false });
		canvasEl.addEventListener('dblclick', handleDoubleClick);
		canvasEl.addEventListener('click', handleClick);
		canvasEl.addEventListener('touchstart', handleTouchStart, { passive: true });
		canvasEl.addEventListener('touchmove', handleTouchMove, { passive: false });
		canvasEl.addEventListener('touchend', handleTouchEnd);

		draw();

		return () => {
			cancelAnimationFrame(animFrame);
			ro.disconnect();
			for (const timeoutId of cascadeTimeouts) window.clearTimeout(timeoutId);
			cascadeTimeouts.clear();
			canvasEl.removeEventListener('mousedown', handleMouseDown);
			canvasEl.removeEventListener('mousemove', handleMouseMove);
			canvasEl.removeEventListener('mouseup', handleMouseUp);
			canvasEl.removeEventListener('mouseleave', handleMouseLeave);
			canvasEl.removeEventListener('wheel', handleWheel);
			canvasEl.removeEventListener('dblclick', handleDoubleClick);
			canvasEl.removeEventListener('click', handleClick);
			canvasEl.removeEventListener('touchstart', handleTouchStart);
			canvasEl.removeEventListener('touchmove', handleTouchMove);
			canvasEl.removeEventListener('touchend', handleTouchEnd);
		};
	});
</script>

<div class="mm-wrap">
	<div class="mm-label">
		<span class="mm-dot"></span>
		Mind Map — {data?.name ?? 'Concept Map'}
	</div>

	<div class="mm-canvas-frame" role="img" aria-label="Interaktive 3D Konzept-Map: {title}">
		<canvas
			bind:this={canvas}
			class="mm-canvas"
			style="cursor: grab;"
			aria-hidden="true"
			title="Drag to rotate · Scroll to zoom · Double-click to toggle auto-rotate"
		></canvas>
	</div>

	<!-- SEO Fallback: sr-only HTML tree for Google indexing (Canvas content is invisible to crawlers) -->
	<div class="sr-only">
		<h3>{title}</h3>
		<ul>
			{#each seoNodes as node}
				<li>{node.name}</li>
			{/each}
		</ul>
	</div>

	<div class="mm-footer">
		{#if hoveredName}
			<span class="mm-hovered">{hoveredName}</span>
		{:else}
			<span class="mm-hint">Drag · Scroll · Doppelklick</span>
		{/if}
		<button class="mm-toggle" onclick={() => (isAutoRotating = !isAutoRotating)} title="Auto-Rotate">
			{isAutoRotating ? '⏸' : '▶'}
		</button>
	</div>
</div>

<style>
	.mm-wrap {
		position: relative;
		margin: 2.5rem -1rem;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid rgba(212, 137, 62, 0.18);
		background: #0d0d0d;
	}

	@media (min-width: 640px) {
		.mm-wrap {
			margin: 2.5rem 0;
		}
	}

	.mm-label {
		position: absolute;
		top: 12px;
		left: 16px;
		z-index: 2;
		font-size: 11px;
		font-family: 'JetBrains Mono', monospace;
		color: rgba(212, 137, 62, 0.75);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		pointer-events: none;
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.mm-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #d4893e;
		animation: pulse-dot 2s ease-in-out infinite;
		flex-shrink: 0;
	}

	@keyframes pulse-dot {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.5; transform: scale(0.7); }
	}

	.mm-canvas {
		width: 100%;
		height: 420px;
		display: block;
		touch-action: none;
	}

	@media (max-width: 480px) {
		.mm-canvas {
			height: 320px;
		}
	}

	.mm-footer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 8px 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: linear-gradient(to top, rgba(13, 13, 13, 0.9), transparent);
		pointer-events: none;
	}

	.mm-hint {
		font-size: 10px;
		color: rgba(255, 255, 255, 0.2);
		font-family: 'JetBrains Mono', monospace;
	}

	.mm-hovered {
		font-size: 11px;
		color: rgba(255, 255, 255, 0.8);
		font-family: 'JetBrains Mono', monospace;
		background: rgba(212, 137, 62, 0.12);
		padding: 2px 8px;
		border-radius: 4px;
		border: 1px solid rgba(212, 137, 62, 0.2);
	}

	.mm-toggle {
		pointer-events: all;
		background: rgba(212, 137, 62, 0.1);
		border: 1px solid rgba(212, 137, 62, 0.2);
		color: rgba(212, 137, 62, 0.8);
		border-radius: 6px;
		padding: 3px 8px;
		font-size: 11px;
		cursor: pointer;
		transition: background 0.2s;
	}

	.mm-toggle:hover {
		background: rgba(212, 137, 62, 0.2);
	}

	/* SEO Fallback: visually hidden but indexable by Google */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
