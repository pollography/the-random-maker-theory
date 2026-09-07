import { json } from '@sveltejs/kit';
import { buildSiteSearchIndex } from '$lib/server/search-index.js';

export const prerender = true;

export async function GET() {
	return json(
		{ version: 1, records: await buildSiteSearchIndex() },
		{ headers: { 'cache-control': 'public, max-age=0, must-revalidate' } }
	);
}
