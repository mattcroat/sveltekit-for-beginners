import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// should seed instead
async function main() {
	await prisma.user.create({
		data: {
			name: 'Matia',
			email: 'matia@example.test',
			tweets: {
				create: {
					content: 'SvelteKit is lit 🔥',
					likes: 0
				}
			},
			profile: {
				create: {
					about: 'Likes long walks on the beach. 😘'
				}
			}
		}
	})
}

main()
	.catch((error) => {
		throw error
	})
	.finally(async () => {
		await prisma.$disconnect()
	})

export default prisma
