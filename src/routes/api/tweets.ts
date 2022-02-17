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
		headers: {
			'Content-Type': 'application/json'
		},
		status: 200,
		body: { tweets }
	}
}

// https://kit.svelte.dev/docs/routing#endpoints-body-parsing
export const post: RequestHandler = async ({ request }) => {
	const { tweet } = await request.json()

	// should use some more serious validation 😆
	if (!tweet || tweet.length > 140) {
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
		body: { tweet }
	}
}

export const del: RequestHandler = async ({ request }) => {
	const { id } = await request.json()
	await prisma.tweet.delete({ where: { id } })

	return {
		status: 200,
		body: id
	}
}
