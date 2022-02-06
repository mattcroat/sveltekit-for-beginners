<!--
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
-->

<!-- <script lang="ts">
	export let tweets = []
</script> -->

<h1>Feed</h1>

<!--
	todo: compose component
	todo: tweet component
	todo: add form for composing a tweet
-->

<div class="compose">
	<img src="avatar.png" alt="Avatar" />
	<input placeholder="What's happening?" type="text" />
	<button disabled>Tweet</button>
</div>

<a href="/tweet" class="permalink">
	<article class="tweet-container">
		<a href="/profile">
			<img src="avatar.png" alt="Avatar" />
		</a>

		<div class="tweet-details">
			<div>
				<a href="/profile" class="user">Matia</a>
				<span class="handle">@joyofcodedev</span>
				<span class="posted">· 20m</span>
			</div>

			<div class="tweet">
				<div class="content">
					<p>
						Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Inventore, animi aliquid.
						Inventore nulla quos impedit voluptas obcaecati
						dolor mollitia, dolores architecto, minus
						deleniti provident dignissimos quae tenetur,
						aliquam animi facere.
					</p>
				</div>
				<div class="actions">
					<button class="like">
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
						<span class="count">24</span>
					</button>
					<button class="share">
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
				</div>
			</div>
		</div>
	</article>
</a>

<style>
	h1 {
		position: sticky;
		top: 0;
		padding: var(--spacing-8) var(--spacing-24);
		font-size: var(--font-24);
		backdrop-filter: blur(100px);
	}

	.compose {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		align-items: center;
		gap: var(--spacing-16);
		padding: var(--spacing-16) var(--spacing-24);
		border-bottom: 1px solid var(--border-primary);
	}

	img {
		width: 64px;
		height: 64px;
		border-radius: 50%;
	}

	input {
		color: var(--text-primary);
		background-color: transparent;
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

	.count {
		font-size: 1.4rem;
		font-weight: 400;
	}

	svg {
		width: 24px;
		height: 24px;
	}
</style>
