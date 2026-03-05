import { getPosts } from '$lib/utils/posts';
import { getEpisodes } from '$lib/utils/episodes';
import { getAllTags } from '$lib/utils/posts';
import { siteConfig } from '$lib/config';

function escapeXml(unsafe: string) {
	return unsafe.replace(/[<>&'"]/g, (c) => {
		switch (c) {
			case '<':
				return '&lt;';
			case '>':
				return '&gt;';
			case '&':
				return '&amp;';
			case "'":
				return '&apos;';
			case '"':
				return '&quot;';
		}
		return c;
	});
}

export async function GET() {
	const posts = await getPosts();
	const episodes = await getEpisodes();
	const tags = await getAllTags();

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteConfig.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteConfig.url}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteConfig.url}/podcast</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteConfig.url}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  ${posts
		.map(
			(post) => `
  <url>
    <loc>${siteConfig.url}/blog/${escapeXml(post.slug)}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>never</changefreq>
    <priority>0.8</priority>
  </url>
  `
		)
		.join('')}
  ${episodes
		.map(
			(episode) => `
  <url>
    <loc>${siteConfig.url}/podcast/${escapeXml(episode.slug)}</loc>
    <lastmod>${new Date(episode.date).toISOString()}</lastmod>
    <changefreq>never</changefreq>
    <priority>0.8</priority>
  </url>
  `
		)
		.join('')}
  ${tags
		.map(
			(tag) => `
  <url>
    <loc>${siteConfig.url}/tags/${escapeXml(tag)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>
  `
		)
		.join('')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
		},
	});
}
