<script lang="ts">
	import Navigation from '$root/components/sidebar/navigation.svelte'
	import Trending from '$root/components/sidebar/trending.svelte'
</script>

<div class="container">
	<Navigation />
	<main class="feed">
		<slot />
	</main>
	<Trending />
</div>

<style>
	.container {
		height: 100vh;
		max-width: min-content;
		margin: 0 auto;
		display: grid;
		grid-template-columns: min-content 50ch;
	}

	.feed {
		border: 1px solid var(--border-primary);
		border-top: none;
		border-bottom: none;
	}

	@media (min-width: 1024px) {
		.container {
			max-width: 1240px;
			margin: 0 auto;
			grid-template-columns: 1fr 50ch 1fr;
		}
	}
</style>
