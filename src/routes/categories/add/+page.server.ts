
import { redirect } from "@sveltejs/kit";
import { getCategories } from "$lib/server/categories";

export const load = async ({ locals }: { locals: App.Locals }) => {

    if (!locals.user) {
        throw redirect(302, "/")
    }

    const categories = await getCategories()

    return { categories }
}