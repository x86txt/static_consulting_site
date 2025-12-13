<script lang="ts">
	const services = [
		{ value: '', label: 'Select a service...' },
		{ value: 'sre', label: 'Site Reliability Engineering (SRE)' },
		{ value: 'devops', label: 'DevOps Consulting' },
		{ value: 'devsecops', label: 'DevSecOps / Security' },
		{ value: 'platform', label: 'Platform Engineering' },
		{ value: 'cloud-migration', label: 'Cloud Migration' },
		{ value: 'iac', label: 'Infrastructure as Code' },
		{ value: 'observability', label: 'Observability & Monitoring' },
		{ value: 'incident', label: 'Incident Management' },
		{ value: 'other', label: 'Other' }
	];

	let name = $state('');
	let email = $state('');
	let company = $state('');
	let service = $state('');
	let description = $state('');

	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!name || !email || !service || !description) {
			errorMessage = 'Please fill in all required fields.';
			submitStatus = 'error';
			return;
		}

		isSubmitting = true;
		submitStatus = 'idle';
		errorMessage = '';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					email,
					company,
					service,
					description,
					submittedAt: new Date().toISOString()
				})
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message || 'Failed to submit form');
			}

			submitStatus = 'success';
			// Reset form
			name = '';
			email = '';
			company = '';
			service = '';
			description = '';
		} catch (err) {
			submitStatus = 'error';
			errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form class="contact-form" onsubmit={handleSubmit}>
	{#if submitStatus === 'success'}
		<div class="alert alert-success">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
				<polyline points="22 4 12 14.01 9 11.01"></polyline>
			</svg>
			<span>Thank you for your inquiry! We'll be in touch soon.</span>
		</div>
	{/if}

	{#if submitStatus === 'error'}
		<div class="alert alert-error">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<circle cx="12" cy="12" r="10"></circle>
				<line x1="12" y1="8" x2="12" y2="12"></line>
				<line x1="12" y1="16" x2="12.01" y2="16"></line>
			</svg>
			<span>{errorMessage || 'Something went wrong. Please try again.'}</span>
		</div>
	{/if}

	<div class="form-row">
		<div class="form-group">
			<label for="name">Name <span class="required">*</span></label>
			<input
				type="text"
				id="name"
				bind:value={name}
				placeholder="Your name"
				required
				disabled={isSubmitting}
			/>
		</div>

		<div class="form-group">
			<label for="email">Email <span class="required">*</span></label>
			<input
				type="email"
				id="email"
				bind:value={email}
				placeholder="your@email.com"
				required
				disabled={isSubmitting}
			/>
		</div>
	</div>

	<div class="form-row">
		<div class="form-group">
			<label for="company">Company <span class="optional">(optional)</span></label>
			<input
				type="text"
				id="company"
				bind:value={company}
				placeholder="Your company name"
				disabled={isSubmitting}
			/>
		</div>

		<div class="form-group">
			<label for="service">Service <span class="required">*</span></label>
			<select id="service" bind:value={service} required disabled={isSubmitting}>
				{#each services as svc}
					<option value={svc.value} disabled={svc.value === ''}>{svc.label}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="form-group">
		<label for="description">What are you looking for? <span class="required">*</span></label>
		<textarea
			id="description"
			bind:value={description}
			placeholder="Please describe your project, challenges, or goals..."
			rows="5"
			required
			disabled={isSubmitting}
		></textarea>
	</div>

	<button type="submit" class="btn btn-primary btn-submit" disabled={isSubmitting}>
		{#if isSubmitting}
			<span class="spinner"></span>
			Sending...
		{:else}
			Send Message
		{/if}
	</button>
</form>

<style>
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	.required {
		color: var(--color-error);
	}

	.optional {
		color: var(--color-text-muted);
		font-weight: 400;
		font-size: 0.875rem;
	}

	.alert {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		border-radius: var(--radius-md);
		font-weight: 500;
	}

	.alert-success {
		background: var(--color-success-bg);
		color: var(--color-success);
	}

	.alert-error {
		background: var(--color-error-bg);
		color: var(--color-error);
	}

	.btn-submit {
		align-self: flex-start;
		min-width: 160px;
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid transparent;
		border-top-color: currentColor;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (max-width: 768px) {
		.form-row {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.btn-submit {
			width: 100%;
		}
	}
</style>
