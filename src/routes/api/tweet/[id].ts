import type { RequestHandler } from '@sveltejs/kit'

import prisma from '$root/lib/prisma'

export const get: RequestHandler = async ({ params }) => {
	const tweet = await prisma.tweet.findFirst({
		where: { url: params.id },
		include: { user: true }
	})

	if (!tweet) {
		return { status: 400 }
	}

	return {
		status: 200,
		body: { tweet }
	}
}
