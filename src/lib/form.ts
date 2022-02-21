import { invalidate } from '$app/navigation'

type Parameters = {
	result?: ({ form }: { form: HTMLFormElement }) => void
}
type Destroy = { destroy: () => void }
type Enhance = (
	form?: HTMLFormElement,
	{ result }?: Parameters
) => Destroy

// https://github.com/sveltejs/kit/blob/master/packages/create-svelte/templates/default/src/lib/form.ts
export const enhance: Enhance = (form, { result } = {}) => {
	async function handleSubmit(event: Event) {
		event.preventDefault()

		const data = new FormData(form)

		const response = await fetch(form.action, {
			method: form.method,
			headers: { accept: 'application/json' },
			body: data
		})

		if (!response.ok) {
			console.error(await response.text())
		}

		// rerun load function
		const url = new URL(form.action)
		url.search = ''
		url.hash = ''
		invalidate(url.href)

		// reset the form
		if (result) {
			result({ form })
		}
	}

	form.addEventListener('submit', handleSubmit)

	return {
		destroy() {
			form.removeEventListener('submit', handleSubmit)
		}
	}
}
