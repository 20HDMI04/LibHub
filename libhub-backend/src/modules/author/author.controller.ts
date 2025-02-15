import { FastifyRequest, FastifyReply } from 'fastify';
import { createAuthor, getAuthors, deleteAuthor, updateAuthor, getAuthorsbyId } from './author.service';
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

export async function getAuthorsHandler(request: FastifyRequest<{Querystring: {page: string, pageSize:string}}>, reply: FastifyReply) {
    const page = parseInt(request.query.page) || 1;
    const pageSize = parseInt(request.query.pageSize) || 5;
    if (isNaN(page) || page < 1 || isNaN(pageSize) || pageSize < 1) {
        return reply.status(400).send({ error: 'Invalid page or pageSize parameters' });
    }
    try {
        const skip = (page - 1) * pageSize;
        const authors = await getAuthors(skip,pageSize);
        reply.status(200).send(authors);
    } catch (error) {
        reply.status(500).send(error);
    }
    
}

export async function getAuthorsbyIdHandler(request: FastifyRequest<{Params: {id: number}}>, reply: FastifyReply) {
    const id = request.params.id;
    try {
        const author = await getAuthorsbyId(id);
        reply.send(author);
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function deleteAuthorHandler(request: FastifyRequest<{Params: {id: number}}>, reply: FastifyReply) {
    const id = request.params.id;
    try {
        await deleteAuthor(id);
        reply.code(204).send("Author deleted successfully");
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function updateAuthorHandler(request: FastifyRequest<{Params: {id: number},Body:UpdateAuthorInput}>, reply: FastifyReply) {
    const id = request.params.id;
    const body = request.body;
    try {
        const update = await updateAuthor(id, body);
        reply.code(204).send("Author updated successfully");
    } catch (error) {
        reply.status(500).send(error);
    }
}