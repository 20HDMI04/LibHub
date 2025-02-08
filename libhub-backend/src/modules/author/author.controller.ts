import { FastifyRequest, FastifyReply } from 'fastify';
import { createAuthor } from './author.service';
import { CreateAuthorInput } from './author.schema';
import { getAuthors } from './author.service';

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