export interface ContactFormData {
	name: string;
	email: string;
	company?: string;
	service: string;
	description: string;
	submittedAt: string;
}

export interface EmailConfig {
	provider: 'sendgrid' | 'resend';
	apiKey: string;
	fromEmail: string;
	toEmail: string;
}

const SERVICE_LABELS: Record<string, string> = {
	sre: 'Site Reliability Engineering (SRE)',
	devops: 'DevOps Consulting',
	devsecops: 'DevSecOps / Security',
	platform: 'Platform Engineering',
	'cloud-migration': 'Cloud Migration',
	iac: 'Infrastructure as Code',
	observability: 'Observability & Monitoring',
	incident: 'Incident Management',
	other: 'Other'
};

function generateJsonAttachment(data: ContactFormData): string {
	const crmData = {
		contact: {
			name: data.name,
			email: data.email,
			company: data.company || null
		},
		inquiry: {
			service: data.service,
			serviceLabel: SERVICE_LABELS[data.service] || data.service,
			description: data.description,
			submittedAt: data.submittedAt,
			source: 'website_contact_form'
		},
		metadata: {
			version: '1.0',
			exportedAt: new Date().toISOString()
		}
	};
	return JSON.stringify(crmData, null, 2);
}

function generateEmailHtml(data: ContactFormData): string {
	const serviceLabel = SERVICE_LABELS[data.service] || data.service;

	return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0d6efd; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8f9fa; padding: 20px; border: 1px solid #dee2e6; border-top: none; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 16px; }
    .label { font-weight: 600; color: #495057; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .value { margin-top: 4px; padding: 12px; background: white; border-radius: 4px; border: 1px solid #dee2e6; }
    .description { white-space: pre-wrap; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 12px; color: #6c757d; }
    .badge { display: inline-block; padding: 4px 12px; background: #e7f1ff; color: #0d6efd; border-radius: 20px; font-size: 14px; font-weight: 500; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
    <p style="margin: 8px 0 0 0; opacity: 0.9;">Secunit Security and Mercantile</p>
  </div>
  <div class="content">
    <div class="field">
      <div class="label">Name</div>
      <div class="value">${escapeHtml(data.name)}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
    </div>
    ${
			data.company
				? `
    <div class="field">
      <div class="label">Company</div>
      <div class="value">${escapeHtml(data.company)}</div>
    </div>
    `
				: ''
		}
    <div class="field">
      <div class="label">Service Requested</div>
      <div class="value"><span class="badge">${escapeHtml(serviceLabel)}</span></div>
    </div>
    <div class="field">
      <div class="label">Description</div>
      <div class="value description">${escapeHtml(data.description)}</div>
    </div>
    <div class="footer">
      <p>Submitted on ${new Date(data.submittedAt).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })}</p>
      <p>A JSON file is attached for easy CRM import.</p>
    </div>
  </div>
</body>
</html>
`.trim();
}

function generateEmailText(data: ContactFormData): string {
	const serviceLabel = SERVICE_LABELS[data.service] || data.service;

	return `
NEW CONTACT FORM SUBMISSION
Secunit Security and Mercantile
================================

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}\n` : ''}Service: ${serviceLabel}

Description:
${data.description}

================================
Submitted: ${new Date(data.submittedAt).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })}
A JSON file is attached for easy CRM import.
`.trim();
}

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

export async function sendEmailViaSendGrid(
	config: EmailConfig,
	data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
	const jsonAttachment = generateJsonAttachment(data);
	const base64Attachment = btoa(jsonAttachment);

	const payload = {
		personalizations: [{ to: [{ email: config.toEmail }] }],
		from: { email: config.fromEmail, name: 'Secunit Contact Form' },
		reply_to: { email: data.email, name: data.name },
		subject: `New Inquiry: ${SERVICE_LABELS[data.service] || data.service} - ${data.name}`,
		content: [
			{ type: 'text/plain', value: generateEmailText(data) },
			{ type: 'text/html', value: generateEmailHtml(data) }
		],
		attachments: [
			{
				content: base64Attachment,
				filename: `contact-${data.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`,
				type: 'application/json',
				disposition: 'attachment'
			}
		]
	};

	try {
		const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.apiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('SendGrid error:', errorText);
			return { success: false, error: `SendGrid API error: ${response.status}` };
		}

		return { success: true };
	} catch (err) {
		console.error('SendGrid request failed:', err);
		return { success: false, error: 'Failed to send email via SendGrid' };
	}
}

export async function sendEmailViaResend(
	config: EmailConfig,
	data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
	const jsonAttachment = generateJsonAttachment(data);
	const base64Attachment = btoa(jsonAttachment);

	const payload = {
		from: `Secunit Contact Form <${config.fromEmail}>`,
		to: [config.toEmail],
		reply_to: data.email,
		subject: `New Inquiry: ${SERVICE_LABELS[data.service] || data.service} - ${data.name}`,
		text: generateEmailText(data),
		html: generateEmailHtml(data),
		attachments: [
			{
				content: base64Attachment,
				filename: `contact-${data.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`
			}
		]
	};

	try {
		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.apiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Resend error:', errorData);
			return { success: false, error: `Resend API error: ${response.status}` };
		}

		return { success: true };
	} catch (err) {
		console.error('Resend request failed:', err);
		return { success: false, error: 'Failed to send email via Resend' };
	}
}

export async function sendContactEmail(
	config: EmailConfig,
	data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
	if (config.provider === 'resend') {
		return sendEmailViaResend(config, data);
	}
	return sendEmailViaSendGrid(config, data);
}
