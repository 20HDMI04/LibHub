import prisma from "../../utils/prisma";
import { CreateBookInput } from "./book.schema";

export async function createBook(input: CreateBookInput) {
    const book = await prisma.book.create({
        data: input
    });
    return book;
}

export async function getBooks() {
    return await prisma.book.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            genre: true,
            published: true,
            author: {
                select: {
                    name: true,
                    bio: true
                }
            }
        }
    });
}

export async function deleteBook(id: number) {
    return await prisma.book.delete({
        where: {
            id
        }
    });
}