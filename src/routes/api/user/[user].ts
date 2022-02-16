import type { RequestHandler } from '@sveltejs/kit'

import prisma from '$root/lib/prisma'

export const get: RequestHandler = async ({ params }) => {
	const { user } = params

	const profile = await prisma.user.findFirst({
		// hardcoded because I need to fix seed
		where: { name: 'Ronald' },
		include: { tweets: true }
	})

	if (!profile) {
		return { status: 400 }
	}

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { profile }
	}
}
