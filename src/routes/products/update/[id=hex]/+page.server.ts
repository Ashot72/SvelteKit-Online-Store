
import { redirect } from "@sveltejs/kit";
import { getCategoryProducts } from "$lib/server/products";

export const load = async ({ locals, params }: { locals: App.Locals, params: { id: string } }) => {

    if (!locals.user || !params.id) {
        throw redirect(302, "/")
    }

    const products = await getCategoryProducts(params.id)
    const product = products.find(c => c.categoryId === params.id)

    return { products, product, categoryId: params.id }
}