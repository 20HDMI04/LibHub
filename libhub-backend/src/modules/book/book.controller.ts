import { FastifyReply, FastifyRequest } from "fastify";
import { createBook } from "./book.service";
import { CreateBookInput } from "./book.schema";

export async function registerBookHandler(request: FastifyRequest<{Body: CreateBookInput}>, reply: FastifyReply) {
    const body = request.body;
    try {
        const book = await createBook(body);
        reply.code(201).send(book);
    } catch (error) {
        reply.status(500).send(error);
    }
}