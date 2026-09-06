const SPOTIFY_IFRAME_API_URL = 'https://open.spotify.com/embed/iframe-api/v1';

let spotifyApiPromise;

/** @param {string} url */
export function spotifyEpisodeUri(url) {
	const match = String(url).match(/open\.spotify\.com\/episode\/([a-zA-Z0-9]+)/);
	return match ? `spotify:episode:${match[1]}` : url;
}

export function loadSpotifyIframeApi() {
	if (typeof document === 'undefined' || typeof window === 'undefined') {
		return Promise.reject(new Error('Spotify Embed API is only available in the browser.'));
	}

	if (window.__trmtSpotifyIFrameApi) return Promise.resolve(window.__trmtSpotifyIFrameApi);
	if (spotifyApiPromise) return spotifyApiPromise;

	spotifyApiPromise = new Promise((resolve, reject) => {
		const previousReady = window.onSpotifyIframeApiReady;
		window.onSpotifyIframeApiReady = (api) => {
			window.__trmtSpotifyIFrameApi = api;
			if (typeof previousReady === 'function') previousReady(api);
			resolve(api);
		};

		let script = document.querySelector('script[data-spotify-api-loading]');
		if (!script) {
			script = document.createElement('script');
			script.src = SPOTIFY_IFRAME_API_URL;
			script.async = true;
			script.setAttribute('data-spotify-api-loading', 'true');
			document.head.append(script);
		}

		script.addEventListener(
			'error',
			() => {
				spotifyApiPromise = undefined;
				reject(new Error('Spotify Embed API could not be loaded.'));
			},
			{ once: true }
		);
	});

	return spotifyApiPromise;
}
