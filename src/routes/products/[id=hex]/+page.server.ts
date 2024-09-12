import { getCategoryProducts } from "$lib/server/products";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals, params }: { locals: App.Locals, params: { id: string } }) => {

    if (!locals.user || !params.id) {
        throw redirect(302, "/")
    }

    const products = await getCategoryProducts(params.id)
    const categoryId = params.id
    return { products, categoryId }
}