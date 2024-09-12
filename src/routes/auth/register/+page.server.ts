import { redirect } from "@sveltejs/kit";

export const load = async ({ locals, fetch, url }: { locals: App.Locals, url: URL, fetch: Function }) => {

    if (locals.user) {
        throw redirect(302, "/")
    }

    const term = url.searchParams.get('term')
    const response = await fetch(`/api/home?term=${term}`)

    return await response.json()
}