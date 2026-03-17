<script>
	import { onMount } from 'svelte';

	let { data } = $props();

	let canvas = $state(null);
	let hoveredName = $state('');
	let isAutoRotating = $state(true);

	onMount(() => {
		if (!canvas || !data) return;

		let animFrame;
		let rotX = -0.25;
		let rotY = 0;
		let zoom = 1;
		let dragging = false;
		let lastMouse = { x: 0, y: 0 };
		let hoveredIdx = -1;

		// ── Build flat node + link lists from tree ──────────────────────────────
		const nodes = [];
		const links = [];

		function flatten(node, parentIdx, depth, theta, thetaSpread) {
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
			if (parentIdx >= 0) links.push({ from: parentIdx, to: idx, depth: depth - 1 });

			if (node.children?.length) {
				const n = node.children.length;
				for (let i = 0; i < n; i++) {
					const childTheta = theta + (i - (n - 1) / 2) * (thetaSpread / Math.max(n, 1));
					flatten(node.children[i], idx, depth + 1, childTheta, thetaSpread / n * 1.4);
				}
			}
		}

		flatten(data, -1, 0, 0, Math.PI * 2);

		// Evenly distribute depth-1 nodes around Y axis
		const d1 = nodes.filter((n) => n.depth === 1);
		d1.forEach((n, i) => {
			const theta = (i / d1.length) * Math.PI * 2;
			n.x = 160 * Math.cos(theta);
			n.y = (Math.random() - 0.5) * 50;
			n.z = 160 * Math.sin(theta);
		});

		// ── Projection ──────────────────────────────────────────────────────────
		function project(x, y, z) {
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

		// ── Color helpers ────────────────────────────────────────────────────────
		const NODE_COLORS = ['#d4893e', '#3ab0a2', 'rgba(255,255,255,0.9)', 'rgba(255,255,255,0.55)'];
		const LINK_COLORS = ['rgba(212,137,62,', 'rgba(58,176,162,', 'rgba(255,255,255,'];

		// ── Draw ─────────────────────────────────────────────────────────────────
		function draw() {
			if (!canvas) return;
			const ctx = canvas.getContext('2d');
			const W = canvas.width;
			const H = canvas.height;
			const cx = W / 2;
			const cy2 = H / 2;

			// Auto rotate
			if (isAutoRotating && !dragging) rotY += 0.004;

			// Clear with slight fade for motion trail effect
			ctx.fillStyle = '#0d0d0d';
			ctx.fillRect(0, 0, W, H);

			// Project all nodes
			const proj = nodes.map((n) => {
				const p = project(n.x, n.y, n.z);
				return { ...n, ...p };
			});

			// Draw links (sorted back to front)
			const sortedLinks = [...links].sort(
				(a, b) => (proj[a.from].z + proj[a.to].z) / 2 - (proj[b.from].z + proj[b.to].z) / 2
			);

			for (const link of sortedLinks) {
				const f = proj[link.from];
				const t = proj[link.to];
				const alpha = Math.min(0.7, ((f.s + t.s) / 2) * 0.9);
				const isHovered = hoveredIdx === link.from || hoveredIdx === link.to;

				ctx.beginPath();
				ctx.moveTo(cx + f.sx, cy2 + f.sy);
				ctx.lineTo(cx + t.sx, cy2 + t.sy);
				ctx.strokeStyle =
					(LINK_COLORS[Math.min(link.depth, 2)] || LINK_COLORS[2]) +
					(isHovered ? Math.min(1, alpha * 2.5) : alpha) +
					')';
				ctx.lineWidth = isHovered ? 2 : link.depth === 0 ? 1.5 : 1;
				ctx.stroke();
			}

			// Draw nodes (sorted back to front)
			const sortedNodes = [...proj].sort((a, b) => a.z - b.z);

			for (const n of sortedNodes) {
				const nx = cx + n.sx;
				const ny = cy2 + n.sy;
				const baseR = [10, 7, 5, 3.5][Math.min(n.depth, 3)];
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
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		}
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(canvas);

		// ── Input handlers ────────────────────────────────────────────────────────
		canvas.addEventListener('mousedown', (e) => {
			dragging = true;
			isAutoRotating = false;
			lastMouse = { x: e.clientX, y: e.clientY };
		});

		canvas.addEventListener('mousemove', (e) => {
			if (dragging) {
				rotY += (e.clientX - lastMouse.x) * 0.006;
				rotX += (e.clientY - lastMouse.y) * 0.006;
				rotX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotX));
				lastMouse = { x: e.clientX, y: e.clientY };
			}
			const rect = canvas.getBoundingClientRect();
			const mx = e.clientX - rect.left;
			const my = e.clientY - rect.top;
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
		});

		canvas.addEventListener('mouseup', () => { dragging = false; });
		canvas.addEventListener('mouseleave', () => { dragging = false; hoveredIdx = -1; hoveredName = ''; });

		canvas.addEventListener('wheel', (e) => {
			e.preventDefault();
			zoom *= e.deltaY > 0 ? 0.94 : 1.06;
			zoom = Math.max(0.25, Math.min(4, zoom));
		}, { passive: false });

		canvas.addEventListener('dblclick', () => {
			isAutoRotating = !isAutoRotating;
		});

		// Touch
		canvas.addEventListener('touchstart', (e) => {
			dragging = true;
			isAutoRotating = false;
			lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
		}, { passive: true });
		canvas.addEventListener('touchmove', (e) => {
			if (!dragging) return;
			rotY += (e.touches[0].clientX - lastMouse.x) * 0.006;
			rotX += (e.touches[0].clientY - lastMouse.y) * 0.006;
			rotX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotX));
			lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
			e.preventDefault();
		}, { passive: false });
		canvas.addEventListener('touchend', () => { dragging = false; });

		draw();

		return () => {
			cancelAnimationFrame(animFrame);
			ro.disconnect();
		};
	});
</script>

<div class="mm-wrap">
	<div class="mm-label">
		<span class="mm-dot"></span>
		Mind Map — {data?.name ?? 'Concept Map'}
	</div>

	<canvas
		bind:this={canvas}
		class="mm-canvas"
		style="cursor: grab;"
		title="Drag to rotate · Scroll to zoom · Double-click to toggle auto-rotate"
	></canvas>

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
</style>
