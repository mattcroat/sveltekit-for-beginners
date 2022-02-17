<script lang="ts">
	import { timePosted } from '$root/utils/date'
	import type { TweetType } from '$root/types'

	export let tweet: TweetType
	export let removeTweet: (id: string) => void

	const profile = `/home/profile/${tweet.user.name.toLowerCase()}`
	const permalink = `${profile}/status/${tweet.url}`
	const posted = timePosted(tweet.posted)
</script>

<a href={permalink} class="permalink">
	<article class="tweet-container">
		<a class="avatar" href={profile}>
			<img src={tweet.user.avatar} alt={tweet.user.name} />
		</a>

		<div class="tweet-details">
			<div>
				<a href={profile} class="user">{tweet.user.name}</a>
				<span class="handle">{tweet.user.handle}</span>
				<span class="posted"> · {posted}</span>
			</div>

			<div class="tweet">
				<div class="content">
					{tweet.content}
				</div>
				<div class="actions">
					<button class="btn like" title="Like">
						<div class="circle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1"
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						</div>
						<span class="count">{tweet.likes}</span>
					</button>
					<button class="btn share" title="Share">
						<div class="circle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1"
									d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
								/>
							</svg>
						</div>
					</button>
					<button
						on:click|preventDefault={() =>
							removeTweet(tweet.id)}
						class="btn remove"
						title="Remove"
					>
						<div class="circle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1"
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</div>
					</button>
				</div>
			</div>
		</div>
	</article>
</a>

<style>
	.avatar {
		align-self: start;
	}

	img {
		width: 48px;
		height: 48px;
		border-radius: 50%;
	}

	button {
		font-size: var(--font-16);
		padding: var(--spacing-16);
	}

	.permalink:hover .tweet-container {
		background-color: var(--background-secondary);
	}

	.tweet-container {
		display: grid;
		grid-template-columns: min-content 1fr;
		gap: var(--spacing-16);
		padding: var(--spacing-16) var(--spacing-24);
		border-bottom: 1px solid var(--border-primary);
		transition: all 0.3s;
	}

	.tweet-details {
		display: grid;
		gap: var(--spacing-8);
	}

	.user {
		font-weight: 700;
		text-transform: capitalize;
	}

	.user:hover {
		text-decoration: underline;
	}

	.handle,
	.posted {
		font-size: var(--font-16);
		color: var(--text-muted);
	}

	.content {
		font-size: var(--font-16);
	}

	.actions {
		display: flex;
		gap: var(--spacing-32);
		margin-top: var(--spacing-16);
	}

	.actions > button {
		padding: 0;
		color: var(--text-muted);
		background: none;
		transition: all 0.3s;
	}

	.circle {
		width: 24px;
		height: 24px;
		display: grid;
		place-content: center;
		padding: var(--spacing-16);
		border-radius: 50%;
		transition: all 0.3s;
	}

	.like {
		display: flex;
		gap: var(--spacing-16);
		align-items: center;
	}

	.like:hover {
		color: hsl(9 100% 64%);
	}

	.like:hover .circle {
		background: hsla(9 100% 64% / 10%);
	}

	.share:hover {
		color: hsl(120 100% 40%);
	}

	.share:hover .circle {
		background-color: hsla(120 100% 50% / 4%);
	}

	.remove:hover {
		color: hsl(0 100% 50%);
	}
	.remove:hover .circle {
		background-color: hsla(0 100% 50% / 4%);
	}

	.count {
		font-size: 1.4rem;
		font-weight: 400;
	}

	svg {
		width: 24px;
		height: 24px;
	}
</style>
