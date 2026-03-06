import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email } = await request.json();

		if (!email || !email.includes('@')) {
			return json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
		}

		const apiKey = env.BREVO_API_KEY;
		const listId = env.BREVO_LIST_ID || '2';

		if (!apiKey) {
			console.error('BREVO_API_KEY not set');
			return json({ error: 'Newsletter ist gerade nicht verfügbar.' }, { status: 503 });
		}

		// Brevo Double-Opt-In API
		const res = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
			method: 'POST',
			headers: {
				'api-key': apiKey,
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				email,
				includeListIds: [parseInt(listId)],
				templateId: 1, // Brevo Default Double-Opt-In Template
				redirectionUrl: 'https://therandommakertheory.com/newsletter-bestaetigt'
			})
		});

		if (res.ok) {
			return json({ success: true });
		}

		const data = await res.json();

		// Contact already exists
		if (data.code === 'duplicate_parameter') {
			return json({ error: 'Du bist schon angemeldet!' }, { status: 409 });
		}

		console.error('Brevo API error:', data);
		return json({ error: 'Hat nicht geklappt. Versuch es später nochmal.' }, { status: 500 });
	} catch (err) {
		console.error('Newsletter signup error:', err);
		return json({ error: 'Serverfehler. Versuch es später nochmal.' }, { status: 500 });
	}
};
