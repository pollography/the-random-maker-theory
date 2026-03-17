<script>
	import { onMount } from 'svelte';

	let { data } = $props();

	let canvas = $state(null);
	let hoveredName = $state('');
	let isAutoRotating = $state(true);

	onMount(() => {
		if (!canvas || !data) return;

		let animFrame;
		let rotX = -0.2;
		let rotY = 0;
		let zoom = 1;

		// Interaction state
		let dragMode = 'none'; // 'scene' | 'node'
		let draggedNodeIdx = -1;
		let lastMouse = { x: 0, y: 0 };
		let hoveredIdx = -1;

		// ── Node/Link data ────────────────────────────────────────────────────
		const nodes = [];
		const links = [];

		function flatten(node, parentIdx, depth, theta) {
			const idx = nodes.length;
			// Wider spacing for readability
			const radii = [0, 190, 340, 430];
			const r = radii[Math.min(depth, 3)];
			let x = 0, y = 0, z = 0;

			if (depth > 0) {
				const jitter = (Math.random() - 0.5) * 60;
				x = r * Math.cos(theta);
				y = jitter;
				z = r * Math.sin(theta);
			}

			nodes.push({ idx, name: node.name, depth, parentIdx, x, y, z, px: 0, py: 0, ps: 1 });
			if (parentIdx >= 0) links.push({ from: parentIdx, to: idx, depth: depth - 1 });

			if (node.children?.length) {
				const n = node.children.length;
				const spread = Math.PI * 0.55;
				for (let i = 0; i < n; i++) {
					const childTheta = theta + (i - (n - 1) / 2) * (spread / Math.max(n - 1, 1));
					flatten(node.children[i], idx, depth + 1, childTheta);
				}
			}
		}

		flatten(data, -1, 0, 0);

		// Evenly spread depth-1 nodes around full circle
		const d1 = nodes.filter((n) => n.depth === 1);
		d1.forEach((n, i) => {
			const theta = (i / d1.length) * Math.PI * 2;
			n.x = 190 * Math.cos(theta);
			n.y = (Math.random() - 0.5) * 40;
			n.z = 190 * Math.sin(theta);
		});

		// ── 3D Projection ─────────────────────────────────────────────────────
		function project(x, y, z) {
			const cy = Math.cos(rotY), sy = Math.sin(rotY);
			const cx2 = Math.cos(rotX), sx = Math.sin(rotX);
			const x1 = x * cy + z * sy;
			const z1 = -x * sy + z * cy;
			const y1 = y * cx2 - z1 * sx;
			const z2 = y * sx + z1 * cx2;
			const fov = 560;
			const s = fov / (fov + z2 + 300);
			return { sx: x1 * s * zoom, sy: y1 * s * zoom, z: z2, s };
		}

		// ── Draw ──────────────────────────────────────────────────────────────
		const NODE_COLORS = ['#d4893e', '#3ab0a2', 'rgba(255,255,255,0.85)', 'rgba(255,255,255,0.5)'];
		const LINK_BASE = ['rgba(212,137,62,', 'rgba(58,176,162,', 'rgba(255,255,255,'];

		function draw() {
			if (!canvas) return;
			const ctx = canvas.getContext('2d');
			const W = canvas.width, H = canvas.height;
			const cx = W / 2, cy2 = H / 2;

			if (isAutoRotating && dragMode === 'none') rotY += 0.003;

			ctx.fillStyle = '#0d0d0d';
			ctx.fillRect(0, 0, W, H);

			const proj = nodes.map((n) => ({ ...n, ...project(n.x, n.y, n.z) }));

			// Links — back to front
			[...links]
				.sort((a, b) => (proj[a.from].z + proj[a.to].z) / 2 - (proj[b.from].z + proj[b.to].z) / 2)
				.forEach((link) => {
					const f = proj[link.from], t = proj[link.to];
					const avgS = (f.s + t.s) / 2;
					const isActive = hoveredIdx === link.from || hoveredIdx === link.to || draggedNodeIdx === link.from || draggedNodeIdx === link.to;
					const alpha = isActive ? 0.9 : Math.min(0.55, avgS * 0.8);
					ctx.beginPath();
					ctx.moveTo(cx + f.sx, cy2 + f.sy);
					ctx.lineTo(cx + t.sx, cy2 + t.sy);
					ctx.strokeStyle = (LINK_BASE[Math.min(link.depth, 2)] || LINK_BASE[2]) + alpha + ')';
					ctx.lineWidth = isActive ? 2 : link.depth === 0 ? 1.5 : 1;
					ctx.stroke();
				});

			// Nodes — back to front
			[...proj].sort((a, b) => a.z - b.z).forEach((n) => {
				const nx = cx + n.sx, ny = cy2 + n.sy;
				const isHov = n.idx === hoveredIdx || n.idx === draggedNodeIdx;
				const baseR = [14, 9, 6, 4.5][Math.min(n.depth, 3)];
				const r = Math.max(2, baseR * Math.max(0.4, n.s) * zoom);
				const color = NODE_COLORS[Math.min(n.depth, 3)];

				// Glow
				if (n.depth === 0 || isHov) {
					const glowR = r * (n.depth === 0 ? 4.5 : 3.5);
					const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, glowR);
					grad.addColorStop(0, n.depth === 0 ? 'rgba(212,137,62,0.3)' : 'rgba(255,255,255,0.2)');
					grad.addColorStop(1, 'transparent');
					ctx.beginPath();
					ctx.arc(nx, ny, glowR, 0, Math.PI * 2);
					ctx.fillStyle = grad;
					ctx.fill();
				}

				// Dot
				ctx.beginPath();
				ctx.arc(nx, ny, r, 0, Math.PI * 2);
				ctx.fillStyle = isHov ? '#ffffff' : color;
				ctx.fill();

				// Pulsing ring for root
				if (n.depth === 0) {
					const pulse = (Math.sin(Date.now() * 0.002) * 0.5 + 0.5) * 8;
					ctx.beginPath();
					ctx.arc(nx, ny, r + pulse, 0, Math.PI * 2);
					ctx.strokeStyle = 'rgba(212,137,62,0.25)';
					ctx.lineWidth = 1.5;
					ctx.stroke();
				}

				// Labels: depth 0+1 always, depth 2+ only on hover
				const showLabel = n.depth <= 1 || isHov;
				if (showLabel) {
					const fontSize = Math.max(11, ([15, 13, 11, 10][Math.min(n.depth, 3)]) * Math.min(1.2, n.s * zoom));
					ctx.font = n.depth === 0
						? `600 ${fontSize}px Inter, sans-serif`
						: n.depth === 1
							? `500 ${fontSize}px Inter, sans-serif`
							: `${fontSize}px Inter, sans-serif`;
					ctx.textAlign = 'center';
					const labelColor = n.depth === 0
						? '#d4893e'
						: n.depth === 1
							? '#3ab0a2'
							: isHov
								? 'rgba(255,255,255,0.95)'
								: 'rgba(255,255,255,0.65)';
					ctx.fillStyle = labelColor;

					// Background pill for hover labels
					if (isHov && n.depth >= 2) {
						const tw = ctx.measureText(n.name).width;
						ctx.fillStyle = 'rgba(13,13,13,0.8)';
						ctx.beginPath();
						ctx.roundRect(nx - tw / 2 - 6, ny - r - fontSize - 8, tw + 12, fontSize + 8, 4);
						ctx.fill();
						ctx.fillStyle = 'rgba(255,255,255,0.95)';
					}

					ctx.fillText(n.name, nx, ny - r - 6);
				}

				// Drag handle ring when hoverable
				if (n.depth > 0 && n.idx === hoveredIdx && dragMode === 'none') {
					ctx.beginPath();
					ctx.arc(nx, ny, r + 4, 0, Math.PI * 2);
					ctx.strokeStyle = 'rgba(255,255,255,0.4)';
					ctx.lineWidth = 1;
					ctx.setLineDash([3, 3]);
					ctx.stroke();
					ctx.setLineDash([]);
				}

				// Store screen coords
				nodes[n.idx].px = nx;
				nodes[n.idx].py = ny;
				nodes[n.idx].ps = n.s;
			});

			animFrame = requestAnimationFrame(draw);
		}

		// ── Resize ────────────────────────────────────────────────────────────
		function resize() {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		}
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(canvas);

		// ── Helpers ───────────────────────────────────────────────────────────
		function findNodeAt(mx, my) {
			for (const n of nodes) {
				const dx = n.px - mx, dy = n.py - my;
				if (Math.sqrt(dx * dx + dy * dy) < 20) return n.idx;
			}
			return -1;
		}

		// Move a dragged node in world XY based on screen delta
		function moveNode(idx, screenDx, screenDy) {
			const n = nodes[idx];
			// Scale by inverse perspective factor so far nodes don't jump
			const invS = n.ps > 0 ? 1 / n.ps : 1;
			n.x += screenDx * invS / zoom;
			n.y += screenDy * invS / zoom;
		}

		// ── Mouse ──────────────────────────────────────────────────────────────
		canvas.addEventListener('mousedown', (e) => {
			const rect = canvas.getBoundingClientRect();
			const mx = e.clientX - rect.left, my = e.clientY - rect.top;
			const hit = findNodeAt(mx, my);
			lastMouse = { x: e.clientX, y: e.clientY };
			if (hit >= 0 && nodes[hit].depth > 0) {
				dragMode = 'node';
				draggedNodeIdx = hit;
				isAutoRotating = false;
			} else {
				dragMode = 'scene';
				isAutoRotating = false;
			}
		});

		canvas.addEventListener('mousemove', (e) => {
			const dx = e.clientX - lastMouse.x;
			const dy = e.clientY - lastMouse.y;

			if (dragMode === 'scene') {
				rotY += dx * 0.006;
				rotX += dy * 0.006;
				rotX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotX));
			} else if (dragMode === 'node' && draggedNodeIdx >= 0) {
				moveNode(draggedNodeIdx, dx, dy);
			}

			lastMouse = { x: e.clientX, y: e.clientY };

			// Hover detection
			if (dragMode === 'none') {
				const rect = canvas.getBoundingClientRect();
				const mx = e.clientX - rect.left, my = e.clientY - rect.top;
				hoveredIdx = findNodeAt(mx, my);
				hoveredName = hoveredIdx >= 0 ? nodes[hoveredIdx].name : '';
			}
		});

		canvas.addEventListener('mouseup', () => {
			if (dragMode === 'node') hoveredName = nodes[draggedNodeIdx]?.name ?? '';
			dragMode = 'none';
			draggedNodeIdx = -1;
		});

		canvas.addEventListener('mouseleave', () => {
			dragMode = 'none';
			draggedNodeIdx = -1;
			hoveredIdx = -1;
			hoveredName = '';
		});

		canvas.addEventListener('wheel', (e) => {
			e.preventDefault();
			zoom *= e.deltaY > 0 ? 0.93 : 1.07;
			zoom = Math.max(0.2, Math.min(5, zoom));
		}, { passive: false });

		canvas.addEventListener('dblclick', () => {
			isAutoRotating = !isAutoRotating;
		});

		// ── Touch ──────────────────────────────────────────────────────────────
		canvas.addEventListener('touchstart', (e) => {
			lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
			dragMode = 'scene';
			isAutoRotating = false;
		}, { passive: true });

		canvas.addEventListener('touchmove', (e) => {
			if (dragMode !== 'scene') return;
			const dx = e.touches[0].clientX - lastMouse.x;
			const dy = e.touches[0].clientY - lastMouse.y;
			rotY += dx * 0.006;
			rotX += dy * 0.006;
			rotX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotX));
			lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
			e.preventDefault();
		}, { passive: false });

		canvas.addEventListener('touchend', () => { dragMode = 'none'; });

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
		title="Drag node to move it · Drag background to rotate · Scroll to zoom · Double-click to toggle auto-rotate"
	></canvas>

	<div class="mm-footer">
		{#if hoveredName}
			<span class="mm-hovered">{hoveredName}</span>
		{:else}
			<span class="mm-hint">Node ziehen · Hintergrund drehen · Scroll = Zoom</span>
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
		border: 1px solid rgba(212, 137, 62, 0.2);
		background: #0d0d0d;
	}

	@media (min-width: 640px) {
		.mm-wrap { margin: 2.5rem 0; }
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
		50% { opacity: 0.45; transform: scale(0.65); }
	}

	.mm-canvas {
		width: 100%;
		height: 460px;
		display: block;
		touch-action: none;
		cursor: grab;
	}

	.mm-canvas:active {
		cursor: grabbing;
	}

	@media (max-width: 480px) {
		.mm-canvas { height: 340px; }
	}

	.mm-footer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 10px 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: linear-gradient(to top, rgba(13, 13, 13, 0.92) 60%, transparent);
		pointer-events: none;
	}

	.mm-hint {
		font-size: 10px;
		color: rgba(255, 255, 255, 0.22);
		font-family: 'JetBrains Mono', monospace;
	}

	.mm-hovered {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.9);
		font-family: 'JetBrains Mono', monospace;
		background: rgba(212, 137, 62, 0.14);
		padding: 3px 10px;
		border-radius: 5px;
		border: 1px solid rgba(212, 137, 62, 0.25);
		max-width: 70%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.mm-toggle {
		pointer-events: all;
		background: rgba(212, 137, 62, 0.1);
		border: 1px solid rgba(212, 137, 62, 0.22);
		color: rgba(212, 137, 62, 0.85);
		border-radius: 6px;
		padding: 4px 10px;
		font-size: 12px;
		cursor: pointer;
		transition: background 0.15s;
	}

	.mm-toggle:hover {
		background: rgba(212, 137, 62, 0.22);
	}
</style>
