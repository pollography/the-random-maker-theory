import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 5174,
		strictPort: true,
	},
	build: {
		// 44 blog posts were bundling into one ~1 MB chunk because mdsvex
		// output looked like a single module to rollup. Splitting per slug
		// means the client only downloads the post it is reading, not all
		// of them on first navigation.
		rollupOptions: {
			output: {
				manualChunks(id) {
					const m = id.match(/[\\/]content[\\/](blog|podcast)[\\/]([^\\/]+)\.md/);
					if (m) return `content-${m[1]}-${m[2]}`;
				},
			},
		},
		// Quiet the default 500kB warning — per-post chunks sit well below it
		// and the prerender adapter still merges server output per function.
		chunkSizeWarningLimit: 700,
	},
});
