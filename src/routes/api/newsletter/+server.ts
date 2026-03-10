import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

// Simple HMAC-based token generation using Web Crypto API
async function createToken(email: string, secret: string): Promise<string> {
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey(
		'raw',
		encoder.encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign']
	);
	const timestamp = Date.now().toString(36);
	const data = `${email}|${timestamp}`;
	const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
	const sig = btoa(String.fromCharCode(...new Uint8Array(signature)))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=/g, '');
	return btoa(`${data}|${sig}`).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email } = await request.json();

		if (!email || !email.includes('@')) {
			return json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
		}

		const apiKey = env.BREVO_API_KEY;
		if (!apiKey) {
			console.error('BREVO_API_KEY not set');
			return json({ error: 'Newsletter ist gerade nicht verfügbar.' }, { status: 503 });
		}

		// Check if contact already exists and is subscribed
		const checkRes = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
			headers: { 'api-key': apiKey, Accept: 'application/json' }
		});

		if (checkRes.ok) {
			const contact = await checkRes.json();
			const listId = parseInt(env.BREVO_LIST_ID || '2');
			if (contact.listIds && contact.listIds.includes(listId)) {
				return json({ error: 'Du bist schon angemeldet!' }, { status: 409 });
			}
		}

		// Generate confirmation token
		const token = await createToken(email, apiKey);
		const confirmUrl = `https://therandommakertheory.com/api/newsletter/confirm?token=${token}`;

		// Send confirmation email via Brevo transactional API (no template needed!)
		const sendRes = await fetch('https://api.brevo.com/v3/smtp/email', {
			method: 'POST',
			headers: {
				'api-key': apiKey,
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				sender: { name: 'TRMT Newsletter', email: 'info@therandommakertheory.com' },
				to: [{ email }],
				subject: 'Bitte bestätige deine Newsletter-Anmeldung',
				htmlContent: `
					<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
						<h1 style="font-size: 24px; margin-bottom: 16px;">Hey!</h1>
						<p style="font-size: 16px; line-height: 1.6; color: #333;">
							Du hast dich für den <strong>The Random Maker Theory</strong> Newsletter angemeldet.
						</p>
						<p style="font-size: 16px; line-height: 1.6; color: #333;">
							Klick auf den Button um deine Anmeldung zu bestätigen:
						</p>
						<div style="margin: 32px 0;">
							<a href="${confirmUrl}"
								style="display: inline-block; padding: 14px 32px; background: #d4893e; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
								Anmeldung bestätigen
							</a>
						</div>
						<p style="font-size: 14px; color: #666; line-height: 1.5;">
							Falls du das nicht warst, ignorier diese Mail einfach. Der Link ist 48 Stunden gültig.
						</p>
						<hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
						<p style="font-size: 12px; color: #999;">
							The Random Maker Theory · therandommakertheory.com
						</p>
					</div>
				`
			})
		});

		if (sendRes.ok) {
			return json({ success: true });
		}

		const sendData = await sendRes.json();
		console.error('Brevo send error:', sendRes.status, JSON.stringify(sendData));
		return json({ error: 'Hat nicht geklappt. Versuch es später nochmal.' }, { status: 500 });
	} catch (err) {
		console.error('Newsletter signup error:', err);
		return json({ error: 'Serverfehler. Versuch es später nochmal.' }, { status: 500 });
	}
};
