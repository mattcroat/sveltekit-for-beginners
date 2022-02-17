<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit'
	import type { User } from '@prisma/client'
	import type { UserTweetsType } from '$root/types'

	export const load: Load = async ({ fetch, params }) => {
		const { user } = params
		const response = await fetch(`/api/user/${user}`)

		if (!response.ok) {
			return {
				status: response.status,
				error: new Error(`Could not get profile. 💩`)
			}
		}

		const { profile, tweets } = await response.json()

		return {
			props: { profile, tweets } as {
				profile: User
				tweets: UserTweetsType[]
			}
		}
	}
</script>

<script lang="ts">
	import Tweet from '$root/components/tweet/tweet.svelte'
	import Transition from '$root/components/transition.svelte'

	export let profile: User
	export let tweets: UserTweetsType[]

	function removeTweet() {
		// todo: placeholder
	}
</script>

<svelte:head>
	<title>{profile.name} ({profile.handle})</title>
</svelte:head>

<Transition>
	<div class="profile">
		<img
			class="banner"
			src="/profile/matia/banner.webp"
			alt="Profile banner"
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

	<nav>
		<ul>
			<li class="active">
				<a href="/">Tweets</a>
			</li>
			<li>
				<a href="/">Tweets & replies</a>
			</li>
			<li>
				<a href="/">Media</a>
			</li>
			<li>
				<a href="/">Likes</a>
			</li>
		</ul>
	</nav>

	{#each tweets as tweet (tweet.id)}
		<Tweet {tweet} {removeTweet} />
	{/each}
</Transition>

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
		text-transform: capitalize;
	}

	.handle {
		color: var(--text-muted);
	}

	nav {
		border-bottom: 1px solid var(--border-primary);
	}

	ul {
		display: flex;
		justify-content: center;
		margin-top: var(--spacing-32);
	}

	li {
		padding: var(--spacing-16) var(--spacing-32);
		font-size: var(--font-16);
		color: var(--text-muted);
		border-bottom: 4px solid transparent;
		transition: all 0.2s;
	}

	li:hover {
		background-color: var(--link-hover);
		border-bottom: 4px solid var(--brand);
	}

	.active {
		font-weight: 700;
		border-bottom: 4px solid var(--brand);
	}
</style>
