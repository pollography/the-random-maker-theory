/**
 * Find the latest episode that has a usable URL in the requested field.
 *
 * @template {{ slug: string, date: string, audioUrl?: string, videoUrl?: string }} T
 * @param {T[]} episodes
 * @param {'audioUrl' | 'videoUrl'} field
 * @returns {T | null}
 */
export function selectLatestEpisodeWithUrl(episodes, field) {
	if (!Array.isArray(episodes) || typeof field !== 'string' || field.length === 0) return null;

	return (
		[...episodes]
			.filter((episode) => typeof episode?.[field] === 'string' && episode[field].trim().length > 0)
			.sort(
				(left, right) =>
					new Date(right.date).getTime() - new Date(left.date).getTime() ||
					String(left.slug).localeCompare(String(right.slug))
			)[0] ?? null
	);
}
