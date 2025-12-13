import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sendContactEmail, type ContactFormData, type EmailConfig } from '$lib/server/email';

export const POST: RequestHandler = async ({ request, platform }) => {
	try {
		const data: ContactFormData = await request.json();

		// Validate required fields
		if (!data.name || !data.email || !data.service || !data.description) {
			return json({ success: false, message: 'Missing required fields' }, { status: 400 });
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(data.email)) {
			return json({ success: false, message: 'Invalid email format' }, { status: 400 });
		}

		// Get environment variables from Cloudflare
		const env = platform?.env || {};
		const provider = (env.EMAIL_PROVIDER || 'sendgrid') as 'sendgrid' | 'resend';
		const apiKey =
			provider === 'resend' ? env.RESEND_API_KEY : env.SENDGRID_API_KEY;
		const toEmail = env.NOTIFICATION_EMAIL || 'query@mattevans.cloud';
		const fromEmail = env.FROM_EMAIL || 'noreply@secunit.dev';

		// If no API key configured, log and return success (for development)
		if (!apiKey) {
			console.log('No email API key configured. Form data received:', data);
			console.log('To enable email notifications, set EMAIL_PROVIDER and the corresponding API key.');
			return json({
				success: true,
				message: 'Form submitted successfully (email notifications not configured)'
			});
		}

		const config: EmailConfig = {
			provider,
			apiKey,
			fromEmail,
			toEmail
		};

		const result = await sendContactEmail(config, data);

		if (!result.success) {
			console.error('Email send failed:', result.error);
			return json(
				{ success: false, message: 'Failed to send notification. Please try again.' },
				{ status: 500 }
			);
		}

		return json({ success: true, message: 'Message sent successfully' });
	} catch (err) {
		console.error('Contact form error:', err);
		return json(
			{ success: false, message: 'An unexpected error occurred' },
			{ status: 500 }
		);
	}
};
