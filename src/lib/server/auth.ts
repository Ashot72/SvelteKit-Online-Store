import bcrypt from 'bcrypt'
import type { User } from '@prisma/client'
import { prisma } from "$lib/server/db"

export async function userExists(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true }
    })

    return Boolean(user)
}

export async function findUserBySession(session: string): Promise<User | null> {
    return prisma.user.findUnique({
        where: { userAuthToken: session },
        select: {
            id: true,
            email: true,
            passowrdHash: true,
            userAuthToken: true
        }
    })
}

export async function findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            passowrdHash: true,
            userAuthToken: true
        }
    });
}

export async function createUser(email: string, password: string): Promise<User> {

    return prisma.user.create({
        data: {
            email,
            passowrdHash: await bcrypt.hash(password, 10),
            userAuthToken: crypto.randomUUID()
        }
    })
}

export async function updateUser(email: string): Promise<User> {
    return await prisma.user.update({
        where: { email },
        data: { userAuthToken: crypto.randomUUID() }
    })
}
