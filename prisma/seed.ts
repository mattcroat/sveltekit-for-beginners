import PrismaClientPkg from '@prisma/client'

// Prisma doesn't support ES Modules so we have to do this
const PrismaClient = PrismaClientPkg.PrismaClient
const prisma = new PrismaClient()

export function uniqueId(): string {
	return Math.random().toString(16).slice(2)
}

export function randomDate(): string {
	// this is set to one day
	const offset = 24 * 60 * 60 * 1000 * 1

	const current = new Date().getTime()
	const random = Math.random() * offset
	const difference = new Date(current - random)

	return difference.toISOString()
}

async function seed() {
	await prisma.user.create({
		data: {
			name: 'Matia',
			handle: '@joyofcodedev',
			email: 'matia@example.test',
			avatar: 'https://i.pravatar.cc/200?img=65',
			about: 'Likes long walks on the beach. 😘',
			tweets: {
				create: [
					{
						tweetId: uniqueId(),
						posted: randomDate(),
						content: 'SvelteKit is lit 🔥',
						likes: 10
					},
					{
						tweetId: uniqueId(),
						posted: randomDate(),
						content: 'I love Svelte ❤️',
						likes: 4
					},
					{
						tweetId: uniqueId(),
						posted: randomDate(),
						content: 'Stuck in Vim 😱',
						likes: 100
					},
					{
						tweetId: uniqueId(),
						posted: randomDate(),
						content: 'Hello, World! 👋',
						likes: 0
					}
				]
			}
		}
	})

	await prisma.user.create({
		data: {
			name: 'Example',
			handle: '@example',
			email: 'example@example.test',
			avatar: 'https://i.pravatar.cc/200?img=31',
			about: 'Likes examples. 😘',
			tweets: {
				create: [
					{
						tweetId: uniqueId(),
						posted: randomDate(),
						content: 'Example 🔥',
						likes: 1
					},
					{
						tweetId: uniqueId(),
						posted: randomDate(),
						content: 'Another tweet 🐦️',
						likes: 4
					},
					{
						tweetId: uniqueId(),
						posted: randomDate(),
						content: 'Let me share a poem. ✍️',
						likes: 0
					},
					{
						tweetId: uniqueId(),
						posted: randomDate(),
						content: 'What is updog? 🐕️',
						likes: 10
					}
				]
			}
		}
	})
}

seed()
