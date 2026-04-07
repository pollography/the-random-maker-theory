import { getPosts } from '$lib/utils/posts';
import { getEpisodes } from '$lib/utils/episodes';
import { siteConfig } from '$lib/config';

const INDEXNOW_KEY = 'a8cd1f352fe04199ba9d31c95585c7fc';

export async function POST({ request }) {
	const authHeader = request.headers.get('authorization');
	if (authHeader !== `Bearer ${INDEXNOW_KEY}`) {
		return new Response('Unauthorized', { status: 401 });
	}

	const posts = await getPosts();
	const episodes = await getEpisodes();

	const urls = [
		siteConfig.url,
		`${siteConfig.url}/blog`,
		`${siteConfig.url}/podcast`,
		`${siteConfig.url}/about`,
		...posts.map(p => `${siteConfig.url}/blog/${p.slug}`),
		...episodes.map(e => `${siteConfig.url}/podcast/${e.slug}`),
	];

	const payload = {
		host: 'therandommakertheory.com',
		key: INDEXNOW_KEY,
		keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
		urlList: urls,
	};

	const res = await fetch('https://api.indexnow.org/IndexNow', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
		body: JSON.stringify(payload),
	});

	return new Response(
		JSON.stringify({
			status: res.status,
			statusText: res.statusText,
			urlCount: urls.length,
		}),
		{
			headers: { 'Content-Type': 'application/json' },
		}
	);
}
