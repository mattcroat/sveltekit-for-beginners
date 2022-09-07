throw new Error("@migration task: Update +page.server.js (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");

import type { RequestHandler } from '@sveltejs/kit'

import {
	createTweet,
	getTweets,
	removeTweet
} from '$root/utils/prisma'

export const get: RequestHandler = async () => {
	const tweets = await getTweets()

	if (!tweets) {
		return { status: 400 }
	}

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { tweets }
	}
}

export const post: RequestHandler = async ({ request }) => {
	await createTweet(request)

	return {}
}

export const del: RequestHandler = async ({ request }) => {
	await removeTweet(request)

	return {
		status: 303,
		headers: { location: '/home' }
	}
}
