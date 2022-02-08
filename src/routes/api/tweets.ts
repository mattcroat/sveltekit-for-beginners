import type { RequestHandler } from '@sveltejs/kit'

import prisma from '$root/lib/prisma'

export const get: RequestHandler = async () => {
	const tweets = await prisma.tweet.findMany({
		include: {
			user: true
		},
		orderBy: {
			posted: 'desc'
		}
	})

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
