import { FastifyRequest, FastifyReply } from 'fastify';
import { createAuthor, getAuthors, deleteAuthor } from './author.service';
import { CreateAuthorInput } from './author.schema';

export async function registerAuthorHandler(request: FastifyRequest<{Body: CreateAuthorInput}>, reply: FastifyReply) {
    const body = request.body;
    try {
        const author = await createAuthor(body);
        reply.code(201).send(author);
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function getAuthorsHandler() {
    const authors = await getAuthors();
    return authors;
}

export async function deleteAuthorHandler(request: FastifyRequest<{Params: {id: number}}>, reply: FastifyReply) {
    const id = request.params.id;
    try {
        await deleteAuthor(id);
        reply.code(204).send();
    } catch (error) {
        reply.status(500).send(error);
    }
}