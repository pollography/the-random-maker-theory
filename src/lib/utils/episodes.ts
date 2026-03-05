export interface Episode {
	slug: string;
	title: string;
	episodeNumber: number;
	date: string;
	description: string;
	audioUrl?: string;
	videoUrl?: string;
	draft: boolean;
	content?: string;
	duration?: string;
}

export async function getEpisodes(): Promise<Episode[]> {
	const episodes: Episode[] = [];

	const modules = import.meta.glob<{ metadata: Record<string, any>; default: any }>(
		'/src/content/podcast/*.md',
		{ eager: true }
	);

	for (const path in modules) {
		const module = modules[path];
		const metadata = module.metadata;

		if (!metadata.draft) {
			episodes.push({
				slug: metadata.slug,
				title: metadata.title,
				episodeNumber: metadata.episodeNumber,
				date: metadata.date,
				description: metadata.description,
				audioUrl: metadata.audioUrl,
				videoUrl: metadata.videoUrl,
				draft: metadata.draft || false,
				duration: metadata.duration,
			});
		}
	}

	// Sort by episode number descending (newest first)
	episodes.sort((a, b) => b.episodeNumber - a.episodeNumber);

	return episodes;
}

export async function getEpisode(slug: string): Promise<Episode | null> {
	const episodes = await getEpisodes();
	return episodes.find((ep) => ep.slug === slug) || null;
}

export async function getLatestEpisode(): Promise<Episode | null> {
	const episodes = await getEpisodes();
	return episodes[0] || null;
}
