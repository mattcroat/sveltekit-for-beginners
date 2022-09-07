throw new Error("@migration task: Update +page.server.js (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");

import type { RequestHandler } from '@sveltejs/kit'
import { getUserProfile } from '$root/utils/prisma'

export const get: RequestHandler = async ({ params }) => {
	const { profile, tweets } = await getUserProfile(params)

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { profile, tweets }
	}
}
