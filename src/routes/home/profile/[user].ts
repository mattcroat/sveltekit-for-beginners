import type { RequestHandler } from '@sveltejs/kit'

import prisma from '$root/lib/prisma'
import { timePosted } from '$root/utils/date'

export const get: RequestHandler = async ({ params }) => {
	const profile = await prisma.user.findFirst({
		where: { name: params.user }
	})

	// I can use fetch on the server or create a function
	const data = await prisma.tweet.findMany({
		include: { user: true },
		orderBy: { posted: 'desc' }
	})

	const liked = await prisma.liked.findMany({
		where: { userId: 1 },
		select: { tweetId: true }
	})
	const likedTweets = Object.keys(liked).map(
		(key) => liked[key].tweetId
	)

	// we can design the shape of the data
	const tweets = data.map((tweet) => {
		return {
			id: tweet.id,
			content: tweet.content,
			likes: tweet.likes,
			posted: timePosted(tweet.posted),
			url: tweet.url,
			avatar: tweet.user.avatar,
			handle: tweet.user.handle,
			name: tweet.user.name,
			liked: likedTweets.includes(tweet.id)
		}
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
