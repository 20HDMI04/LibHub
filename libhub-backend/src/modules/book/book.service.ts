import prisma from "../../utils/prisma";
import { CreateBookInput } from "./book.schema";

export async function createBook(input: CreateBookInput) {
    const book = await prisma.book.create({
        data: input
    });
}