<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ fetch }) => {
		let response = await fetch('/api/tweets')
		let { tweets } = await response.json()

		if (!response.ok) {
			return {
				status: response.status,
				error: new Error(`Could not load feed.`)
			}
		}

		return {
			props: {
				tweets
			}
		}
	}
</script>

<script lang="ts">
	export let tweets: any
</script>

<h1>Tweets</h1>

{#each tweets as tweet}
	<article>
		<p>{tweet.tweet}</p>

		<div>
			<span>Like</span>
		</div>
	</article>
{/each}
