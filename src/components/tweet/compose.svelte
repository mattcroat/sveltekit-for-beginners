<script lang="ts">
	export let addTweet: (tweet: string) => void

	let tweet = ''
	let maxCharacters = 140

	$: charactersLeft = maxCharacters - tweet.length

	// it's wiser to use a schema validation library
	// such as https://github.com/colinhacks/zod
	function isNotOverCharacterLimit(value: string): boolean {
		const characterLimit = 140
		return value.length < characterLimit
	}

	async function handleSubmit(event: SubmitEvent) {
		let form = event.target as HTMLFormElement
		const formData = new FormData(form)
		const content = formData.get('tweet') as string

		if (!isNotOverCharacterLimit(content)) {
			// we could have error handling here
			return
		}

		addTweet(tweet)
		tweet = ''
	}
</script>

<div class="compose">
	<img
		src="https://i.pravatar.cc/200?img=65"
		alt="Ronnie"
	/>
	<form
		on:submit|preventDefault={handleSubmit}
		autocomplete="off"
	>
		<!--
			name attribute is important if you want to
			get values using formData later
		-->
		<input
			aria-label="Enter your Tweet"
			bind:value={tweet}
			name="tweet"
			placeholder="What's up dog?"
			type="text"
		/>
		<button
			class="btn"
			class:error={charactersLeft < 0}
			disabled={charactersLeft <= 0 ||
				charactersLeft === maxCharacters}
			type="submit"
		>
			{charactersLeft === maxCharacters
				? 'Tweet'
				: charactersLeft}
		</button>
	</form>
</div>

<style>
	.compose {
		display: grid;
		grid-template-columns: min-content 1fr;
		align-items: center;
		gap: var(--spacing-16);
		padding: var(--spacing-16) var(--spacing-24);
		border-bottom: 1px solid var(--border-primary);
	}

	img {
		width: 48px;
		height: 48px;
		border-radius: 50%;
	}

	form {
		display: flex;
		align-items: center;
		gap: var(--spacing-16);
	}

	input {
		color: var(--text-primary);
		background-color: transparent;
	}

	button {
		min-width: 80px;
		font-size: var(--font-16);
		padding: var(--spacing-16);
	}

	.error {
		color: tomato;
	}
</style>
