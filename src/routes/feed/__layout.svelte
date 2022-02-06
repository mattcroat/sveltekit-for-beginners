<script lang="ts">
	import LeftSidebar from '$root/components/sidebar/left-sidebar.svelte'
	import RightSidebar from '$root/components/sidebar/right-sidebar.svelte'
</script>

<div class="container">
	<LeftSidebar />
	<main class="feed">
		<slot />
	</main>
	<RightSidebar />
</div>

<style>
	.container {
		height: 100vh;
		width: min-content;
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
