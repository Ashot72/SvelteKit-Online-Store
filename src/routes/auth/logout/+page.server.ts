import { redirect, type Cookies } from "@sveltejs/kit";

export const load = async () => {
    throw redirect(302, "/")
}

export const actions = {
    default({ cookies }: { cookies: Cookies }) {
        cookies.set('session', "", {
            path: "/",
            expires: new Date(0)
        })

        throw redirect(302, "/")
    }
}