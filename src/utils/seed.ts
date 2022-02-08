export function uniqueId(): string {
	return Math.random().toString(16).slice(2)
}

export function randomDate(): string {
	const day = 60 * 60 * 24

	const currentDate = new Date().getTime()
	const randomTime = Math.round(Math.random() * day)
	const randomDate = new Date(currentDate - randomTime)

	return randomDate.toISOString()
}
