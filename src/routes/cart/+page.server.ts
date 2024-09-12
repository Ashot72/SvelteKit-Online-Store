import { getUserCart } from "$lib/server/cart";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }: { locals: App.Locals }) => {

    if (!locals.user) {
        throw redirect(302, "/")
    }

    const cart = await getUserCart(locals.user.id);

    let total = 0

    if (cart) {
        const count = cart.products.map((a) => a.qty * a.price);
        total = +count.reduce((v, a) => v + a, 0).toFixed(2);
    }

    return { cart, total }
}