import { error, json } from '@sveltejs/kit';
import { createArchivePageData } from '$lib/utils/blog-pagination.js';
import { getPosts } from '$lib/utils/posts';
import type { EntryGenerator, RequestHandler } from './$types';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	const { totalPages } = createArchivePageData(await getPosts(), 1);
	return Array.from({ length: totalPages - 1 }, (_, index) => ({ page: String(index + 2) }));
};

export const GET: RequestHandler = async ({ params }) => {
	if (!/^[1-9]\d*$/.test(params.page)) error(404);

	const pageNumber = Number(params.page);
	if (!Number.isSafeInteger(pageNumber) || pageNumber < 2) error(404);

	try {
		return json(createArchivePageData(await getPosts(), pageNumber), {
			headers: { 'cache-control': 'public, max-age=0, must-revalidate' }
		});
	} catch (cause) {
		if (cause instanceof RangeError) error(404);
		throw cause;
	}
};
