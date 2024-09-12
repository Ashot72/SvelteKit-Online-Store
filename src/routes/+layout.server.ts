
export const load = async ({ locals, url }: { locals: App.Locals, url: URL }) => {

    return {
        user: locals.user,
        term: url.searchParams.get('term'),
        pathname: url.pathname
    }
}