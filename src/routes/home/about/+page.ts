import { dev } from '$app/env'

// load JavaScript in development for hot module replacement
export const hydrate = dev

// prerender static page in production
export const prerender = true
