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

		const { tweets } = await response.json()

		return {
			props: { tweets } as { tweets: UserTweetsType }
		}
	}
</script>

<script lang="ts">
	import Compose from '$root/components/tweet/compose.svelte'
	import Tweet from '$root/components/tweet/tweet.svelte'
	import Transition from '$root/components/transition.svelte'

	export let tweets: UserTweetsType[] = []

	async function addTweet(tweet: string) {
		await fetch('/api/tweets', {
			method: 'POST',
			body: JSON.stringify({ tweet }),
			headers: { 'Content-Type': 'application/json' }
		})
		const response = await fetch('/api/tweets')
		const data = await response.json()
		tweets = data.tweets
	}

	async function removeTweet(id: number) {
		await fetch('/api/tweets', {
			method: 'DELETE',
			body: JSON.stringify({ id }),
			headers: { 'Content-Type': 'application/json' }
		})
		const response = await fetch('/api/tweets')
		const data = await response.json()
		tweets = data.tweets
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Feed</h1>

<Transition>
	<Compose {addTweet} />

	{#each tweets as tweet (tweet.id)}
		<Tweet {tweet} {removeTweet} />
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
