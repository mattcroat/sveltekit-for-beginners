<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import type { UserTweetsType } from '$root/types'

	// adding types here is a lie because
	// you can't guarantee what's returned
	// use a schema validation library
	export const load: Load = async ({ fetch }) => {
		const response = await fetch('/api/tweets')

		if (!response.ok) {
			return {
				status: response.status,
				error: new Error(`Could not load Tweets. 🐦️`)
			}
		}

		const { tweets, likedTweets } = await response.json()

		return {
			props: { tweets, likedTweets }
		}
	}
</script>

<script lang="ts">
	import Compose from '$root/components/tweet/compose.svelte'
	import Tweet from '$root/components/tweet/tweet.svelte'
	import Transition from '$root/components/transition.svelte'

	export let tweets: UserTweetsType[] = []
	export let likedTweets: number[]

	async function likeTweet(id: number) {
		await fetch('/api/like', {
			method: 'post',
			body: JSON.stringify(id)
		})
		const response = await fetch('/api/tweets')
		const data = await response.json()
		tweets = data.tweets
		likedTweets = data.likedTweets
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Feed</h1>

<Transition>
	<Compose />

	{#each tweets as tweet (tweet.id)}
		<Tweet {tweet} {likedTweets} {likeTweet} />
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
