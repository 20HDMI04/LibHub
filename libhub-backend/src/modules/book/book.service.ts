import prisma from "../../utils/prisma";
import { CreateBookInput, UpdateBookInput } from "./book.schema";

export async function createBook(input: CreateBookInput) {
    const book = await prisma.book.create({
        data: input
    });
    return book;
}

export async function getBooks(numberofskip: number, pageSize: number) {
    return await prisma.book.findMany({
        skip: numberofskip,
        take: pageSize,
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

export async function getBookbyId(id: number) {
    return await prisma.book.findUnique({
        where: {
            id
        },
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

export async function updateBook(id: number, input: UpdateBookInput) {
    const book = await prisma.book.update({
        where: {
            id
        },
        data: input
    });
    return book;
}

export async function deleteBook(id: number) {
    return await prisma.book.delete({
        where: {
            id
        }
    });
}