import type { RequestHandler } from '@sveltejs/kit'

import prisma from '$root/lib/prisma'

export const get: RequestHandler = async () => {
	const tweets = await prisma.tweet.findMany({
		include: { user: true },
		orderBy: { posted: 'desc' }
	})

	if (!tweets) {
		return { status: 400 }
	}

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { tweets }
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

	return {
		status: 303,
		body: { tweet },
		headers: { location: '/home' }
	}
}

export const del: RequestHandler = async ({ request }) => {
	const form = await request.formData()
	const tweetId = +form.get('id')

	await prisma.tweet.delete({ where: { id: tweetId } })

	return {
		status: 303,
		body: { tweetId },
		headers: { location: '/home' }
	}
}
