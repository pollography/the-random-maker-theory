import adapter from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			layout: {
				blog: './src/lib/components/layout/BlogLayout.svelte',
				podcast: './src/lib/components/layout/PodcastLayout.svelte'
			}
		})
	],
	kit: {
		adapter: adapter({
			runtime: 'nodejs22.x'
		})
	}
};

export default config;
