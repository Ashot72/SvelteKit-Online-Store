import type { Handle } from "@sveltejs/kit";
import { findUserBySession } from "$lib/server/auth";

export const handle: Handle = async ({ event, resolve }) => {
    const session = event.cookies.get("session")

    if (!session) {
        return await resolve(event)
    }

    try {
        const user = await findUserBySession(session)
        if (user) {
            event.locals.user = {
                id: user.id,
                email: user.email
            }
        }
    } catch (e) {
    }

    return resolve(event)
}