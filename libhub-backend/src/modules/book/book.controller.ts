import { FastifyReply, FastifyRequest } from "fastify";
import { createBook } from "./book.service";
import { CreateBookInput } from "./book.schema";
import { getBooks } from "./book.service";
import { deleteBook } from "./book.service";

export async function registerBookHandler(request: FastifyRequest<{Body: CreateBookInput}>, reply: FastifyReply) {
    const body = request.body;
    try {
        const book = await createBook(body);
        reply.code(201).send(book);
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function getBooksHandler() {
    const books = await getBooks();
    return books;
}

export async function deleteBookHandler(request: FastifyRequest<{Params: {id: number}}>, reply: FastifyReply) {
    const id = request.params.id;
    try {
        await deleteBook(id);
        reply.code(204).send("Book deleted successfully");
    } catch (error) {
        reply.status(500).send(error);
    }
}