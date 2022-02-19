import type { RequestHandler } from '@sveltejs/kit'
import prisma from '$root/lib/prisma'

export const post: RequestHandler = async ({ request }) => {
	const id = await request.json()

	// get the current like count and update it
	const count = await prisma.tweet.findUnique({
		where: { id },
		select: { likes: true }
	})

	await prisma.tweet.update({
		where: { id },
		data: { likes: (count.likes += 1) }
	})

	return {
		status: 200,
		body: id
	}
}
