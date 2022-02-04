import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async () => {
	const tweets = [
		{ tweet: '🐦️' },
		{ tweet: '🐦️' },
		{ tweet: '🐦️' },
		{ tweet: '🐦️' }
	]

	if (!tweets) {
		return {
			status: 400
		}
	}

	return {
		headers: {
			'Content-Type': 'application/json'
		},
		status: 200,
		body: { tweets }
	}
}
