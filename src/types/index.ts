import type { Tweet, User } from '@prisma/client'

export type TweetType = Tweet & { user: User }

export type ProfileType = User & { tweets: Tweet[] }
