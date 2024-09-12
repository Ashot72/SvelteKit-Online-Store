import { getUserPayments } from "$lib/server/payments";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }: { locals: App.Locals }) => {

    if (!locals.user) {
        throw redirect(302, "/")
    }

    const payments = await getUserPayments(locals.user.id);

    const products = payments.map((payment) => payment.products).flat();
    const total = products
        .reduce((total, item) => item.price * item.qty + total, 0)
        .toFixed(2);

    return { payments, total }
}