export interface Post {
	slug: string;
	title: string;
	date: string;
	description: string;
	tags: string[];
	category: string;
	heroImage?: string;
	draft: boolean;
	content?: string;
	readingTime?: number;
}

export async function getPosts(): Promise<Post[]> {
	const posts: Post[] = [];

	const modules = import.meta.glob<{ metadata: Record<string, any>; default: any }>(
		'/src/content/blog/*.md',
		{ eager: true }
	);

	for (const path in modules) {
		const module = modules[path];
		const metadata = module.metadata;

		if (!metadata.draft) {
			posts.push({
				slug: metadata.slug,
				title: metadata.title,
				date: metadata.date,
				description: metadata.description,
				tags: metadata.tags || [],
				category: metadata.category || 'general',
				heroImage: metadata.heroImage,
				draft: metadata.draft || false,
				readingTime: metadata.readingTime || calculateReadingTime(module.default?.toString() || ''),
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

function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute);
}
