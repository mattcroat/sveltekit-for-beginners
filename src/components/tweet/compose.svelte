<div class="compose">
	<img src="avatar.png" alt="Avatar" />
	<form on:submit|preventDefault>
		<input placeholder="What's happening?" type="text" />
		<button disabled>Tweet</button>
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
</style>
