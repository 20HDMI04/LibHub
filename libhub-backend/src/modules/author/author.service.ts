import { createDecipheriv } from "crypto";
import prisma from "../../utils/prisma";
import { CreateAuthorInput, UpdateAuthorInput } from "./author.schema";

export async function createAuthor(input: CreateAuthorInput) {
    const author = await prisma.author.create({
        data: input
    });
    return author;
}

export async function getAuthors(numberofskip: number, pageSize: number) {
    return await prisma.author.findMany({
        skip: numberofskip,
        take: pageSize,
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

export async function getAuthorsbyId(id: number) {
    return await prisma.author.findUnique({
        where: {
            id
        },
        select:{
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

export async function updateAuthor(id: number, input: UpdateAuthorInput) {
    return await prisma.author.update({
        where: {
            id
        },
        data: {
            ...input
        }
    }); 
}