const topic = ({ slug, name, short, image, starterSlugs, categoryAliases }) =>
	Object.freeze({
		slug,
		name,
		short,
		image,
		starterSlugs: Object.freeze(starterSlugs),
		categoryAliases: Object.freeze(categoryAliases)
	});

export const CORE_TOPICS = Object.freeze([
	topic({
		slug: 'ki-tools',
		name: 'KI & Tech',
		short: 'Tools · Tests · Trends',
		image: '/images/homepage/topics/ki-tech.webp',
		starterSlugs: ['perfekt-prompten-llm-guide', '50-bildprompts-echt-getestet', 'gemini-notebook-kostenlos-codex-content-workflow'],
		categoryAliases: ['ki-tools', 'ki-news', 'tools', 'ai']
	}),
	topic({
		slug: 'maker',
		name: 'Maker & DIY',
		short: 'Bauen · Drucken · Löten',
		image: '/images/homepage/topics/maker-diy.webp',
		starterSlugs: ['esp32-projekte-anfaenger-2026', '3d-druck-einstieg-welcher-drucker-2026', 'home-assistant-einrichten-2026'],
		categoryAliases: ['maker', 'maker-projekt', 'diy', 'smart-home', '3d-druck']
	}),
	topic({
		slug: 'automatisierung',
		name: 'Automatisierung',
		short: 'Workflows · Scripts · APIs',
		image: '/images/homepage/topics/automatisierung.webp',
		starterSlugs: ['n8n-tutorial-deutsch-2026', 'n8n-workflow-beispiele-2026', 'n8n-chatgpt-workflow-2026'],
		categoryAliases: ['automatisierung', 'automation']
	}),
	topic({
		slug: 'fotografie',
		name: 'Fotografie',
		short: 'Editing · Gear · Ideen',
		image: '/images/homepage/topics/fotografie.webp',
		starterSlugs: ['ki-fotografie-2026-was-wirklich-funktioniert', 'ki-bildbearbeitung-workflow-fotograf-2026', 'aftershoot-alternative-ai-photo-culling'],
		categoryAliases: ['fotografie', 'photography']
	}),
	topic({
		slug: 'produktivitaet',
		name: 'Produktivität',
		short: 'Systeme · Fokus · Ordnung',
		image: '/images/homepage/topics/produktivitaet.webp',
		starterSlugs: ['obsidian-fuer-adhs-system-2026', 'claude-code-ultimate-setup-produktivitaet-2026', 'beste-chatgpt-prompts-2026'],
		categoryAliases: ['produktivitaet', 'productivity']
	})
]);

export const CORE_TOPIC_SLUGS = Object.freeze(CORE_TOPICS.map((topic) => topic.slug));

const TOPIC_BY_SLUG = new Map(CORE_TOPICS.map((topic) => [topic.slug, topic]));
const FAMILY_BY_ALIAS = new Map(
	CORE_TOPICS.flatMap((topic) => topic.categoryAliases.map((alias) => [alias, topic.slug]))
);

export function getCoreTopic(slug) {
	return TOPIC_BY_SLUG.get(slug);
}

export function normalizeTopicFamily(category) {
	const normalized = String(category ?? '').trim().toLowerCase();
	return FAMILY_BY_ALIAS.get(normalized) ?? `other:${normalized || 'unknown'}`;
}
