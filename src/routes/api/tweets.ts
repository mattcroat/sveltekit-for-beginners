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

export const post: RequestHandler = async ({ request }) => {
	// receive form data using standard form
	// const data = await request.formData()

	return {
		body: {
			success: true
		}
	}
}
