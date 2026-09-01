import adapter from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';
import { rehypeImageSeo } from './src/lib/utils/rehype-image-seo.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [rehypeImageSeo],
			layout: {
				blog: './src/lib/components/layout/BlogLayout.svelte',
				podcast: './src/lib/components/layout/PodcastLayout.svelte'
			}
		})
	],
	kit: {
		adapter: adapter({
			runtime: 'nodejs22.x'
		}),
		prerender: {
			// Broken internal links surface as warnings so authors can fix in follow-ups,
			// but a single stale href doesn't gate an otherwise-green deploy.
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	}
};

export default config;
