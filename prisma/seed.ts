import PrismaClientPkg from '@prisma/client'

// Prisma doesn't support ES Modules so we have to do this
const PrismaClient = PrismaClientPkg.PrismaClient
const prisma = new PrismaClient()

async function seed() {
	await prisma.user.create({
		data: {
			name: 'Matia',
			email: 'matia@example.test',
			about: 'Likes long walks on the beach. 😘',
			tweets: {
				create: [
					{ content: 'SvelteKit is lit 🔥', likes: 10 },
					{ content: 'I love Svelte ❤️', likes: 4 },
					{ content: 'Stuck in Vim 😱', likes: 100 },
					{ content: 'Hello, World! 👋', likes: 0 }
				]
			}
		}
	})
}

seed()
