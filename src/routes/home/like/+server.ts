throw new Error("@migration task: Update +server.js (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");

import type { RequestHandler } from '@sveltejs/kit'

import { likeTweet } from '$root/utils/prisma'

export const post: RequestHandler = async ({ request }) => {
	await likeTweet(request)

	return {
		status: 303,
		headers: {
			location: '/home'
		}
	}
}
