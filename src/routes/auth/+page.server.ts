import { fail, redirect, type Cookies } from "@sveltejs/kit"
import type { Auth } from "$lib/types";
import bcrypt from 'bcrypt'
import { z } from "zod"
import { createUser, findUserByEmail, updateUser, userExists } from "$lib/server/auth";

const validate = async (email: string, password: string) => {
    const result = z
        .object({
            email: z
                .string()
                .trim()
                .toLowerCase()
                .min(1, "Email is required")
                .email(),
            password: z
                .string()
                .trim()
                .min(6, "Password must be at least 6 digit long")
        })
        .safeParse({ email, password })

    return result
}

const setCookies = (cookies: Cookies, token: string) => {
    cookies.set('session', token, {
        path: "/",
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30
    })

    throw redirect(302, "/")
}

export const actions = {

    login: async ({ cookies, request }: { cookies: Cookies, request: Request }) => {
        const formData = await request.formData()

        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const data = Object.fromEntries(formData)

        const result = await validate(email, password)

        if (!result.success) {
            const authFail: Auth = {
                data,
                errors: result.error.flatten().fieldErrors
            }
            return fail(400, authFail)
        }

        let authenticatedUser
        try {
            const user = await findUserByEmail(email)

            if (!user) {
                const authFail: Auth = {
                    data,
                    errors: { email: ["User is not found"] }
                }
                return fail(400, authFail)
            }

            const userPassword = await bcrypt.compare(password, user.passowrdHash)

            if (!userPassword) {
                const authFail: Auth = {
                    data,
                    errors: { email: ["Invalid password"] }
                }
                return fail(400, authFail)
            }

            authenticatedUser = await updateUser(email)
        } catch (e: any) {
            const authFail: Auth = {
                data,
                errors: { form: [e.message] }
            }
            return fail(400, authFail)
        }

        setCookies(cookies, authenticatedUser.userAuthToken)
    },
    register: async ({ cookies, request }: { cookies: Cookies, request: Request }) => {
        const formData = await request.formData()

        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const data = Object.fromEntries(formData)

        const result = await validate(email, password)

        if (!result.success) {
            const authFail: Auth = {
                data,
                errors: result.error.flatten().fieldErrors
            }
            return fail(400, authFail)
        }

        try {
            if (await userExists(result.data.email)) {
                const authFail: Auth = {
                    data,
                    errors: { email: ["User already exists with this email"] }
                }
                return fail(400, authFail)
            }
        } catch (e: any) {
            const authFail: Auth = {
                data,
                errors: { email: [e.message] }
            }
            return fail(400, authFail)
        }

        let user
        try {
            user = await createUser(result.data.email, result.data.password)
        } catch (e: any) {
            const authFail: Auth = {
                data,
                errors: { form: [e.message] }
            }
            return fail(400, authFail)
        }
        setCookies(cookies, user.userAuthToken)
    }
}
