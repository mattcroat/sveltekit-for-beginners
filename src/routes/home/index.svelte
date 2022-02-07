<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ fetch }) => {
		// todo: fallback
		// todo: types
		let response = await fetch('/api/tweets')
		let { tweets } = await response.json()

		if (!response.ok) {
			return {
				status: response.status,
				error: new Error(`Could not load Tweets.`)
			}
		}

		return {
			props: {
				tweets
			}
		}
	}
</script>

<script>
	import Compose from '$root/components/tweet/compose.svelte'
	import Tweet from '$root/components/tweet/tweet.svelte'

	export let tweets = []
</script>

<h1>Feed</h1>

<Compose />

{#each tweets as tweet (tweet.id)}
	<Tweet {tweet} />
{/each}

<!-- todo: remove debug -->
<pre>
	{JSON.stringify(tweets, null, 2)}
</pre>

<style>
	h1 {
		position: sticky;
		top: 0;
		padding: var(--spacing-8) var(--spacing-24);
		font-size: var(--font-24);
		backdrop-filter: blur(100px);
	}
</style>
