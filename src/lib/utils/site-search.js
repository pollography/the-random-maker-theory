export const SEARCH_QUERY_MAX_LENGTH = 160;
const SEARCH_TEXT_MAX_LENGTH = 500_000;

const VALID_TYPES = new Set(['article', 'podcast', 'tool']);
const VALID_URL = /^\/(blog|podcast|tools)\/[a-z0-9][a-z0-9-/]*$/;

export function normalizeSearchText(value) {
	return String(value ?? '')
		.slice(0, SEARCH_TEXT_MAX_LENGTH)
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/ß/g, 'ss')
		.replace(/[^a-z0-9]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

export function extractSearchDocument(source) {
	const withoutPrivate = String(source ?? '')
		.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '\n')
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
		.replace(/<style\b[\s\S]*?<\/style>/gi, ' ');
	const headings = Array.from(
		withoutPrivate.matchAll(/^#{2,6}\s+(.+)$/gm),
		(match) => match[1].replace(/[*_`]/g, '').trim()
	).filter(Boolean);
	const plain = withoutPrivate
		.replace(/!\[([^\]]*)\]\([^)]*\)/g, ' $1 ')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, ' $1 ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/[#>*_`~|\-]+/g, ' ');
	const bodyTokens = [...new Set(
		normalizeSearchText(plain).split(' ').filter((token) => token.length > 1)
	)].join(' ');

	return { headings, bodyTokens };
}

export function isSearchRecord(value) {
	return Boolean(
		value
		&& VALID_TYPES.has(value.type)
		&& typeof value.slug === 'string'
		&& value.slug.length > 0
		&& typeof value.url === 'string'
		&& VALID_URL.test(value.url)
		&& typeof value.title === 'string'
		&& value.title.length > 0
		&& typeof value.description === 'string'
		&& Array.isArray(value.tags)
		&& value.tags.every((tag) => typeof tag === 'string')
		&& typeof value.category === 'string'
		&& Array.isArray(value.headings)
		&& value.headings.every((heading) => typeof heading === 'string')
		&& typeof value.bodyTokens === 'string'
		&& typeof value.date === 'string'
	);
}

export function createSearchRecord(input) {
	const record = {
		type: input?.type,
		slug: String(input?.slug ?? ''),
		url: String(input?.url ?? ''),
		title: String(input?.title ?? ''),
		description: String(input?.description ?? ''),
		tags: Array.isArray(input?.tags) ? input.tags.map(String) : [],
		category: String(input?.category ?? ''),
		headings: Array.isArray(input?.headings) ? input.headings.map(String) : [],
		bodyTokens: String(input?.bodyTokens ?? ''),
		date: String(input?.date ?? '')
	};

	if (!isSearchRecord(record)) throw new TypeError('Invalid public search record');
	return record;
}

function normalizedTagMatches(record, tag) {
	const normalizedTag = normalizeSearchText(tag);
	return record.tags.some((candidate) => normalizeSearchText(candidate) === normalizedTag);
}

export function searchSiteIndex(records, query, { types, tag, limit = 12 } = {}) {
	const normalizedQuery = normalizeSearchText(String(query ?? '').slice(0, SEARCH_QUERY_MAX_LENGTH));
	if (!normalizedQuery || !Array.isArray(records)) return [];

	const tokens = normalizedQuery.split(' ');
	const typeSet = Array.isArray(types) ? new Set(types) : null;
	const boundedLimit = Math.max(0, Math.min(Number(limit) || 12, 24));

	return records
		.filter(isSearchRecord)
		.filter((record) => !typeSet || typeSet.has(record.type))
		.filter((record) => !tag || normalizedTagMatches(record, tag))
		.map((record) => {
			const title = normalizeSearchText(record.title);
			const tags = normalizeSearchText(`${record.tags.join(' ')} ${record.category}`);
			const headings = normalizeSearchText(record.headings.join(' '));
			const description = normalizeSearchText(record.description);
			const body = record.bodyTokens;
			const fields = [title, tags, headings, description, body];

			if (!tokens.every((token) => fields.some((field) => field.includes(token)))) return null;

			let score = title === normalizedQuery ? 160 : title.startsWith(normalizedQuery) ? 120 : 0;
			for (const token of tokens) {
				if (title.includes(token)) score += 40;
				if (tags.includes(token)) score += 24;
				if (headings.includes(token)) score += 18;
				if (description.includes(token)) score += 12;
				if (body.split(' ').includes(token)) score += 4;
			}

			const matchedHeading = record.headings.find((heading) =>
				tokens.some((token) => normalizeSearchText(heading).includes(token))
			);
			return { ...record, score, excerpt: matchedHeading || record.description };
		})
		.filter(Boolean)
		.sort((a, b) =>
			b.score - a.score
			|| String(b.date).localeCompare(String(a.date))
			|| a.title.localeCompare(b.title, 'de')
			|| a.url.localeCompare(b.url)
		)
		.slice(0, boundedLimit);
}
