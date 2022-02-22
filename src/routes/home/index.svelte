<script lang="ts">
	import Compose from '$root/components/tweet/compose.svelte'
	import Tweet from '$root/components/tweet/tweet.svelte'
	import Transition from '$root/components/transition.svelte'
	import type { TweetType } from '$root/types'

	// if an endpoint has the same filename as a page
	// the page will get its props from the endpoint
	// https://kit.svelte.dev/docs/routing#endpoints
	export let tweets: TweetType[] = []
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Feed</h1>

<Transition>
	<Compose />
	{#each tweets as tweet (tweet.id)}
		<Tweet {tweet} />
	{/each}
</Transition>

<style>
	h1 {
		position: sticky;
		top: 0;
		padding: var(--spacing-8) var(--spacing-24);
		font-size: var(--font-24);
		backdrop-filter: blur(100px);
	}
</style>
