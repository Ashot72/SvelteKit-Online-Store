import React from "react";
import StripeCheckout from "react-stripe-checkout";

export default function Checkout({ email, total, userId }: { email: string, total: number, userId: string }) {

    const payments = async ({ token }: { token: string }) => {
        try {
            const response = await fetch("/api/stripe", {
                method: "POST",
                body: JSON.stringify({ token, total, userId }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                alert(response.status + ": " + response.statusText);
            } else {
                location.href = "/orders";
            }
        } catch (error: any) {
            console.error("Error:", error);
            alert(error.message);
        }
    };

    return (
        <StripeCheckout
            token={({ id }) => payments({ token: id })}
            amount={total * 100}
            email={email}
            stripeKey="pk_test_51KwPjRKVwzOYdWGqjhA8O5jQrUHXmSo8VVJaaOBsEROZKOKqsxNzind6nj1mUTcw68MRXOHxQblzEwc8hv3CxSPT00xDuqVkzU"
        />
    );
}