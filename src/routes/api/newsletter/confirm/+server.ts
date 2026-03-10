import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

// Verify HMAC token and extract email
async function verifyToken(token: string, secret: string): Promise<string | null> {
	try {
		const decoded = atob(token.replace(/-/g, '+').replace(/_/g, '/'));
		const parts = decoded.split('|');
		if (parts.length !== 3) return null;

		const [email, timestamp, sig] = parts;

		// Check if token is expired (48 hours)
		const tokenTime = parseInt(timestamp, 36);
		const maxAge = 48 * 60 * 60 * 1000; // 48h in ms
		if (Date.now() - tokenTime > maxAge) return null;

		// Verify signature
		const encoder = new TextEncoder();
		const key = await crypto.subtle.importKey(
			'raw',
			encoder.encode(secret),
			{ name: 'HMAC', hash: 'SHA-256' },
			false,
			['verify']
		);
		const data = `${email}|${timestamp}`;
		const sigBytes = Uint8Array.from(atob(sig.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
		const valid = await crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(data));

		return valid ? email : null;
	} catch {
		return null;
	}
}

export const GET: RequestHandler = async ({ url }) => {
	const token = url.searchParams.get('token');
	if (!token) {
		throw redirect(302, '/newsletter-fehler');
	}

	const apiKey = env.BREVO_API_KEY;
	if (!apiKey) {
		throw redirect(302, '/newsletter-fehler');
	}

	const email = await verifyToken(token, apiKey);
	if (!email) {
		throw redirect(302, '/newsletter-fehler');
	}

	const listId = parseInt(env.BREVO_LIST_ID || '2');

	// Add contact to list in Brevo
	try {
		const res = await fetch('https://api.brevo.com/v3/contacts', {
			method: 'POST',
			headers: {
				'api-key': apiKey,
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				email,
				listIds: [listId],
				updateEnabled: true
			})
		});

		if (res.ok || res.status === 204) {
			throw redirect(302, '/newsletter-bestaetigt');
		}

		const data = await res.json();

		// Contact already exists, update list membership
		if (data.code === 'duplicate_parameter') {
			await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
				method: 'PUT',
				headers: {
					'api-key': apiKey,
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					listIds: [listId]
				})
			});
			throw redirect(302, '/newsletter-bestaetigt');
		}

		console.error('Brevo confirm error:', JSON.stringify(data));
		throw redirect(302, '/newsletter-fehler');
	} catch (err) {
		// Re-throw redirects
		if (err && typeof err === 'object' && 'status' in err) throw err;
		console.error('Newsletter confirm error:', err);
		throw redirect(302, '/newsletter-fehler');
	}
};
