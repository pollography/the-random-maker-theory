export interface Post {
	slug: string;
	title: string;
	titleAccent?: string;
	date: string;
	description: string;
	tags: string[];
	category: string;
	heroImage?: string;
	heroImageThumb?: string;
	draft: boolean;
	content?: string;
	readingTime?: number;
	podcastSlug?: string;
	podcastUrl?: string;
	videoUrl?: string;
}

export async function getPosts(): Promise<Post[]> {
	const posts: Post[] = [];

	// Metadata-only import — avoids bundling full rendered blog HTML (saves ~1MB/chunk).
	// Full post content is loaded on demand via dynamic import in getPost(slug).
	const metadataModules = import.meta.glob<Record<string, any>>(
		'/src/content/blog/*.md',
		{ eager: true, import: 'metadata' }
	);

	for (const path in metadataModules) {
		const metadata = metadataModules[path];

		if (!metadata) {
			console.warn(`[getPosts] Skipping ${path}: no metadata (mdsvex parse error?)`);
			continue;
		}

		if (!metadata.draft) {
			posts.push({
				slug: metadata.slug,
				title: metadata.title,
				titleAccent: metadata.titleAccent || '',
				date: metadata.date,
				description: metadata.description,
				tags: metadata.tags || [],
				category: metadata.category || 'general',
				heroImage: metadata.heroImage,
				heroImageThumb: metadata.heroImageThumb,
				draft: metadata.draft || false,
				readingTime: typeof metadata.readingTime === 'number' ? metadata.readingTime : undefined,
				podcastSlug: metadata.podcastSlug,
				podcastUrl: metadata.podcastUrl,
				videoUrl: metadata.videoUrl,
			});
		}
	}

	// Sort by date newest first
	posts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	return posts;
}

export async function getPost(slug: string): Promise<Post | null> {
	const posts = await getPosts();
	return posts.find((post) => post.slug === slug) || null;
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
	const posts = await getPosts();
	return posts.filter((post) => post.tags.includes(tag));
}

export async function getAllTags(): Promise<string[]> {
	const posts = await getPosts();
	const tags = new Set<string>();
	posts.forEach((post) => {
		post.tags.forEach((tag) => tags.add(tag));
	});
	return Array.from(tags).sort();
}

