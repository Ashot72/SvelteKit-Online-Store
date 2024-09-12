import { getCategories } from "$lib/server/categories";
import { getCategoryProducts, getProductsBySearchTerm } from "$lib/server/products";
import type { Product } from "@prisma/client";
import { json } from "@sveltejs/kit";

export async function GET({ url }: { url: URL }) {
    const term = url.searchParams.get('term')
    const categoryId = url.searchParams.get('catId')

    const categories = await getCategories()
    let products: Product[] = []

    if (term !== 'null') {
        products = await getProductsBySearchTerm(term!);
    } else {
        if (categories.length > 0) {
            products = await getCategoryProducts(categoryId ?? categories[0].id);
        }
    }

    return json({ categories, products })
}