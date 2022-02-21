import prisma from '$root/lib/prisma'
import type { RequestHandler } from '@sveltejs/kit'

export const post: RequestHandler = async ({ request }) => {
	const form = await request.formData()
	const id = +form.get('id')

	// verify if tweet is already liked
	const liked = await prisma.liked.count({
		where: { tweetId: id }
	})

	if (liked === 1) {
		// if tweet is already liked unlike it
		await prisma.liked.delete({ where: { tweetId: id } })

		// also update the likes count
		const count = await prisma.tweet.findUnique({
			where: { id },
			select: { likes: true }
		})

		await prisma.tweet.update({
			where: { id },
			data: { likes: (count.likes -= 1) }
		})

		return {
			status: 303,
			headers: {
				location: '/home'
			}
		}
	}

	// add liked record
	await prisma.liked.create({
		data: {
			tweetId: id,
			user: { connect: { id: 1 } }
		}
	})

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
		status: 303,
		headers: {
			location: '/home'
		}
	}
}
