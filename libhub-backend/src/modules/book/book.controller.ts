import { FastifyReply, FastifyRequest } from "fastify";
import { createBook, getBookbyId } from "./book.service";
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

export async function getBooksHandler(request: FastifyRequest<{Querystring: {page: string,pageSize:string}}>, reply: FastifyReply) {
    const page = parseInt(request.query.page) || 1;
    const pageSize = parseInt(request.query.pageSize) || 5;
    if (isNaN(page) || page < 1 || isNaN(pageSize) || pageSize < 1) {
        return reply.status(400).send({ error: 'Invalid page or pageSize parameters' });
    }
    try {
        const skip = (page - 1) * pageSize;
        const books = await getBooks(skip,pageSize);
        reply.status(200).send(books);
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function getBookbyIdHandler(request: FastifyRequest<{Params: {id: number}}>, reply: FastifyReply) {
    const id = request.params.id;
    try {
        const book = await getBookbyId(id);
        reply.send(book);
    } catch (error) {
        reply.status(500).send(error);
    }
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