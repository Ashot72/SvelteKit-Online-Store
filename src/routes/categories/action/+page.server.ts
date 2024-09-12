import { fail, redirect } from "@sveltejs/kit"
import type { Category } from "$lib/types";
import type { Category as DBCategory } from "@prisma/client";
import { z } from "zod"
import { addCategory, deleteCategory, updateCategory } from "$lib/server/categories";

const validate = async (formData: FormData) => {
    const name = formData.get("name") as string
    const description = formData.get("description") as string

    const result = z
        .object({
            name: z
                .string()
                .min(4)
                .regex(/^[a-zA-Z\s\&]*$/, "Must be letters, spaces and ampersands")
                .trim(),
            description: z.string().min(10).trim(),
        })
        .safeParse({ name, description });

    return result
}

export const actions = {
    delete: async ({ request }: { request: Request }) => {
        const formData = await request.formData()
        const id = formData.get("id") as string

        try {
            await deleteCategory(id)
        } catch (e: any) {
            const categoryFail: Category = {
                data: { id },
                errors: { form: [e.message] }
            }
            return fail(400, categoryFail)
        }

        throw redirect(302, "/categories")
    },
    add: async ({ locals, request }: { locals: App.Locals, request: Request }) => {
        const formData = await request.formData()

        const data = Object.fromEntries(formData)

        const result = await validate(formData)

        if (!result.success) {
            const categoryFail: Category = {
                data,
                errors: result.error.flatten().fieldErrors
            }
            return fail(400, categoryFail)
        }

        try {
            const newCategory = {
                name: result.data.name,
                description: result.data.description,
                userId: locals.user.id
            } as DBCategory
            await addCategory(newCategory)
        } catch (e: any) {
            const categoryFail: Category = {
                data,
                errors: { form: [e.message] }
            }
            return fail(400, categoryFail)
        }

        throw redirect(302, "/categories")
    },

    update: async ({ request }: { request: Request }) => {
        const formData = await request.formData()

        const id = formData.get("id") as string
        const data = Object.fromEntries(formData)

        const result = await validate(formData)

        if (!result.success) {
            const categoryFail: Category = {
                data,
                errors: result.error.flatten().fieldErrors
            }
            return fail(400, categoryFail)
        }

        try {
            const category = {
                name: result.data.name,
                description: result.data.description
            } as DBCategory

            await updateCategory(id, category)
        } catch (e: any) {
            const categoryFail: Category = {
                data,
                errors: { form: [e.message] }
            }
            return fail(400, categoryFail)
        }

        throw redirect(302, "/categories")
    }
}