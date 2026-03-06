<script>
	/**
	 * ComparisonTable — Affiliate-Vergleichstabelle
	 *
	 * Usage:
	 * <ComparisonTable
	 *   title="Die besten KI-Textgeneratoren 2026"
	 *   disclaimer="Einige Links sind Affiliate-Links (Werbung). Für dich ändert sich der Preis nicht."
	 *   items={[
	 *     {
	 *       name: "Copy.ai",
	 *       badge: "Testsieger",
	 *       image: "/images/tools/copyai.webp",
	 *       price: "Ab $49/Monat",
	 *       priceFree: true,
	 *       rating: 4.5,
	 *       pros: ["Beste deutsche Texte", "Team-Features", "100+ Templates"],
	 *       cons: ["Kein Offline-Modus", "Teuer im Pro-Plan"],
	 *       features: { "Sprachen": "25+", "Templates": "100+", "API": "Ja" },
	 *       ctaText: "Kostenlos testen",
	 *       ctaUrl: "https://...",
	 *       affiliate: true
	 *     }
	 *   ]}
	 * />
	 */

	let { title = '', disclaimer = '', items = [] } = $props();

	function renderStars(rating) {
		const full = Math.floor(rating);
		const half = rating % 1 >= 0.5;
		const empty = 5 - full - (half ? 1 : 0);
		return { full, half, empty };
	}
</script>

{#if disclaimer}
	<div class="disclaimer">
		<span class="disclaimer-icon">*</span>
		{disclaimer}
	</div>
{/if}

{#if title}
	<h3 class="table-title">{title}</h3>
{/if}

<div class="comparison-grid">
	{#each items as item, i (item.name)}
		<div class="tool-card" class:featured={item.badge}>
			{#if item.badge}
				<div class="badge">{item.badge}</div>
			{/if}

			<div class="tool-header">
				{#if item.image}
					<img src={item.image} alt={item.name} class="tool-logo" loading="lazy" />
				{/if}
				<h4 class="tool-name">{item.name}</h4>
			</div>

			<!-- Rating -->
			<div class="rating">
				{@const stars = renderStars(item.rating || 0)}
				{#each Array(stars.full) as _}
					<span class="star full">★</span>
				{/each}
				{#if stars.half}
					<span class="star half">★</span>
				{/if}
				{#each Array(stars.empty) as _}
					<span class="star empty">★</span>
				{/each}
				<span class="rating-number">{item.rating}/5</span>
			</div>

			<!-- Price -->
			<div class="price-row">
				<span class="price">{item.price}</span>
				{#if item.priceFree}
					<span class="free-badge">Free-Tier</span>
				{/if}
			</div>

			<!-- Features -->
			{#if item.features}
				<div class="features-grid">
					{#each Object.entries(item.features) as [key, value]}
						<div class="feature-item">
							<span class="feature-label">{key}</span>
							<span class="feature-value">{value}</span>
						</div>
					{/each}
				</div>
			{/if}

			<!-- Pros & Cons -->
			<div class="pros-cons">
				{#if item.pros}
					<div class="pros">
						{#each item.pros as pro}
							<div class="pro-item">
								<span class="icon-plus">+</span>
								{pro}
							</div>
						{/each}
					</div>
				{/if}
				{#if item.cons}
					<div class="cons">
						{#each item.cons as con}
							<div class="con-item">
								<span class="icon-minus">−</span>
								{con}
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<!-- CTA -->
			{#if item.ctaUrl}
				<a
					href={item.ctaUrl}
					target="_blank"
					rel={item.affiliate ? 'nofollow sponsored noopener' : 'noopener'}
					class="cta-button"
				>
					{item.ctaText || 'Jetzt testen'}
					{#if item.affiliate}<span class="affiliate-marker">*</span>{/if}
				</a>
			{/if}
		</div>
	{/each}
</div>

<style>
	.disclaimer {
		padding: 0.75rem 1rem;
		margin-bottom: 1.5rem;
		background-color: var(--color-accent-honey-subtle);
		border: 1px solid rgba(212, 137, 62, 0.25);
		border-radius: var(--radius-md, 0.5rem);
		font-size: var(--font-size-sm, 0.875rem);
		color: var(--color-text-muted);
		line-height: 1.5;
	}

	.disclaimer-icon {
		color: var(--color-accent-honey);
		font-weight: bold;
		margin-right: 0.25rem;
	}

	.table-title {
		font-family: var(--font-display, 'Montserrat', sans-serif);
		font-weight: var(--font-weight-bold, 700);
		font-size: var(--font-size-2xl, 1.5rem);
		margin: 0 0 1.5rem 0;
		color: var(--color-text);
	}

	.comparison-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.25rem;
	}

	.tool-card {
		position: relative;
		background-color: var(--color-surface, #1a1a1a);
		border: 1px solid var(--color-border, #2a2520);
		border-radius: var(--radius-lg, 0.75rem);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		transition: all 0.3s ease;
	}

	.tool-card:hover {
		border-color: var(--color-accent-honey);
		box-shadow: var(--shadow-card, 0 4px 20px rgba(0, 0, 0, 0.35));
		transform: translateY(-2px);
	}

	.tool-card.featured {
		border-color: var(--color-accent-honey);
		box-shadow: 0 0 0 1px var(--color-accent-honey), var(--shadow-card, 0 4px 20px rgba(0, 0, 0, 0.35));
	}

	.badge {
		position: absolute;
		top: -0.5rem;
		right: 1rem;
		background: linear-gradient(135deg, var(--color-accent-honey), var(--color-accent-honey-hover));
		color: var(--color-on-accent, #111);
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.25rem 0.75rem;
		border-radius: 999px;
	}

	.tool-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.tool-logo {
		width: 40px;
		height: 40px;
		border-radius: var(--radius-md, 0.5rem);
		object-fit: cover;
	}

	.tool-name {
		font-family: var(--font-display, 'Montserrat', sans-serif);
		font-weight: var(--font-weight-semibold, 600);
		font-size: var(--font-size-lg, 1.125rem);
		margin: 0;
		color: var(--color-text);
	}

	.rating {
		display: flex;
		align-items: center;
		gap: 0.125rem;
	}

	.star {
		font-size: 1rem;
		line-height: 1;
	}

	.star.full {
		color: var(--color-accent-honey);
	}

	.star.half {
		color: var(--color-accent-honey);
		opacity: 0.5;
	}

	.star.empty {
		color: var(--color-border);
	}

	.rating-number {
		margin-left: 0.5rem;
		font-size: var(--font-size-sm, 0.875rem);
		color: var(--color-text-muted);
	}

	.price-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.price {
		font-weight: var(--font-weight-semibold, 600);
		color: var(--color-text);
	}

	.free-badge {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		background-color: var(--color-accent-teal-subtle);
		color: var(--color-accent-teal);
		padding: 0.125rem 0.5rem;
		border-radius: 999px;
	}

	.features-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
		padding: 0.75rem;
		background-color: var(--color-surface-raised, #222220);
		border-radius: var(--radius-md, 0.5rem);
	}

	.feature-item {
		display: flex;
		flex-direction: column;
	}

	.feature-label {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
	}

	.feature-value {
		font-size: var(--font-size-sm, 0.875rem);
		font-weight: var(--font-weight-semibold, 600);
		color: var(--color-text);
	}

	.pros-cons {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: var(--font-size-sm, 0.875rem);
	}

	.pro-item, .con-item {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		line-height: 1.4;
		color: var(--color-text-muted);
	}

	.icon-plus {
		color: var(--color-accent-teal);
		font-weight: 700;
		flex-shrink: 0;
	}

	.icon-minus {
		color: var(--color-danger, #ff6b6b);
		font-weight: 700;
		flex-shrink: 0;
	}

	.cta-button {
		display: block;
		text-align: center;
		padding: 0.75rem 1.5rem;
		background: linear-gradient(135deg, var(--color-accent-honey), var(--color-accent-honey-hover));
		color: var(--color-on-accent, #111);
		font-weight: var(--font-weight-semibold, 600);
		text-decoration: none;
		border-radius: var(--radius-md, 0.5rem);
		transition: all 0.3s ease;
		margin-top: auto;
	}

	.cta-button:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px var(--color-accent-honey-glow);
		color: var(--color-on-accent, #111);
	}

	.affiliate-marker {
		font-size: 0.7em;
		vertical-align: super;
	}

	@media (max-width: 640px) {
		.comparison-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
