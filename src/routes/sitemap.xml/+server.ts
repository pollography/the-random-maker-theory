import { getPosts } from '$lib/utils/posts';
import { getEpisodes } from '$lib/utils/episodes';
import { CORE_TOPIC_SLUGS } from '$lib/data/core-topics';
import { siteConfig } from '$lib/config';
import promptData from '$lib/data/image-prompts.json';
import { blogImageUsage } from '$lib/data/blog-image-usage.generated.js';
import { getPublicPrompts } from '$lib/utils/prompt-library.js';
import { escapeXml, renderImageEntries } from '$lib/utils/image-sitemap.js';

export async function GET() {
	const posts = await getPosts();
	const episodes = await getEpisodes();
	const libraryImages = getPublicPrompts(promptData).map((prompt) => prompt.image);

	// Use most recent post date for dynamic pages
	const latestPostDate = posts.length > 0
		? new Date(posts[0].date).toISOString()
		: new Date().toISOString();

	// Filter posts with valid required fields
	const validPosts = posts.filter(p => p.title && p.slug && p.date && p.description);
	const postImages = new Map(validPosts.map((post) => [
		post.slug,
		blogImageUsage[post.slug] ?? (post.heroImage ? [post.heroImage] : [])
	]));
	const allHeroImages = validPosts.flatMap((post) => post.heroImage ? [post.heroImage] : []);

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteConfig.url}</loc>
    <lastmod>${latestPostDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    ${renderImageEntries(allHeroImages.slice(0, 12), siteConfig.url)}
  </url>
  <url>
    <loc>${siteConfig.url}/blog</loc>
    <lastmod>${latestPostDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    ${renderImageEntries(allHeroImages, siteConfig.url)}
  </url>
  <url>
    <loc>${siteConfig.url}/tools/bildprompt-library</loc>
    <lastmod>${latestPostDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${renderImageEntries(libraryImages, siteConfig.url)}
  </url>
  <url>
    <loc>${siteConfig.url}/podcast</loc>
    <lastmod>${latestPostDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteConfig.url}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${siteConfig.url}/bildrechte</loc>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>
  ${validPosts
		.map(
			(post) => `
  <url>
    <loc>${siteConfig.url}/blog/${escapeXml(post.slug)}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    ${renderImageEntries(postImages.get(post.slug) ?? [], siteConfig.url)}
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
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    ${renderImageEntries(
			episode.blogSlug ? postImages.get(episode.blogSlug) ?? ['/images/og/default.webp'] : ['/images/og/default.webp'],
			siteConfig.url
		)}
  </url>
  `
		)
		.join('')}
	${CORE_TOPIC_SLUGS
		.map(
			(tag) => `
  <url>
    <loc>${siteConfig.url}/tags/${escapeXml(tag)}</loc>
    <lastmod>${latestPostDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    ${renderImageEntries(
			validPosts.filter((post) => post.tags.includes(tag)).flatMap((post) => post.heroImage ? [post.heroImage] : []),
			siteConfig.url
		)}
  </url>
  `
		)
		.join('')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600',
		},
	});
}
