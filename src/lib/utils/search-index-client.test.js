// @ts-nocheck
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createSearchIndexLoader } from './search-index-client.js';

const record = {
	type: 'article',
	slug: 'esp32',
	url: '/blog/esp32',
	title: 'ESP32 Einstieg',
	description: 'Sensor bauen',
	tags: ['maker'],
	category: 'Maker & DIY',
	headings: [],
	bodyTokens: 'esp32 sensor',
	date: '2026-09-02'
};

function response(payload, { ok = true, status = 200 } = {}) {
	return { ok, status, json: async () => payload };
}

test('does not fetch until load and shares one successful request', async () => {
	let calls = 0;
	const loader = createSearchIndexLoader({
		fetchImpl: async () => {
			calls += 1;
			return response({ version: 1, records: [record] });
		},
		timeoutMs: 50,
		url: '/search-index.json'
	});

	assert.equal(calls, 0);
	const [first, second] = await Promise.all([loader.load(), loader.load()]);
	assert.equal(calls, 1);
	assert.deepEqual(first, [record]);
	assert.equal(first, second);
});

test('rejects HTTP and malformed responses, then permits a retry', async () => {
	let calls = 0;
	const loader = createSearchIndexLoader({
		fetchImpl: async () => {
			calls += 1;
			if (calls === 1) return response({}, { ok: false, status: 503 });
			if (calls === 2) return response({ version: 2, records: [record] });
			return response({ version: 1, records: [record] });
		},
		timeoutMs: 50
	});

	await assert.rejects(loader.load(), /503/);
	await assert.rejects(loader.load(), /ungültig/i);
	assert.deepEqual(await loader.load(), [record]);
	assert.equal(calls, 3);
});

test('aborts a timed-out request and retries successfully', async () => {
	let calls = 0;
	let aborted = false;
	const loader = createSearchIndexLoader({
		fetchImpl: (_url, { signal }) => {
			calls += 1;
			if (calls > 1) return Promise.resolve(response({ version: 1, records: [record] }));
			return new Promise((_resolve, reject) => {
				signal.addEventListener('abort', () => {
					aborted = true;
					reject(new DOMException('Aborted', 'AbortError'));
				});
			});
		},
		timeoutMs: 10
	});

	await assert.rejects(loader.load(), /Zeitüberschreitung/);
	assert.equal(aborted, true);
	assert.deepEqual(await loader.load(), [record]);
	assert.equal(calls, 2);
});

test('reset drops a successful cache for an explicit reload', async () => {
	let calls = 0;
	const loader = createSearchIndexLoader({
		fetchImpl: async () => {
			calls += 1;
			return response({ version: 1, records: [record] });
		}
	});

	await loader.load();
	loader.reset();
	await loader.load();
	assert.equal(calls, 2);
});
