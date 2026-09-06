<script>
	let { videoId, title, poster, youtubeUrl } = $props();
	let activated = $state(false);
</script>

<div class="video-shell">
	<div class="video-frame video-frame--youtube">
		{#if activated}
			<iframe
				src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`}
				{title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		{:else}
			<button
				type="button"
				class="video-facade"
				onclick={() => (activated = true)}
				aria-label={`Video abspielen: ${title}`}
			>
				<img src={poster} alt="" width="1280" height="720" loading="lazy" decoding="async" />
				<span class="video-shade" aria-hidden="true"></span>
				<span class="video-kicker" aria-hidden="true">Video</span>
				<span class="video-play" aria-hidden="true"><span>▶</span></span>
			</button>
		{/if}
	</div>
	<a class="platform-link" href={youtubeUrl} target="_blank" rel="noopener noreferrer">Auf YouTube öffnen →</a>
</div>

<style>
	.video-shell { display: grid; gap: 12px; }
	.video-frame { position: relative; overflow: hidden; width: 100%; aspect-ratio: 16 / 9; border-radius: var(--radius-lg); background: #090909; }
	.video-frame--youtube { border: 2px solid #e54848; box-shadow: 0 0 0 1px rgba(229, 72, 72, .14), 0 18px 45px rgba(0, 0, 0, .22); }
	.video-frame iframe, .video-facade { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
	.video-facade { padding: 0; background: #090909; color: white; cursor: pointer; }
	.video-facade img { display: block; width: 100%; height: 100%; object-fit: cover; }
	.video-shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0, 0, 0, .08), rgba(0, 0, 0, .28)); }
	.video-kicker { position: absolute; top: 16px; left: 16px; padding: 6px 10px; border: 1px solid rgba(255, 255, 255, .5); border-radius: var(--radius-full); background: rgba(0, 0, 0, .68); font-family: var(--font-mono); font-size: .7rem; letter-spacing: .13em; text-transform: uppercase; }
	.video-play { position: absolute; top: 50%; left: 50%; display: grid; place-items: center; width: clamp(62px, 9vw, 82px); height: clamp(44px, 6.3vw, 58px); border-radius: 16px; background: #e32636; box-shadow: 0 12px 34px rgba(0, 0, 0, .38); transform: translate(-50%, -50%); transition: transform var(--transition-normal), background var(--transition-normal); }
	.video-play span { margin-left: 4px; font-size: clamp(1.25rem, 3vw, 1.75rem); }
	.video-facade:hover .video-play { background: #ff3445; transform: translate(-50%, -50%) scale(1.06); }
	.video-facade:focus-visible { outline: 3px solid var(--color-focus); outline-offset: -6px; }
	.platform-link { justify-self: start; min-height: 44px; display: inline-flex; align-items: center; color: var(--color-text-muted); font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); text-decoration: none; }
	.platform-link:hover { color: #f05a63; }
	@media (prefers-reduced-motion: reduce) { .video-play { transition: none; } .video-facade:hover .video-play { transform: translate(-50%, -50%); } }
</style>
