import { addPayments } from "$lib/server/payments";

export async function POST({ request }: { request: Request }) {
    const data: { token: string, total: number, userId: string } = await request.json()

    try {
        await addPayments(data.userId, data.token, data.total);
    } catch (e: any) {
        return new Response(e.message, {
            status: 400,
        });
    }

    return new Response("Payment added", {
        status: 201,
    });
}