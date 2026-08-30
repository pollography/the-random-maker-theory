/**
 * Normalize prompt text without changing its internal formatting.
 *
 * @param {string} value
 * @returns {string}
 */
export function cleanPromptText(value) {
	return value.replace(/\r\n?/g, '\n').trim();
}

/**
 * Return the stable destinations used by prompt action links.
 * Web destinations intentionally do not claim to prefill a chat.
 *
 * @param {string} prompt
 */
export function getPromptDestinations(prompt) {
	const cleanPrompt = cleanPromptText(prompt);

	return {
		chatgpt: 'https://chatgpt.com/',
		claude: 'https://claude.ai/new',
		claudeDesktop: `claude://claude.ai/new?q=${encodeURIComponent(cleanPrompt)}`
	};
}

/**
 * Copy a prompt using the secure-context Clipboard API.
 *
 * @param {string} prompt
 * @param {{ writeText(value: string): Promise<void> } | undefined} clipboard
 * @param {Document | undefined} [documentLike]
 */
export async function copyPromptText(prompt, clipboard, documentLike) {
	const cleanPrompt = cleanPromptText(prompt);

	if (clipboard?.writeText) {
		try {
			await clipboard.writeText(cleanPrompt);
			return;
		} catch {
			// Fall through to the selection-based copy path.
		}
	}

	if (!documentLike?.body || typeof documentLike.execCommand !== 'function') {
		throw new Error('Copy is not available');
	}

	const textarea = documentLike.createElement('textarea');
	textarea.value = cleanPrompt;
	textarea.setAttribute('readonly', '');
	textarea.style.position = 'fixed';
	textarea.style.opacity = '0';
	textarea.style.pointerEvents = 'none';
	documentLike.body.appendChild(textarea);

	try {
		textarea.select();
		if (!documentLike.execCommand('copy')) {
			throw new Error('Copy is not available');
		}
	} finally {
		documentLike.body.removeChild(textarea);
	}
}
