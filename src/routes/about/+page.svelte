<script>
	import { siteConfig } from '$lib/config';
</script>

<svelte:head>
	<title>Über uns — {siteConfig.name}</title>
	<meta name="description" content="Lerne mehr über {siteConfig.name}" />
</svelte:head>

<section class="py-12 space-y-12 max-w-3xl">
	<div class="space-y-4">
		<h1 class="text-5xl font-display font-extrabold">Über The Random Maker Theory</h1>
		<p class="text-xl text-text-muted">
			Wir erklären KI-News, Tools und Tutorials in echten Worten.
		</p>
	</div>

	<div class="prose prose-invert max-w-none space-y-8">
		<div>
			<h2>Was ist TRMT?</h2>
			<p>
				The Random Maker Theory ist dein wöchentliches Update zur Welt der künstlichen Intelligenz. Wir
				sprechen über neue Tools, Breaking News und praktische Tutorials. Ohne Buzzword-Bullshit.
			</p>
		</div>

		<div>
			<h2>Wer steckt dahinter?</h2>
			<p>
				Gegründet von Pollo, 40, ENFP, mit 15 Jahren Fotografie-, Social Media- und Community-Erfahrung.
				Unterstützt von unserem Team und natürlich von unseren KI-Freunden.
			</p>
		</div>

		<div>
			<h2>Warum TRMT?</h2>
			<p>
				Die KI-Landschaft ändert sich täglich. Wir machen es verständlich. Nicht für Tech-Experten,
				sondern für Menschen, die einfach wissen möchten, was gerade los ist.
			</p>
		</div>

		<div>
			<h2>Unsere Mission</h2>
			<p>
				KI demokratisieren. Jede Woche neuen Content. Blog-Posts, Podcast-Episoden, Videos. Alles
				transparent, hilfrerich und witzig.
			</p>
		</div>
	</div>

	<!-- Social Links -->
	<div class="space-y-6">
		<h2 class="text-2xl font-display font-bold">Folge uns</h2>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
			<a
				href={siteConfig.social.twitter}
				target="_blank"
				rel="noreferrer"
				class="p-4 border border-border-subtle rounded-lg text-center hover:bg-surface-raised transition-colors"
			>
				<div class="font-semibold">Twitter</div>
				<div class="text-text-muted text-sm">@randommakertheory</div>
			</a>
			<a
				href={siteConfig.social.instagram}
				target="_blank"
				rel="noreferrer"
				class="p-4 border border-border-subtle rounded-lg text-center hover:bg-surface-raised transition-colors"
			>
				<div class="font-semibold">Instagram</div>
				<div class="text-text-muted text-sm">@therandommakertheory</div>
			</a>
			<a
				href={siteConfig.social.youtube}
				target="_blank"
				rel="noreferrer"
				class="p-4 border border-border-subtle rounded-lg text-center hover:bg-surface-raised transition-colors"
			>
				<div class="font-semibold">YouTube</div>
				<div class="text-text-muted text-sm">@therandommakertheory</div>
			</a>
			<a
				href={siteConfig.social.spotify}
				target="_blank"
				rel="noreferrer"
				class="p-4 border border-border-subtle rounded-lg text-center hover:bg-surface-raised transition-colors"
			>
				<div class="font-semibold">Spotify</div>
				<div class="text-text-muted text-sm">Podcast</div>
			</a>
		</div>
	</div>
</section>

<style>
	:global(.prose h2) {
		font-size: 1.875rem;
		font-weight: 700;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}

	:global(.prose p) {
		line-height: 1.65;
		margin-bottom: 1rem;
	}
</style>
