import { fail, redirect } from "@sveltejs/kit"
import type { Product } from "$lib/types"
import type { Product as DBProduct } from "@prisma/client"
import { z } from "zod"
import { addProduct, deleteProduct, updateProduct } from "$lib/server/products"

const validate = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const count = formData.get("count") as string;
    const picture = formData.get("picture") as string;

    const result = z
        .object({
            name: z.string().min(5),
            description: z.string().min(10),
            price: z.coerce
                .number()
                .gt(0, "Must be positive number")
                .multipleOf(0.01, "Must have a maximum of two decimal places"),
            count: z.coerce.number().gt(0, "Must be positive number").int(),
            picture: z.string().min(1, "Must upload an image").trim(),
        })
        .safeParse({ name, description, price, count, picture });

    return result
}

export const actions = {
    delete: async ({ request }: { request: Request }) => {
        const formData = await request.formData()
        const id = formData.get("id") as string

        let categoryId
        try {
            const product = await deleteProduct(id);
            categoryId = product.categoryId;
        } catch (e: any) {
            const productFail: Product = {
                errors: { form: [e.message] }
            }
            return fail(400, productFail)
        }

        throw redirect(302, `/products/${categoryId}`)
    },
    add: async ({ locals, request }: { locals: App.Locals, request: Request }) => {
        const formData = await request.formData()
        formData.delete("image")

        const categoryId = formData.get("categoryId") as string;
        const data = Object.fromEntries(formData)

        const result = await validate(formData)

        if (!result.success) {
            const productFail: Product = {
                data,
                errors: result.error.flatten().fieldErrors
            }
            return fail(400, productFail)
        }

        try {
            const newProduct = {
                name: result.data.name,
                description: result.data.description,
                price: result.data.price,
                count: result.data.count,
                picture: result.data.picture,
            } as DBProduct;

            await addProduct(newProduct, categoryId, locals.user.id)

        } catch (e: any) {
            const productFail: Product = {
                data,
                errors: { form: [e.message] }
            }
            return fail(400, productFail)
        }

        throw redirect(302, `/products/${categoryId}`)
    },

    update: async ({ request }: { request: Request }) => {
        const formData = await request.formData()
        formData.delete("image")

        const id = formData.get("id") as string;
        const categoryId = formData.get("categoryId") as string;
        const data = Object.fromEntries(formData)

        const result = await validate(formData)

        if (!result.success) {

            const productFail: Product = {
                data,
                errors: result.error.flatten().fieldErrors
            }
            return fail(400, productFail)
        }

        try {
            const product = {
                name: result.data.name,
                description: result.data.description,
                price: result.data.price,
                count: result.data.count,
                picture: result.data.picture,
                categoryId,
            } as DBProduct;

            await updateProduct(id, product);
        } catch (e: any) {
            const productFail: Product = {
                data,
                errors: { form: [e.message] }
            }
            return fail(400, productFail)
        }

        throw redirect(302, `/products/${categoryId}`)
    }
}
