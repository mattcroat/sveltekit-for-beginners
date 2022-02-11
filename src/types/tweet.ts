import type { Tweet, User } from '@prisma/client'

export type UserTweetType = Tweet & { user: User }
