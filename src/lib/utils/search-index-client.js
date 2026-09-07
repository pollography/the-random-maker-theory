import { isSearchRecord } from './site-search.js';

const DEFAULT_INDEX_URL = '/search-index.json';
const DEFAULT_TIMEOUT_MS = 8_000;

/**
 * @param {{ fetchImpl?: typeof fetch, timeoutMs?: number, url?: string }} options
 */
export function createSearchIndexLoader({
	fetchImpl = globalThis.fetch.bind(globalThis),
	timeoutMs = DEFAULT_TIMEOUT_MS,
	url = DEFAULT_INDEX_URL
} = {}) {
	/** @type {Promise<any[]> | null} */
	let cachedPromise = null;
	/** @type {AbortController | null} */
	let activeController = null;

	async function load() {
		if (cachedPromise) return cachedPromise;

		const controller = new AbortController();
		activeController = controller;
		let timedOut = false;
		const request = (async () => {
			const timeout = setTimeout(() => {
				timedOut = true;
				controller.abort();
			}, timeoutMs);

			try {
				const response = await fetchImpl(url, {
					headers: { accept: 'application/json' },
					signal: controller.signal
				});
				if (!response?.ok) {
					throw new Error(`Suchindex HTTP ${response?.status ?? 'unbekannt'}`);
				}

				const payload = await response.json();
				if (
					payload?.version !== 1
					|| !Array.isArray(payload.records)
					|| !payload.records.every(isSearchRecord)
				) {
					throw new TypeError('Suchindex ist ungültig');
				}

				return payload.records;
			} catch (error) {
				if (timedOut) throw new Error('Zeitüberschreitung beim Laden der Suche');
				throw error;
			} finally {
				clearTimeout(timeout);
				if (activeController === controller) activeController = null;
			}
		})();

		cachedPromise = request;
		try {
			return await request;
		} catch (error) {
			if (cachedPromise === request) cachedPromise = null;
			throw error;
		}
	}

	function reset() {
		activeController?.abort();
		activeController = null;
		cachedPromise = null;
	}

	return { load, reset };
}

const sharedLoader = createSearchIndexLoader();

export const loadSearchIndex = () => sharedLoader.load();
export const resetSearchIndex = () => sharedLoader.reset();
