import type { Category as DBCategory, Product as DBProduct } from "@prisma/client";

export type Home = {
    categories: DBCategory[];
    products: DBProduct[];
    user: App.Locals['user'];
    error: string;
}

export type Auth = {
    errors?: {
        email?: string[];
        password?: string[];
        form?: string[];
    };
    data?: {
        email?: string;
        password?: string;
    };
}

export type Cart = {
    errors?: {
        id?: string[];
        form?: string[];
    };
    data?: { id?: string }
}

export type Category = {
    errors?: {
        name?: string[];
        description?: string[];
        form?: string[];
    };
    data?: {
        id?: string,
        name?: string,
        description?: string
    }
}

export type Product = {
    errors?: {
        name?: string[]
        description?: string[]
        price?: string[]
        count?: string[]
        picture?: string[]
        form?: string[]
    }
    data?: {
        id?: string,
        name?: string,
        description?: string
        price?: number
        count?: number
        picture?: string
    }
}