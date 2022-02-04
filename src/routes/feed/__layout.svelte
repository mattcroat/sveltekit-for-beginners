<script lang="ts">
	import Sidebar from '$root/components/sidebar.svelte'
	import Footer from '$root/components/footer.svelte'

	import '$root/styles/global.css'
</script>

<main>
	<Sidebar />
	<slot />
	<Footer />
</main>
