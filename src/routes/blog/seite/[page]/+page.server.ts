import { error } from '@sveltejs/kit';
import { createArchivePageData } from '$lib/utils/blog-pagination.js';
import { getPosts } from '$lib/utils/posts';

export const prerender = true;

export async function entries() {
	const { totalPages } = createArchivePageData(await getPosts(), 1);
	return Array.from({ length: totalPages - 1 }, (_, index) => ({ page: String(index + 2) }));
}

export async function load({ params }) {
	if (!/^[1-9]\d*$/.test(params.page)) {
		error(404);
	}

	const pageNumber = Number(params.page);
	if (!Number.isSafeInteger(pageNumber) || pageNumber < 2) {
		error(404);
	}

	try {
		return createArchivePageData(await getPosts(), pageNumber);
	} catch (cause) {
		if (cause instanceof RangeError) {
			error(404);
		}

		throw cause;
	}
}
