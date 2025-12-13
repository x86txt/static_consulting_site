<script lang="ts">
	import '../app.css';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { children } = $props();
</script>

<div class="app">
	<header class="header">
		<div class="container header-content">
			<a href="/" class="logo">
				<span class="logo-text">Secunit Security and Mercantile</span>
			</a>
			<nav class="nav">
				<a href="/" class="nav-link">Contact</a>
				<ThemeToggle />
			</nav>
		</div>
	</header>

	<main class="main">
		{@render children()}
	</main>

	<footer class="footer">
		<div class="container">
			<p class="text-secondary text-center">
				&copy; {new Date().getFullYear()} Secunit Security and Mercantile. All rights reserved.
			</p>
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: var(--color-bg);
		border-bottom: 1px solid var(--color-border);
		backdrop-filter: blur(10px);
		transition: background-color var(--transition-normal), border-color var(--transition-normal);
	}

	.header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 64px;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		color: var(--color-text);
	}

	.logo:hover {
		text-decoration: none;
		color: var(--color-primary);
	}

	.logo-text {
		font-size: 1.125rem;
		font-weight: 600;
	}

	.nav {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.nav-link {
		font-weight: 500;
		color: var(--color-text-secondary);
		transition: color var(--transition-fast);
	}

	.nav-link:hover {
		color: var(--color-primary);
		text-decoration: none;
	}

	.main {
		flex: 1;
		padding: 3rem 0;
	}

	.footer {
		padding: 2rem 0;
		border-top: 1px solid var(--color-border);
		background: var(--color-bg-secondary);
		transition: background-color var(--transition-normal), border-color var(--transition-normal);
	}

	@media (max-width: 768px) {
		.logo-text {
			font-size: 0.95rem;
		}

		.main {
			padding: 2rem 0;
		}
	}
</style>
