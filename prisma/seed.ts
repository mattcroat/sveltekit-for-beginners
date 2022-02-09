import PrismaClientPkg from '@prisma/client'

// Prisma doesn't support ES Modules so we have to do this
const PrismaClient = PrismaClientPkg.PrismaClient
const prisma = new PrismaClient()

export function uniqueId(): string {
	return Math.random().toString(16).slice(2)
}

// gets random time starting from now and
// going back one day whenever you seed the
// database in the future
export function randomDate(): string {
	// this is set to one day
	const offset = 24 * 60 * 60 * 1000 * 1

	const current = new Date().getTime()
	const random = Math.random() * offset
	const difference = new Date(current - random)

	return difference.toISOString()
}

function getUsers() {
	return [
		{
			name: 'Ronnie',
			handle: '@theronald',
			email: 'theronald@example.test',
			avatar: 'https://i.pravatar.cc/200?img=65',
			about: 'Likes long walks on the beach. 😘',
			tweets: {
				create: [
					{
						tweetId: uniqueId(),
						posted: randomDate(),
						content: `SvelteKit is lit. 🔥`,
						likes: 10
					},
					{
						tweetId: uniqueId(),
						posted: randomDate(),
						content: `I love Svelte! ❤️`,
						likes: 24
					},
					{
						tweetId: uniqueId(),
						posted: randomDate(),
						content: `Sometimes when I'm writing JavaScript I want to throw up my hands and say "this is crazy!" but I can't remember what "this" refers to. 🤪`,
						likes: 0
					},
					{
						tweetId: uniqueId(),
						posted: randomDate(),
						content: `How do you comfort a JavaScript bug? You console it. 🤭`,
						likes: 0
					}
				]
			}
		},
		{
			name: 'Ros',
			handle: '@ros',
			email: 'ros@example.test',
			avatar: 'https://i.pravatar.cc/200?img=38',
			about: 'Likes painting.',
			tweets: {
				create: [
					{
						tweetId: uniqueId(),
						posted: randomDate(),
						content: `Use your imagination. Wind it up, blend it together. The joy of painting really is universal.`,
						likes: 1
					},
					{
						tweetId: uniqueId(),
						posted: randomDate(),
						content: `The only thing I have control over is taking out the trash. 😂`,
						likes: 4
					},
					{
						tweetId: uniqueId(),
						posted: randomDate(),
						content:
							'Painting is as individual as people are. 👩‍🎨',
						likes: 0
					},
					{
						tweetId: uniqueId(),
						posted: randomDate(),
						content:
							'All we do is just sorta have an idea in our mind, and we just sorta let it happen. 🌈',
						likes: 10
					}
				]
			}
		}
	]
}

async function seed() {
	await Promise.all(
		getUsers().map((user) => {
			return prisma.user.create({ data: user })
		})
	)
}

seed()
