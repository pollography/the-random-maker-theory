import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { after, before, test } from 'node:test';
import { createServer } from 'vite';

const routesRoot = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(routesRoot, '..', '..');
/** @param {string[]} parts */
const read = (...parts) => readFile(join(projectRoot, ...parts), 'utf8');

/** @type {import('vite').ViteDevServer} */
let vite;

before(async () => {
	vite = await createServer({
		root: projectRoot,
		appType: 'custom',
		logLevel: 'error',
		server: { middlewareMode: true, hmr: false }
	});
});

after(async () => {
	await vite?.close();
});

test('YouTube stays local until its play button is activated', async () => {
	const source = await read('src', 'lib', 'components', 'media', 'LiteYouTubePlayer.svelte');
	const component = await vite.ssrLoadModule('/src/lib/components/media/LiteYouTubePlayer.svelte');
	const svelteServer = await vite.ssrLoadModule('svelte/server');
	const rendered = svelteServer.render(component.default, {
		props: {
			videoId: 'l-PP-PrOdAs',
			title: 'KI Bildbearbeitung',
			poster: '/images/video/ki-bildbearbeitung-trmt-003.webp',
			youtubeUrl: 'https://www.youtube.com/watch?v=l-PP-PrOdAs'
		}
	});

	assert.match(source, /let activated = \$state\(false\)/);
	assert.match(source, /youtube-nocookie\.com\/embed\/\$\{videoId\}/);
	assert.match(source, /video-frame--youtube/);
	assert.match(source, /class="platform-button platform-button--youtube"/);
	assert.match(source, /\.platform-button\s*\{[^}]*border:/s);
	assert.match(source, /Auf YouTube öffnen/);
	assert.match(rendered.body, /src="\/images\/video\/ki-bildbearbeitung-trmt-003\.webp"/);
	assert.match(rendered.body, /Video abspielen/);
	assert.doesNotMatch(rendered.body, /youtube-nocookie\.com|<iframe/);
});

test('Spotify loads the official iframe API only after activation and keeps platform fallbacks', async () => {
	const [source, loader] = await Promise.all([
		read('src', 'lib', 'components', 'media', 'SpotifyEpisodePlayer.svelte'),
		read('src', 'lib', 'utils', 'spotify-embed.js')
	]);
	const component = await vite.ssrLoadModule('/src/lib/components/media/SpotifyEpisodePlayer.svelte');
	const svelteServer = await vite.ssrLoadModule('svelte/server');
	const rendered = svelteServer.render(component.default, {
		props: {
			title: 'KI Bildbearbeitung',
			description: 'Der Workflow aus der Praxis.',
			duration: '42 Min.',
			audioUrl: 'https://open.spotify.com/episode/2gg5xxS45Nusk0vC1kknD3',
			spotifyUrl: 'https://open.spotify.com/episode/2gg5xxS45Nusk0vC1kknD3'
		}
	});

	assert.match(source, /loadSpotifyIframeApi/);
	assert.match(source, /onclick=\{activate\}/);
	assert.match(source, /controller\.play\(\)/);
	assert.match(source, /class="podcast-link podcast-link--spotify"/);
	assert.match(source, /class="podcast-link podcast-link--secondary"/);
	assert.match(source, /\.podcast-link\s*\{[^}]*border:/s);
	assert.match(source, /Auf Spotify öffnen/);
	assert.match(source, /Alle Folgen/);
	assert.match(loader, /open\.spotify\.com\/embed\/iframe-api\/v1/);
	assert.match(loader, /spotify-api-loading/);
	assert.match(rendered.body, /Podcast abspielen/);
	assert.doesNotMatch(rendered.body, /open\.spotify\.com\/embed|<iframe|<script/);
});
