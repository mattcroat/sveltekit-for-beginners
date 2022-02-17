import type { RequestHandler } from '@sveltejs/kit'

import prisma from '$root/lib/prisma'

export const get: RequestHandler = async ({ params }) => {
	const profile = await prisma.user.findFirst({
		where: { name: params.user }
	})

	const tweets = await prisma.tweet.findMany({
		where: { user: { name: params.user } },
		include: { user: true }
	})

	if (!profile || !tweets || tweets.length === 0) {
		return { status: 404 }
	}

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { profile, tweets }
	}
}
