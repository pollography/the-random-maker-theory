// @ts-nocheck
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(path, 'utf8');

test('general TRMT pages are never submitted to the restricted Google Indexing API', () => {
	for (const path of ['scripts/index-notify.py', 'scripts/deploy.py']) {
		const source = read(path);
		assert.doesNotMatch(source, /indexing\.googleapis\.com|auth\/indexing/);
		assert.doesNotMatch(source, /def submit_(?:to_)?google\b|submit_(?:to_)?google\(/);
		assert.doesNotMatch(source, /gsc-service-account\.json|--setup-gsc/);
	}
});

test('Google setup guidance states the supported sitemap and Search Console path', () => {
	const setup = read('scripts/GSC-INDEXING-SETUP.md');
	assert.match(setup, /JobPosting/);
	assert.match(setup, /BroadcastEvent/);
	assert.match(setup, /sitemap\.xml/);
	assert.match(setup, /Search Console/);
	assert.doesNotMatch(setup, /Google \(via Indexing API\)/);
});
