import { getEpisodes } from '$lib/utils/episodes';
import { siteConfig } from '$lib/config';

export async function GET() {
	const episodes = await getEpisodes();
	const publishedEpisodes = episodes.filter((ep) => ep.audioUrl && ep.audioUrl.trim() !== '');

	const items = publishedEpisodes
		.map(
			(ep) => `
    <item>
      <title>${escapeXml(ep.title)}</title>
      <link>${siteConfig.url}/podcast/${ep.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/podcast/${ep.slug}</guid>
      <pubDate>${new Date(ep.date).toUTCString()}</pubDate>
      <description>${escapeXml(ep.description)}</description>
      <content:encoded><![CDATA[${ep.description}]]></content:encoded>
      <itunes:title>${escapeXml(ep.title)}</itunes:title>
      <itunes:author>${siteConfig.audio.author}</itunes:author>
      <itunes:summary>${escapeXml(ep.description)}</itunes:summary>
      ${ep.duration ? `<itunes:duration>${ep.duration}</itunes:duration>` : ''}
      <itunes:episodeType>full</itunes:episodeType>
      ${ep.episodeNumber ? `<itunes:episode>${ep.episodeNumber}</itunes:episode>` : ''}
      <itunes:explicit>false</itunes:explicit>
      <enclosure url="${ep.audioUrl}" type="audio/mpeg" length="0" />
    </item>`
		)
		.join('\n');

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:podcast="https://podcastindex.org/namespace/1.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <language>${siteConfig.language}</language>
    <description>${escapeXml(siteConfig.audio.showDescription)}</description>
    <copyright>© ${new Date().getFullYear()} ${siteConfig.audio.author}</copyright>
    <itunes:author>${siteConfig.audio.author}</itunes:author>
    <itunes:owner>
      <itunes:name>${siteConfig.audio.author}</itunes:name>
      <itunes:email>${siteConfig.audio.email}</itunes:email>
    </itunes:owner>
    <itunes:image href="${siteConfig.url}/images/podcast-cover.jpg" />
    <itunes:explicit>false</itunes:explicit>
    <itunes:type>episodic</itunes:type>
    <itunes:category text="Technology">
      <itunes:category text="Tech News" />
    </itunes:category>
    ${items}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}

function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
