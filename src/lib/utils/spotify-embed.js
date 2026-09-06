const SPOTIFY_IFRAME_API_URL = 'https://open.spotify.com/embed/iframe-api/v1';

/**
 * @typedef {{
 *   createController: (element: HTMLElement, options: { uri: string, width: string, height: number }, callback: (controller: any) => void) => void
 * }} SpotifyIframeApi
 */

/** @type {Promise<SpotifyIframeApi> | undefined} */
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

	const spotifyWindow = /** @type {Window & typeof globalThis & {
	 *   __trmtSpotifyIFrameApi?: SpotifyIframeApi,
	 *   onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void
	 * }} */ (window);

	if (spotifyWindow.__trmtSpotifyIFrameApi) {
		return Promise.resolve(spotifyWindow.__trmtSpotifyIFrameApi);
	}
	if (spotifyApiPromise) return spotifyApiPromise;

	spotifyApiPromise = new Promise((resolve, reject) => {
		const previousReady = spotifyWindow.onSpotifyIframeApiReady;
		spotifyWindow.onSpotifyIframeApiReady = (api) => {
			spotifyWindow.__trmtSpotifyIFrameApi = api;
			if (typeof previousReady === 'function') previousReady(api);
			resolve(api);
		};

		/** @type {HTMLScriptElement | null} */
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
