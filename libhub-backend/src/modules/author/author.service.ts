import { createDecipheriv } from "crypto";
import prisma from "../../utils/prisma";
import { CreateAuthorInput } from "./author.schema";

export async function createAuthor(input: CreateAuthorInput) {
    const author = await prisma.author.create({
        data: input
    });
}

export async function getAuthors() {
    return await prisma.author.findMany({
        select: {
            id: true,
            name: true,
            bio: true,
            createdAt: true,
            updatedAt: true,
            books: {
                select: {
                    title: true
                }
            }
        }
    });
}

export async function deleteAuthor(id: number) {
    return await prisma.author.delete({
        where: {
            id
        }
    });
}