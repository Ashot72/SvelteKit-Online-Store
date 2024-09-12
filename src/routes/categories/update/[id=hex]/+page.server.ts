
import { redirect } from "@sveltejs/kit";
import { getCategories } from "$lib/server/categories";

export const load = async ({ locals, params }: { locals: App.Locals, params: { id: string } }) => {

    if (!locals.user || !params.id) {
        throw redirect(302, "/")
    }

    const categories = await getCategories()
    const category = categories.find(c => c.id === params.id)

    return { categories, category }
}