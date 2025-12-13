<script lang="ts">
</script>

<svelte:head>
	<title>About Us - Secunit Security and Mercantile</title>
	<meta name="description" content="Over 50 years of combined US engineering expertise. American-quality SRE, DevOps, and DevSecOps consulting at competitive global rates." />
</svelte:head>

<div class="container">
	<div class="page-content">
		<div class="intro">
			<h1>About Us</h1>
			<p class="lead">
				Senior US engineers delivering world-class reliability and security consulting at competitive rates.
			</p>
		</div>

		<div class="value-prop">
			<div class="stat-card highlight">
				<div class="stat-number">50+</div>
				<div class="stat-label">Combined Years of Experience</div>
			</div>
		</div>

		<div class="content-section">
			<h2>US Expertise, Global Advantage</h2>
			<p>
				We're American engineers who've built and scaled systems at leading US tech companies.
				Now based abroad as expats, we bring the same caliber of expertise you'd expect from
				top-tier US consultancies—at significantly more competitive rates.
			</p>
			<p>
				This isn't offshore outsourcing. We're native English speakers with decades of experience
				in American tech culture, compliance requirements, and business practices. You get
				US-quality engineering without the US price tag.
			</p>
		</div>

		<div class="benefits-grid">
			<div class="benefit-card">
				<div class="benefit-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="10"></circle>
						<polyline points="12 6 12 12 16 14"></polyline>
					</svg>
				</div>
				<h3>Timezone Flexibility</h3>
				<p>We work across timezones to fit your schedule. Early morning calls? Late night deploys? We've got you covered.</p>
			</div>

			<div class="benefit-card">
				<div class="benefit-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
					</svg>
				</div>
				<h3>Battle-Tested</h3>
				<p>We've managed incidents at scale, built platforms serving millions, and secured systems handling sensitive data.</p>
			</div>

			<div class="benefit-card">
				<div class="benefit-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="12" y1="1" x2="12" y2="23"></line>
						<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
					</svg>
				</div>
				<h3>Cost Effective</h3>
				<p>Get senior-level US talent at rates that make sense for your budget. No compromises on quality.</p>
			</div>

			<div class="benefit-card">
				<div class="benefit-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
						<circle cx="9" cy="7" r="4"></circle>
						<path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
						<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
					</svg>
				</div>
				<h3>No Communication Barriers</h3>
				<p>Native English speakers who understand US business culture, compliance needs, and technical standards.</p>
			</div>
		</div>

		<div class="content-section">
			<h2>What We Bring</h2>
			<ul class="expertise-list">
				<li>Deep experience with AWS, GCP, and Azure at scale</li>
				<li>Kubernetes, Terraform, and modern IaC practices</li>
				<li>SOC 2, HIPAA, and PCI compliance expertise</li>
				<li>Incident response and on-call optimization</li>
				<li>Observability stack design and implementation</li>
				<li>CI/CD pipeline architecture and optimization</li>
				<li>Security hardening and DevSecOps integration</li>
			</ul>
		</div>

		<div class="cta-section">
			<h2>Ready to Talk?</h2>
			<p>Let's discuss how we can help you build more reliable, secure systems—without breaking your budget.</p>
			<a href="/" class="btn btn-primary">Get in Touch</a>
		</div>
	</div>
</div>

<style>
	.page-content {
		max-width: 900px;
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

	.value-prop {
		display: flex;
		justify-content: center;
		margin-bottom: 3rem;
	}

	.stat-card {
		text-align: center;
		padding: 2rem 3rem;
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.stat-card.highlight {
		background: var(--color-primary-light);
		border-color: var(--color-primary);
	}

	.stat-number {
		font-size: 4rem;
		font-weight: 700;
		color: var(--color-primary);
		line-height: 1;
	}

	.stat-label {
		font-size: 1.125rem;
		color: var(--color-text-secondary);
		margin-top: 0.5rem;
	}

	.content-section {
		margin-bottom: 3rem;
	}

	.content-section h2 {
		margin-bottom: 1rem;
	}

	.content-section p {
		color: var(--color-text-secondary);
		font-size: 1.1rem;
	}

	.benefits-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.benefit-card {
		padding: 1.5rem;
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
	}

	.benefit-card:hover {
		border-color: var(--color-primary);
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.benefit-icon {
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

	.benefit-card h3 {
		font-size: 1.125rem;
		margin-bottom: 0.5rem;
	}

	.benefit-card p {
		font-size: 0.95rem;
		color: var(--color-text-secondary);
		margin: 0;
	}

	.expertise-list {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
	}

	.expertise-list li {
		position: relative;
		padding-left: 1.75rem;
		color: var(--color-text-secondary);
	}

	.expertise-list li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.5rem;
		width: 8px;
		height: 8px;
		background: var(--color-primary);
		border-radius: 50%;
	}

	.cta-section {
		text-align: center;
		padding: 3rem;
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		margin-top: 3rem;
	}

	.cta-section h2 {
		margin-bottom: 0.5rem;
	}

	.cta-section p {
		color: var(--color-text-secondary);
		margin-bottom: 1.5rem;
	}

	@media (max-width: 768px) {
		.benefits-grid {
			grid-template-columns: 1fr;
		}

		.expertise-list {
			grid-template-columns: 1fr;
		}

		.stat-card {
			padding: 1.5rem 2rem;
		}

		.stat-number {
			font-size: 3rem;
		}

		.cta-section {
			padding: 2rem;
		}
	}
</style>
