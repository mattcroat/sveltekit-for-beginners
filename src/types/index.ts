import type { Tweet, User } from '@prisma/client'

export type UserTweetsType = Tweet & { user: User }
