import { FastifyRequest, FastifyReply } from 'fastify';
import { createAuthor, getAuthors, deleteAuthor, updateAuthor } from './author.service';
import { CreateAuthorInput, UpdateAuthorInput } from './author.schema';

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

export async function updateAuthorHandler(request: FastifyRequest<{Params: {id: number},Body:UpdateAuthorInput}>, reply: FastifyReply) {
    const id = request.params.id;
    const body = request.body;
    try {
        await updateAuthor(id, body);
        reply.code(204).send();
    } catch (error) {
        reply.status(500).send(error);
    }
}