<script lang="ts">
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import Tweet from '$root/components/tweet.svelte'
	import type { TweetType } from '$root/types'

	export let tweet: TweetType

	const name = tweet.name
	const content = tweet.content.slice(0, 60)
</script>

<svelte:head>
	<title>{name} on Twittr: "{content}..."</title>
</svelte:head>

<Tweet {tweet} />
