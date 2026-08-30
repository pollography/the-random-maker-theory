import assert from 'node:assert/strict';
import test from 'node:test';

import {
	cleanPromptText,
	copyPromptText,
	getPromptDestinations
} from './prompt-actions.js';

test('cleanPromptText normalizes line endings and removes surrounding blank space', () => {
	assert.equal(cleanPromptText('\r\n/charactersheet Alex\r\n'), '/charactersheet Alex');
});

test('getPromptDestinations uses stable web entry points and a prefilled Claude Desktop link', () => {
	const destinations = getPromptDestinations('/charactersheet Alex');

	assert.equal(destinations.chatgpt, 'https://chatgpt.com/');
	assert.equal(destinations.claude, 'https://claude.ai/new');
	assert.equal(
		destinations.claudeDesktop,
		'claude://claude.ai/new?q=%2Fcharactersheet%20Alex'
	);
});

test('copyPromptText copies the normalized prompt through the Clipboard API', async () => {
	let copied = '';
	const clipboard = {
		/** @param {string} value */
		async writeText(value) {
			copied = value;
		}
	};

	await copyPromptText('  /posepack\r\n', clipboard);

	assert.equal(copied, '/posepack');
});

test('copyPromptText falls back to a temporary textarea when Clipboard API is unavailable', async () => {
	let selected = false;
	let appended = false;
	let removed = false;
	const textarea = {
		value: '',
		style: {},
		setAttribute() {},
		select() {
			selected = true;
		}
	};
	const document = {
		body: {
			/** @param {unknown} node */
			appendChild(node) {
				appended = node === textarea;
			},
			/** @param {unknown} node */
			removeChild(node) {
				removed = node === textarea;
			}
		},
		/** @param {string} tagName */
		createElement(tagName) {
			assert.equal(tagName, 'textarea');
			return textarea;
		},
		/** @param {string} command */
		execCommand(command) {
			assert.equal(command, 'copy');
			return true;
		}
	};

	await copyPromptText(' /posepack\r\n', undefined, /** @type {Document} */ (document));

	assert.equal(textarea.value, '/posepack');
	assert.equal(selected, true);
	assert.equal(appended, true);
	assert.equal(removed, true);
});

test('copyPromptText reports when no copy mechanism is available', async () => {
	await assert.rejects(() => copyPromptText('/posepack', undefined, undefined), /Copy is not available/);
});
