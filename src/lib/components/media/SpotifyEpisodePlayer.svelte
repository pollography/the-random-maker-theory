<script>
	import { onDestroy } from 'svelte';
	import { loadSpotifyIframeApi, spotifyEpisodeUri } from '$lib/utils/spotify-embed.js';

	let { title, description, duration = '', audioUrl, spotifyUrl } = $props();
	let activated = $state(false);
	let playerError = $state('');
	let embedHost = $state();
	/** @type {{ play: () => void; destroy?: () => void } | undefined} */
	let controller;

	async function activate() {
		if (activated) return;
		activated = true;
		playerError = '';

		try {
			const api = await loadSpotifyIframeApi();
			if (!embedHost) throw new Error('Spotify player mount is unavailable.');

			api.createController(
				embedHost,
				{ uri: spotifyEpisodeUri(audioUrl), width: '100%', height: 152 },
				(createdController) => {
					controller = createdController;
					if (!controller) return;
					try {
						controller.play();
					} catch {
						// The official player remains ready when browser autoplay policy blocks play().
					}
				}
			);
		} catch {
			activated = false;
			playerError = 'Der Spotify-Player konnte nicht geladen werden.';
		}
	}

	onDestroy(() => controller?.destroy?.());
</script>

<div class="podcast-player">
	{#if activated}
		<div class="spotify-mount" bind:this={embedHost} aria-label={`Spotify-Player: ${title}`}>
			<p>Player wird geladen …</p>
		</div>
	{:else}
		<button type="button" class="podcast-facade" onclick={activate} aria-label={`Podcast abspielen: ${title}`}>
			<span class="podcast-icon" aria-hidden="true">▶</span>
			<span class="podcast-copy">
				<span class="podcast-kicker">Neueste hörbare Folge{duration ? ` · ${duration}` : ''}</span>
				<strong>{title}</strong>
				<span>{description}</span>
			</span>
		</button>
	{/if}

	{#if playerError}<p class="player-error" role="status">{playerError} Bitte versuche es noch einmal.</p>{/if}

	<div class="podcast-links">
		<a href={spotifyUrl} target="_blank" rel="noopener noreferrer">Auf Spotify öffnen →</a>
		<a href="/podcast">Alle Folgen →</a>
	</div>
</div>

<style>
	.podcast-player { display: grid; gap: 14px; }
	.podcast-facade { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 18px; width: 100%; min-height: 152px; padding: 20px; border: 1px solid rgba(58, 176, 162, .45); border-radius: var(--radius-lg); background: linear-gradient(135deg, rgba(58, 176, 162, .13), rgba(58, 176, 162, .025)); color: var(--color-text); cursor: pointer; text-align: left; }
	.podcast-facade:hover { border-color: var(--color-accent-teal); background: linear-gradient(135deg, rgba(58, 176, 162, .19), rgba(58, 176, 162, .045)); }
	.podcast-facade:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 3px; }
	.podcast-icon { display: grid; place-items: center; width: 58px; height: 58px; padding-left: 3px; border-radius: 50%; background: var(--color-accent-teal); color: var(--color-on-accent); font-size: 1.25rem; box-shadow: 0 10px 28px rgba(58, 176, 162, .2); }
	.podcast-copy { display: grid; gap: 6px; min-width: 0; }
	.podcast-copy strong { font-family: var(--font-display); font-size: clamp(1.25rem, 2.5vw, 1.65rem); font-weight: 400; line-height: 1.13; }
	.podcast-copy > span:last-child { color: var(--color-text-muted); font-size: var(--font-size-sm); line-height: 1.5; }
	.podcast-kicker { color: var(--color-accent-teal-foreground); font-family: var(--font-mono); font-size: .68rem; letter-spacing: .09em; text-transform: uppercase; }
	.spotify-mount { min-height: 152px; border-radius: 12px; overflow: hidden; background: #181818; }
	.spotify-mount p { margin: 0; padding: 24px; color: #fff; }
	.player-error { margin: 0; color: var(--color-text-muted); font-size: var(--font-size-sm); }
	.podcast-links { display: flex; flex-wrap: wrap; gap: 8px 20px; }
	.podcast-links a { display: inline-flex; align-items: center; min-height: 44px; color: var(--color-text-muted); font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); text-decoration: none; }
	.podcast-links a:hover { color: var(--color-accent-teal-foreground); }
	@media (max-width: 520px) { .podcast-facade { grid-template-columns: 1fr; } .podcast-icon { width: 48px; height: 48px; } }
</style>
