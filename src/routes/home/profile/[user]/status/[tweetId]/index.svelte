<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ fetch, params }) => {
		// params returns { user: 'name', tweetId: 'b75aa292bd915' }
		const response = await fetch(
			`/api/tweet/${params.tweetId}`
		)

		if (!response.ok) {
			return {
				status: response.status,
				error: new Error(`Could not load Tweet. 🐦️`)
			}
		}

		const { tweet } = await response.json()

		return {
			props: { tweet }
		}
	}
</script>

<script lang="ts">
	import Tweet from '$root/components/tweet/tweet.svelte'
	import type { UserTweetsType } from '$root/types'

	export let tweet: UserTweetsType

	const name = tweet.user.name
	const content = tweet.content.slice(0, 60)
</script>

<svelte:head>
	<title>{name} on Twittr: "{content}..."</title>
</svelte:head>

<Tweet {tweet} />
