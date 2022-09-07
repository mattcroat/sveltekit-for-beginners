throw new Error("@migration task: Update +page.server.js (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");

import type { RequestHandler } from '@sveltejs/kit'

import { getTweet } from '$root/utils/prisma'

export const get: RequestHandler = async ({ params }) => {
	const tweet = await getTweet(params)

	if (!tweet) {
		return { status: 400 }
	}

	return {
		status: 200,
		body: { tweet }
	}
}
