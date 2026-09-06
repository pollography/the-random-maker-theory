/**
 * @typedef {Object} PromptLibraryEntry
 * @property {string} id
 * @property {string} command
 * @property {string} title
 * @property {string} category
 * @property {string} status
 * @property {string | null} image
 * @property {string | null} [displayImage]
 * @property {string | null} alt
 * @property {string | null} articleSlug
 * @property {string[]} useCases
 * @property {string} [promptType]
 * @property {string} [promptText]
 * @property {string} [controlledPromptText]
 * @property {string} [controlledImage]
 * @property {string} [controlledAlt]
 * @property {string} [controlledEvidenceStatus]
 * @property {string} [comparisonVerdict]
 * @property {string} [comparisonReason]
 * @property {string} [controlledInputNote]
 * @property {Partial<Record<string, string>>} [controlledExampleValues]
 * @property {string} [controlledSecondaryPromptText]
 * @property {string} [controlledSecondaryLabel]
 * @property {Partial<Record<string, string>>} [controlledSecondaryExampleValues]
 * @property {string} [series]
 * @property {string} [verdict]
 */

/**
 * Return only entries that are safe to render publicly.
 *
 * @param {{ prompts?: PromptLibraryEntry[] }} data
 * @returns {Array<PromptLibraryEntry & { image: string, alt: string, articleSlug: string }>}
 */
export function getPublicPrompts(data) {
	return /** @type {Array<PromptLibraryEntry & { image: string, alt: string, articleSlug: string }>} */ (
		(data.prompts ?? []).filter((prompt) => prompt.status === 'tested' && Boolean(prompt.image))
	);
}

/**
 * Filter public prompts by category and a case-insensitive free-text query.
 *
 * @param {Array<{ command: string, promptText?: string, controlledPromptText?: string, controlledSecondaryPromptText?: string, controlledSecondaryLabel?: string, title: string, category: string, useCases: string[] }>} prompts
 * @param {Array<{ id: string, label: string }>} categories
 * @param {string} [query]
 * @param {string} [categoryId]
 */
export function filterPrompts(prompts, categories, query = '', categoryId = 'all') {
	const categoryLabels = new Map(categories.map((category) => [category.id, category.label]));
	const terms = query.trim().toLocaleLowerCase('de-DE').split(/\s+/).filter(Boolean);

	return prompts.filter((prompt) => {
		if (categoryId !== 'all' && prompt.category !== categoryId) return false;
		if (terms.length === 0) return true;

		const haystack = [
			prompt.command,
			prompt.promptText ?? '',
			prompt.controlledPromptText ?? '',
			prompt.controlledSecondaryLabel ?? '',
			prompt.controlledSecondaryPromptText ?? '',
			prompt.title,
			categoryLabels.get(prompt.category) ?? '',
			...(prompt.useCases ?? [])
		]
			.join(' ')
			.toLocaleLowerCase('de-DE');

		return terms.every((term) => haystack.includes(term));
	});
}

/**
 * Tell the card whether a query matched normal card content or only the
 * otherwise collapsed controlled prompt.
 *
 * @param {{ command: string, promptText?: string, controlledPromptText?: string, controlledSecondaryPromptText?: string, controlledSecondaryLabel?: string, title: string, category: string, useCases: string[] }} prompt
 * @param {Array<{ id: string, label: string }>} categories
 * @param {string} [query]
 * @returns {'visible' | 'controlled' | 'none'}
 */
export function getPromptSearchMatch(prompt, categories, query = '') {
	const terms = query.trim().toLocaleLowerCase('de-DE').split(/\s+/).filter(Boolean);
	if (terms.length === 0) return 'visible';

	const categoryLabel = categories.find((category) => category.id === prompt.category)?.label ?? '';
	const visibleHaystack = [
		prompt.command,
		prompt.promptText ?? '',
		prompt.title,
		categoryLabel,
		...(prompt.useCases ?? [])
	]
		.join(' ')
		.toLocaleLowerCase('de-DE');
	const controlledHaystack = [
		prompt.controlledPromptText ?? '',
		prompt.controlledSecondaryLabel ?? '',
		prompt.controlledSecondaryPromptText ?? ''
	]
		.join(' ')
		.toLocaleLowerCase('de-DE');
	if (terms.every((term) => visibleHaystack.includes(term))) return 'visible';
	if (terms.every((term) => `${visibleHaystack} ${controlledHaystack}`.includes(term))) return 'controlled';
	return 'none';
}

/**
 * Fill every explicit [[FIELD]] in a reusable prompt with documented demo
 * values. Unknown fields remain visible instead of disappearing silently.
 *
 * @param {string} promptText
 * @param {Partial<Record<string, string>>} [exampleValues]
 */
export function fillPromptTemplate(promptText, exampleValues = {}) {
	return promptText.replace(/\[\[([^\]]+)\]\]/g, (placeholder, field) => {
		return exampleValues[field]?.trim() || placeholder;
	});
}

/**
 * Return the text that reproduces the tested result.
 * Existing one-word entries copy their slash command; detailed entries copy
 * the full tested prompt instead of pretending the mnemonic is a model command.
 *
 * @param {{ promptText?: string, controlledPromptText?: string, controlledExampleValues?: Partial<Record<string, string>>, command: string }} prompt
 * @param {'short' | 'controlled' | 'controlled-example'} [variant]
 */
export function getPromptCopyText(prompt, variant = 'short') {
	if (variant === 'controlled-example' && prompt.controlledPromptText?.trim()) {
		return fillPromptTemplate(prompt.controlledPromptText.trim(), prompt.controlledExampleValues);
	}
	if (variant === 'controlled' && prompt.controlledPromptText?.trim()) {
		return prompt.controlledPromptText.trim();
	}
	return prompt.promptText?.trim() || prompt.command;
}

/**
 * Count visible prompts per category.
 *
 * @param {Array<{ category: string }>} prompts
 * @param {Array<{ id: string }>} categories
 */
export function getCategoryCounts(prompts, categories) {
	const counts = Object.fromEntries(categories.map((category) => [category.id, 0]));
	counts.all = prompts.length;

	for (const prompt of prompts) {
		if (Object.hasOwn(counts, prompt.category)) counts[prompt.category] += 1;
	}

	return counts;
}

/**
 * Resolve the compact card asset while keeping the canonical image for the lightbox.
 *
 * @param {string} imagePath
 */
export function getPromptThumbnail(imagePath) {
	const filename = imagePath.split('/').at(-1);
	return `/images/blog/ki-bildprompts/thumbs/${filename}`;
}

/**
 * Validate the canonical data without importing Node-only filesystem modules.
 * Tests and local generators can inject an image check.
 *
 * @param {{ categories?: Array<{ id: string, label: string }>, prompts?: PromptLibraryEntry[] }} data
 * @param {{ imageExists?: (imagePath: string) => boolean }} [options]
 */
export function validatePromptLibrary(data, options = {}) {
	const errors = [];
	const categories = data.categories ?? [];
	const prompts = data.prompts ?? [];
	const categoryIds = new Set(categories.map((category) => category.id));
	const seenIds = new Set();
	const seenCommands = new Set();

	for (const category of categories) {
		if (!category.id || !category.label) errors.push('Every category needs an id and label.');
	}

	for (const prompt of prompts) {
		if (!prompt.id) errors.push('Every prompt needs an id.');
		if (!prompt.command?.startsWith('/')) errors.push(`${prompt.id ?? 'Unknown prompt'} needs a slash command.`);
		if (!categoryIds.has(prompt.category)) errors.push(`${prompt.command ?? prompt.id} uses an unknown category.`);
		if (!Array.isArray(prompt.useCases)) errors.push(`${prompt.command ?? prompt.id} needs useCases.`);

		if (seenIds.has(prompt.id)) errors.push(`Duplicate prompt id: ${prompt.id}`);
		if (seenCommands.has(prompt.command)) errors.push(`Duplicate prompt command: ${prompt.command}`);
		seenIds.add(prompt.id);
		seenCommands.add(prompt.command);

		if (prompt.status === 'tested') {
			if (!prompt.image) errors.push(`${prompt.command} is tested but has no image.`);
			if (!prompt.articleSlug) errors.push(`${prompt.command} is tested but has no article.`);
			if (prompt.image && options.imageExists && !options.imageExists(prompt.image)) {
				errors.push(`${prompt.command} references a missing image: ${prompt.image}`);
			}
			if (prompt.displayImage && options.imageExists && !options.imageExists(prompt.displayImage)) {
				errors.push(`${prompt.command} references a missing display image: ${prompt.displayImage}`);
			}
			if (prompt.promptType === 'detailed' && !prompt.promptText?.trim()) {
				errors.push(`${prompt.command} is detailed but has no full prompt text.`);
			}
			const controlledFields = [prompt.controlledPromptText, prompt.controlledImage, prompt.controlledAlt];
			if (controlledFields.some(Boolean) && !controlledFields.every((value) => value?.trim())) {
				errors.push(`${prompt.command} has an incomplete controlled variant.`);
			}
			if (prompt.controlledPromptText?.trim() && /Ein-Wort-Ergebnis|Kurzprompt-Ergebnis/i.test(prompt.controlledPromptText)) {
				errors.push(`${prompt.command} controlled variant depends on the short result.`);
			}
			if (prompt.controlledPromptText?.trim()) {
				if (!['direction', 'retested'].includes(prompt.controlledEvidenceStatus ?? '')) {
					errors.push(`${prompt.command} needs a controlled evidence status.`);
				}
				if (!['short', 'controlled', 'depends'].includes(prompt.comparisonVerdict ?? '')) {
					errors.push(`${prompt.command} needs a comparison verdict.`);
				}
				if (!prompt.comparisonReason?.trim()) errors.push(`${prompt.command} needs a comparison reason.`);
				if (!prompt.controlledInputNote?.trim()) errors.push(`${prompt.command} needs a controlled input note.`);

				const placeholders = [
					...prompt.controlledPromptText.matchAll(/\[\[([^\]]+)\]\]/g)
				].map((match) => match[1]);
				if (placeholders.length > 0) {
					const keys = Object.keys(prompt.controlledExampleValues ?? {}).sort();
					const expected = [...new Set(placeholders)].sort();
					if (JSON.stringify(keys) !== JSON.stringify(expected)) {
						errors.push(`${prompt.command} example fields do not match its placeholders.`);
					}
				}
				const secondaryPlaceholders = [
					...(prompt.controlledSecondaryPromptText ?? '').matchAll(/\[\[([^\]]+)\]\]/g)
				].map((match) => match[1]);
				if (secondaryPlaceholders.length > 0) {
					const keys = Object.keys(prompt.controlledSecondaryExampleValues ?? {}).sort();
					const expected = [...new Set(secondaryPlaceholders)].sort();
					if (JSON.stringify(keys) !== JSON.stringify(expected)) {
						errors.push(`${prompt.command} secondary example fields do not match its placeholders.`);
					}
				}
			}
			if (
				prompt.controlledImage &&
				options.imageExists &&
				!options.imageExists(prompt.controlledImage)
			) {
				errors.push(`${prompt.command} references a missing controlled image: ${prompt.controlledImage}`);
			}
		} else if (prompt.status !== 'idea') {
			errors.push(`${prompt.command ?? prompt.id} has an unsupported status.`);
		}
	}

	return errors;
}
