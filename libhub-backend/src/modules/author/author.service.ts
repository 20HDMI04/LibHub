import prisma from "../../utils/prisma";
import { CreateAuthorInput } from "./author.schema";

export async function createAuthor(input: CreateAuthorInput) {
    const author = await prisma.author.create({
        data: input
    });
}