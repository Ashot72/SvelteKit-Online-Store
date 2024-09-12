
export const load = async ({ params, url, fetch }: { params: { id: string }, url: URL, fetch: Function }) => {

    const term = url.searchParams.get('term')
    const response = await fetch(`/api/home?term=${term}&catId=${params.id}`)

    return await response.json()
}