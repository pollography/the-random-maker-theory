import { getPosts } from '$lib/utils/posts';
import { siteConfig } from '$lib/config';
import { Feed } from 'feed';

export async function GET() {
	const posts = await getPosts();

	const feed = new Feed({
		title: siteConfig.name,
		description: siteConfig.description,
		id: siteConfig.url,
		link: siteConfig.url,
		language: siteConfig.language,
		image: `${siteConfig.url}/favicon.svg`,
		favicon: `${siteConfig.url}/favicon.svg`,
		copyright: `© ${new Date().getFullYear()} ${siteConfig.author}`,
		author: {
			name: siteConfig.author,
			link: siteConfig.url,
		},
	});

	posts.forEach((post) => {
		feed.addItem({
			title: post.title,
			id: `${siteConfig.url}/blog/${post.slug}`,
			link: `${siteConfig.url}/blog/${post.slug}`,
			description: post.description,
			content: post.description,
			author: [
				{
					name: siteConfig.author,
				},
			],
			date: new Date(post.date),
			category: post.tags?.map((tag) => ({
				name: tag,
			})),
		});
	});

	return new Response(feed.rss2(), {
		headers: {
			'Content-Type': 'application/rss+xml',
		},
	});
}
