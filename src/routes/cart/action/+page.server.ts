import { fail, redirect } from "@sveltejs/kit"
import type { Cart } from "$lib/types";
import { addOrRemove, addToCart, removeAll } from "$lib/server/cart";

export const actions = {
    add: async ({ locals, request }: { locals: App.Locals, request: Request }) => {
        const formData = await request.formData()

        const id = formData.get("id") as string

        const userId = locals.user.id

        try {
            await addToCart(id, userId);
        } catch (e: any) {
            const cartFail: Cart = {
                data: { id },
                errors: { form: [e.message] }
            }

            return fail(400, cartFail)
        }

        throw redirect(302, `/cart`)
    },

    addremove: async ({ locals, request }: { locals: App.Locals, request: Request }) => {
        const formData = await request.formData()

        const id = formData.get("id") as string
        const add = formData.get("add") as string

        const userId = locals.user.id

        try {
            await addOrRemove(id, userId, add === "true");
        } catch (e: any) {
            const cartFail: Cart = {
                data: { id },
                errors: { form: [e.message] }
            }

            return fail(400, cartFail)
        }

        throw redirect(302, `/cart`)
    },

    delete: async ({ locals, request }: { locals: App.Locals, request: Request }) => {
        const formData = await request.formData()

        const id = formData.get("id") as string

        const userId = locals.user.id

        try {
            await removeAll(id, userId);
        } catch (e: any) {
            const cartFail: Cart = {
                data: { id },
                errors: { form: [e.message] }
            }

            return fail(400, cartFail)
        }

        throw redirect(302, `/cart`)
    }
}