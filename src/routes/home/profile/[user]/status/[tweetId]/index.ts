import type { RequestHandler } from '@sveltejs/kit'

import prisma from '$root/lib/prisma'
import { timePosted } from '$root/utils/date'

export const get: RequestHandler = async ({ params }) => {
	const tweet = await prisma.tweet.findFirst({
		where: { url: params.tweetId },
		include: { user: true }
	})

	const liked = await prisma.liked.findMany({
		where: { userId: 1 },
		select: { tweetId: true }
	})
	const likedTweets = Object.keys(liked).map(
		(key) => liked[key].tweetId
	)

	const data = {
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

	if (!tweet) {
		return { status: 400 }
	}

	return {
		status: 200,
		body: { tweet: data }
	}
}
