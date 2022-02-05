<main class="container">
	<section class="hero">
		<h1 class="title">Twittr 🐦️</h1>
		<p class="text">Share your hot take with everyone.</p>
	</section>

	<section class="login">
		<form
			on:submit|preventDefault
			class="register"
			autocomplete="off"
		>
			<div>
				<label for="username">Username</label>
				<input id="username" type="text" />
			</div>

			<div>
				<label for="id">Email</label>
				<input id="email" type="email" />
			</div>

			<button type="submit" disabled>Register</button>
		</form>
	</section>
</main>

<style>
	.container {
		height: 100vh;
		display: grid;
	}

	@media (min-width: 1024px) {
		.container {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.hero,
	.login {
		display: grid;
		place-content: center;
	}

	.hero {
		background-color: var(--brand);
		text-align: center;
	}

	.title {
		font-size: var(--font-80);
		z-index: 2;
	}

	.text {
		padding: var(--spacing-16);
		transform: rotate(2deg) translateY(-40%);
		background: var(--background-primary);
		font-weight: bold;
		font-size: var(--font-24);
		z-index: 1;
	}

	.register {
		display: grid;
		gap: var(--spacing-16);
		padding: 4rem;
		border: 1px solid var(--border-login);
		border-radius: var(--radius-base);
	}
</style>
