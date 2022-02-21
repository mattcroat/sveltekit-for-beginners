import type { RequestHandler } from '@sveltejs/kit'

import prisma from '$root/lib/prisma'

export const get: RequestHandler = async () => {
	// tweets of all users
	const tweets = await prisma.tweet.findMany({
		include: { user: true },
		orderBy: { posted: 'desc' }
	})

	// liked tweets from the logged in user
	const liked = await prisma.liked.findMany({
		where: { userId: 1 },
		select: { tweetId: true }
	})
	const likedTweets = Object.keys(liked).map(
		(key) => liked[key].tweetId
	)

	if (!tweets) {
		return { status: 400 }
	}

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { tweets, likedTweets }
	}
}
