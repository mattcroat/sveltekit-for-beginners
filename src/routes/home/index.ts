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

// https://kit.svelte.dev/docs/routing#endpoints-body-parsing
export const post: RequestHandler = async ({ request }) => {
	const form = await request.formData()
	const tweet = form.get('tweet') as string

	if (tweet.length > 140) {
		return {
			status: 400,
			body: 'Maximum Tweet length exceeded.',
			headers: { location: '/home' }
		}
	}

	// add to database, user is hardcoded
	await prisma.tweet.create({
		data: {
			posted: new Date(),
			url: Math.random().toString(16).slice(2),
			content: tweet,
			likes: 0,
			user: { connect: { id: 1 } }
		}
	})

	return {}
}
