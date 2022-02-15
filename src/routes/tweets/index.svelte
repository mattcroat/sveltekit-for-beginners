<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import type { UserTweetType } from '$root/types/tweet'

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
			props: {
				userTweets: tweets
			}
		}
	}
</script>

<script lang="ts">
	import Compose from '$root/components/tweet/compose.svelte'
	import Tweet from '$root/components/tweet/tweet.svelte'

	export let userTweets: UserTweetType[] = []

	async function addTweet(tweet: string) {
		await fetch('/api/tweets', {
			method: 'POST',
			body: JSON.stringify({ tweet }),
			headers: { 'Content-Type': 'application/json' }
		})
		const response = await fetch('/api/tweets')
		const { tweets } = await response.json()
		userTweets = tweets
	}

	async function removeTweet(id: string) {
		console.log(`Remove ${id}`)
		// await fetch('/api/tweets', {
		// 	method: 'DELETE',
		// 	body: JSON.stringify({ id }),
		// 	headers: { 'Content-Type': 'application/json' }
		// })
	}
</script>

<h1>Feed</h1>

<Compose {addTweet} />

{#each userTweets as tweet (tweet.id)}
	<Tweet {tweet} {removeTweet} />
{/each}

<style>
	h1 {
		position: sticky;
		top: 0;
		padding: var(--spacing-8) var(--spacing-24);
		font-size: var(--font-24);
		backdrop-filter: blur(100px);
	}
</style>
