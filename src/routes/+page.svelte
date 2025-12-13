<script lang="ts">
	import ContactForm from '$lib/components/ContactForm.svelte';
</script>

<svelte:head>
	<title>Contact Us - Secunit Security and Mercantile</title>
	<meta name="description" content="Get in touch with Secunit Security and Mercantile for expert SRE, DevOps, and DevSecOps consulting services." />
</svelte:head>

<div class="container">
	<div class="page-content">
		<div class="intro">
			<h1>Let's Build Something Reliable</h1>
			<p class="lead">
				Expert consulting for Site Reliability Engineering, DevOps, and DevSecOps.
				Tell us about your challenges and we'll help you build resilient, secure, and scalable systems.
			</p>
		</div>

		<div class="card">
			<h2>Contact Us</h2>
			<p class="text-secondary mb-3">
				Fill out the form below and we'll get back to you within one business day.
			</p>
			<ContactForm />
		</div>

		<div class="services-preview">
			<h3>Our Services</h3>
			<div class="services-grid">
				<div class="service-item">
					<div class="service-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
						</svg>
					</div>
					<h4>Site Reliability Engineering</h4>
					<p>Build and maintain highly available systems with proven SRE practices.</p>
				</div>
				<div class="service-item">
					<div class="service-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="16 18 22 12 16 6"></polyline>
							<polyline points="8 6 2 12 8 18"></polyline>
						</svg>
					</div>
					<h4>DevOps Consulting</h4>
					<p>Streamline your development pipeline with modern DevOps methodologies.</p>
				</div>
				<div class="service-item">
					<div class="service-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
							<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
						</svg>
					</div>
					<h4>DevSecOps</h4>
					<p>Integrate security into every stage of your development lifecycle.</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.page-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.intro {
		text-align: center;
		margin-bottom: 3rem;
	}

	.intro h1 {
		margin-bottom: 1rem;
	}

	.lead {
		font-size: 1.25rem;
		color: var(--color-text-secondary);
		max-width: 600px;
		margin: 0 auto;
	}

	.card {
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 2rem;
		box-shadow: var(--shadow-sm);
		transition: background-color var(--transition-normal), border-color var(--transition-normal);
	}

	.card h2 {
		margin-bottom: 0.5rem;
	}

	.services-preview {
		margin-top: 4rem;
	}

	.services-preview h3 {
		text-align: center;
		margin-bottom: 2rem;
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.service-item {
		text-align: center;
		padding: 1.5rem;
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
	}

	.service-item:hover {
		border-color: var(--color-primary);
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.service-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: var(--color-primary-light);
		color: var(--color-primary);
		border-radius: var(--radius-md);
		margin-bottom: 1rem;
	}

	.service-item h4 {
		font-size: 1rem;
		margin-bottom: 0.5rem;
	}

	.service-item p {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		margin: 0;
	}

	@media (max-width: 768px) {
		.intro {
			margin-bottom: 2rem;
		}

		.lead {
			font-size: 1.1rem;
		}

		.card {
			padding: 1.5rem;
		}

		.services-grid {
			grid-template-columns: 1fr;
		}

		.services-preview {
			margin-top: 3rem;
		}
	}
</style>
