<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit'
	import type { ProfileType } from '$root/types'

	export const load: Load = async ({ fetch, params }) => {
		const { user } = params
		const response = await fetch(`/api/user/${user}`)

		if (!response.ok) {
			return {
				status: response.status,
				error: new Error(`Could not get profile. 💩`)
			}
		}

		const { profile } = await response.json()

		return {
			props: { profile } as { profile: ProfileType }
		}
	}
</script>

<script lang="ts">
	import Tweet from '$root/components/tweet/tweet.svelte'

	export let profile: ProfileType

	console.log(profile)
</script>

<!-- 
{
	"id": 2,
	"email": "ronald@example.test",
	"handle": "@theronald",
	"name": "Ronald",
	"avatar": "https://i.pravatar.cc/200?img=65",
	"about": "Likes long walks on the beach. 😘",
	"tweets": [
			{
					"id": "ckzokb8ze0001cvfphxvelmw3",
					"url": "296c37f690b6a",
					"posted": "2022-02-14T21:01:25.812Z",
					"content": "SvelteKit is lit. 🔥",
					"likes": 10,
					"userId": 2
			},
			{
					"id": "ckzokb8ze0003cvfp2875ddiv",
					"url": "7c8db34574c5c",
					"posted": "2022-02-15T11:46:01.054Z",
					"content": "I love Svelte! ❤️",
					"likes": 24,
					"userId": 2
			}
	]
}
-->

<svelte:head>
	<title>{profile.name} ({profile.handle})</title>
</svelte:head>

<div class="profile">
	<img
		class="banner"
		src="https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
		alt="Sunset"
	/>
	<img
		class="avatar"
		src={profile.avatar}
		alt={profile.name}
	/>
</div>

<div class="content">
	<div class="user">
		<span class="name">{profile.name}</span>
		<span class="handle">{profile.handle}</span>
	</div>
	<div class="about">
		<span>{profile.about}</span>
	</div>
</div>

<!-- {#each profile.tweets as tweet (tweet.id)}
	<Tweet {tweet} {user} />
{/each} -->

<pre>
	{JSON.stringify(profile, null, 2)}
</pre>

<style>
	.profile {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: 200px 60px;
	}

	.banner {
		grid-column: 1 / -1;
		grid-row: 1 / 2;
	}

	.avatar {
		grid-column: 1 / 2;
		grid-row: 1 / -1;
		place-self: center;
		align-self: flex-end;
		width: 120px;
		height: 120px;
		margin: 0 var(--spacing-16);
		border-radius: 50%;
		border: 4px solid var(--background-primary);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.content {
		display: grid;
		gap: var(--spacing-16);
		margin-top: var(--spacing-16);
		padding: 0 var(--spacing-16);
	}

	.user {
		display: grid;
	}

	.name {
		font-size: var(--font-24);
		font-weight: 700;
	}

	.handle {
		color: var(--text-muted);
	}
</style>
