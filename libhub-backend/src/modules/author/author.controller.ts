import { FastifyRequest, FastifyReply } from 'fastify';
import { createAuthor, getAuthors, deleteAuthor, updateAuthor, getAuthorsbyId } from './author.service';
import { CreateAuthorInput, UpdateAuthorInput } from './author.schema';
import { Multipart, MultipartFile } from '@fastify/multipart';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import { s3Client } from '../../server';
import { FormData } from "formdata-node";

export async function registerAuthorHandler(request: FastifyRequest<{Body: FormData}>, reply: FastifyReply) {
        const body:any = request.body;
        const obj:CreateAuthorInput = JSON.parse(body.document as string);
        const file: any = request.file;
        if (!file) {
          return reply.code(400).send('No file uploaded');
        }
        const rand = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
        const uid = rand()
          const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: uid,
            Body: await file.buffer,
            ContentType: file.mimetype
          };
          const upload = new PutObjectCommand(params)
          s3Client.send(upload)
        obj.picture = uid;
        try {
            const author = await createAuthor(obj);
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
    const del = await getAuthorsbyId(id);
    if (!del) {
        reply.status(404).send("Author not found");
    }
    console.log(await del)
    try {    
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: del.picture
        };
        const deleteFile = new DeleteObjectCommand(params)
        s3Client.send(deleteFile)
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