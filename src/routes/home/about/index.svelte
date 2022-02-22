<script context="module" lang="ts">
	// https://kit.svelte.dev/docs/page-options
	export const hydrate = false
	export const router = true
	export const prerender = true
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="container">
	<h1>About</h1>
	<div class="content">
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing
			elit. Voluptatibus eveniet quos impedit cumque,
			deleniti aspernatur atque vitae iusto ratione nam qui.
		</p>
		<p>
			Qui, exercitationem magnam facilis ex cupiditate sed!
			Vitae, veniam?
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing
			elit. Quibusdam, modi!
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing
			elit. Excepturi mollitia temporibus sed nihil iure?
			Beatae magnam molestias impedit nobis accusantium.
		</p>
	</div>
</div>

<style>
	h1 {
		font-size: var(--font-24);
	}

	p {
		color: var(--color-text-muted);
	}

	.container {
		display: grid;
		gap: var(--spacing-8);
		padding: var(--spacing-16);
	}

	.content {
		display: grid;
		gap: var(--spacing-16);
	}
</style>
