
export const load = async ({ fetch, url }: { url: URL, fetch: Function }) => {
    const term = url.searchParams.get('term')
    const response = await fetch(`/api/home?term=${term}`)

    return await response.json()
}